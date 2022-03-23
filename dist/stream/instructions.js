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
exports.createWithdrawSolStreamInstruction = exports.createWithdrawDepositedSolInstruction = exports.createDepositSolInstruction = exports.createCancelSolStreamInstruction = exports.createResumeSolStreamInstruction = exports.createPauseSolStreamInstruction = exports.createInitSolStreamInstruction = exports.createWithdrawMultiTokenStreamInstruction = exports.createCancelMultiTokenStreamInstruction = exports.createResumeMultiTokenStreamInstruction = exports.createPauseMultiTokenStreamInstruction = exports.createInitMultiTokenStreamInstruction = void 0;
var buffer_1 = require("buffer");
var borsh_1 = require("borsh");
var web3_js_1 = require("@solana/web3.js");
var SCHEMA = __importStar(require("./schema"));
var constants_1 = require("../constants");
var createInitMultiTokenStreamInstruction = function (sender, recipient, tx_escrow, withdraw_escrow, programId, tokenMintAddress, start_time, end_time, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var _TOKEN_PROGRAM_ID_, keys, ixData;
    return __generator(this, function (_a) {
        _TOKEN_PROGRAM_ID_ = new web3_js_1.PublicKey(constants_1._TOKEN_PROGRAM_ID);
        keys = [
            { pubkey: sender, isSigner: true, isWritable: true },
            { pubkey: recipient, isSigner: false, isWritable: true },
            { pubkey: tx_escrow, isSigner: true, isWritable: true },
            { pubkey: withdraw_escrow, isSigner: false, isWritable: true },
            { pubkey: _TOKEN_PROGRAM_ID_, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: tokenMintAddress, isSigner: false, isWritable: false },
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.INIT_TOKEN_STREAM,
            start_time: start_time,
            end_time: end_time,
            amount: amount
        };
        return [2 /*return*/, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: buffer_1.Buffer.from((0, borsh_1.serialize)(SCHEMA.InitMultiTokenStreamSchema, new SCHEMA.InitMultiTokenStream(ixData)))
            })];
    });
}); };
exports.createInitMultiTokenStreamInstruction = createInitMultiTokenStreamInstruction;
var createPauseMultiTokenStreamInstruction = function (sender, recipient, tx_escrow, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: sender, isSigner: true, isWritable: true },
            { pubkey: recipient, isSigner: false, isWritable: true },
            { pubkey: tx_escrow, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.PAUSE_TOKEN_STREAM
        };
        return [2 /*return*/, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: buffer_1.Buffer.from((0, borsh_1.serialize)(SCHEMA.PauseMultiTokenStreamSchema, new SCHEMA.PauseMultiTokenStream(ixData)))
            })];
    });
}); };
exports.createPauseMultiTokenStreamInstruction = createPauseMultiTokenStreamInstruction;
var createResumeMultiTokenStreamInstruction = function (sender, recipient, tx_escrow, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: sender, isSigner: true, isWritable: true },
            { pubkey: recipient, isSigner: false, isWritable: true },
            { pubkey: tx_escrow, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.RESUME_TOKEN_STREAM
        };
        return [2 /*return*/, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: buffer_1.Buffer.from((0, borsh_1.serialize)(SCHEMA.ResumeSolStreamSchema, new SCHEMA.ResumeMultiTokenStream(ixData)))
            })];
    });
}); };
exports.createResumeMultiTokenStreamInstruction = createResumeMultiTokenStreamInstruction;
var createCancelMultiTokenStreamInstruction = function (sender, recipient, token, zebecVaultAddress, tx_escrow, withdraw_data, programId, recipientAssociatedTokenAddress, txEscrowAssociatedTokenAddress, feeAssociatedTokenAddress) { return __awaiter(void 0, void 0, void 0, function () {
    var FEE_ACCOUNT_ADDRESS, A_TOKEN_Address, SYSTEM_RENT_ADDRESS, TOKEN_PROGRAM_ID_ADDRESS, keys, ixData;
    return __generator(this, function (_a) {
        FEE_ACCOUNT_ADDRESS = new web3_js_1.PublicKey(constants_1.FEE_ADDRESS);
        A_TOKEN_Address = new web3_js_1.PublicKey(constants_1.A_TOKEN);
        SYSTEM_RENT_ADDRESS = new web3_js_1.PublicKey(constants_1.SYSTEM_RENT);
        TOKEN_PROGRAM_ID_ADDRESS = new web3_js_1.PublicKey(constants_1._TOKEN_PROGRAM_ID);
        keys = [
            { pubkey: sender, isSigner: true, isWritable: true },
            { pubkey: recipient, isSigner: false, isWritable: true },
            { pubkey: zebecVaultAddress, isSigner: false, isWritable: false },
            { pubkey: tx_escrow, isSigner: false, isWritable: true },
            { pubkey: withdraw_data, isSigner: false, isWritable: true },
            { pubkey: TOKEN_PROGRAM_ID_ADDRESS, isSigner: false, isWritable: false },
            { pubkey: token, isSigner: false, isWritable: true },
            { pubkey: SYSTEM_RENT_ADDRESS, isSigner: false, isWritable: false },
            { pubkey: recipientAssociatedTokenAddress, isSigner: false, isWritable: true },
            { pubkey: txEscrowAssociatedTokenAddress, isSigner: false, isWritable: true },
            { pubkey: A_TOKEN_Address, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: FEE_ACCOUNT_ADDRESS, isSigner: false, isWritable: true },
            { pubkey: feeAssociatedTokenAddress, isSigner: false, isWritable: true },
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.CANCEL_TOKEN_STREAM
        };
        return [2 /*return*/, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: buffer_1.Buffer.from((0, borsh_1.serialize)(SCHEMA.CancelMultiTokenStreamSchema, new SCHEMA.CancelMultiTokenStream(ixData)))
            })];
    });
}); };
exports.createCancelMultiTokenStreamInstruction = createCancelMultiTokenStreamInstruction;
var createWithdrawMultiTokenStreamInstruction = function (senderAddress, recipientAddress, zebecWalletAddress, escrowAddress, withdrawEscrowAddress, _TOKEN_PROGRAM_ID_, tokenMintAddress, _SYSTEM_RENT, zebecWalletAssociatedTokenAddress, recipientAssociatedTokenAddress, _A_TOKEN, _FEE_ADDRESS, feeAssociatedTokenAddress, programId, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: false, isWritable: true },
            { pubkey: recipientAddress, isSigner: true, isWritable: true },
            { pubkey: zebecWalletAddress, isSigner: false, isWritable: true },
            { pubkey: escrowAddress, isSigner: false, isWritable: true },
            { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: _TOKEN_PROGRAM_ID_, isSigner: false, isWritable: false },
            { pubkey: tokenMintAddress, isSigner: false, isWritable: true },
            { pubkey: _SYSTEM_RENT, isSigner: false, isWritable: false },
            { pubkey: zebecWalletAssociatedTokenAddress, isSigner: false, isWritable: true },
            { pubkey: recipientAssociatedTokenAddress, isSigner: false, isWritable: true },
            { pubkey: _A_TOKEN, isSigner: false, isWritable: false },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: _FEE_ADDRESS, isSigner: false, isWritable: true },
            { pubkey: feeAssociatedTokenAddress, isSigner: false, isWritable: true },
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.WITHDRAW_TOKEN_STREAM,
            amount: amount
        };
        return [2 /*return*/, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: buffer_1.Buffer.from((0, borsh_1.serialize)(SCHEMA.WithdrawMultiTokenStreamSchema, new SCHEMA.WithdrawMultiTokenStream(__assign({}, ixData))))
            })];
    });
}); };
exports.createWithdrawMultiTokenStreamInstruction = createWithdrawMultiTokenStreamInstruction;
var createInitSolStreamInstruction = function (sender, receipient, tx_escrow, withdraw_escrow, programId, start_time, end_time, amount) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: sender, isSigner: true, isWritable: true },
            { pubkey: receipient, isSigner: false, isWritable: true },
            { pubkey: tx_escrow.publicKey, isSigner: true, isWritable: true },
            { pubkey: withdraw_escrow, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.INIIT_SOL_STREAM,
            start_time: start_time,
            end_time: end_time,
            amount: (amount * web3_js_1.LAMPORTS_PER_SOL).toString()
        };
        return [2 /*return*/, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: buffer_1.Buffer.from((0, borsh_1.serialize)(SCHEMA.InitSolStreamSchema, new SCHEMA.InitSolStream(ixData)))
            })];
    });
}); };
exports.createInitSolStreamInstruction = createInitSolStreamInstruction;
var createPauseSolStreamInstruction = function (sender, recipient, tx_escrow, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: sender, isSigner: true, isWritable: true },
            { pubkey: recipient, isSigner: false, isWritable: true },
            { pubkey: tx_escrow, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.PAUSE_SOL_STREAM
        };
        return [2 /*return*/, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: buffer_1.Buffer.from((0, borsh_1.serialize)(SCHEMA.PauseSolStreamSchema, new SCHEMA.PauseSolStream(ixData)))
            })];
    });
}); };
exports.createPauseSolStreamInstruction = createPauseSolStreamInstruction;
var createResumeSolStreamInstruction = function (sender, recipient, tx_escrow, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: sender, isSigner: true, isWritable: true },
            { pubkey: recipient, isSigner: false, isWritable: true },
            { pubkey: tx_escrow, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.RESUME_SOL_STREAM
        };
        return [2 /*return*/, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: buffer_1.Buffer.from((0, borsh_1.serialize)(SCHEMA.ResumeSolStreamSchema, new SCHEMA.ResumeSolStream(ixData)))
            })];
    });
}); };
exports.createResumeSolStreamInstruction = createResumeSolStreamInstruction;
var createCancelSolStreamInstruction = function (sender, recipient, tx_escrow, zebecWallet, withdrawEscrow, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var CANCEL_FEE_ACCOUNT, keys, ixData;
    return __generator(this, function (_a) {
        CANCEL_FEE_ACCOUNT = new web3_js_1.PublicKey(constants_1.FEE_ADDRESS);
        keys = [
            { pubkey: sender, isSigner: true, isWritable: true },
            { pubkey: recipient, isSigner: false, isWritable: true },
            { pubkey: zebecWallet, isSigner: false, isWritable: true },
            { pubkey: tx_escrow, isSigner: false, isWritable: true },
            { pubkey: withdrawEscrow, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: CANCEL_FEE_ACCOUNT, isSigner: false, isWritable: true }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.CANCEL_SOL_STREAM
        };
        return [2 /*return*/, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: buffer_1.Buffer.from((0, borsh_1.serialize)(SCHEMA.CancelSolStreamSchema, new SCHEMA.CancelSolStream(ixData)))
            })];
    });
}); };
exports.createCancelSolStreamInstruction = createCancelSolStreamInstruction;
var createDepositSolInstruction = function (sender, zebecWalletAddress, amount, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: sender, isSigner: true, isWritable: true },
            { pubkey: zebecWalletAddress, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.DEPOSIT_SOL,
            amount: (amount * web3_js_1.LAMPORTS_PER_SOL).toString()
        };
        return [2 /*return*/, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: buffer_1.Buffer.from((0, borsh_1.serialize)(SCHEMA.DepositSolSchema, new SCHEMA.DepositSol(ixData)))
            })];
    });
}); };
exports.createDepositSolInstruction = createDepositSolInstruction;
var createWithdrawDepositedSolInstruction = function (senderAddress, zebecWalletAddress, withdrawEscrowAddress, amount, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var keys, ixData;
    return __generator(this, function (_a) {
        keys = [
            { pubkey: senderAddress, isSigner: true, isWritable: true },
            { pubkey: zebecWalletAddress, isSigner: false, isWritable: true },
            { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.WITHDRAW_SOL,
            amount: (amount * web3_js_1.LAMPORTS_PER_SOL).toString()
        };
        return [2 /*return*/, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: buffer_1.Buffer.from((0, borsh_1.serialize)(SCHEMA.WithdrawDepositedSolSchema, new SCHEMA.WithdrawDepositedSol(ixData)))
            })];
    });
}); };
exports.createWithdrawDepositedSolInstruction = createWithdrawDepositedSolInstruction;
var createWithdrawSolStreamInstruction = function (senderAddress, receipientAddress, txEscrowAddress, zebecWalletAddress, withdrawEscrowAddress, amount, programId) { return __awaiter(void 0, void 0, void 0, function () {
    var feeAddress, keys, ixData;
    return __generator(this, function (_a) {
        feeAddress = new web3_js_1.PublicKey(constants_1.FEE_ADDRESS);
        keys = [
            { pubkey: senderAddress, isSigner: false, isWritable: true },
            { pubkey: receipientAddress, isSigner: true, isWritable: true },
            { pubkey: zebecWalletAddress, isSigner: false, isWritable: true },
            { pubkey: txEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: withdrawEscrowAddress, isSigner: false, isWritable: true },
            { pubkey: web3_js_1.SystemProgram.programId, isSigner: false, isWritable: false },
            { pubkey: feeAddress, isSigner: false, isWritable: true }
        ];
        ixData = {
            instruction: constants_1.INSTRUCTION.WITHDRAW_SOL_STREAM,
            amount: (amount * web3_js_1.LAMPORTS_PER_SOL).toString()
        };
        return [2 /*return*/, new web3_js_1.TransactionInstruction({
                keys: keys,
                programId: programId,
                data: buffer_1.Buffer.from((0, borsh_1.serialize)(SCHEMA.WithdrawStreamSolSchema, new SCHEMA.WithdrawStreamSol(ixData)))
            })];
    });
}); };
exports.createWithdrawSolStreamInstruction = createWithdrawSolStreamInstruction;
