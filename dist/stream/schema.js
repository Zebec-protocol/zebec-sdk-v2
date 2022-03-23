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
exports.CancelSolStreamSchema = exports.ResumeSolStreamSchema = exports.PauseSolStreamSchema = exports.InitSolStreamSchema = exports.WithdrawStreamSolSchema = exports.WithdrawDepositedSolSchema = exports.DepositSolSchema = exports.WithdrawDepositedTokenSchema = exports.DepositTokenSchema = exports.WithdrawMultiTokenStreamSchema = exports.InitMultiTokenStreamSchema = exports.PauseMultiTokenStreamSchema = exports.ResumeMultiTokenStreamSchema = exports.CancelMultiTokenStreamSchema = exports.WithdrawDepositedToken = exports.WithdrawMultiTokenStream = exports.CancelMultiTokenStream = exports.ResumeMultiTokenStream = exports.PauseMultiTokenStream = exports.InitMultiTokenStream = exports.DepositToken = exports.CancelSolStream = exports.ResumeSolStream = exports.PauseSolStream = exports.InitSolStream = exports.WithdrawStreamSol = exports.WithdrawDepositedSol = exports.DepositSol = void 0;
var Base = /** @class */ (function () {
    function Base(properties) {
        var _this = this;
        Object.keys(properties).map(function (key) {
            return (_this[key] = properties[key]);
        });
    }
    return Base;
}());
var DepositSol = /** @class */ (function (_super) {
    __extends(DepositSol, _super);
    function DepositSol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DepositSol;
}(Base));
exports.DepositSol = DepositSol;
var WithdrawDepositedSol = /** @class */ (function (_super) {
    __extends(WithdrawDepositedSol, _super);
    function WithdrawDepositedSol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WithdrawDepositedSol;
}(Base));
exports.WithdrawDepositedSol = WithdrawDepositedSol;
var WithdrawStreamSol = /** @class */ (function (_super) {
    __extends(WithdrawStreamSol, _super);
    function WithdrawStreamSol() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WithdrawStreamSol;
}(Base));
exports.WithdrawStreamSol = WithdrawStreamSol;
var InitSolStream = /** @class */ (function (_super) {
    __extends(InitSolStream, _super);
    function InitSolStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InitSolStream;
}(Base));
exports.InitSolStream = InitSolStream;
var PauseSolStream = /** @class */ (function (_super) {
    __extends(PauseSolStream, _super);
    function PauseSolStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PauseSolStream;
}(Base));
exports.PauseSolStream = PauseSolStream;
var ResumeSolStream = /** @class */ (function (_super) {
    __extends(ResumeSolStream, _super);
    function ResumeSolStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResumeSolStream;
}(Base));
exports.ResumeSolStream = ResumeSolStream;
var CancelSolStream = /** @class */ (function (_super) {
    __extends(CancelSolStream, _super);
    function CancelSolStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CancelSolStream;
}(Base));
exports.CancelSolStream = CancelSolStream;
var DepositToken = /** @class */ (function (_super) {
    __extends(DepositToken, _super);
    function DepositToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return DepositToken;
}(Base));
exports.DepositToken = DepositToken;
var InitMultiTokenStream = /** @class */ (function (_super) {
    __extends(InitMultiTokenStream, _super);
    function InitMultiTokenStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return InitMultiTokenStream;
}(Base));
exports.InitMultiTokenStream = InitMultiTokenStream;
var PauseMultiTokenStream = /** @class */ (function (_super) {
    __extends(PauseMultiTokenStream, _super);
    function PauseMultiTokenStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return PauseMultiTokenStream;
}(Base));
exports.PauseMultiTokenStream = PauseMultiTokenStream;
var ResumeMultiTokenStream = /** @class */ (function (_super) {
    __extends(ResumeMultiTokenStream, _super);
    function ResumeMultiTokenStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return ResumeMultiTokenStream;
}(Base));
exports.ResumeMultiTokenStream = ResumeMultiTokenStream;
var CancelMultiTokenStream = /** @class */ (function (_super) {
    __extends(CancelMultiTokenStream, _super);
    function CancelMultiTokenStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return CancelMultiTokenStream;
}(Base));
exports.CancelMultiTokenStream = CancelMultiTokenStream;
var WithdrawMultiTokenStream = /** @class */ (function (_super) {
    __extends(WithdrawMultiTokenStream, _super);
    function WithdrawMultiTokenStream() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WithdrawMultiTokenStream;
}(Base));
exports.WithdrawMultiTokenStream = WithdrawMultiTokenStream;
var WithdrawDepositedToken = /** @class */ (function (_super) {
    __extends(WithdrawDepositedToken, _super);
    function WithdrawDepositedToken() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    return WithdrawDepositedToken;
}(Base));
exports.WithdrawDepositedToken = WithdrawDepositedToken;
exports.CancelMultiTokenStreamSchema = new Map([
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
exports.ResumeMultiTokenStreamSchema = new Map([
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
exports.PauseMultiTokenStreamSchema = new Map([
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
exports.InitMultiTokenStreamSchema = new Map([
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
]);
exports.WithdrawMultiTokenStreamSchema = new Map([
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
]);
exports.DepositTokenSchema = new Map([
    [
        DepositToken,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["amount", "u64"]
            ]
        }
    ]
]);
exports.WithdrawDepositedTokenSchema = new Map([
    [
        WithdrawDepositedToken,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"],
                ["amount", "u64"]
            ]
        }
    ]
]);
exports.DepositSolSchema = new Map([
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
]);
exports.WithdrawDepositedSolSchema = new Map([
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
]);
exports.WithdrawStreamSolSchema = new Map([
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
]);
exports.InitSolStreamSchema = new Map([
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
]);
exports.PauseSolStreamSchema = new Map([
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
exports.ResumeSolStreamSchema = new Map([
    [
        ResumeSolStream,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
]);
exports.CancelSolStreamSchema = new Map([
    [
        CancelSolStream,
        {
            kind: "struct",
            fields: [
                ["instruction", "u8"]
            ]
        }
    ]
]);
