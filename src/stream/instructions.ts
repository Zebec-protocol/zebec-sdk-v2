import { Buffer } from 'buffer'
import { serialize } from "borsh";
import { Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction, TransactionInstruction } from "@solana/web3.js";
import * as SCHEMA from "./schema";
import { A_TOKEN, FEE_ADDRESS, INSTRUCTION, SYSTEM_RENT, _TOKEN_PROGRAM_ID } from "../constants";


export const createInitMultiTokenStreamInstruction = async (
    sender: PublicKey,
    recipient: PublicKey,
    tx_escrow: PublicKey,
    withdraw_escrow: PublicKey,
    programId: PublicKey,
    tokenMintAddress: PublicKey,
    start_time: number,
    end_time: number,
    amount: number
): Promise<TransactionInstruction> => {    
    const _TOKEN_PROGRAM_ID_ = new PublicKey(_TOKEN_PROGRAM_ID)
    const keys = [
        { pubkey: sender, isSigner: true, isWritable: true },
        { pubkey: recipient, isSigner: false, isWritable: true },
        { pubkey: tx_escrow, isSigner: true, isWritable: true },
        { pubkey: withdraw_escrow, isSigner: false, isWritable: true },
        { pubkey: _TOKEN_PROGRAM_ID_, isSigner: false, isWritable: false },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: tokenMintAddress, isSigner: false, isWritable: false },
    ]
    const ixData = {
        instruction: INSTRUCTION.INIT_TOKEN_STREAM,
        start_time,
        end_time,
        amount
    }

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(serialize(SCHEMA.InitMultiTokenStreamSchema, new SCHEMA.InitMultiTokenStream(ixData)))
    })
}

export const createPauseMultiTokenStreamInstruction = async (
    sender: PublicKey,
    recipient: PublicKey,
    tx_escrow: PublicKey,
    programId: PublicKey
) => {

    const keys = [
        { pubkey: sender, isSigner: true, isWritable: true },
        { pubkey: recipient, isSigner: false, isWritable: true },
        { pubkey: tx_escrow, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
    ]

    const ixData = {
        instruction: INSTRUCTION.PAUSE_TOKEN_STREAM
    }

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(serialize(SCHEMA.PauseMultiTokenStreamSchema, new SCHEMA.PauseMultiTokenStream(ixData)))
    })
}

export const createResumeMultiTokenStreamInstruction = async (
    sender: PublicKey,
    recipient: PublicKey,
    tx_escrow: PublicKey,
    programId: PublicKey
) => {
    const keys = [
        { pubkey: sender, isSigner: true, isWritable: true },
        { pubkey: recipient, isSigner: false, isWritable: true },
        { pubkey: tx_escrow, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
    ]

    const ixData = {
        instruction: INSTRUCTION.RESUME_TOKEN_STREAM
    }

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(serialize(SCHEMA.ResumeMultiTokenStreamSchema, new SCHEMA.ResumeMultiTokenStream(ixData)))
    })
}

export const createCancelMultiTokenStreamInstruction = async (
    sender: PublicKey,
    recipient: PublicKey,
    token: PublicKey,
    zebecVaultAddress: PublicKey,
    tx_escrow: PublicKey,
    withdraw_data: PublicKey,
    programId: PublicKey,
    recipientAssociatedTokenAddress: PublicKey,
    txEscrowAssociatedTokenAddress: PublicKey,
    feeAssociatedTokenAddress: PublicKey
): Promise<TransactionInstruction> => {
    const FEE_ACCOUNT_ADDRESS = new PublicKey(FEE_ADDRESS)
    const A_TOKEN_ADDRESS = new PublicKey(A_TOKEN)
    const SYSTEM_RENT_ADDRESS = new PublicKey(SYSTEM_RENT)
    const TOKEN_PROGRAM_ID_ADDRESS = new PublicKey(_TOKEN_PROGRAM_ID)

    const keys = [
        { pubkey: sender, isSigner: true, isWritable: true },
        { pubkey: recipient, isSigner: false, isWritable: true },
        { pubkey: zebecVaultAddress, isSigner: false, isWritable: false },
        { pubkey: tx_escrow, isSigner: false, isWritable: true },
        { pubkey: withdraw_data, isSigner: false, isWritable: true },
        { pubkey: TOKEN_PROGRAM_ID_ADDRESS, isSigner: false, isWritable: false },
        { pubkey: token, isSigner: false, isWritable: true },
        { pubkey: SYSTEM_RENT_ADDRESS, isSigner: false, isWritable: false },
        { pubkey: recipientAssociatedTokenAddress, isSigner: false, isWritable: true },
        { pubkey: txEscrowAssociatedTokenAddress, isSigner: false, isWritable: true },
        { pubkey: A_TOKEN_ADDRESS, isSigner: false, isWritable: false },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: FEE_ACCOUNT_ADDRESS, isSigner: false, isWritable: true },
        { pubkey: feeAssociatedTokenAddress, isSigner:false, isWritable: true},
    ]

    const ixData = {
        instruction: INSTRUCTION.CANCEL_TOKEN_STREAM
    }

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(
                SCHEMA.CancelMultiTokenStreamSchema, 
                new SCHEMA.CancelMultiTokenStream(ixData)
            )
        )
    })
}

export const createWithdrawMultiTokenStreamInstruction = async(
    senderAddress: PublicKey,
    recipientAddress: PublicKey,
    zebecWalletAddress: PublicKey,
    escrowAddress: PublicKey,
    withdrawEscrowAddress: PublicKey,
    _TOKEN_PROGRAM_ID_: PublicKey,
    tokenMintAddress: PublicKey,
    _SYSTEM_RENT: PublicKey,
    zebecWalletAssociatedTokenAddress: PublicKey,
    recipientAssociatedTokenAddress: PublicKey,
    _A_TOKEN: PublicKey,
    _FEE_ADDRESS: PublicKey,
    feeAssociatedTokenAddress: PublicKey,
    programId: PublicKey,
    amount: number
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: senderAddress, isSigner: false, isWritable: true },
        { pubkey: recipientAddress, isSigner: true, isWritable: true },
        { pubkey: zebecWalletAddress, isSigner: false, isWritable: true },
        { pubkey: escrowAddress, isSigner: false, isWritable: true },
        { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: _TOKEN_PROGRAM_ID_, isSigner: false, isWritable: false },
        { pubkey: tokenMintAddress, isSigner: false, isWritable: true },
        { pubkey: _SYSTEM_RENT, isSigner: false, isWritable: false },
        { pubkey: zebecWalletAssociatedTokenAddress, isSigner: false, isWritable: true },
        { pubkey: recipientAssociatedTokenAddress, isSigner: false, isWritable: true },
        { pubkey: _A_TOKEN, isSigner: false, isWritable: false },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: _FEE_ADDRESS, isSigner: false, isWritable: true },
        { pubkey: feeAssociatedTokenAddress, isSigner: false, isWritable: true },
    ]

    const ixData = {
        instruction: INSTRUCTION.WITHDRAW_TOKEN_STREAM,
        amount: (amount * LAMPORTS_PER_SOL).toString()
    }

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(SCHEMA.WithdrawMultiTokenStreamSchema, new SCHEMA.WithdrawMultiTokenStream({...ixData}))
        )
    })
}

export const createDepositMultiTokenInstruction = async(
    senderAddress: PublicKey,
    zebecWalletAddress: PublicKey,
    tokenProgramAddress: PublicKey,
    tokenMintAddress: PublicKey,
    systemRentAddress: PublicKey,
    senderAssociatedTokenAddress: PublicKey,
    zebecWalletAssociatedTokenAddress: PublicKey,
    aTokenAddress: PublicKey,
    programId: PublicKey,
    amount: number
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: zebecWalletAddress, isSigner: false, isWritable: false },
        { pubkey: tokenProgramAddress, isSigner: false, isWritable: false },
        { pubkey: tokenMintAddress, isSigner: false, isWritable: true },
        { pubkey: systemRentAddress, isSigner: false, isWritable: false },
        { pubkey: senderAssociatedTokenAddress, isSigner: false, isWritable: true },
        { pubkey: zebecWalletAssociatedTokenAddress, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: aTokenAddress, isSigner: false, isWritable: false }
    ]
    const ixData = {
        instruction: INSTRUCTION.DEPOSIT_TOKEN,
        amount: (amount * LAMPORTS_PER_SOL).toString()
    }

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(SCHEMA.DepositTokenSchema, new SCHEMA.DepositToken({...ixData}))
        )
    })
}

export const createWithdrawDepositedTokenInstruction = async(
    senderAddress: PublicKey,
    tokenProgramAddress: PublicKey,
    tokenMintAddress: PublicKey,
    senderAssociatedTokenAddress: PublicKey,
    zebecWalletAddress: PublicKey,
    withdrawEscrowAddress: PublicKey,
    zebecWalletAssociatedTokenAddress: PublicKey,
    programId: PublicKey,
    amount: number
): Promise<TransactionInstruction> => {
    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: tokenProgramAddress, isSigner: false, isWritable: false },
        { pubkey: tokenMintAddress, isSigner: false, isWritable: true },
        { pubkey: senderAssociatedTokenAddress, isSigner: false, isWritable: true },
        { pubkey: zebecWalletAddress, isSigner: false, isWritable: false },
        { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: zebecWalletAssociatedTokenAddress, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
    ]

    const ixData = {
        instruction: INSTRUCTION.WITHDRAW_TOKEN,
        amount: (amount * LAMPORTS_PER_SOL).toString()
    }

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(SCHEMA.WithdrawDepositedTokenSchema, new SCHEMA.WithdrawDepositedToken({...ixData}))
        )
    })
}




export const createInitSolStreamInstruction = async (
    sender: PublicKey,
    receipient: PublicKey,
    tx_escrow: Keypair,
    withdraw_escrow: PublicKey,
    programId: PublicKey,
    start_time: number,
    end_time: number,
    amount: number
): Promise<TransactionInstruction> => {
    
    const keys = [
        { pubkey: sender, isSigner: true, isWritable: true },
        { pubkey: receipient, isSigner: false, isWritable: true },
        { pubkey: tx_escrow.publicKey, isSigner: true, isWritable: true },
        { pubkey: withdraw_escrow, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
    ];
    const ixData = {
        instruction: INSTRUCTION.INIIT_SOL_STREAM,
        start_time: start_time,
        end_time: end_time,
        amount: (amount * LAMPORTS_PER_SOL).toString()
    }
    return new TransactionInstruction({
        keys,
        programId, 
        data: Buffer.from(
            serialize(
                SCHEMA.InitSolStreamSchema, 
                new SCHEMA.InitSolStream(ixData)
            )
        )
    });
}

export const createPauseSolStreamInstruction = async (
    sender: PublicKey, 
    recipient: PublicKey, 
    tx_escrow: PublicKey, 
    programId: PublicKey
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: sender, isSigner: true, isWritable: true },
        { pubkey: recipient, isSigner: false, isWritable: true },
        { pubkey: tx_escrow, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
    ]

    const ixData = {
        instruction: INSTRUCTION.PAUSE_SOL_STREAM
    }

    return new TransactionInstruction({
        keys, 
        programId, 
        data: Buffer.from(
            serialize(
                SCHEMA.PauseSolStreamSchema, 
                new SCHEMA.PauseSolStream(ixData)
            )
        )
    })
}

export const createResumeSolStreamInstruction = async (
    sender: PublicKey,
    recipient: PublicKey,
    tx_escrow: PublicKey,
    programId: PublicKey
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: sender, isSigner: true, isWritable: true },
        { pubkey: recipient, isSigner: false, isWritable: true },
        { pubkey: tx_escrow, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
    ]

    const ixData = {
        instruction: INSTRUCTION.RESUME_SOL_STREAM
    }

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(
                SCHEMA.ResumeSolStreamSchema, 
                new SCHEMA.ResumeSolStream(ixData)
            )
        )
    })
}

export const createCancelSolStreamInstruction = async (
    sender: PublicKey,
    recipient: PublicKey,
    tx_escrow: PublicKey,
    zebecWallet: PublicKey,
    withdrawEscrow: PublicKey,
    programId: PublicKey,
): Promise<TransactionInstruction> => {
    const CANCEL_FEE_ACCOUNT = new PublicKey(FEE_ADDRESS)
    const keys = [
        { pubkey: sender, isSigner: true, isWritable: true },
        { pubkey: recipient, isSigner: false, isWritable: true },
        { pubkey: zebecWallet, isSigner: false, isWritable: true },
        { pubkey: tx_escrow, isSigner: false, isWritable: true },
        { pubkey: withdrawEscrow, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: CANCEL_FEE_ACCOUNT, isSigner: false, isWritable: true }
    ]

    const ixData = {
        instruction: INSTRUCTION.CANCEL_SOL_STREAM
    }

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(
                SCHEMA.CancelSolStreamSchema, 
                new SCHEMA.CancelSolStream(ixData)
            )
        )
    })
}

export const  createDepositSolInstruction = async (
    sender: PublicKey,
    zebecWalletAddress: PublicKey,
    amount: number,
    programId: PublicKey
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: sender, isSigner: true, isWritable: true },
        { pubkey: zebecWalletAddress, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
    ]

    const ixData = {
        instruction: INSTRUCTION.DEPOSIT_SOL,
        amount: (amount * LAMPORTS_PER_SOL).toString()
    }

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(
                SCHEMA.DepositSolSchema,
                new SCHEMA.DepositSol(ixData)
            )
        )
    })
}

export const createWithdrawDepositedSolInstruction = async (
    senderAddress: PublicKey,
    zebecWalletAddress: PublicKey,
    withdrawEscrowAddress: PublicKey,
    amount: number,
    programId: PublicKey
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: zebecWalletAddress, isSigner: false, isWritable: true },
        { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: SystemProgram. programId, isSigner: false, isWritable: false }
    ]

    const ixData = {
        instruction: INSTRUCTION.WITHDRAW_SOL,
        amount: (amount * LAMPORTS_PER_SOL).toString()
    }

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(
                SCHEMA.WithdrawDepositedSolSchema,
                new SCHEMA.WithdrawDepositedSol(ixData)
            )
        )
    })
}

export const createWithdrawSolStreamInstruction = async (
    senderAddress: PublicKey,
    receipientAddress: PublicKey,
    txEscrowAddress: PublicKey,
    zebecWalletAddress: PublicKey,
    withdrawEscrowAddress: PublicKey,
    amount: number,
    programId: PublicKey
): Promise<TransactionInstruction> => {

    const feeAddress = new PublicKey(FEE_ADDRESS)

    const keys = [
        { pubkey: senderAddress, isSigner: false, isWritable: true },
        { pubkey: receipientAddress, isSigner: true, isWritable: true },
        { pubkey: zebecWalletAddress, isSigner: false, isWritable: true },
        { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: feeAddress, isSigner: false, isWritable: true }
    ]

    const ixData = {
        instruction: INSTRUCTION.WITHDRAW_SOL_STREAM,
        amount: (amount * LAMPORTS_PER_SOL).toString()
    }


    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(
                SCHEMA.WithdrawStreamSolSchema,
                new SCHEMA.WithdrawStreamSol(ixData)
            )
        )
    })
}