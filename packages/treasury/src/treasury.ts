import { TOKEN_PROGRAM_ID } from "@solana/spl-token";
import { Commitment, Connection, ConnectionConfig, Keypair, PublicKey, Transaction, TransactionInstruction } from "@solana/web3.js";
import { ZEBEC_PROGRAM_ID, RPC_ENDPOINTS, SAFE_STRING, WITHDRAW_SOL_STRING, WITHDRAW_MULTISIG_SOL_STRING, FEE_ADDRESS, WITHDRAW_MULTISIG_TOKEN_STRING, WITHDRAW_TOKEN_STRING, _TOKEN_PROGRAM_ID, SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID, SYSTEM_RENT } from "./constants";
import * as INSTRUCTIONS from './instructions';
import { Signer } from "./schema";
import { SignAndConfirm, StreamTransactionResponse } from "./types";

class ZebecTreasury {
    protected _connection: Connection;
    protected _programId: PublicKey = new PublicKey(ZEBEC_PROGRAM_ID);
    protected _commitment: Commitment | ConnectionConfig | undefined;
    protected walletProvider: any;

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

    protected async _findZebecSafeAccount(walletAddress: PublicKey): Promise<[PublicKey, number]> {
        return await PublicKey.findProgramAddress(
            [Buffer.from(SAFE_STRING), walletAddress.toBuffer()],
            this._programId
        )
    }

    protected async _findZebecWalletAccount(walletAddress: PublicKey): Promise<[PublicKey, number]> {
        return await PublicKey.findProgramAddress(
            [walletAddress.toBuffer()],
            this._programId
        )
    }
}

export class NativeTreasury extends ZebecTreasury {
    constructor(
        walletProvider: any,
        rpcUrl: string = RPC_ENDPOINTS.DEFAULT,
        commitment: Commitment | undefined = "confirmed"
    ) {
        super(walletProvider, rpcUrl, commitment);
        console.log("Native Treasury Intialized!");
    }

    protected async _findWithdrawEscrowAccount(withdrawString: string, walletAddress: PublicKey): Promise<[PublicKey, number]> {
        return await PublicKey.findProgramAddress(
            [Buffer.from(withdrawString), walletAddress.toBuffer()],
            this._programId
        )
    }

    async createSafe(data: any): Promise<StreamTransactionResponse> {
        const { sender, owners, min_confirmation_required } = data;

        console.log("create zebec safe data: ", data);

        const escrow = new Keypair();
        
        const senderAddress = new PublicKey(sender);

        const [zebecSafeAddress,] = await this._findZebecSafeAccount(escrow.publicKey);
        const [withdrawEscrowAddress,] = await this._findWithdrawEscrowAccount(WITHDRAW_MULTISIG_SOL_STRING, zebecSafeAddress);

        const signers = [];
        
        owners.map((owner: any) => {
            const ownerAddress = new PublicKey(owner.wallet_address);
            signers.push(
                new Signer(
                    { address: ownerAddress, counter: 0 }
                )
            )
        })

        const ix = await INSTRUCTIONS.createMultiSigSafeInstruction(
            senderAddress,
            escrow.publicKey,
            withdrawEscrowAddress,
            this._programId,
            signers,
            min_confirmation_required
        )

        const tx = new Transaction().add({...ix});
        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            tx.partialSign(escrow);

            console.log("transaction ix after adding properties: ", tx);
            
            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "safe created.",
                data: {
                    ...res,
                    safe_escrow: escrow.publicKey.toBase58(),
                    zebec_safe: zebecSafeAddress.toBase58()
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

    async deposit(data: any): Promise<StreamTransactionResponse> {
        const { sender, multisig_escrow, amount } =  data;

        console.log("deposit to safe data: ", data);

        const senderAddress = new PublicKey(sender);
        const escrowAddress = new PublicKey(multisig_escrow);

        const [withdrawEscrowAddress,] = await this._findWithdrawEscrowAccount(WITHDRAW_SOL_STRING, escrowAddress);
        const [zebecSafeAddress,] = await this._findZebecSafeAccount(escrowAddress);
        const [zebecWalletAddress,] = await this._findZebecWalletAccount(senderAddress);

        const ix = await INSTRUCTIONS.createMultiSigDepositInstruction(
            senderAddress,
            zebecWalletAddress,
            zebecSafeAddress,
            escrowAddress,
            withdrawEscrowAddress,
            this._programId,
            amount
        );

        const tx = new Transaction().add({...ix});
        const recentHash = await this._connection.getRecentBlockhash();

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

    async sign(data: any): Promise<StreamTransactionResponse> {
        const { sender, zebec_wallet, tx_escrow, zebec_wallet_pda, signer } = data;

        console.log("sign tx data: ", data);

        const senderAddress = new PublicKey(sender);
        const zebecWalletAddress = new PublicKey(zebec_wallet);
        const txEscrowAddress = new PublicKey(tx_escrow);
        const zebecWalletEscrowAddress = new PublicKey(zebec_wallet_pda);

        const [withdrawEscrowAddress,] = await this._findWithdrawEscrowAccount(WITHDRAW_MULTISIG_SOL_STRING, zebecWalletAddress);
        
        const ix = await INSTRUCTIONS.createMultiSigSignInstruction(
            senderAddress,
            txEscrowAddress,
            zebecWalletEscrowAddress,
            withdrawEscrowAddress,
            this._programId,
            signer
        );
        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "tx signed.",
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

    async reject(data: any): Promise<StreamTransactionResponse>{
        const { sender, tx_escrow, vault_escrow } = data;
        console.log("reject multisig txsign data: ", data);

        const senderAddress = new PublicKey(sender);
        const txEscrowAddress = new PublicKey(tx_escrow);
        const zebecWalletEscrowAddress = new PublicKey(vault_escrow);

        const ix = await INSTRUCTIONS.createMultiSigRejectSignInstruction(
            senderAddress,
            txEscrowAddress,
            zebecWalletEscrowAddress,
            this._programId
        )

        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "rejected.",
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

    async init(data: any): Promise<StreamTransactionResponse> {
        const { sender, receiver, start_time, end_time, amount, zebec_wallet_escrow } = data;
        console.log("start multisig tx data: ", data);

        const escrow = new Keypair();
        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const zebecWalletEscrowAddress = new PublicKey(zebec_wallet_escrow);

        const signers = [ new Signer({ address: senderAddress, counter: 0 }) ];

        const ix = await INSTRUCTIONS.createMultiSigInitInstruction(
            senderAddress,
            recipientAddress,
            zebecWalletEscrowAddress,
            escrow.publicKey,
            this._programId,
            start_time,
            end_time,
            amount,
            signers
        )

        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "tx started.",
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

    async pause(data: any): Promise<StreamTransactionResponse> {
        const { sender, receiver, tx_escrow, vault_escrow } = data;
        console.log("pause multisig tx data: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const txEscrowAddress = new PublicKey(tx_escrow);
        const zebecWalletEscrowAddress = new PublicKey(vault_escrow)

        const ix = await INSTRUCTIONS.createMultiSigPauseInstruction(
            senderAddress,
            recipientAddress,
            txEscrowAddress,
            zebecWalletEscrowAddress,
            this._programId
        )

        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "stream paused.",
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

    async cancel(data: any): Promise<StreamTransactionResponse>{
        const { sender, receiver, zebec_safe, tx_escrow, vault_escrow } = data;
        console.log("cancel multisig tx data: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const zebecSafeAddress = new PublicKey(zebec_safe);
        const txEscrowAddress = new PublicKey(tx_escrow);
        const zebecWalletEscrowAddress = new PublicKey(vault_escrow);
        const _FEE_ADDRESS = new PublicKey(FEE_ADDRESS)

        const [withdrawEscrowAddress,] = await this._findWithdrawEscrowAccount(WITHDRAW_MULTISIG_SOL_STRING, zebecSafeAddress);
        
        const ix = await INSTRUCTIONS.createMultiSigCancelInstruction(
            senderAddress,
            recipientAddress,
            zebecSafeAddress,
            txEscrowAddress,
            zebecWalletEscrowAddress,
            withdrawEscrowAddress,
            _FEE_ADDRESS,
            this._programId
        )

        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "tx canceled.",
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

    async resume(data: any): Promise<StreamTransactionResponse>{
        const { sender, receiver, tx_escrow, vault_escrow } = data;

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const txEscrowAddress = new PublicKey(tx_escrow);
        const zebecWalletEscrowAddress = new PublicKey(vault_escrow);

        const ix = await INSTRUCTIONS.createMultiSigResumeInstruction(
            senderAddress,
            recipientAddress,
            txEscrowAddress,
            zebecWalletEscrowAddress,
            this._programId
        )

        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "tx resumed.",
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

    async withdraw(data: any): Promise<StreamTransactionResponse>{
        const { sender, receiver, zebec_safe, tx_escrow, vault_escrow, amount } = data;
        console.log("Withdraw multisig tx data: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const zebecSafeAddress = new PublicKey(zebec_safe);
        const txEscrowAddress = new PublicKey(tx_escrow);
        const zebecWalletEscrowAddress = new PublicKey(vault_escrow);
        const _FEE_ADDRESS = new PublicKey(FEE_ADDRESS);

        const [withdrawEscrowAddress,] = await this._findWithdrawEscrowAccount(WITHDRAW_MULTISIG_SOL_STRING, zebecSafeAddress);
        
        const ix = await INSTRUCTIONS.createMultiSigWithdrawInstruction(
            senderAddress,
            recipientAddress,
            zebecSafeAddress,
            txEscrowAddress,
            zebecWalletEscrowAddress,
            withdrawEscrowAddress,
            _FEE_ADDRESS,
            this._programId,
            amount
        )
        
        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "tx resumed.",
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

    async signInstant(data: any): Promise<StreamTransactionResponse>{
        const { sender, receiver, zebec_safe, vault_escrow, tx_escrow, signed_by } = data;
        console.log("sign instant transaction data: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const zebecSafeAddress = new PublicKey(zebec_safe);
        const zebecWalletEscrowAddress = new PublicKey(vault_escrow);
        const txEscrowAddress = new PublicKey(tx_escrow);

        const ix = await INSTRUCTIONS.createMultiSigSignInstantInstruction(
            senderAddress,
            recipientAddress,
            zebecSafeAddress,
            zebecWalletEscrowAddress,
            txEscrowAddress,
            this._programId,
            signed_by
        )

        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "signed instant tx",
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

    async rejectInstant(data: any): Promise<StreamTransactionResponse>{
        const { sender, vault_escrow, tx_escrow } = data;
        console.log("reject instant tx data: ", data);

        const senderAddress = new PublicKey(sender);
        const zebecWalletEscrowAddress = new PublicKey(vault_escrow);
        const txEscrowAddress = new PublicKey(tx_escrow);

        const ix = await INSTRUCTIONS.createMultiSigRejectInstantInstruction(
            senderAddress,
            zebecWalletEscrowAddress,
            txEscrowAddress,
            this._programId
        )

        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "rejected instant tx",
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

    async initInstant(data: any): Promise<StreamTransactionResponse>{
        const { sender, receiver, amount, vault_escrow } = data;
        console.log("init instant multisig tx datA: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const zebecWalletEscrowAddress = new PublicKey(vault_escrow);
        const escrow = new Keypair()

        const signer = [ new Signer({ address: senderAddress, counter: 0 })]
        
        const ix = await INSTRUCTIONS.createMultiSigInitInstantInstruction(
            senderAddress,
            recipientAddress,
            zebecWalletEscrowAddress,
            escrow.publicKey,
            this._programId,
            amount,
            signer
        )

        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            tx.partialSign(escrow);

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "started instant tx",
                data: {
                    ...res,
                    tx_escrow: escrow.publicKey.toBase58()
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

export class TokenTreasury extends ZebecTreasury {

    constructor(
        walletProvider: any,
        rpcUrl: string = RPC_ENDPOINTS.DEFAULT,
        commitment: Commitment | undefined = "confirmed"
    ) {
        super(walletProvider, rpcUrl, commitment);
        console.log("Token Treasury Intialized!");
    }

    protected async _findWithdrawEscrowAccount(withdrawString: string, walletAddress: PublicKey, tokenMintAddress: PublicKey): Promise<[PublicKey, number]> {
        return await PublicKey.findProgramAddress(
            [Buffer.from(withdrawString), walletAddress.toBuffer(), tokenMintAddress.toBuffer()],
            this._programId
        )
    }

    protected async _findAssociatedTokenAddress(walletAddress: PublicKey, tokenMintAddress: PublicKey): Promise<[PublicKey, number]> {
       
        const TOKEN_PROGRAM_ADDRESS = new PublicKey(_TOKEN_PROGRAM_ID);
        const SPL_ASSOCIATED_TOKEN_ADDRESS = new PublicKey(SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID);       

        return await PublicKey.findProgramAddress(
            [walletAddress.toBuffer(), TOKEN_PROGRAM_ADDRESS.toBuffer(), tokenMintAddress.toBuffer()],
            SPL_ASSOCIATED_TOKEN_ADDRESS
        )
    }

    async deposit(data: any): Promise<StreamTransactionResponse> {
        const { sender, token_mint_address, zebec_safe, vault_escrow, amount } = data;
        console.log("deposit token to zebec safe: ", data);

        const senderAddress = new PublicKey(sender);
        const tokenMintAddress = new PublicKey(token_mint_address);
        const zebecSafeAddress = new PublicKey(zebec_safe);
        const zebecWalletEscrowAddress = new PublicKey(vault_escrow);
        const TOKEN_PROGRAM_ADDRESS = new PublicKey(_TOKEN_PROGRAM_ID);
        const SYSTEM_RENT_ADDRESS = new PublicKey(SYSTEM_RENT);
        const SPL_ASSOCIATED_TOKEN_ADDRESS = new PublicKey(SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID);

        const [withdrawEscrowAddress,] = await this._findWithdrawEscrowAccount(WITHDRAW_TOKEN_STRING, senderAddress, tokenMintAddress);
        const [senderAssociatedAddress,] = await this._findAssociatedTokenAddress(senderAddress, tokenMintAddress);
        const [zebecWalletAddress,] = await this._findZebecWalletAccount(senderAddress);
        const [escrowAssociatedAddress,] = await this._findAssociatedTokenAddress(zebecSafeAddress, tokenMintAddress);
        const [zebecWalletAssociatedAddress,] = await this._findAssociatedTokenAddress(zebecWalletAddress, tokenMintAddress)

        const ix = await INSTRUCTIONS.createMultiSigDepositTokenInstruction(
            senderAddress,
            zebecSafeAddress,
            zebecWalletEscrowAddress,
            TOKEN_PROGRAM_ADDRESS,
            tokenMintAddress,
            senderAssociatedAddress,
            zebecWalletAddress,
            withdrawEscrowAddress,
            escrowAssociatedAddress,
            zebecWalletAssociatedAddress,
            SYSTEM_RENT_ADDRESS,
            SPL_ASSOCIATED_TOKEN_ADDRESS,
            this._programId,
            amount
        )

        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "deposited token.",
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

    async sign(data: any): Promise<StreamTransactionResponse> {
        const { sender, zebec_safe, token_mint_address, tx_escrow, vault_escrow } = data;
        console.log("sign token stream tx data: ", data);

        const senderAddress = new PublicKey(sender);
        const tokenMintAddress = new PublicKey(token_mint_address);
        const txEscrowAddress = new PublicKey(tx_escrow);
        const zebecWalletEscrowAddress = new PublicKey(vault_escrow);
        const zebecSafeAddress = new PublicKey(zebec_safe);
        const [withdrawEscrowAddress,] = await this._findWithdrawEscrowAccount(WITHDRAW_MULTISIG_TOKEN_STRING, zebecSafeAddress, tokenMintAddress);
        
        const signer = new Signer({ address: senderAddress, counter: 0 });

        const ix = await INSTRUCTIONS.createMultiSigTokenSignInstruction(
            senderAddress,
            txEscrowAddress,
            zebecWalletEscrowAddress,
            withdrawEscrowAddress,
            this._programId,
            signer
        )

        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "signed tx.",
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

    async reject(data: any): Promise<any> {
        const {sender, tx_escrow, vault_escrow } = data;
        console.log("data for reject tx sign: ", data);

        const senderAddress = new PublicKey(sender);
        const escrowAddress = new PublicKey(tx_escrow);
        const vaultEscrowAddress = new PublicKey(vault_escrow);

        const ix = await INSTRUCTIONS.createMultiSigTokenRejectInstruction(
            senderAddress,
            escrowAddress,
            vaultEscrowAddress,
            this._programId
        )

        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "sign rejected.",
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

    async init(data: any): Promise<any> {
        const { sender, receiver, vault_escrow, token_mint_address, start_time, end_time, amount } = data;
        console.log("treasury start stream data: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const vaultEscrowAddress = new PublicKey(vault_escrow);
        const TOKEN_PROGRAM_ADDRESS = new PublicKey(TOKEN_PROGRAM_ID);
        const tokenMintAddress = new PublicKey(token_mint_address);

        const escrow = new Keypair();

        const paused = 0;
        const withdraw_limit = 0

        const ix = await INSTRUCTIONS.createMultiSigTokenInitInstruction(
            senderAddress,
            recipientAddress,
            escrow.publicKey,
            vaultEscrowAddress,
            TOKEN_PROGRAM_ADDRESS,
            tokenMintAddress,
            this._programId,
            start_time,
            end_time,
            amount,
            paused,
            withdraw_limit
        )

        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            tx.partialSign(escrow);

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "signed tx.",
                data: {
                    ...res,
                    tx_escrow: escrow.publicKey.toString()
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
        const {sender, receiver, tx_escrow, vault_escrow } = data;
        console.log("data for treasury stream pause: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const txEscrowAddress = new PublicKey(tx_escrow);
        const vaultEscrowAddress = new PublicKey(vault_escrow);

        const ix = await INSTRUCTIONS.createMultiSigTokenPauseInstruction(
            senderAddress,
            recipientAddress,
            txEscrowAddress,
            vaultEscrowAddress,
            this._programId
        )

        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

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

    async cancel(data: any): Promise<StreamTransactionResponse> {
        const { sender, receiver, token_mint_address, multisig_vault, tx_escrow, vault_escrow } = data;
        console.log("data for treasury token stream: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const tokenMintAddress = new PublicKey(token_mint_address);
        const multisigVaultAddress = new PublicKey(multisig_vault);
        const txEscrowAddress = new PublicKey(tx_escrow);
        const vaultEscrowAddress = new PublicKey(vault_escrow);
        const feeAddress = new PublicKey(FEE_ADDRESS);
        const TOKEN_PROGRAM_ADDRESS = new PublicKey(TOKEN_PROGRAM_ID);
        const SYSTEM_RENT_ADDRESS = new PublicKey(SYSTEM_RENT);
        const SPL_ASSOCIATED_TOKEN_ADDRESS = new PublicKey(SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID)

        const [recipientAssociatedAddress,] = await this._findAssociatedTokenAddress(recipientAddress, tokenMintAddress);
        const [escrowAssociatedAddress,] = await this._findAssociatedTokenAddress(multisigVaultAddress, tokenMintAddress);
        const [feeAssociatedAddress,] = await this._findAssociatedTokenAddress(feeAddress, tokenMintAddress);

        const [withdrawEscrowAddress, ] = await this._findWithdrawEscrowAccount(
            WITHDRAW_MULTISIG_SOL_STRING,
            multisigVaultAddress,
            tokenMintAddress
        )

        const ix = await INSTRUCTIONS.createMultiSigTokenCancelInstruction(
            senderAddress,
            recipientAddress,
            multisigVaultAddress,
            txEscrowAddress,
            vaultEscrowAddress,
            withdrawEscrowAddress,
            TOKEN_PROGRAM_ADDRESS,
            tokenMintAddress,
            SYSTEM_RENT_ADDRESS,
            recipientAssociatedAddress,
            escrowAssociatedAddress,
            SPL_ASSOCIATED_TOKEN_ADDRESS,
            feeAddress,
            feeAssociatedAddress,
            this._programId
        )

        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "canceled stream",
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
        const {sender, receiver, tx_escrow, vault_escrow } = data;
        console.log("data for treasury token stream resume: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const txEscrowAddress = new PublicKey(tx_escrow);
        const vaultEscrowAddress = new PublicKey(vault_escrow);

        const ix = await INSTRUCTIONS.createMultiSigTokenResumeInstruction(
            senderAddress,
            recipientAddress,
            txEscrowAddress,
            vaultEscrowAddress,
            this._programId
        )

        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;

            console.log("transaction ix after adding properties: ", tx);

            const res = await this._signAndConfirm(tx);

            console.log("response from sign and confirm: ", res);

            return {
                status: "success",
                message: "tx resumed",
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
        const { sender, receiver, amount, multisig_vault, vault_escrow, tx_escrow, token_mint_address } = data;
        console.log("data for withdraw stream token: ", data);

        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const multisigVaultAddress = new PublicKey(multisig_vault);
        const txEscrowAddress = new PublicKey(tx_escrow);
        const vaultEscrowAddress = new PublicKey(vault_escrow);
        const tokenMintAddress = new PublicKey(token_mint_address);
        const feeAddress = new PublicKey(FEE_ADDRESS);
        const TOKEN_PROGRAM_ADDRESS = new PublicKey(TOKEN_PROGRAM_ID);
        const SYSTEM_RENT_ADDRESS = new PublicKey(SYSTEM_RENT);
        const SPL_ASSOCIATED_TOKEN_ADDRESS = new PublicKey(SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID);

        const [recipientAssociatedAddress,] = await this._findAssociatedTokenAddress(recipientAddress, tokenMintAddress);
        const [escrowAssociatedAddress,] = await this._findAssociatedTokenAddress(multisigVaultAddress, tokenMintAddress);
        const [feeAssociatedAddress,] = await this._findAssociatedTokenAddress(feeAddress, tokenMintAddress);
        const [withdrawEscrowAddress,] = await this._findWithdrawEscrowAccount(WITHDRAW_MULTISIG_SOL_STRING, multisigVaultAddress, tokenMintAddress);

        const ix = await INSTRUCTIONS.createMultiSigTokenWithdrawInstruction(
            senderAddress,
            recipientAddress,
            multisigVaultAddress,
            vaultEscrowAddress,
            txEscrowAddress,
            withdrawEscrowAddress,
            TOKEN_PROGRAM_ADDRESS,
            tokenMintAddress,
            SYSTEM_RENT_ADDRESS,
            escrowAssociatedAddress,
            recipientAssociatedAddress,
            SPL_ASSOCIATED_TOKEN_ADDRESS,
            feeAddress,
            feeAssociatedAddress,
            this._programId,
            amount
        );

        const tx = new Transaction().add({...ix});

        const recentHash = await this._connection.getRecentBlockhash();

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
}
