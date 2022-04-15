import { Commitment, Connection, ConnectionConfig, Keypair, PublicKey, Transaction } from "@solana/web3.js";
import { ZEBEC_PROGRAM_ID, RPC_ENDPOINTS, SAFE_STRING, WITHDRAW_SOL_STRING, WITHDRAW_MULTISIG_SOL_STRING } from "../constants";
import * as INSTRUCTIONS from './instructions';

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

    protected async _signAndConfirm(tx: Transaction, commitment: Commitment | undefined = "confirmed"): Promise<any> {
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

    // change string address to PublicKey
    // create instruction
    // add instruction to transaction
    // add metadata to instruction
    // sign the transaction and confirm the Hash.
    // return response

    // create safe
    async createSafe(data: any): Promise<any> {
        const { sender, owners, min_confirmation_required } = data;

        console.log("create zebec safe data: ", data);

        const escrow = new Keypair();
        
        const senderAddress = new PublicKey(sender);

        // find associated addresses (vault) - Prepare ix data - signers
        const [zebecSafeAddress, _] = await this._findZebecSafeAccount(escrow.publicKey);
        const [withdrawEscrowAddress, __] = await this._findWithdrawEscrowAccount(WITHDRAW_MULTISIG_SOL_STRING, zebecSafeAddress);

        const signers = [];
        
        owners.map((owner: any) => 
            signers.push(
                new Signer(
                    { address: owner.wallet_address, counter: 0 }
                ) // in Signer Class convert string to PublicKey
            )
        )

        const whiteList = new WhiteList({ signers, m: min_confirmation_required });

        const ix = await INSTRUCTIONS.createSafeInstruction(
            senderAddress,
            escrow.publicKey,
            withdrawEscrowAddress,
            this._programId,
            whiteList
        )

        const tx = new Transaction().add({...ix});
        const recentHash = await this._connection.getRecentBlockhash();

        try {
            tx.recentBlockhash = recentHash.blockhash;
            tx.feePayer = this.walletProvider.publicKey;
            tx.partialSign(escrow);

            console.log("transactoin ix after adding properties: ", tx);
            
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
    // deposit to safe
    async deposit(data: any): Promise<any> {
        const { sender, escrow } =  data;

        const senderAddress = new PublicKey(sender);
        const escrowAddress = new PublicKey(escrow);

        const [withdrawEscrowAddress, _] = await this._findWithdrawEscrowAccount(WITHDRAW_SOL_STRING, escrowAddress);
        const [zebecSafeAddress, __] = await this._findZebecSafeAccount(escrowAddress);
        const [zebecWalletAddress, ___] = await this._findZebecWalletAccount(senderAddress);

        const ix = await createDepositSafeInstruction(
            senderAddress,
            zebecWalletAddress,
            zebecSafeAddress,
            escrowAddress,
            withdrawEscrowAddress,
            this._programId
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
    /*
        Stream
    */
    // sign
    async sign(data: any): Promise<any> {
        const { sender, zebec_wallet, tx_escrow, zebec_wallet_pda } = data;

        const senderAddress = new PublicKey(sender);
        const zebecWalletAddress = new PublicKey(zebec_wallet);
        const txEscrowAddress = new PublicKey(tx_escrow);
        const zebecWalletEscrowAddress = new PublicKey(zebec_wallet_pda);

        const [withdrawEscrowAddress, _] = await this._findWithdrawEscrowAccount(WITHDRAW_MULTISIG_SOL_STRING, zebecWalletAddress);
        
        const ix = await INSTRUCTIONS.createSignInstruction(
            senderAddress,
            txEscrowAddress,
            zebecWalletEscrowAddress,
            withdrawEscrowAddress,
            this._programId
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
    // init

    async init(data: any): Promise<any> {
        const { sender, receiver, start_time, end_time, amount, zebec_wallet_escrow } = data;

        const escrow = new Keypair();
        const senderAddress = new PublicKey(sender);
        const recipientAddress = new PublicKey(receiver);
        const zebecWalletEscrowAddress = new PublicKey(zebec_wallet_escrow);

        const signers = [ new Signer({ address: senderAddress, counter: 0 }) ];

        const ix = await createSolStream(
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
    }
    // pause
    // cancel
    // resume
    // reject
    // withdraw



    
    /*
        Instant Send
    */
        // - reject instant stream
        // - sign instant stream

}