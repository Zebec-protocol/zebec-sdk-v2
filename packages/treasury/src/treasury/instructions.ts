import { PublicKey, SOLANA_SCHEMA, TransactionInstruction } from "@solana/web3.js";
import { serialize } from "borsh";
import { INSTRUCTION } from "../constants";


export const createSafeInstruction = async (
    senderAddress: PublicKey,
    escrowAddress: PublicKey,
    withdrawEscrowAddress: PublicKey,
    programId,
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
    }

    return new TransactionInstruction({
        keys,
        programId,
        data: Buffer.from(
            serialize(
                SCHEMA.CreateSafeSchema, new SOLANA_SCHEMA.CreateSafe({...ixData})
            )
        )
    })
}