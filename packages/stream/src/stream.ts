import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Commitment, Connection, ConnectionConfig, Keypair, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import { ZEBEC_PROGRAM_ID, RPC_ENDPOINTS, WITHDRAW_SOL_STRING, WITHDRAW_TOKEN_STRING, SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID, FEE_ADDRESS, _TOKEN_PROGRAM_ID, SYSTEM_RENT, A_TOKEN } from "./constants";
import * as INSTRUCTIONS from './instructions'
import { DepositWithdrawSol, InitNativeStream, PauseResumeCancelNativeStream, SignAndConfirm, StreamTransactionResponse, WithdrawNativeStream } from "./types";


class ZebecStream {
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

export class NativeStream extends ZebecStream {
    constructor(
        walletProvider: any,
        rpcUrl: string = RPC_ENDPOINTS.DEFAULT,
        commitment: Commitment |  undefined = "confirmed"
    ) {
        super(walletProvider, rpcUrl, commitment);
        // console.log("Native Stream Initialized!", walletProvider, rpcUrl);
    }

    protected async _findWithDrawEscrowAccount(walletAddress: PublicKey): Promise<[PublicKey, number]> {
        
        return await PublicKey.findProgramAddress(
            [Buffer.from(WITHDRAW_SOL_STRING), walletAddress.toBuffer()],
            this._programId
        )
    }

    async deposit(data: DepositWithdrawSol): Promise<StreamTransactionResponse> {
        const { sender, amount } = data;

        // console.log("deposit solana to Zebec Wallet started with: ", data);

        const senderAddress = new PublicKey(sender);
        const [zebecWalletAddress, _] = await this._findZebecWalletAccount(senderAddress);

        const ix = await INSTRUCTIONS.createDepositSolInstruction(
            senderAddress,
            zebecWalletAddress,
            amount,
            this._programId
        )

        let tx = new Transaction().add({...ix});
        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            // console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            // console.log("response from sign and confirm: ", res);
    
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
        // console.log("withdraw solana from Zebec Wallet started with: ", data);

        const senderAddress = new PublicKey(sender);
        const [zebecWalletAddress, __] = await this._findZebecWalletAccount(senderAddress);
        const [withdrawEscrow, _] = await this._findWithDrawEscrowAccount(senderAddress);

        const ix = await INSTRUCTIONS.createWithdrawDepositedSolInstruction(
            senderAddress,
            zebecWalletAddress,
            withdrawEscrow,
            amount,
            this._programId
        )

        let tx = new Transaction().add({...ix});
        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            // console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            // console.log("response from sign and confirm: ", res);
    
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
        // console.log("init solana stream data: ", data);
        
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

        const recentHash = await this._connection.getRecentBlockhash()

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            tx.partialSign(tx_escrow);
            
            // console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            // console.log("response from sign and confirm: ", res);
    
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
        // console.log("pause solana stream data: ", data);


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
        let recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            // console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            // console.log("response from sign and confirm: ", res);
    
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
        // console.log("resume solana stream data: ", data);
        
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
        const recentHash = await this._connection.getRecentBlockhash()
        
        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            // console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            // console.log("response from sign and confirm: ", res);
    
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
        // console.log("cancel solana stream data: ", data);

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

        const recentHash = await this._connection.getRecentBlockhash()
        
        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            // console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            // console.log("response from sign and confirm: ", res);
    
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
        // console.log("withdraw solana stream data: ", data);

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

        const recentHash = await this._connection.getRecentBlockhash()
        
        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            // console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            // console.log("response from sign and confirm: ", res);
    
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
}


export class TokenStream extends ZebecStream {
    constructor(
        walletProvider: any,
        rpcUrl: string = RPC_ENDPOINTS.DEFAULT,
        commitment: Commitment |  undefined = "confirmed"
    ) {
        super(walletProvider, rpcUrl, commitment);
        // console.log("Token Stream Initialized!", walletProvider, rpcUrl);
    }

    protected async _findWithDrawEscrowAccount(walletAddress: PublicKey, tokenMintAddress: PublicKey): Promise<[PublicKey, number]> {
        
        return await PublicKey.findProgramAddress(
            [Buffer.from(WITHDRAW_TOKEN_STRING), walletAddress.toBuffer(), tokenMintAddress.toBuffer()],
            this._programId
        )
    }

    protected async _findAssociatedTokenAddress(walletAddress: PublicKey, tokenMintAddress: PublicKey): Promise<PublicKey> {
        return (await PublicKey.findProgramAddress(
            [ walletAddress.toBuffer(), TOKEN_PROGRAM_ID.toBuffer(), tokenMintAddress.toBuffer(),],
            new PublicKey(SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID)
        ))[0];
    }

    async init(data: any): Promise<any> {
        const { sender, receiver, token, start_time, end_time, amount } = data;
        // console.log("sender token stream data: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const tokenMintAddress = new PublicKey(token);

        const [withdrawEscrowAddress, _] = await this._findWithDrawEscrowAccount(senderAddress, tokenMintAddress);

        const escrowAddress = new Keypair();

        const ix = await INSTRUCTIONS.createInitMultiTokenStreamInstruction(
            senderAddress,
            recipientAddress,
            escrowAddress.publicKey,
            withdrawEscrowAddress,
            this._programId,
            tokenMintAddress,
            start_time,
            end_time,
            amount
        )

        let tx = new Transaction().add({...ix});
        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            tx.partialSign(escrowAddress);

            // console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            // console.log("response from sign and confirm: ", res);
    
            return {
                status: "success",
                message: "initiated token stream",
                data: {
                    pda: escrowAddress.publicKey.toBase58(),
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
        const { sender, receiver, pda } = data;

        // console.log("pause token stream data: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const escrowAddress = new PublicKey(pda);
        // const tokenMintAddress = new PublicKey(token);

        const ix = await INSTRUCTIONS.createPauseMultiTokenStreamInstruction(
            senderAddress,
            recipientAddress,
            escrowAddress,
            this._programId
        )

        let tx = new Transaction().add({...ix});
        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            // console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            // console.log("response from sign and confirm: ", res);
    
            return {
                status: "success",
                message: "paused token stream.",
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
        const { sender, receiver, pda } = data;

        // console.log("resume token stream data: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const escrowAddress = new PublicKey(pda);

        const ix = await INSTRUCTIONS.createResumeMultiTokenStreamInstruction(
            senderAddress,
            recipientAddress,
            escrowAddress,
            this._programId
        )

        let tx = new Transaction().add({...ix});
        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            // console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            // console.log("response from sign and confirm: ", res);
    
            return {
                status: "success",
                message: "resumed token stream.",
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
        const { sender, receiver, token, pda} = data;

        // console.log("cancel token stream data: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const tokenMintAddress = new PublicKey(token);
        const escrowAddress = new PublicKey(pda);

        const [withdrawEscrowAddress, _] = await this._findWithDrawEscrowAccount(senderAddress, tokenMintAddress);
        const [zebecWalletAddress, __] = await this._findZebecWalletAccount(senderAddress);

        const recipientAssociatedTokenAddress = await this._findAssociatedTokenAddress(recipientAddress, tokenMintAddress);
        const zebecWalletAssociatedTokenAddress = await this._findAssociatedTokenAddress(zebecWalletAddress, tokenMintAddress);
        const feeAssociatedTokenAddress = await this._findAssociatedTokenAddress(new PublicKey(FEE_ADDRESS), tokenMintAddress);

        const ix = await INSTRUCTIONS.createCancelMultiTokenStreamInstruction(
            senderAddress,
            recipientAddress,
            tokenMintAddress,
            zebecWalletAddress,
            escrowAddress,
            withdrawEscrowAddress,
            this._programId,
            recipientAssociatedTokenAddress,
            zebecWalletAssociatedTokenAddress,
            feeAssociatedTokenAddress
        )

        let tx = new Transaction().add({...ix});
        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            // console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            // console.log("response from sign and confirm: ", res);
    
            return {
                status: "success",
                message: "canceled token stream.",
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

    async withdraw(data: any): Promise<any> {
        const { sender, receiver, token, pda, amount } = data;
        // console.log("withdraw token stream data: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const tokenMintAddress = new PublicKey(token);
        const escrowAddress = new PublicKey(pda);
        const _TOKEN_PROGRAM_ID_ = new PublicKey(_TOKEN_PROGRAM_ID);
        const _SYSTEM_RENT = new PublicKey(SYSTEM_RENT);
        const _A_TOKEN = new PublicKey(A_TOKEN);
        const _FEE_ADDRESS = new PublicKey(FEE_ADDRESS);

        const [zebecWalletAddress, _] = await this._findZebecWalletAccount(senderAddress);
        const recipientAssociatedTokenAddress = await this._findAssociatedTokenAddress(recipientAddress, tokenMintAddress);
        const zebecWalletAssociatedTokenAddress = await this._findAssociatedTokenAddress(zebecWalletAddress, tokenMintAddress);
        const feeAssociatedTokenAddress = await this._findAssociatedTokenAddress(_FEE_ADDRESS, tokenMintAddress);
        const [withdrawEscrowAddress, __] = await this._findWithDrawEscrowAccount(senderAddress, tokenMintAddress);

        const ix = await INSTRUCTIONS.createWithdrawMultiTokenStreamInstruction(
            senderAddress,
            recipientAddress,
            zebecWalletAddress,
            escrowAddress,
            withdrawEscrowAddress,
            _TOKEN_PROGRAM_ID_,
            tokenMintAddress,
            _SYSTEM_RENT,
            zebecWalletAssociatedTokenAddress,
            recipientAssociatedTokenAddress,
            _A_TOKEN,
            _FEE_ADDRESS,
            feeAssociatedTokenAddress,
            this._programId,
            amount
        )

        let tx = new Transaction().add({...ix});
        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            // console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            // console.log("response from sign and confirm: ", res);
    
            return {
                status: "success",
                message: "withdraw token stream.",
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

    async deposit(data: any): Promise<any> {
        const { sender, token, amount } = data;

        // console.log("deposit token stream data: ", data);

        const senderAddress = new PublicKey(sender);
        const tokenMintAddress = new PublicKey(token);

        const senderAssociatedTokenAddress = await this._findAssociatedTokenAddress(senderAddress, tokenMintAddress);
        const [zebecWalletAddress, _] = await this._findZebecWalletAccount(senderAddress);
        const zebecWalletAssociatedTokenAddress = await this._findAssociatedTokenAddress(zebecWalletAddress, tokenMintAddress);
        const _TOKEN_PROGRAM_ID_ = new PublicKey(_TOKEN_PROGRAM_ID);
        const _SYSTEM_RENT = new PublicKey(SYSTEM_RENT);
        const _A_TOKEN = new PublicKey(A_TOKEN);

        // console.log("Sender Associated Token Address", senderAssociatedTokenAddress);
        // console.log("Zebec Wallet Associated Token Address", zebecWalletAssociatedTokenAddress);

        const ix = await INSTRUCTIONS.createDepositMultiTokenInstruction(
            senderAddress,
            zebecWalletAddress,
            _TOKEN_PROGRAM_ID_,
            tokenMintAddress,
            _SYSTEM_RENT,
            senderAssociatedTokenAddress,
            zebecWalletAssociatedTokenAddress,
            _A_TOKEN,
            this._programId,
            amount
        )

        let tx = new Transaction().add({...ix});
        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            // console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            // console.log("response from sign and confirm: ", res);
    
            return {
                status: "success",
                message: "deposited token to zebec wallet.",
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

    async withdrawDepositedToken(data: any): Promise<any> {
        const { sender, token, amount } = data;

        // console.log("withdraw deposited token data: ", data);

        const senderAddress = new PublicKey(sender);
        const tokenMintAddress = new PublicKey(token);
        const [zebecWalletAddress, _] = await this._findZebecWalletAccount(senderAddress);
        const [withdrawEscrowAddress, __] = await this._findWithDrawEscrowAccount(senderAddress, tokenMintAddress);
        const senderAssociatedTokenAddress = await this._findAssociatedTokenAddress(senderAddress, tokenMintAddress);
        const zebecWalletAssociatedTokenAddress = await this._findAssociatedTokenAddress(zebecWalletAddress, tokenMintAddress);
        const _TOKEN_PROGRAM_ID_ = new PublicKey(_TOKEN_PROGRAM_ID);

        const ix = await INSTRUCTIONS.createWithdrawDepositedTokenInstruction(
            senderAddress,
            _TOKEN_PROGRAM_ID_,
            tokenMintAddress,
            senderAssociatedTokenAddress,
            zebecWalletAddress,
            withdrawEscrowAddress,
            zebecWalletAssociatedTokenAddress,
            this._programId,
            amount
        )

        let tx = new Transaction().add({...ix});
        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            
            // console.log("transaction ix after adding properties: ", tx);
    
            const res = await this._signAndConfirm(tx);

            // console.log("response from sign and confirm: ", res);
    
            return {
                status: "success",
                message: "withdrawn token from zebec wallet.",
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
