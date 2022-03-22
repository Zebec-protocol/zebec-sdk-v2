
class Base {
    constructor(properties: {}) {
      Object.keys(properties).map((key) => {
        return (this[key] = properties[key]);
      });
    }
  }


export class DepositSol extends Base {}
export class WithdrawDepositedSol extends Base {}
export class WithdrawStreamSol extends Base {}
export class InitSolStream extends Base {}
export class PauseSolStream extends Base {}
export class ResumeSolStream extends Base {}
export class CancelSolStream extends Base {}


export class InitMultiTokenStream extends Base {}
export class PauseMultiTokenStream extends Base {}
export class ResumeMultiTokenStream extends Base {}
export class CancelMultiTokenStream extends Base {}
export class WithdrawMultiTokenStream extends Base {}


export const CancelMultiTokenStreamSchema = new Map([
    [
        CancelMultiTokenStream,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ],
        },
    ],
]);


export const ResumeMultiTokenStreamSchema = new Map([
    [
        ResumeMultiTokenStream,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ],
        },
    ],
]);


export const PauseMultiTokenStreamSchema = new Map([
    [
        PauseMultiTokenStream,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ],
        },
    ],
]);


export const InitMultiTokenStreamSchema = new Map([
    [
        InitMultiTokenStream,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["start_time", "u64"],
                ["end_time", "u64"],
                ["amount", "u64"],
            ]
        }
    ]
])

export const WithdrawMultiTokenStreamSchema = new Map([
    [
        WithdrawMultiTokenStream,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["amount", "u64"]
            ]
        }
    ]
])



export const DepositSolSchema = new Map([
    [
        DepositSol,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["amount", "u64"]
            ]
        }
    ]
])

export const WithdrawDepositedSolSchema = new Map([
    [
        WithdrawDepositedSol,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["amount", "u64"]
            ]
        }
    ]
])

export const WithdrawStreamSolSchema = new Map([
    [
        WithdrawStreamSol,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["amount", "u64"]
            ]
        }
    ]
])

export const InitSolStreamSchema = new Map([
    [
        InitSolStream,
        {
          kind: "struct",
          fields: [
            ["instruction", "u8"],
            ["start_time", "u64"],
            ["end_time", "u64"],
            ["amount", "u64"],
          ],
        },
    ]
])


export const PauseSolStreamSchema = new Map([
    [
        PauseSolStream,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ],
        },
    ],
]);
  

export const ResumeSolStreamSchema = new Map([
    [
        ResumeSolStream,

        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
])


export const CancelSolStreamSchema = new Map([
    [
        CancelSolStream,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
])