declare class Base {
    constructor(properties: {});
}
export declare class DepositSol extends Base {
}
export declare class WithdrawDepositedSol extends Base {
}
export declare class WithdrawStreamSol extends Base {
}
export declare class InitSolStream extends Base {
}
export declare class PauseSolStream extends Base {
}
export declare class ResumeSolStream extends Base {
}
export declare class CancelSolStream extends Base {
}
export declare class DepositToken extends Base {
}
export declare class InitMultiTokenStream extends Base {
}
export declare class PauseMultiTokenStream extends Base {
}
export declare class ResumeMultiTokenStream extends Base {
}
export declare class CancelMultiTokenStream extends Base {
}
export declare class WithdrawMultiTokenStream extends Base {
}
export declare class WithdrawDepositedToken extends Base {
}
export declare const CancelMultiTokenStreamSchema: Map<typeof CancelMultiTokenStream, {
    kind: string;
    fields: string[][];
}>;
export declare const ResumeMultiTokenStreamSchema: Map<typeof ResumeMultiTokenStream, {
    kind: string;
    fields: string[][];
}>;
export declare const PauseMultiTokenStreamSchema: Map<typeof PauseMultiTokenStream, {
    kind: string;
    fields: string[][];
}>;
export declare const InitMultiTokenStreamSchema: Map<typeof InitMultiTokenStream, {
    kind: string;
    fields: string[][];
}>;
export declare const WithdrawMultiTokenStreamSchema: Map<typeof WithdrawMultiTokenStream, {
    kind: string;
    fields: string[][];
}>;
export declare const DepositTokenSchema: Map<typeof DepositToken, {
    kind: string;
    fields: string[][];
}>;
export declare const WithdrawDepositedTokenSchema: Map<typeof WithdrawDepositedToken, {
    kind: string;
    fields: string[][];
}>;
export declare const DepositSolSchema: Map<typeof DepositSol, {
    kind: string;
    fields: string[][];
}>;
export declare const WithdrawDepositedSolSchema: Map<typeof WithdrawDepositedSol, {
    kind: string;
    fields: string[][];
}>;
export declare const WithdrawStreamSolSchema: Map<typeof WithdrawStreamSol, {
    kind: string;
    fields: string[][];
}>;
export declare const InitSolStreamSchema: Map<typeof InitSolStream, {
    kind: string;
    fields: string[][];
}>;
export declare const PauseSolStreamSchema: Map<typeof PauseSolStream, {
    kind: string;
    fields: string[][];
}>;
export declare const ResumeSolStreamSchema: Map<typeof ResumeSolStream, {
    kind: string;
    fields: string[][];
}>;
export declare const CancelSolStreamSchema: Map<typeof CancelSolStream, {
    kind: string;
    fields: string[][];
}>;
export {};
