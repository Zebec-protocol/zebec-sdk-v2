import { Commitment, Connection, ConnectionConfig, PublicKey, Transaction } from "@solana/web3.js";
import { SignAndConfirm, StreamTransactionResponse } from "./types";
declare class ZebecTreasury {
    protected _connection: Connection;
    protected _programId: PublicKey;
    protected _commitment: Commitment | ConnectionConfig | undefined;
    protected walletProvider: any;
    constructor(walletProvider: any, rpcUrl: string, commitment: Commitment | string);
    protected _signAndConfirm(tx: Transaction, commitment?: Commitment | undefined): Promise<SignAndConfirm>;
    protected _findZebecSafeAccount(walletAddress: PublicKey): Promise<[PublicKey, number]>;
    protected _findZebecWalletAccount(walletAddress: PublicKey): Promise<[PublicKey, number]>;
}
export declare class NativeTreasury extends ZebecTreasury {
    constructor(walletProvider: any, rpcUrl?: string, commitment?: Commitment | undefined);
    protected _findWithdrawEscrowAccount(withdrawString: string, walletAddress: PublicKey): Promise<[PublicKey, number]>;
    createSafe(data: any): Promise<StreamTransactionResponse>;
    deposit(data: any): Promise<StreamTransactionResponse>;
    sign(data: any): Promise<StreamTransactionResponse>;
    reject(data: any): Promise<StreamTransactionResponse>;
    init(data: any): Promise<StreamTransactionResponse>;
    pause(data: any): Promise<StreamTransactionResponse>;
    cancel(data: any): Promise<StreamTransactionResponse>;
    resume(data: any): Promise<StreamTransactionResponse>;
    withdraw(data: any): Promise<StreamTransactionResponse>;
    signInstant(data: any): Promise<StreamTransactionResponse>;
    rejectInstant(data: any): Promise<StreamTransactionResponse>;
    initInstant(data: any): Promise<StreamTransactionResponse>;
}
export declare class TokenTreasury extends ZebecTreasury {
    constructor(walletProvider: any, rpcUrl?: string, commitment?: Commitment | undefined);
    protected _findWithdrawEscrowAccount(withdrawString: string, walletAddress: PublicKey, tokenMintAddress: PublicKey): Promise<[PublicKey, number]>;
    protected _findAssociatedTokenAddress(walletAddress: PublicKey, tokenMintAddress: PublicKey): Promise<[PublicKey, number]>;
    deposit(data: any): Promise<StreamTransactionResponse>;
    sign(data: any): Promise<StreamTransactionResponse>;
    reject(data: any): Promise<any>;
    init(data: any): Promise<any>;
    pause(data: any): Promise<any>;
    cancel(data: any): Promise<StreamTransactionResponse>;
    resume(data: any): Promise<any>;
    withdraw(data: any): Promise<any>;
}
export {};
