export declare type SignAndConfirm = {
    transactionHash: string;
    safe_escrow?: string;
    zebec_safe?: string;
    tx_escrow?: string;
};
export declare type StreamTransactionResponse = {
    status: string;
    message: string | Error;
    data: SignAndConfirm;
};
