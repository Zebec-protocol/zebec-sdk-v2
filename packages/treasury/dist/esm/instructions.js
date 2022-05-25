"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createMultiSigTokenInitInstruction = exports.createMultiSigTokenWithdrawInstruction = exports.createMultiSigTokenResumeInstruction = exports.createMultiSigTokenCancelInstruction = exports.createMultiSigTokenPauseInstruction = exports.createMultiSigTokenRejectInstruction = exports.createMultiSigTokenSignInstruction = exports.createMultiSigDepositTokenInstruction = exports.createMultiSigInitInstantInstruction = exports.createMultiSigRejectInstantInstruction = exports.createMultiSigSignInstantInstruction = exports.createMultiSigWithdrawInstruction = exports.createMultiSigResumeInstruction = exports.createMultiSigCancelInstruction = exports.createMultiSigPauseInstruction = exports.createMultiSigInitInstruction = exports.createMultiSigRejectSignInstruction = exports.createMultiSigSignInstruction = exports.createMultiSigDepositInstruction = exports.createMultiSigSafeInstruction = void 0;
var web3_js_1 = require("@solana/web3.js");
var borsh_1 = require("borsh");
var constants_1 = require("./constants");
var SCHEMA = __importStar(require("./schema"));
var createMultiSigSafeInstruction = function (senderAddress, escrowAddress, withdrawEscrowAddress, programId, whiteList) { return __awaiter(void 0, void 0, void 0, function () {
    var signers, m, SYSTEM_PROGRAM, keys, ixData;
    return __generator(this, function (_a) {
        signers = whiteList.signers, m = whiteList.m;
        SYSTEM_PROGRAM = new web3_js_1.PublicKey("11111111111111111111111111111111");
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: escrowAddress, isSigner: true, isWritable: true },
            { pubkey: SYSTEM_PROGRAM, isSigner: false, isWritable: false },
            { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.CREATE_WHITELIST,
            signers: signers,
            m: m,
            multisig_safe: new web3_js_1.PublicKey("J75jd3kjsABQSDrEdywcyhmbq8eHDowfW9xtEWsVALy9")
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigSafeSchema, new SCHEMA.MultiSigSafe(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigSafeInstruction = createMultiSigSafeInstruction;
var createMultiSigDepositInstruction = function (senderAddress, zebecWalletAddress, zebecSafeAddress, escrowAddress, withdrawEscrowAddress, programId, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: zebecWalletAddress, isSigner: false, isWritable: true },
            { pubkey: zebecSafeAddress, isSigner: false, isWritable: true },
            { pubkey: escrowAddress, isSigner: false, isWritable: true },
            { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.SWAP_SOL,
            amount: (amount * web3_js_1.LAMPORTS_PER_SOL).toString()
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigDepositSchema, new SCHEMA.MultiSigDeposit(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigDepositInstruction = createMultiSigDepositInstruction;
var createMultiSigSignInstruction = function (senderAddress, txEscrowAddress, zebecWalletEscrowAddress, withdrawEscrowAddress, programId, signer) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.SIGNED_BY,
            signed_by: signer
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigSignSchema, new SCHEMA.MultiSigSign(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigSignInstruction = createMultiSigSignInstruction;
var createMultiSigRejectSignInstruction = function (senderAddress, txEscrowAddress, zebecWalletEscrowAddress, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.REJECT_SOL_STREAM_MULTISIG
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigRejectSchema, new SCHEMA.MultiSigReject(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigRejectSignInstruction = createMultiSigRejectSignInstruction;
var createMultiSigInitInstruction = function (senderAddress, recipientAddress, zebecWalletEscrowAddress, escrowAddress, programId, start_time, end_time, amount, signers) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: recipientAddress, isSigner: false, isWritable: true },
            { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: escrowAddress, isSigner: true, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.INIT_SOL_STREAM_MULTISIG,
            start_time: start_time,
            end_time: end_time,
            paused: 0,
            withdraw_limit: 0,
            amount: amount,
            sender: senderAddress.toBase58(),
            recipient: recipientAddress.toBase58(),
            signed_by: signers,
            multisig_safe: new web3_js_1.PublicKey("J75jd3kjsABQSDrEdywcyhmbq8eHDowfW9xtEWsVALy9"),
            can_cancel: 1
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigInitSchema, new SCHEMA.MultiSigInit(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigInitInstruction = createMultiSigInitInstruction;
var createMultiSigPauseInstruction = function (senderAddress, recipientAddress, txEscrowAddress, zebecWalletEscrowAddress, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: recipientAddress, isSigner: false, isWritable: true },
            { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.PAUSE_SOL_STREAM_MULTISIG
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigPauseSchema, new SCHEMA.MultiSigPause(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigPauseInstruction = createMultiSigPauseInstruction;
var createMultiSigCancelInstruction = function (senderAddress, recipientAddress, zebecSafeAddress, txEscrowAddress, zebecWalletEscrowAddress, withdrawEscrowAddress, _FEE_ADDRESS, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: recipientAddress, isSigner: false, isWritable: true },
            { pubkey: zebecSafeAddress, isSigner: false, isWritable: true },
            { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: _FEE_ADDRESS, isSigner: false, isWritable: true }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.CANCEL_SOL_STREAM_MULTISIG
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigCancelSchema, new SCHEMA.MultiSigCancel(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigCancelInstruction = createMultiSigCancelInstruction;
var createMultiSigResumeInstruction = function (senderAddress, recipientAddress, txEscrowAddress, zebecWalletEscrowAddress, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: recipientAddress, isSigner: false, isWritable: true },
            { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.RESUME_SOL_STREAM_MULTISIG
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigResumeSchema, new SCHEMA.MultiSigResume(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigResumeInstruction = createMultiSigResumeInstruction;
var createMultiSigWithdrawInstruction = function (senderAddress, recipientAddress, zebecSafeAddress, txEscrowAddress, zebecWalletEscrowAddress, withdrawEscrowAddress, _FEE_ADDRESS, programId, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: recipientAddress, isSigner: false, isWritable: true },
            { pubkey: zebecSafeAddress, isSigner: false, isWritable: true },
            { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: _FEE_ADDRESS, isSigner: false, isWritable: true },
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.WITHDRAW_SOL_STREAM_MULTISIG,
            amount: (amount * web3_js_1.LAMPORTS_PER_SOL).toString()
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigWithdrawSchema, new SCHEMA.MultiSigWithdraw(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigWithdrawInstruction = createMultiSigWithdrawInstruction;
var createMultiSigSignInstantInstruction = function (senderAddress, recipientAddress, zebecSafeAddress, zebecWalletEscrowAddress, txEscrowAddress, programId, signed_by) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: recipientAddress, isSigner: false, isWritable: true },
            { pubkey: zebecSafeAddress, isSigner: false, isWritable: true },
            { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: true }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.SIGNED_BY_TRANSER_SOL,
            signed_by: signed_by
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigSignInstantSchema, new SCHEMA.MultiSigSignInstant(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigSignInstantInstruction = createMultiSigSignInstantInstruction;
var createMultiSigRejectInstantInstruction = function (senderAddress, zebecWalletEscrowAddress, txEscrowAddress, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: false },
            { pubkey: txEscrowAddress, isSigner: false, isWritable: true }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.REJECT_TRANSFER_SOL
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigRejectInstantSchema, new SCHEMA.MultiSigRejectInstant(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigRejectInstantInstruction = createMultiSigRejectInstantInstruction;
var createMultiSigInitInstantInstruction = function (senderAddress, recipientAddress, zebecWalletEscrowAddress, escrowAddress, programId, amount, signer) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: recipientAddress, isSigner: false, isWritable: true },
            { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: escrowAddress, isSigner: true, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.INSTANT_SOL_TRANSFER,
            amount: amount,
            sender: senderAddress.toBase58(),
            recipient: recipientAddress.toBase58(),
            signed_by: signer,
            multisig_safe: new web3_js_1.PublicKey("J75jd3kjsABQSDrEdywcyhmbq8eHDowfW9xtEWsVALy9")
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigInitInstantSchema, new SCHEMA.MultiSigInitInstant(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigInitInstantInstruction = createMultiSigInitInstantInstruction;
var createMultiSigDepositTokenInstruction = function (senderAddress, zebecSafeAddress, zebecWalletEscrowAddress, TOKEN_PROGRAM_ADDRESS, tokenMintAddress, senderAssociatedAddress, zebecWalletAddress, withdrawEscrowAddress, escrowAssociatedAddress, zebecWalletAssociatedAddress, SYSTEM_RENT_ADDRESS, SPL_ASSOCIATED_TOKEN_ADDRESS, programId, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
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
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.SWAP_TOKEN,
            amount: (amount * web3_js_1.LAMPORTS_PER_SOL).toString()
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigDepositTokenSchema, new SCHEMA.MultiSigDepositToken(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigDepositTokenInstruction = createMultiSigDepositTokenInstruction;
var createMultiSigTokenSignInstruction = function (senderAddress, txEscrowAddress, zebecWalletEscrowAddress, withdrawEscrowAddress, programId, signer) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: zebecWalletEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.SIGNED_BY_TOKEN_MULTISIG,
            signed_by: signer
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigTokenSignSchema, new SCHEMA.MultiSigTokenSign(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigTokenSignInstruction = createMultiSigTokenSignInstruction;
var createMultiSigTokenRejectInstruction = function (senderAddress, escrowAddress, vaultEscrowAddress, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: false, isWritable: true },
            { pubkey: escrowAddress, isSigner: false, isWritable: false },
            { pubkey: vaultEscrowAddress, isSigner: false, isWritable: true }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.REJECT_TOKEN_STREAM_MULTISIG
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigTokenRejectSchema, new SCHEMA.MultiSigTokenReject(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigTokenRejectInstruction = createMultiSigTokenRejectInstruction;
var createMultiSigTokenPauseInstruction = function (senderAddress, recipientAddress, txEscrowAddress, vaultEscrowAddress, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: recipientAddress, isSigner: false, isWritable: true },
            { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: vaultEscrowAddress, isSigner: false, isWritable: true }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.PAUSE_TOKEN_STREAM_MULTISIG
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigTokenPauseSchema, new SCHEMA.MultiSigTokenPause(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigTokenPauseInstruction = createMultiSigTokenPauseInstruction;
var createMultiSigTokenCancelInstruction = function (senderAddress, recipientAddress, multisigVaultAddress, txEscrowAddress, vaultEscrowAddress, withdrawEscrowAddress, TOKEN_PROGRAM_ADDRESS, tokenMintAddress, SYSTEM_RENT_ADDRESS, recipientAssociatedAddress, escrowAssociatedAddress, SPL_ASSOCIATED_TOKEN_ADDRESS, feeAddress, feeAssociatedAddress, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: recipientAddress, isSigner: false, isWritable: true },
            { pubkey: multisigVaultAddress, isSigner: false, isWritable: true },
            { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: vaultEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: TOKEN_PROGRAM_ADDRESS, isSigner: false, isWritable: false },
            { pubkey: tokenMintAddress, isSigner: false, isWritable: true },
            { pubkey: SYSTEM_RENT_ADDRESS, isSigner: false, isWritable: false },
            { pubkey: recipientAssociatedAddress, isSigner: false, isWritable: true },
            { pubkey: escrowAssociatedAddress, isSigner: false, isWritable: true },
            { pubkey: SPL_ASSOCIATED_TOKEN_ADDRESS, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: feeAddress, isSigner: false, isWritable: true },
            { pubkey: feeAssociatedAddress, isSigner: false, isWritable: true }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.CANCEL_TOKEN_STREAM_MULTISIG
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigTokenCancelSchema, new SCHEMA.MultiSigTokenCancel(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigTokenCancelInstruction = createMultiSigTokenCancelInstruction;
var createMultiSigTokenResumeInstruction = function (senderAddress, recipientAddress, txEscrowAddress, vaultEscrowAddress, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: recipientAddress, isSigner: false, isWritable: true },
            { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: vaultEscrowAddress, isSigner: false, isWritable: true }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.RESUME_TOKEN_STREAM_MULTISIG
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigTokenResumeSchema, new SCHEMA.MultiSigTokenResume(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigTokenResumeInstruction = createMultiSigTokenResumeInstruction;
var createMultiSigTokenWithdrawInstruction = function (senderAddress, recipientAddress, multisigVaultAddress, vaultEscrowAddress, txEscrowAddress, withdrawEscrowAddress, TOKEN_PROGRAM_ADDRESS, tokenMintAddress, SYSTEM_RENT_ADDRESS, escrowAssociatedAddress, recipientAssociatedAddress, SPL_ASSOCIATED_TOKEN_ADDRESS, feeAddress, feeAssociatedAddress, programId, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: false, isWritable: true },
            { pubkey: recipientAddress, isSigner: true, isWritable: true },
            { pubkey: multisigVaultAddress, isSigner: false, isWritable: true },
            { pubkey: vaultEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: TOKEN_PROGRAM_ADDRESS, isSigner: false, isWritable: false },
            { pubkey: tokenMintAddress, isSigner: false, isWritable: false },
            { pubkey: SYSTEM_RENT_ADDRESS, isSigner: false, isWritable: false },
            { pubkey: escrowAssociatedAddress, isSigner: false, isWritable: true },
            { pubkey: recipientAssociatedAddress, isSigner: false, isWritable: true },
            { pubkey: SPL_ASSOCIATED_TOKEN_ADDRESS, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: feeAddress, isSigner: false, isWritable: true },
            { pubkey: feeAssociatedAddress, isSigner: false, isWritable: true }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.WITHDRAW_TOKEN_STREAM_MULTISIG,
            amount: (amount * web3_js_1.LAMPORTS_PER_SOL).toString()
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigTokenWithdrawSchema, new SCHEMA.MultiSigTokenWithdraw(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigTokenWithdrawInstruction = createMultiSigTokenWithdrawInstruction;
var createMultiSigTokenInitInstruction = function (senderAddress, recipientAddress, escrowAddress, vaultEscrowAddress, TOKEN_PROGRAM_ADDRESS, tokenMintAddress, programId, start_time, end_time, amount, paused, withdraw_limit) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, signers, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: recipientAddress, isSigner: false, isWritable: false },
            { pubkey: escrowAddress, isSigner: true, isWritable: true },
            { pubkey: vaultEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: TOKEN_PROGRAM_ADDRESS, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: tokenMintAddress, isSigner: false, isWritable: false }
        ];
        signers = [
            new SCHEMA.Signer({ address: senderAddress, counter: 0 })
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.INIT_TOKEN_STREAM_MULTISIG,
            start_time: start_time,
            end_time: end_time,
            paused: paused,
            withdraw_limit: withdraw_limit,
            amount: amount,
            senderAddress: senderAddress,
            recipientAddress: recipientAddress,
            token_mint: new web3_js_1.PublicKey("J75jd3kjsABQSDrEdywcyhmbq8eHDowfW9xtEWsVALy9"),
            signed_by: signers,
            multisig_safe: new web3_js_1.PublicKey("J75jd3kjsABQSDrEdywcyhmbq8eHDowfW9xtEWsVALy9")
        };
        return [2, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: Buffer.from((0, borsh_1.serialize)(SCHEMA.MultiSigTokenInitSchema, new SCHEMA.MultiSigTokenInit(__assign({}, ixData))))
            })];
    });
}); };
exports.createMultiSigTokenInitInstruction = createMultiSigTokenInitInstruction;
