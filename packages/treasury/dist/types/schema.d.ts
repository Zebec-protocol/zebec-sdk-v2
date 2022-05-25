declare class Base {
    constructor(properties: {});
}
export declare class Signer extends Base {
}
export declare class WhiteList extends Base {
}
export declare class MultiSigSafe extends Base {
}
export declare class MultiSigDeposit extends Base {
}
export declare class MultiSigSign extends Base {
}
export declare class MultiSigReject extends Base {
}
export declare class MultiSigInit extends Base {
}
export declare class MultiSigPause extends Base {
}
export declare class MultiSigCancel extends Base {
}
export declare class MultiSigResume extends Base {
}
export declare class MultiSigWithdraw extends Base {
}
export declare class MultiSigSignInstant extends Base {
}
export declare class MultiSigRejectInstant extends Base {
}
export declare class MultiSigInitInstant extends Base {
}
export declare class MultiSigDepositToken extends Base {
}
export declare class MultiSigTokenSign extends Base {
}
export declare class MultiSigTokenReject extends Base {
}
export declare class MultiSigTokenPause extends Base {
}
export declare class MultiSigTokenCancel extends Base {
}
export declare class MultiSigTokenResume extends Base {
}
export declare class MultiSigTokenWithdraw extends Base {
}
export declare class MultiSigTokenInit extends Base {
}
export declare const MultiSigSafeSchema: Map<typeof MultiSigSafe, {
    kind: string;
    fields: (string | (typeof Signer)[])[][];
}>;
export declare const MultiSigDepositSchema: Map<typeof MultiSigDeposit, {
    kind: string;
    fields: string[][];
}>;
export declare const MultiSigSignSchema: Map<typeof MultiSigSign, {
    kind: string;
    fields: (string | typeof Signer)[][];
}>;
export declare const MultiSigRejectSchema: Map<typeof MultiSigReject, {
    kind: string;
    fields: string[][];
}>;
export declare const MultiSigInitSchema: Map<typeof MultiSigInit, {
    kind: string;
    fields: (string | (typeof Signer)[])[][];
}>;
export declare const MultiSigPauseSchema: Map<typeof MultiSigPause, {
    kind: string;
    fields: string[][];
}>;
export declare const MultiSigCancelSchema: Map<typeof MultiSigCancel, {
    kind: string;
    fields: string[][];
}>;
export declare const MultiSigResumeSchema: Map<typeof MultiSigResume, {
    kind: string;
    fields: string[][];
}>;
export declare const MultiSigWithdrawSchema: Map<typeof MultiSigWithdraw, {
    kind: string;
    fields: string[][];
}>;
export declare const MultiSigSignInstantSchema: Map<typeof MultiSigSignInstant, {
    kind: string;
    fields: (string | typeof Signer)[][];
}>;
export declare const MultiSigRejectInstantSchema: Map<typeof MultiSigRejectInstant, {
    kind: string;
    fields: string[][];
}>;
export declare const MultiSigInitInstantSchema: Map<typeof MultiSigInitInstant, {
    kind: string;
    fields: (string | (typeof Signer)[])[][];
}>;
export declare const MultiSigDepositTokenSchema: Map<typeof MultiSigDepositToken, {
    kind: string;
    fields: string[][];
}>;
export declare const MultiSigTokenSignSchema: Map<typeof MultiSigTokenSign, {
    kind: string;
    fields: (string | typeof Signer)[][];
}>;
export declare const MultiSigTokenRejectSchema: Map<typeof MultiSigTokenReject, {
    kind: string;
    fields: string[][];
}>;
export declare const MultiSigTokenPauseSchema: Map<typeof MultiSigTokenPause, {
    kind: string;
    fields: string[][];
}>;
export declare const MultiSigTokenCancelSchema: Map<typeof MultiSigTokenCancel, {
    kind: string;
    fields: string[][];
}>;
export declare const MultiSigTokenResumeSchema: Map<typeof MultiSigTokenResume, {
    kind: string;
    fields: string[][];
}>;
export declare const MultiSigTokenWithdrawSchema: Map<typeof MultiSigTokenWithdraw, {
    kind: string;
    fields: string[][];
}>;
export declare const MultiSigTokenInitSchema: Map<typeof MultiSigTokenInit, {
    kind: string;
    fields: (string | (typeof Signer)[])[][];
}>;
export {};
