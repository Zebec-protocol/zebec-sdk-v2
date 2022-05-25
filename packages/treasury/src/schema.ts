class Base {
    constructor(properties: {}) {
        Object.keys(properties).map((key) => {
            return (this[key] = properties[key]);
        });
    }
}

export class Signer extends Base {}
export class MultiSigSafe extends Base {}
export class MultiSigDeposit extends Base {}
export class MultiSigSign extends Base {}
export class MultiSigReject extends Base {}
export class MultiSigInit extends Base {}
export class MultiSigPause extends Base {}
export class MultiSigCancel extends Base {}
export class MultiSigResume extends Base {}
export class MultiSigWithdraw extends Base {}
export class MultiSigSignInstant extends Base {}
export class MultiSigRejectInstant extends Base {}
export class MultiSigInitInstant extends Base {}
export class MultiSigDepositToken extends Base {}
export class MultiSigTokenSign extends Base {}

export class MultiSigTokenReject extends Base {}
export class MultiSigTokenPause extends Base {}
export class MultiSigTokenCancel extends Base {}
export class MultiSigTokenResume extends Base {}
export class MultiSigTokenWithdraw extends Base {}
export class MultiSigTokenInit extends Base {}


export const MultiSigSafeSchema =  new Map([
    [
        MultiSigSafe,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["signers", [Signer]],
                ["m", "u8"],
                ["multisig_safe", "pubkey"]
            ]
        }
    ],
    [
        Signer,
        {
            kind: "struct",
            fields: [
                ["address", "pubkey"],
                ["counter", "u8"]
            ]
        }
    ]
])

export const MultiSigDepositSchema = new Map([
    [
        MultiSigDeposit,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["amount", "u8"]
            ]
        }
    ]
])

export const MultiSigSignSchema = new Map([
    [
        MultiSigSign,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["signed_by", Signer]
            ]
        }
    ],
    [
        Signer,
        {
            kind: "struct",
            fields: [
                ["address", "pubkey"],
                ["counter", "u8"]
            ]
        }
    ]
])

export const MultiSigRejectSchema = new Map([
    [
        MultiSigReject,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
])

export const MultiSigInitSchema = new Map([
    [
        MultiSigInit,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["start_time", "u64"],
                ["end_time", "u64"],
                ["paused", "u64"],
                ["withdraw_limit", "u64"],
                ["amount", "u64"],
                ["sender", "pubkey"],
                ["recipient", "pubkey"],
                ["signed_by", [Signer]],
                ["multisig_safe", "pubkey"],
                ["can_cancel", "u8"]
            ]
        }
    ],
    [
        Signer,
        {
            kind: "struct",
            fields: [
                ["address", "pubkey"],
                ["counter", "u8"]
            ]
        }
    ]
])

export const MultiSigPauseSchema = new Map([
    [
        MultiSigPause,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
])

export const MultiSigCancelSchema = new Map([
    [
        MultiSigCancel,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
])

export const MultiSigResumeSchema = new Map([
    [
        MultiSigResume,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
])

export const MultiSigWithdrawSchema = new Map([
    [
        MultiSigWithdraw,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["amount", "u64"]
            ]
        }
    ]
])

export const MultiSigSignInstantSchema = new Map([
    [
        MultiSigSignInstant,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["signed_by", Signer]
            ]
        }
    ],
    [
        Signer,
        {
            kind: "struct",
            fields: [
                ["address", "pubkey"],
                ["counter", "u8"]
            ]
        }
    ]
])

export const MultiSigRejectInstantSchema = new Map([
    [
        MultiSigRejectInstant,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
])

export const MultiSigInitInstantSchema = new Map([
    [
        MultiSigInitInstant,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["sender", "pubkey"],
                ["recipient", "pubkey"],
                ["signed_by", [Signer]],
                ["multisig_safe", "pubkey"],
                ["amount", "u64"]
            ]
        }
    ],
    [
        Signer,
        {
            kind: "struct",
            fields: [
                ["address", "pubkey"],
                ["counter", "u8"]
            ]
        }
    ]
])

export const MultiSigDepositTokenSchema = new Map([
    [
        MultiSigDepositToken,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["amount", "u64"]
            ]
        }
    ]
])

export const MultiSigTokenSignSchema = new Map([
    [
        MultiSigTokenSign,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["signed_by", Signer]
            ]
        }
    ],
    [
        Signer,
        {
            kind: "struct",
            fields: [
                ["address", "pubkey"],
                ["counter", "u8"]
            ]
        }
    ]
])

export const MultiSigTokenRejectSchema = new Map([
    [
        MultiSigTokenReject,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
])

export const MultiSigTokenPauseSchema = new Map([
    [
        MultiSigTokenPause,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
])

export const MultiSigTokenCancelSchema = new Map([
    [
        MultiSigTokenCancel,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
])

export const MultiSigTokenResumeSchema = new Map([
    [
        MultiSigTokenResume,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
])

export const MultiSigTokenWithdrawSchema = new Map([
    [
        MultiSigTokenWithdraw,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["amount", "u64"]
            ]
        }
    ]
])

export const MultiSigTokenInitSchema = new Map([
    [
        MultiSigTokenInit,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["start_time", "u64"],
                ["end_time", "u64"],
                ["paused", "u64"],
                ["withdraw_limit", "u64"],
                ["amount", "u64"],
                ["sender", "pubkey"],
                ["recipient", "pubkey"],
                ["token_mint", "pubkey"],
                ["signed_by", [Signer]],
                ["multisig_safe", "pubkey"]
            ]
        }
    ],
    [
        Signer,
        {
            kind: "struct",
            fields: [
                ["address", "pubkey"],
                ["counter", "u8"]
            ]
        }
    ]
])