export declare enum INSTRUCTION {
    CREATE_WHITELIST = 16,
    SWAP_SOL = 17,
    SWAP_TOKEN = 18,
    SIGNED_BY = 19,
    INIT_SOL_STREAM_MULTISIG = 20,
    WITHDRAW_SOL_STREAM_MULTISIG = 21,
    CANCEL_SOL_STREAM_MULTISIG = 22,
    PAUSE_SOL_STREAM_MULTISIG = 23,
    RESUME_SOL_STREAM_MULTISIG = 24,
    REJECT_SOL_STREAM_MULTISIG = 25,
    INIT_TOKEN_STREAM_MULTISIG = 26,
    WITHDRAW_TOKEN_STREAM_MULTISIG = 27,
    CANCEL_TOKEN_STREAM_MULTISIG = 28,
    PAUSE_TOKEN_STREAM_MULTISIG = 29,
    RESUME_TOKEN_STREAM_MULTISIG = 30,
    REJECT_TOKEN_STREAM_MULTISIG = 31,
    SIGNED_BY_TOKEN_MULTISIG = 32,
    INSTANT_SOL_TRANSFER = 33,
    SIGNED_BY_TRANSER_SOL = 34,
    INSTANT_TOKEN_TRANSFER = 35,
    SIGNED_BY_TRANSER_TOKEN = 36,
    REJECT_TRANSFER_SOL = 37,
    REJECT_TRANSFER_TOKEN = 38
}
export declare const ZEBEC_PROGRAM_ID = "AknC341xog56SrnoK6j3mUvaD1Y7tYayx1sxUGpeYWdX";
export declare const _TOKEN_PROGRAM_ID = "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA";
export declare const SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID = "ATokenGPvbdGVxr1b2hvZbsiqW5xWH25efTNsLJA8knL";
export declare const FEE_ADDRESS = "EsDV3m3xUZ7g8QKa1kFdbZT18nNz8ddGJRcTK84WDQ7k";
export declare const SYSTEM_RENT = "SysvarRent111111111111111111111111111111111";
export declare const WITHDRAW_SOL_STRING = "withdraw_sol";
export declare const WITHDRAW_TOKEN_STRING = "withdraw_token";
export declare const WITHDRAW_MULTISIG_SOL_STRING = "withdraw_multisig_sol";
export declare const WITHDRAW_MULTISIG_TOKEN_STRING = "withdraw_multisig_token";
export declare const SAFE_STRING = "multisig_safe";
export declare enum RPC_ENDPOINTS {
    DEVNET = "https://api.devnet.solana.com",
    MAINNET = "https://api.mainnet-beta.solana.com",
    TESTNET = "https;//api.testnet.solana.com",
    DEFAULT = "https://api.devnet.solana.com"
}
