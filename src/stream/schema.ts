
class Stream {
    constructor(properties: {}) {
      Object.keys(properties).map((key) => {
        return (this[key] = properties[key]);
      });
    }
  }



export class InitSolStream extends Stream {}

export class PauseSolStream extends Stream {}

export class ResumeSolStream extends Stream {}

export class CancelSolStream extends Stream {}

export class InitMultiTokenStream extends Stream {}

export class PauseMultiTokenStream extends Stream {}

export class ResumeMultiTokenStream extends Stream {}

export class CancelMultiTokenStream extends Stream {}



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