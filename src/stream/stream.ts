import { Commitment, Connection, ConnectionConfig, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { ZEBEC_PROGRAM_ID, RPC_ENDPOINTS, WITHDRAW_SOL_STRING } from "../constants";
import * as INSTRUCTIONS from './instructions'
import { DepositWithdrawSol, InitNativeStream, PauseResumeCancelNativeStream, SignAndConfirm, StreamTransactionResponse, WithdrawNativeStream } from "./types";


class BaseStream {
    protected _connection: Connection;
    protected _programId: PublicKey = new PublicKey(ZEBEC_PROGRAM_ID);
    protected _commitment: Commitment | ConnectionConfig | undefined;
    protected walletProvider: any

    constructor (
        walletProvider: any,
        rpcUrl: string,
        commitment: Commitment | string
    ) {
        this.walletProvider = walletProvider;
        this._connection = new Connection(rpcUrl, this._commitment);
        this._commitment = commitment as Commitment;
    }

    protected async _signAndConfirm(tx: Transaction, commitment: Commitment | undefined = "confirmed"): Promise<SignAndConfirm> {
        const signed = await this.walletProvider.signTransaction(tx);
        const signature = await this._connection.sendRawTransaction(signed.serialize());
        await this._connection.confirmTransaction(signature, commitment);

        return {
            transactionHash: signature
        }
    }

    protected async _findZebecWalletAccount(walletAddress: PublicKey): Promise<[PublicKey, number]> {
        return await PublicKey.findProgramAddress(
            [walletAddress.toBuffer()],
            this._programId
        )
    }

}

export class NativeStream extends BaseStream {
    constructor(
        walletProvider: any,
        rpcUrl: string = RPC_ENDPOINTS.DEFAULT,
        commitment: Commitment |  undefined = "confirmed"
    ) {
        super(walletProvider, rpcUrl, commitment);
        console.log("Native Stream Initialized!", walletProvider, rpcUrl);
    }

    protected async _findWithDrawEscrowAccount(walletAddress: PublicKey): Promise<[PublicKey, number]> {
        
        return await PublicKey.findProgramAddress(
            [Buffer.from(WITHDRAW_SOL_STRING), walletAddress.toBuffer()],
            this._programId
        )
    }

    async deposit(data: DepositWithdrawSol): Promise<StreamTransactionResponse> {
        const { sender, amount } = data;

        console.log("deposit solana to Zebec Wallet started with: ", data);

        const senderAddress = new PublicKey(sender);
        const [zebecWalletAddress, _] = await this._findZebecWalletAccount(sender);

        const ix = await INSTRUCTIONS.createDepositSolInstruction(
            senderAddress,
            zebecWalletAddress,
            amount,
            this._programId
        )

        let tx = new Transaction().add({...ix});
        const recentHash = await this._connection.getLatestBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);
    
            return {
                status: "success",
                message: "deposit successful",
                data: {
                    ...res
                }
            }
        } catch(e) {
            return {
                status: "error",
                message: e,
                data: null
            }
        }
    }

    async withdrawDepositedSol(data: DepositWithdrawSol): Promise<StreamTransactionResponse> {
        const { sender, amount } = data;
        console.log("withdraw solana from Zebec Wallet started with: ", data);

        const senderAddress = new PublicKey(sender);
        const [zebecWalletAddress, __] = await this._findZebecWalletAccount(sender);
        const [withdrawEscrow, _] = await this._findWithDrawEscrowAccount(sender);

        const ix = await INSTRUCTIONS.createWithdrawDepositedSolInstruction(
            senderAddress,
            zebecWalletAddress,
            withdrawEscrow,
            amount,
            this._programId
        )

        let tx = new Transaction().add({...ix});
        const recentHash = await this._connection.getLatestBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);
    
            return {
                status: "success",
                message: "withdraw successful",
                data: {
                    ...res
                }
            }
        } catch(e) {
            return {
                status: "error",
                message: e,
                data: null
            }
        }


    }

    async init(data: InitNativeStream): Promise<StreamTransactionResponse> {
        const { sender, receiver, start_time, end_time, amount } = data;
        console.log("init solana stream data: ", data);
        
        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver)
        const [withdraw_escrow, _] = <[PublicKey, number]>await this._findWithDrawEscrowAccount(senderAddress);

        const tx_escrow = new Keypair();

        const ix = await INSTRUCTIONS.createInitSolStreamInstruction(
            senderAddress,
            recipientAddress,
            tx_escrow,
            withdraw_escrow,
            this._programId,
            start_time,
            end_time,
            amount
        )

        let tx = new Transaction().add({...ix})

        const recentHash = await this._connection.getLatestBlockhash()

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            tx.partialSign(tx_escrow);
            
            console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);
    
            return {
                status: "success",
                message: "stream started successfully",
                data: {
                    pda: tx_escrow.publicKey.toBase58(), 
                    ...res
                }
            }
        } catch(e) {
            return {
                status: "error",
                message: e,
                data: null
            }
        }
    }

    async pause(data: PauseResumeCancelNativeStream): Promise<StreamTransactionResponse> {
        const { sender, receiver, pda } = data;
        console.log("pause solana stream data: ", data);


        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const escrowAddress = new PublicKey(pda);

        const ix = await INSTRUCTIONS.createPauseSolStreamInstruction(
            senderAddress,
            recipientAddress,
            escrowAddress,
            this._programId
        )

        let tx = new Transaction().add({...ix});
        let recentHash = await this._connection.getLatestBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);
    
            return {
                status: "success",
                message: "stream paused",
                data: { 
                    ...res
                }
            }
        } catch(e) {
            return {
                status: "error",
                message: e,
                data: null
            }
        }
    }

    async resume(data: PauseResumeCancelNativeStream): Promise<StreamTransactionResponse> {
        const { sender, receiver, pda } = data;
        console.log("resume solana stream data: ", data);
        
        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const escrowAddress = new PublicKey(pda);

        const ix = await INSTRUCTIONS.createResumeSolStreamInstruction(
            senderAddress,
            recipientAddress,
            escrowAddress,
            this._programId
        )

        let tx = new Transaction().add({...ix})
        const recentHash = await this._connection.getLatestBlockhash()
        
        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);
    
            return {
                status: "success",
                message: "stream resumed",
                data: { 
                    ...res
                }
            }
        } catch(e) {
            return {
                status: "error",
                message: e,
                data: null
            }
        }
    }

    async cancel(data: PauseResumeCancelNativeStream): Promise<StreamTransactionResponse> {
        const { sender, receiver, pda} = data;
        console.log("cancel solana stream data: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const escrowAddress = new PublicKey(pda);

        const [zebecWallet, __] = await this._findZebecWalletAccount(senderAddress);
        const [withdrawEscrow, _] = await this._findWithDrawEscrowAccount(senderAddress);

        const ix = await INSTRUCTIONS.createCancelSolStreamInstruction(
            senderAddress,
            recipientAddress,
            escrowAddress,
            zebecWallet,
            withdrawEscrow,
            this._programId
        )

        let tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getLatestBlockhash()
        
        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);
    
            return {
                status: "success",
                message: "stream canceled",
                data: { 
                    ...res
                }
            }
        } catch(e) {
            return {
                status: "error",
                message: e,
                data: null
            }
        }
    }

    async withdraw(data: WithdrawNativeStream): Promise<StreamTransactionResponse> {
        const { sender, amount, receiver, pda } = data;
        console.log("withdraw solana stream data: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const escrowAddress = new PublicKey(pda);

        const [zebecWalletAddress, _] = await this._findZebecWalletAccount(senderAddress);
        const [withdrawEscrowAddress, __] = await this._findWithDrawEscrowAccount(senderAddress);

        const ix = await INSTRUCTIONS.createWithdrawSolStreamInstruction(
            senderAddress,
            recipientAddress,
            escrowAddress,
            zebecWalletAddress,
            withdrawEscrowAddress,
            amount,
            this._programId
        )

        let tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getLatestBlockhash()
        
        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);
    
            return {
                status: "success",
                message: "stream canceled",
                data: { 
                    ...res
                }
            }
        } catch(e) {
            return {
                status: "error",
                message: e,
                data: null
            }
        }
    }
}
