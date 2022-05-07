import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, TransactionInstruction } from "@solana/web3.js";
import { serialize } from "borsh";
import { INSTRUCTION } from "./constants";
import * as SCHEMA from './schema';

export const createMultiSigSafeInstruction = async (
    senderAddress: PublicKey,
    escrowAddress: PublicKey,
    withdrawEscrowAddress: PublicKey,
    programId: PublicKey,
    whiteList: any,
): Promise<TransactionInstruction> => {
    
    const { signers, m } = whiteList;

    const SYSTEM_PROGRAM = new PublicKey("11111111111111111111111111111111");

    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: escrowAddress, isSigner: true, isWritable: true },
        { pubkey: SYSTEM_PROGRAM, isSigner: false, isWritable: false },
        { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true }
    ];

    const ixData = {
        instruction: INSTRUCTION.CREATE_WHITELIST,
        signers,
        m,
        multisig_safe: new PublicKey("J75jd3kjsABQSDrEdywcyhmbq8eHDowfW9xtEWsVALy9")
    };

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(
                SCHEMA.MultiSigSafeSchema, new SCHEMA.MultiSigSafe({...ixData})
            )
        )
    })
}

export const createMultiSigDepositInstruction = async (
    senderAddress: PublicKey,
    zebecWalletAddress: PublicKey,
    zebecSafeAddress: PublicKey,
    escrowAddress: PublicKey,
    withdrawEscrowAddress: PublicKey,
    programId: PublicKey,
    amount: number
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: zebecWalletAddress, isSigner: false, isWritable: true },
        { pubkey: zebecSafeAddress, isSigner: false, isWritable: true },
        { pubkey: escrowAddress, isSigner: false, isWritable: true },
        { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
    ];

    const ixData = {
        instruction: INSTRUCTION.SWAP_SOL,
        amount: (amount * LAMPORTS_PER_SOL).toString()
    };

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(
                SCHEMA.MultiSigDepositSchema, new SCHEMA.MultiSigDeposit({...ixData})
            )
        )
    })
}

export const createMultiSigSignInstruction = async(
    senderAddress: PublicKey,
    txEscrowAddress: PublicKey,
    zebecWalletEscrowAddress: PublicKey,
    withdrawEscrowAddress: PublicKey,
    programId: PublicKey,
    signer: any // Signer
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
    ];

    const ixData = {
        instruction: INSTRUCTION.SIGNED_BY,
        signed_by: signer
    };

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(SCHEMA.MultiSigSignSchema, new SCHEMA.MultiSigSign({...ixData}))
        )
    })
}

export const createMultiSigRejectSignInstruction = async(
    senderAddress: PublicKey,
    txEscrowAddress: PublicKey,
    zebecWalletEscrowAddress: PublicKey,
    programId: PublicKey
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true }
    ];

    const ixData = {
        instruction: INSTRUCTION.REJECT_SOL_STREAM_MULTISIG
    };

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize( SCHEMA.MultiSigRejectSchema, new SCHEMA.MultiSigReject({...ixData}))
        )
    })
}

export const createMultiSigInitInstruction = async(
    senderAddress: PublicKey,
    recipientAddress: PublicKey,
    zebecWalletEscrowAddress: PublicKey,
    escrowAddress: PublicKey,
    programId: PublicKey,
    start_time: number,
    end_time: number,
    amount: number,
    signers: any
): Promise<TransactionInstruction> => {
     
    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: recipientAddress, isSigner: false, isWritable: true },
        { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: escrowAddress, isSigner: true, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
    ];

    const ixData = {
        instruction: INSTRUCTION.INIT_SOL_STREAM_MULTISIG,
        start_time,
        end_time,
        paused: 0,
        withdraw_limit: 0,
        amount,
        sender: senderAddress.toBase58(),
        recipient: recipientAddress.toBase58(),
        signed_by: signers,
        multisig_safe: new PublicKey("J75jd3kjsABQSDrEdywcyhmbq8eHDowfW9xtEWsVALy9"),
        can_cancel: 1 // compare this iwth Schema, in schema its assigned as `u8` but here its true
    };

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(SCHEMA.MultiSigInitSchema, new SCHEMA.MultiSigInit({...ixData}))
        )
    })
}

export const createMultiSigPauseInstruction = async(
    senderAddress: PublicKey,
    recipientAddress: PublicKey,
    txEscrowAddress: PublicKey,
    zebecWalletEscrowAddress: PublicKey,
    programId: PublicKey
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: recipientAddress, isSigner: false, isWritable: true },
        { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true }
    ];

    const ixData = {
        instruction: INSTRUCTION.PAUSE_SOL_STREAM_MULTISIG
    };
    
    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(SCHEMA.MultiSigPauseSchema, new SCHEMA.MultiSigPause({...ixData}))
        )
    })
}

export const createMultiSigCancelInstruction = async(
    senderAddress: PublicKey,
    recipientAddress: PublicKey,
    zebecSafeAddress: PublicKey,
    txEscrowAddress: PublicKey,
    zebecWalletEscrowAddress: PublicKey,
    withdrawEscrowAddress: PublicKey,
    _FEE_ADDRESS: PublicKey,
    programId: PublicKey
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: recipientAddress, isSigner: false, isWritable: true },
        { pubkey: zebecSafeAddress, isSigner: false, isWritable: true },
        { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: _FEE_ADDRESS, isSigner: false, isWritable: true }
    ];

    const ixData = {
        instruction: INSTRUCTION.CANCEL_SOL_STREAM_MULTISIG
    };

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(SCHEMA.MultiSigCancelSchema, new SCHEMA.MultiSigCancel({...ixData}))
        )
    })
}

export const createMultiSigResumeInstruction = async(
    senderAddress: PublicKey,
    recipientAddress: PublicKey,
    txEscrowAddress: PublicKey,
    zebecWalletEscrowAddress: PublicKey,
    programId: PublicKey
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: recipientAddress, isSigner: false, isWritable: true },
        { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true }
    ];

    const ixData = {
        instruction: INSTRUCTION.RESUME_SOL_STREAM_MULTISIG
    };

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(SCHEMA.MultiSigResumeSchema, new SCHEMA.MultiSigResume({...ixData}))
        )
    })
}

export const createMultiSigWithdrawInstruction = async(
    senderAddress: PublicKey,
    recipientAddress: PublicKey,
    zebecSafeAddress: PublicKey,
    txEscrowAddress: PublicKey,
    zebecWalletEscrowAddress: PublicKey,
    withdrawEscrowAddress: PublicKey,
    _FEE_ADDRESS: PublicKey,
    programId: PublicKey,
    amount: number
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: recipientAddress, isSigner: false, isWritable: true },
        { pubkey: zebecSafeAddress, isSigner: false, isWritable: true },
        { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false },
        { pubkey: _FEE_ADDRESS, isSigner: false, isWritable: true },
    ];

    const ixData = {
        instruction: INSTRUCTION.WITHDRAW_SOL_STREAM_MULTISIG,
        amount: (amount * LAMPORTS_PER_SOL).toString()
    };

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(SCHEMA.MultiSigWithdrawSchema, new SCHEMA.MultiSigWithdraw({...ixData}))
        )
    })
}

export const createMultiSigSignInstantInstruction = async(
    senderAddress: PublicKey,
    recipientAddress: PublicKey,
    zebecSafeAddress: PublicKey,
    zebecWalletEscrowAddress: PublicKey,
    txEscrowAddress: PublicKey,
    programId: PublicKey,
    signed_by: any
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: recipientAddress, isSigner: false, isWritable: true },
        { pubkey: zebecSafeAddress, isSigner: false, isWritable: true },
        { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: true }
    ];

    const ixData = {
        instruction: INSTRUCTION.SIGNED_BY_TRANSER_SOL,
        signed_by 
    };

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(SCHEMA.MultiSigSignInstantSchema, new SCHEMA.MultiSigSignInstant({...ixData}))
        )
    })
}

export const createMultiSigRejectInstantInstruction = async(
    senderAddress: PublicKey,
    zebecWalletEscrowAddress: PublicKey,
    txEscrowAddress: PublicKey,
    programId: PublicKey
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: false },
        { pubkey: txEscrowAddress, isSigner: false, isWritable: true }
    ];

    const ixData = {
        instruction: INSTRUCTION.REJECT_TRANSFER_SOL
    };

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(SCHEMA.MultiSigRejectInstantSchema, new SCHEMA.MultiSigRejectInstant({...ixData}))
        )
    })
}

export const createMultiSigInitInstantInstruction = async(
    senderAddress: PublicKey,
    recipientAddress: PublicKey,
    zebecWalletEscrowAddress: PublicKey,
    escrowAddress: PublicKey,
    programId: PublicKey,
    amount: number,
    signer: any
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: recipientAddress, isSigner: false, isWritable: true },
        { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: escrowAddress, isSigner: true, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
    ];

    const ixData = {
        instruction: INSTRUCTION.INSTANT_SOL_TRANSFER,
        amount,
        sender: senderAddress.toBase58(),
        recipient: recipientAddress.toBase58(),
        signed_by: signer,
        multisig_safe: new PublicKey("J75jd3kjsABQSDrEdywcyhmbq8eHDowfW9xtEWsVALy9")
    };

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(SCHEMA.MultiSigInitInstantSchema, new SCHEMA.MultiSigInitInstant({...ixData}))
        )
    })
}

export const createMultiSigDepositTokenInstruction = async(
    senderAddress: PublicKey,
    zebecSafeAddress: PublicKey,
    zebecWalletEscrowAddress: PublicKey,
    TOKEN_PROGRAM_ADDRESS: PublicKey,
    tokenMintAddress: PublicKey,
    senderAssociatedAddress: PublicKey,
    zebecWalletAddress: PublicKey,
    withdrawEscrowAddress: PublicKey,
    escrowAssociatedAddress: PublicKey,
    zebecWalletAssociatedAddress: PublicKey,
    SYSTEM_RENT_ADDRESS: PublicKey,
    SPL_ASSOCIATED_TOKEN_ADDRESS: PublicKey,
    programId: PublicKey,
    amount: number
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: zebecSafeAddress, isSigner: false, isWritable: true },
        { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: TOKEN_PROGRAM_ADDRESS, isSigner: false, isWritable: false },
        { pubkey: tokenMintAddress, isSigner: false, isWritable: false },
        { pubkey: senderAssociatedAddress, isSigner: false, isWritable: true },
        { pubkey: zebecWalletAddress, isSigner: false, isWritable: true },
        { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: escrowAssociatedAddress, isSigner: false, isWritable: true },
        { pubkey: zebecWalletAssociatedAddress, isSigner: false, isWritable: true },
        { pubkey: SYSTEM_RENT_ADDRESS, isSigner: false, isWritable: false },
        { pubkey: SPL_ASSOCIATED_TOKEN_ADDRESS, isSigner: false, isWritable: false },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
    ];

    const ixData = {
        instruction: INSTRUCTION.SWAP_TOKEN,
        amount: (amount * LAMPORTS_PER_SOL).toString()
    };

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(SCHEMA.MultiSigDepositTokenSchema, new SCHEMA.MultiSigDepositToken({...ixData}))
        )
    })
}

export const createMultiSigTokenSignInstruction = async(
    senderAddress: PublicKey,
    txEscrowAddress: PublicKey,
    zebecWalletEscrowAddress: PublicKey,
    withdrawEscrowAddress: PublicKey,
    programId: PublicKey,
    signer: any
): Promise<TransactionInstruction> => {

    const keys = [
        { pubkey: senderAddress, isSigner: true, isWritable: true },
        { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
        { pubkey: SystemProgram.programId, isSigner: false, isWritable: false }
    ];
    
    const ixData = {
        instruction: INSTRUCTION.SIGNED_BY_TOKEN_MULTISIG,
        signed_by: signer
    };

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(SCHEMA.MultiSigTokenSignSchema, new SCHEMA.MultiSigTokenSign({...ixData}))
        )
    })
}