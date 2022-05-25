"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MultiSigTokenInitSchema = exports.MultiSigTokenWithdrawSchema = exports.MultiSigTokenResumeSchema = exports.MultiSigTokenCancelSchema = exports.MultiSigTokenPauseSchema = exports.MultiSigTokenRejectSchema = exports.MultiSigTokenSignSchema = exports.MultiSigDepositTokenSchema = exports.MultiSigInitInstantSchema = exports.MultiSigRejectInstantSchema = exports.MultiSigSignInstantSchema = exports.MultiSigWithdrawSchema = exports.MultiSigResumeSchema = exports.MultiSigCancelSchema = exports.MultiSigPauseSchema = exports.MultiSigInitSchema = exports.MultiSigRejectSchema = exports.MultiSigSignSchema = exports.MultiSigDepositSchema = exports.MultiSigSafeSchema = exports.MultiSigTokenInit = exports.MultiSigTokenWithdraw = exports.MultiSigTokenResume = exports.MultiSigTokenCancel = exports.MultiSigTokenPause = exports.MultiSigTokenReject = exports.MultiSigTokenSign = exports.MultiSigDepositToken = exports.MultiSigInitInstant = exports.MultiSigRejectInstant = exports.MultiSigSignInstant = exports.MultiSigWithdraw = exports.MultiSigResume = exports.MultiSigCancel = exports.MultiSigPause = exports.MultiSigInit = exports.MultiSigReject = exports.MultiSigSign = exports.MultiSigDeposit = exports.MultiSigSafe = exports.WhiteList = exports.Signer = void 0;
var Base = (function () {
    function Base(properties) {
        var _this = this;
        Object.keys(properties).map(function (key) {
            return (_this[key] = properties[key]);
        });
    }
    return Base;
}());
var Signer = (function (_super) {
    __extends(Signer, _super);
    function Signer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return Signer;
}(Base));
exports.Signer = Signer;
var WhiteList = (function (_super) {
    __extends(WhiteList, _super);
    function WhiteList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WhiteList;
}(Base));
exports.WhiteList = WhiteList;
var MultiSigSafe = (function (_super) {
    __extends(MultiSigSafe, _super);
    function MultiSigSafe() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigSafe;
}(Base));
exports.MultiSigSafe = MultiSigSafe;
var MultiSigDeposit = (function (_super) {
    __extends(MultiSigDeposit, _super);
    function MultiSigDeposit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigDeposit;
}(Base));
exports.MultiSigDeposit = MultiSigDeposit;
var MultiSigSign = (function (_super) {
    __extends(MultiSigSign, _super);
    function MultiSigSign() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigSign;
}(Base));
exports.MultiSigSign = MultiSigSign;
var MultiSigReject = (function (_super) {
    __extends(MultiSigReject, _super);
    function MultiSigReject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigReject;
}(Base));
exports.MultiSigReject = MultiSigReject;
var MultiSigInit = (function (_super) {
    __extends(MultiSigInit, _super);
    function MultiSigInit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigInit;
}(Base));
exports.MultiSigInit = MultiSigInit;
var MultiSigPause = (function (_super) {
    __extends(MultiSigPause, _super);
    function MultiSigPause() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigPause;
}(Base));
exports.MultiSigPause = MultiSigPause;
var MultiSigCancel = (function (_super) {
    __extends(MultiSigCancel, _super);
    function MultiSigCancel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigCancel;
}(Base));
exports.MultiSigCancel = MultiSigCancel;
var MultiSigResume = (function (_super) {
    __extends(MultiSigResume, _super);
    function MultiSigResume() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigResume;
}(Base));
exports.MultiSigResume = MultiSigResume;
var MultiSigWithdraw = (function (_super) {
    __extends(MultiSigWithdraw, _super);
    function MultiSigWithdraw() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigWithdraw;
}(Base));
exports.MultiSigWithdraw = MultiSigWithdraw;
var MultiSigSignInstant = (function (_super) {
    __extends(MultiSigSignInstant, _super);
    function MultiSigSignInstant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigSignInstant;
}(Base));
exports.MultiSigSignInstant = MultiSigSignInstant;
var MultiSigRejectInstant = (function (_super) {
    __extends(MultiSigRejectInstant, _super);
    function MultiSigRejectInstant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigRejectInstant;
}(Base));
exports.MultiSigRejectInstant = MultiSigRejectInstant;
var MultiSigInitInstant = (function (_super) {
    __extends(MultiSigInitInstant, _super);
    function MultiSigInitInstant() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigInitInstant;
}(Base));
exports.MultiSigInitInstant = MultiSigInitInstant;
var MultiSigDepositToken = (function (_super) {
    __extends(MultiSigDepositToken, _super);
    function MultiSigDepositToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigDepositToken;
}(Base));
exports.MultiSigDepositToken = MultiSigDepositToken;
var MultiSigTokenSign = (function (_super) {
    __extends(MultiSigTokenSign, _super);
    function MultiSigTokenSign() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigTokenSign;
}(Base));
exports.MultiSigTokenSign = MultiSigTokenSign;
var MultiSigTokenReject = (function (_super) {
    __extends(MultiSigTokenReject, _super);
    function MultiSigTokenReject() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigTokenReject;
}(Base));
exports.MultiSigTokenReject = MultiSigTokenReject;
var MultiSigTokenPause = (function (_super) {
    __extends(MultiSigTokenPause, _super);
    function MultiSigTokenPause() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigTokenPause;
}(Base));
exports.MultiSigTokenPause = MultiSigTokenPause;
var MultiSigTokenCancel = (function (_super) {
    __extends(MultiSigTokenCancel, _super);
    function MultiSigTokenCancel() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigTokenCancel;
}(Base));
exports.MultiSigTokenCancel = MultiSigTokenCancel;
var MultiSigTokenResume = (function (_super) {
    __extends(MultiSigTokenResume, _super);
    function MultiSigTokenResume() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigTokenResume;
}(Base));
exports.MultiSigTokenResume = MultiSigTokenResume;
var MultiSigTokenWithdraw = (function (_super) {
    __extends(MultiSigTokenWithdraw, _super);
    function MultiSigTokenWithdraw() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigTokenWithdraw;
}(Base));
exports.MultiSigTokenWithdraw = MultiSigTokenWithdraw;
var MultiSigTokenInit = (function (_super) {
    __extends(MultiSigTokenInit, _super);
    function MultiSigTokenInit() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return MultiSigTokenInit;
}(Base));
exports.MultiSigTokenInit = MultiSigTokenInit;
exports.MultiSigSafeSchema = new Map([
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
]);
exports.MultiSigDepositSchema = new Map([
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
]);
exports.MultiSigSignSchema = new Map([
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
]);
exports.MultiSigRejectSchema = new Map([
    [
        MultiSigReject,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
]);
exports.MultiSigInitSchema = new Map([
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
]);
exports.MultiSigPauseSchema = new Map([
    [
        MultiSigPause,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
]);
exports.MultiSigCancelSchema = new Map([
    [
        MultiSigCancel,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
]);
exports.MultiSigResumeSchema = new Map([
    [
        MultiSigResume,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
]);
exports.MultiSigWithdrawSchema = new Map([
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
]);
exports.MultiSigSignInstantSchema = new Map([
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
]);
exports.MultiSigRejectInstantSchema = new Map([
    [
        MultiSigRejectInstant,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
]);
exports.MultiSigInitInstantSchema = new Map([
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
]);
exports.MultiSigDepositTokenSchema = new Map([
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
]);
exports.MultiSigTokenSignSchema = new Map([
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
]);
exports.MultiSigTokenRejectSchema = new Map([
    [
        MultiSigTokenReject,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
]);
exports.MultiSigTokenPauseSchema = new Map([
    [
        MultiSigTokenPause,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
]);
exports.MultiSigTokenCancelSchema = new Map([
    [
        MultiSigTokenCancel,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
]);
exports.MultiSigTokenResumeSchema = new Map([
    [
        MultiSigTokenResume,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
]);
exports.MultiSigTokenWithdrawSchema = new Map([
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
]);
exports.MultiSigTokenInitSchema = new Map([
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
]);
