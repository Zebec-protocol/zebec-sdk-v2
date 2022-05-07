import { Commitment, Connection, ConnectionConfig, PublicKey, Transaction } from "@solana/web3.js";
import { DepositWithdrawSol, InitNativeStream, PauseResumeCancelNativeStream, SignAndConfirm, StreamTransactionResponse, WithdrawNativeStream } from "./types";
declare class ZebecStream {
    protected _connection: Connection;
    protected _programId: PublicKey;
    protected _commitment: Commitment | ConnectionConfig | undefined;
    protected walletProvider: any;
    constructor(walletProvider: any, rpcUrl: string, commitment: Commitment | string);
    protected _signAndConfirm(tx: Transaction, commitment?: Commitment | undefined): Promise<SignAndConfirm>;
    protected _findZebecWalletAccount(walletAddress: PublicKey): Promise<[PublicKey, number]>;
}
export declare class NativeStream extends ZebecStream {
    constructor(walletProvider: any, rpcUrl?: string, commitment?: Commitment | undefined);
    protected _findWithDrawEscrowAccount(walletAddress: PublicKey): Promise<[PublicKey, number]>;
    deposit(data: DepositWithdrawSol): Promise<StreamTransactionResponse>;
    withdrawDepositedSol(data: DepositWithdrawSol): Promise<StreamTransactionResponse>;
    init(data: InitNativeStream): Promise<StreamTransactionResponse>;
    pause(data: PauseResumeCancelNativeStream): Promise<StreamTransactionResponse>;
    resume(data: PauseResumeCancelNativeStream): Promise<StreamTransactionResponse>;
    cancel(data: PauseResumeCancelNativeStream): Promise<StreamTransactionResponse>;
    withdraw(data: WithdrawNativeStream): Promise<StreamTransactionResponse>;
}
export declare class TokenStream extends ZebecStream {
    constructor(walletProvider: any, rpcUrl?: string, commitment?: Commitment | undefined);
    protected _findWithDrawEscrowAccount(walletAddress: PublicKey, tokenMintAddress: PublicKey): Promise<[PublicKey, number]>;
    protected _findAssociatedTokenAddress(walletAddress: PublicKey, tokenMintAddress: PublicKey): Promise<PublicKey>;
    init(data: any): Promise<any>;
    pause(data: any): Promise<any>;
    resume(data: any): Promise<any>;
    cancel(data: any): Promise<any>;
    withdraw(data: any): Promise<any>;
    deposit(data: any): Promise<any>;
    withdrawDepositedToken(data: any): Promise<any>;
}
export {};
