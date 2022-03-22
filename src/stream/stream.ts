import { Commitment, Connection, ConnectionConfig, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { ZEBEC_PROGRAM_ID, RPC_ENDPOINTS, WITHDRAW_SOL_STRING } from "../constants";
import * as INSTRUCTIONS from './instructions'

export class BaseStream {
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

    // TODO: add return type
    protected async _signAndConfirm(tx: Transaction, commitment: Commitment | undefined = "confirmed"): Promise<any> {
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

// TODO: Add Data type

export class StreamNative extends BaseStream {
    constructor(
        walletProvider: any,
        rpcUrl: string = RPC_ENDPOINTS.DEFAULT,
        commitment: Commitment |  string = "confirmed"
    ) {
        super (walletProvider, rpcUrl, commitment);
        console.log("Native Stream Initialized!", walletProvider, rpcUrl);
    }

    protected async _findWithDrawEscrowAccount(sender: PublicKey): Promise<[PublicKey, number]> {
        
        return await PublicKey.findProgramAddress(
            [Buffer.from(WITHDRAW_SOL_STRING), sender.toBuffer()],
            this._programId
        )
    }

    public async init(data: any): Promise<any> {
        const { sender, recipient, start_time, end_time, amount } = data;
        console.log("init solana stream data: ", data);
        
        const senderAddress = new PublicKey(sender);
        const receipientAddress = new PublicKey(recipient)
        const [withdraw_escrow, _] = <[PublicKey, number]>await this._findWithDrawEscrowAccount(sender);

        const tx_escrow = new Keypair();

        const ix = await INSTRUCTIONS.createInitSolStreamInstruction(
            senderAddress,
            receipientAddress,
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
                message: "transaction success",
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

    async pause(data: any): Promise<any> {
        const { sender, recipient, tx_escrow } = data;

        const senderAddress = new PublicKey(sender);
        const receipientAddress = new PublicKey(recipient);
        const escrowAddress = new PublicKey(tx_escrow);

        const ix = await INSTRUCTIONS.createPauseSolStreamInstruction(
            senderAddress,
            receipientAddress,
            escrowAddress,
            this._programId
        )

        let tx = new Transaction().add({...ix});
        let recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);
    
            return {
                status: "success",
                message: "transaction success",
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

    async resume(data: any): Promise<any> {
        const { sender, recipient, tx_escrow } = data;
        
        const senderAddress = new PublicKey(sender);
        const receipientAddress = new PublicKey(recipient);
        const escrowAddress = new PublicKey(tx_escrow);

        const ix = await INSTRUCTIONS.createResumeSolStreamInstruction(
            senderAddress,
            receipientAddress,
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
                message: "transaction success",
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

    async cancel(data: any): Promise<any> {
        const { sender, recipient, tx_escrow} = data;

        const senderAddress = new PublicKey(sender);
        const receipientAddress = new PublicKey(recipient);
        const escrowAddress = new PublicKey(tx_escrow);

        const [zebecWallet, __] = await this._findZebecWalletAccount(sender);
        const [withdrawEscrow, _] = await this._findWithDrawEscrowAccount(sender);

        const ix = await INSTRUCTIONS.createCancelSolStreamInstruction(
            senderAddress,
            receipientAddress,
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
                message: "transaction success",
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