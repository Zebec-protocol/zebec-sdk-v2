export type SignAndConfirm = {
    transactionHash: string;
    pda?: string;
}

export type StreamTransactionResponse = {
    status: string;
    message: string | Error;
    data: SignAndConfirm
}

export type InitNativeStream = {
    sender: string;
    receiver: string;
    start_time: number;
    end_time: number;
    amount: number;
}

export type PauseResumeCancelNativeStream = {
    sender: string;
    receiver: string;
    pda: string;
}

export type WithdrawNativeStream = {
    sender: string;
    receiver: string;
    pda: string;
    amount: number;
}

export type DepositWithdrawSol = {
    sender: string;
    amount: number;
}
