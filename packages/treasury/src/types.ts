export type SignAndConfirm = {
    transactionHash: string;
    safe_escrow?: string;
    zebec_safe?: string;
    tx_escrow?: string;
}

export type StreamTransactionResponse = {
    status: string;
    message: string | Error;
    data: SignAndConfirm
}
