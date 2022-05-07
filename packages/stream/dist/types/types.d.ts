export declare type SignAndConfirm = {
    transactionHash: string;
    pda?: string;
};
export declare type StreamTransactionResponse = {
    status: string;
    message: string | Error;
    data: SignAndConfirm;
};
export declare type InitNativeStream = {
    sender: string;
    receiver: string;
    start_time: number;
    end_time: number;
    amount: number;
};
export declare type PauseResumeCancelNativeStream = {
    sender: string;
    receiver: string;
    pda: string;
};
export declare type WithdrawNativeStream = {
    sender: string;
    receiver: string;
    pda: string;
    amount: number;
};
export declare type DepositWithdrawSol = {
    sender: string;
    amount: number;
};
