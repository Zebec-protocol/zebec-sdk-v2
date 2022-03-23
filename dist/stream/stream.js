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
exports.TokenStream = exports.NativeStream = void 0;
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var constants_1 = require("../constants");
var INSTRUCTIONS = __importStar(require("./instructions"));
var ZebecStream = /** @class */ (function () {
    function ZebecStream(walletProvider, rpcUrl, commitment) {
        this._programId = new web3_js_1.PublicKey(constants_1.ZEBEC_PROGRAM_ID);
        this.walletProvider = walletProvider;
        this._connection = new web3_js_1.Connection(rpcUrl, this._commitment);
        this._commitment = commitment;
    }
    ZebecStream.prototype._signAndConfirm = function (tx, commitment) {
        if (commitment === void 0) { commitment = "confirmed"; }
        return __awaiter(this, void 0, void 0, function () {
            var signed, signature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.walletProvider.signTransaction(tx)];
                    case 1:
                        signed = _a.sent();
                        return [4 /*yield*/, this._connection.sendRawTransaction(signed.serialize())];
                    case 2:
                        signature = _a.sent();
                        return [4 /*yield*/, this._connection.confirmTransaction(signature, commitment)];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                transactionHash: signature
                            }];
                }
            });
        });
    };
    ZebecStream.prototype._findZebecWalletAccount = function (walletAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([walletAddress.toBuffer()], this._programId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return ZebecStream;
}());
var NativeStream = /** @class */ (function (_super) {
    __extends(NativeStream, _super);
    function NativeStream(walletProvider, rpcUrl, commitment) {
        if (rpcUrl === void 0) { rpcUrl = constants_1.RPC_ENDPOINTS.DEFAULT; }
        if (commitment === void 0) { commitment = "confirmed"; }
        var _this = _super.call(this, walletProvider, rpcUrl, commitment) || this;
        console.log("Native Stream Initialized!", walletProvider, rpcUrl);
        return _this;
    }
    NativeStream.prototype._findWithDrawEscrowAccount = function (walletAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(constants_1.WITHDRAW_SOL_STRING), walletAddress.toBuffer()], this._programId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    NativeStream.prototype.deposit = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, amount, senderAddress, _a, zebecWalletAddress, _, ix, tx, recentHash, res, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sender = data.sender, amount = data.amount;
                        console.log("deposit solana to Zebec Wallet started with: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        return [4 /*yield*/, this._findZebecWalletAccount(senderAddress)];
                    case 1:
                        _a = _b.sent(), zebecWalletAddress = _a[0], _ = _a[1];
                        return [4 /*yield*/, INSTRUCTIONS.createDepositSolInstruction(senderAddress, zebecWalletAddress, amount, this._programId)];
                    case 2:
                        ix = _b.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getRecentBlockhash()];
                    case 3:
                        recentHash = _b.sent();
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4 /*yield*/, this._signAndConfirm(tx)];
                    case 5:
                        res = _b.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2 /*return*/, {
                                status: "success",
                                message: "deposit successful",
                                data: __assign({}, res)
                            }];
                    case 6:
                        e_1 = _b.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_1,
                                data: null
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    NativeStream.prototype.withdrawDepositedSol = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, amount, senderAddress, _a, zebecWalletAddress, __, _b, withdrawEscrow, _, ix, tx, recentHash, res, e_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        sender = data.sender, amount = data.amount;
                        console.log("withdraw solana from Zebec Wallet started with: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        return [4 /*yield*/, this._findZebecWalletAccount(senderAddress)];
                    case 1:
                        _a = _c.sent(), zebecWalletAddress = _a[0], __ = _a[1];
                        return [4 /*yield*/, this._findWithDrawEscrowAccount(senderAddress)];
                    case 2:
                        _b = _c.sent(), withdrawEscrow = _b[0], _ = _b[1];
                        return [4 /*yield*/, INSTRUCTIONS.createWithdrawDepositedSolInstruction(senderAddress, zebecWalletAddress, withdrawEscrow, amount, this._programId)];
                    case 3:
                        ix = _c.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getRecentBlockhash()];
                    case 4:
                        recentHash = _c.sent();
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4 /*yield*/, this._signAndConfirm(tx)];
                    case 6:
                        res = _c.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2 /*return*/, {
                                status: "success",
                                message: "withdraw successful",
                                data: __assign({}, res)
                            }];
                    case 7:
                        e_2 = _c.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_2,
                                data: null
                            }];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    NativeStream.prototype.init = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, start_time, end_time, amount, senderAddress, recipientAddress, _a, withdraw_escrow, _, tx_escrow, ix, tx, recentHash, res, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, start_time = data.start_time, end_time = data.end_time, amount = data.amount;
                        console.log("init solana stream data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        return [4 /*yield*/, this._findWithDrawEscrowAccount(senderAddress)];
                    case 1:
                        _a = _b.sent(), withdraw_escrow = _a[0], _ = _a[1];
                        tx_escrow = new web3_js_1.Keypair();
                        return [4 /*yield*/, INSTRUCTIONS.createInitSolStreamInstruction(senderAddress, recipientAddress, tx_escrow, withdraw_escrow, this._programId, start_time, end_time, amount)];
                    case 2:
                        ix = _b.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getRecentBlockhash()];
                    case 3:
                        recentHash = _b.sent();
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        tx.partialSign(tx_escrow);
                        console.log("transaction ix after adding properties: ", tx);
                        return [4 /*yield*/, this._signAndConfirm(tx)];
                    case 5:
                        res = _b.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2 /*return*/, {
                                status: "success",
                                message: "stream started successfully",
                                data: __assign({ pda: tx_escrow.publicKey.toBase58() }, res)
                            }];
                    case 6:
                        e_3 = _b.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_3,
                                data: null
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    NativeStream.prototype.pause = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, pda, senderAddress, recipientAddress, escrowAddress, ix, tx, recentHash, res, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, pda = data.pda;
                        console.log("pause solana stream data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        escrowAddress = new web3_js_1.PublicKey(pda);
                        return [4 /*yield*/, INSTRUCTIONS.createPauseSolStreamInstruction(senderAddress, recipientAddress, escrowAddress, this._programId)];
                    case 1:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getRecentBlockhash()];
                    case 2:
                        recentHash = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4 /*yield*/, this._signAndConfirm(tx)];
                    case 4:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2 /*return*/, {
                                status: "success",
                                message: "stream paused",
                                data: __assign({}, res)
                            }];
                    case 5:
                        e_4 = _a.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_4,
                                data: null
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    NativeStream.prototype.resume = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, pda, senderAddress, recipientAddress, escrowAddress, ix, tx, recentHash, res, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, pda = data.pda;
                        console.log("resume solana stream data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        escrowAddress = new web3_js_1.PublicKey(pda);
                        return [4 /*yield*/, INSTRUCTIONS.createResumeSolStreamInstruction(senderAddress, recipientAddress, escrowAddress, this._programId)];
                    case 1:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getRecentBlockhash()];
                    case 2:
                        recentHash = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4 /*yield*/, this._signAndConfirm(tx)];
                    case 4:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2 /*return*/, {
                                status: "success",
                                message: "stream resumed",
                                data: __assign({}, res)
                            }];
                    case 5:
                        e_5 = _a.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_5,
                                data: null
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    NativeStream.prototype.cancel = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, pda, senderAddress, recipientAddress, escrowAddress, _a, zebecWallet, __, _b, withdrawEscrow, _, ix, tx, recentHash, res, e_6;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, pda = data.pda;
                        console.log("cancel solana stream data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        escrowAddress = new web3_js_1.PublicKey(pda);
                        return [4 /*yield*/, this._findZebecWalletAccount(senderAddress)];
                    case 1:
                        _a = _c.sent(), zebecWallet = _a[0], __ = _a[1];
                        return [4 /*yield*/, this._findWithDrawEscrowAccount(senderAddress)];
                    case 2:
                        _b = _c.sent(), withdrawEscrow = _b[0], _ = _b[1];
                        return [4 /*yield*/, INSTRUCTIONS.createCancelSolStreamInstruction(senderAddress, recipientAddress, escrowAddress, zebecWallet, withdrawEscrow, this._programId)];
                    case 3:
                        ix = _c.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getRecentBlockhash()];
                    case 4:
                        recentHash = _c.sent();
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4 /*yield*/, this._signAndConfirm(tx)];
                    case 6:
                        res = _c.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2 /*return*/, {
                                status: "success",
                                message: "stream canceled",
                                data: __assign({}, res)
                            }];
                    case 7:
                        e_6 = _c.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_6,
                                data: null
                            }];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    NativeStream.prototype.withdraw = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, amount, receiver, pda, senderAddress, recipientAddress, escrowAddress, _a, zebecWalletAddress, _, _b, withdrawEscrowAddress, __, ix, tx, recentHash, res, e_7;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        sender = data.sender, amount = data.amount, receiver = data.receiver, pda = data.pda;
                        console.log("withdraw solana stream data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        escrowAddress = new web3_js_1.PublicKey(pda);
                        return [4 /*yield*/, this._findZebecWalletAccount(senderAddress)];
                    case 1:
                        _a = _c.sent(), zebecWalletAddress = _a[0], _ = _a[1];
                        return [4 /*yield*/, this._findWithDrawEscrowAccount(senderAddress)];
                    case 2:
                        _b = _c.sent(), withdrawEscrowAddress = _b[0], __ = _b[1];
                        return [4 /*yield*/, INSTRUCTIONS.createWithdrawSolStreamInstruction(senderAddress, recipientAddress, escrowAddress, zebecWalletAddress, withdrawEscrowAddress, amount, this._programId)];
                    case 3:
                        ix = _c.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getRecentBlockhash()];
                    case 4:
                        recentHash = _c.sent();
                        _c.label = 5;
                    case 5:
                        _c.trys.push([5, 7, , 8]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4 /*yield*/, this._signAndConfirm(tx)];
                    case 6:
                        res = _c.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2 /*return*/, {
                                status: "success",
                                message: "withdraw successful",
                                data: __assign({}, res)
                            }];
                    case 7:
                        e_7 = _c.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_7,
                                data: null
                            }];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return NativeStream;
}(ZebecStream));
exports.NativeStream = NativeStream;
var TokenStream = /** @class */ (function (_super) {
    __extends(TokenStream, _super);
    function TokenStream(walletProvider, rpcUrl, commitment) {
        if (rpcUrl === void 0) { rpcUrl = constants_1.RPC_ENDPOINTS.DEFAULT; }
        if (commitment === void 0) { commitment = "confirmed"; }
        var _this = _super.call(this, walletProvider, rpcUrl, commitment) || this;
        console.log("Token Stream Initialized!", walletProvider, rpcUrl);
        return _this;
    }
    TokenStream.prototype._findWithDrawEscrowAccount = function (walletAddress, tokenMintAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(constants_1.WITHDRAW_TOKEN_STRING), walletAddress.toBuffer(), tokenMintAddress.toBuffer()], this._programId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    TokenStream.prototype._findAssociatedTokenAddress = function (walletAddress, tokenMintAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([walletAddress.toBuffer(), spl_token_1.TOKEN_PROGRAM_ID.toBuffer(), tokenMintAddress.toBuffer(),], new web3_js_1.PublicKey(constants_1.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID))];
                    case 1: return [2 /*return*/, (_a.sent())[0]];
                }
            });
        });
    };
    TokenStream.prototype.init = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, token, start_time, end_time, amount, senderAddress, recipientAddress, tokenMintAddress, _a, withdrawEscrowAddress, _, escrowAddress, ix, tx, recentHash, res, e_8;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, token = data.token, start_time = data.start_time, end_time = data.end_time, amount = data.amount;
                        console.log("sender token stream data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        tokenMintAddress = new web3_js_1.PublicKey(token);
                        return [4 /*yield*/, this._findWithDrawEscrowAccount(senderAddress, tokenMintAddress)];
                    case 1:
                        _a = _b.sent(), withdrawEscrowAddress = _a[0], _ = _a[1];
                        escrowAddress = new web3_js_1.Keypair();
                        return [4 /*yield*/, INSTRUCTIONS.createInitMultiTokenStreamInstruction(senderAddress, recipientAddress, escrowAddress.publicKey, withdrawEscrowAddress, this._programId, tokenMintAddress, start_time, end_time, amount)];
                    case 2:
                        ix = _b.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getRecentBlockhash()];
                    case 3:
                        recentHash = _b.sent();
                        _b.label = 4;
                    case 4:
                        _b.trys.push([4, 6, , 7]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        tx.partialSign(escrowAddress);
                        console.log("transaction ix after adding properties: ", tx);
                        return [4 /*yield*/, this._signAndConfirm(tx)];
                    case 5:
                        res = _b.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2 /*return*/, {
                                status: "success",
                                message: "initiated token stream",
                                data: __assign({ pda: escrowAddress.publicKey.toBase58() }, res)
                            }];
                    case 6:
                        e_8 = _b.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_8,
                                data: null
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    TokenStream.prototype.pause = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, pda, senderAddress, recipientAddress, escrowAddress, ix, tx, recentHash, res, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, pda = data.pda;
                        console.log("pause token stream data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        escrowAddress = new web3_js_1.PublicKey(pda);
                        return [4 /*yield*/, INSTRUCTIONS.createPauseMultiTokenStreamInstruction(senderAddress, recipientAddress, escrowAddress, this._programId)];
                    case 1:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getRecentBlockhash()];
                    case 2:
                        recentHash = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4 /*yield*/, this._signAndConfirm(tx)];
                    case 4:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2 /*return*/, {
                                status: "success",
                                message: "paused token stream.",
                                data: __assign({}, res)
                            }];
                    case 5:
                        e_9 = _a.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_9,
                                data: null
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TokenStream.prototype.resume = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, pda, senderAddress, recipientAddress, escrowAddress, ix, tx, recentHash, res, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, pda = data.pda;
                        console.log("resume token stream data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        escrowAddress = new web3_js_1.PublicKey(pda);
                        return [4 /*yield*/, INSTRUCTIONS.createResumeMultiTokenStreamInstruction(senderAddress, recipientAddress, escrowAddress, this._programId)];
                    case 1:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getRecentBlockhash()];
                    case 2:
                        recentHash = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4 /*yield*/, this._signAndConfirm(tx)];
                    case 4:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2 /*return*/, {
                                status: "success",
                                message: "resumed token stream.",
                                data: __assign({}, res)
                            }];
                    case 5:
                        e_10 = _a.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_10,
                                data: null
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    TokenStream.prototype.cancel = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, token, pda, senderAddress, recipientAddress, tokenMintAddress, escrowAddress, _a, withdrawEscrowAddress, _, _b, zebecWalletAddress, __, recipientAssociatedTokenAddress, zebecWalletAssociatedTokenAddress, feeAssociatedTokenAddress, ix, tx, recentHash, res, e_11;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, token = data.token, pda = data.pda;
                        console.log("cancel token stream data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        tokenMintAddress = new web3_js_1.PublicKey(token);
                        escrowAddress = new web3_js_1.PublicKey(pda);
                        return [4 /*yield*/, this._findWithDrawEscrowAccount(senderAddress, tokenMintAddress)];
                    case 1:
                        _a = _c.sent(), withdrawEscrowAddress = _a[0], _ = _a[1];
                        return [4 /*yield*/, this._findZebecWalletAccount(senderAddress)];
                    case 2:
                        _b = _c.sent(), zebecWalletAddress = _b[0], __ = _b[1];
                        return [4 /*yield*/, this._findAssociatedTokenAddress(recipientAddress, tokenMintAddress)];
                    case 3:
                        recipientAssociatedTokenAddress = _c.sent();
                        return [4 /*yield*/, this._findAssociatedTokenAddress(zebecWalletAddress, tokenMintAddress)];
                    case 4:
                        zebecWalletAssociatedTokenAddress = _c.sent();
                        return [4 /*yield*/, this._findAssociatedTokenAddress(new web3_js_1.PublicKey(constants_1.FEE_ADDRESS), tokenMintAddress)];
                    case 5:
                        feeAssociatedTokenAddress = _c.sent();
                        return [4 /*yield*/, INSTRUCTIONS.createCancelMultiTokenStreamInstruction(senderAddress, recipientAddress, tokenMintAddress, zebecWalletAddress, escrowAddress, withdrawEscrowAddress, this._programId, recipientAssociatedTokenAddress, zebecWalletAssociatedTokenAddress, feeAssociatedTokenAddress)];
                    case 6:
                        ix = _c.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getRecentBlockhash()];
                    case 7:
                        recentHash = _c.sent();
                        _c.label = 8;
                    case 8:
                        _c.trys.push([8, 10, , 11]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4 /*yield*/, this._signAndConfirm(tx)];
                    case 9:
                        res = _c.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2 /*return*/, {
                                status: "success",
                                message: "canceled token stream.",
                                data: __assign({}, res)
                            }];
                    case 10:
                        e_11 = _c.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_11,
                                data: null
                            }];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    TokenStream.prototype.withdraw = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, token, pda, amount, senderAddress, recipientAddress, tokenMintAddress, escrowAddress, _TOKEN_PROGRAM_ID_, _SYSTEM_RENT, _A_TOKEN, _FEE_ADDRESS, _a, zebecWalletAddress, _, recipientAssociatedTokenAddress, zebecWalletAssociatedTokenAddress, feeAssociatedTokenAddress, _b, withdrawEscrowAddress, __, ix, tx, recentHash, res, e_12;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, token = data.token, pda = data.pda, amount = data.amount;
                        console.log("withdraw token stream data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        tokenMintAddress = new web3_js_1.PublicKey(token);
                        escrowAddress = new web3_js_1.PublicKey(pda);
                        _TOKEN_PROGRAM_ID_ = new web3_js_1.PublicKey(constants_1._TOKEN_PROGRAM_ID);
                        _SYSTEM_RENT = new web3_js_1.PublicKey(constants_1.SYSTEM_RENT);
                        _A_TOKEN = new web3_js_1.PublicKey(constants_1.A_TOKEN);
                        _FEE_ADDRESS = new web3_js_1.PublicKey(constants_1.FEE_ADDRESS);
                        return [4 /*yield*/, this._findZebecWalletAccount(senderAddress)];
                    case 1:
                        _a = _c.sent(), zebecWalletAddress = _a[0], _ = _a[1];
                        return [4 /*yield*/, this._findAssociatedTokenAddress(recipientAddress, tokenMintAddress)];
                    case 2:
                        recipientAssociatedTokenAddress = _c.sent();
                        return [4 /*yield*/, this._findAssociatedTokenAddress(zebecWalletAddress, tokenMintAddress)];
                    case 3:
                        zebecWalletAssociatedTokenAddress = _c.sent();
                        return [4 /*yield*/, this._findAssociatedTokenAddress(_FEE_ADDRESS, tokenMintAddress)];
                    case 4:
                        feeAssociatedTokenAddress = _c.sent();
                        return [4 /*yield*/, this._findWithDrawEscrowAccount(senderAddress, tokenMintAddress)];
                    case 5:
                        _b = _c.sent(), withdrawEscrowAddress = _b[0], __ = _b[1];
                        return [4 /*yield*/, INSTRUCTIONS.createWithdrawMultiTokenStreamInstruction(senderAddress, recipientAddress, zebecWalletAddress, escrowAddress, withdrawEscrowAddress, _TOKEN_PROGRAM_ID_, tokenMintAddress, _SYSTEM_RENT, zebecWalletAssociatedTokenAddress, recipientAssociatedTokenAddress, _A_TOKEN, _FEE_ADDRESS, feeAssociatedTokenAddress, this._programId, amount)];
                    case 6:
                        ix = _c.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getRecentBlockhash()];
                    case 7:
                        recentHash = _c.sent();
                        _c.label = 8;
                    case 8:
                        _c.trys.push([8, 10, , 11]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4 /*yield*/, this._signAndConfirm(tx)];
                    case 9:
                        res = _c.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2 /*return*/, {
                                status: "success",
                                message: "withdraw token stream.",
                                data: __assign({}, res)
                            }];
                    case 10:
                        e_12 = _c.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_12,
                                data: null
                            }];
                    case 11: return [2 /*return*/];
                }
            });
        });
    };
    TokenStream.prototype.deposit = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, token, amount, senderAddress, tokenMintAddress, senderAssociatedTokenAddress, _a, zebecWalletAddress, _, zebecWalletAssociatedTokenAddress, _TOKEN_PROGRAM_ID_, _SYSTEM_RENT, _A_TOKEN, ix, tx, recentHash, res, e_13;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sender = data.sender, token = data.token, amount = data.amount;
                        console.log("deposit token stream data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        tokenMintAddress = new web3_js_1.PublicKey(token);
                        return [4 /*yield*/, this._findAssociatedTokenAddress(senderAddress, tokenMintAddress)];
                    case 1:
                        senderAssociatedTokenAddress = _b.sent();
                        return [4 /*yield*/, this._findZebecWalletAccount(senderAddress)];
                    case 2:
                        _a = _b.sent(), zebecWalletAddress = _a[0], _ = _a[1];
                        return [4 /*yield*/, this._findAssociatedTokenAddress(zebecWalletAddress, tokenMintAddress)];
                    case 3:
                        zebecWalletAssociatedTokenAddress = _b.sent();
                        _TOKEN_PROGRAM_ID_ = new web3_js_1.PublicKey(constants_1._TOKEN_PROGRAM_ID);
                        _SYSTEM_RENT = new web3_js_1.PublicKey(constants_1.SYSTEM_RENT);
                        _A_TOKEN = new web3_js_1.PublicKey(constants_1.A_TOKEN);
                        console.log("Sender Associated Token Address", senderAssociatedTokenAddress);
                        console.log("Zebec Wallet Associated Token Address", zebecWalletAssociatedTokenAddress);
                        return [4 /*yield*/, INSTRUCTIONS.createDepositMultiTokenInstruction(senderAddress, zebecWalletAddress, _TOKEN_PROGRAM_ID_, tokenMintAddress, _SYSTEM_RENT, senderAssociatedTokenAddress, zebecWalletAssociatedTokenAddress, _A_TOKEN, this._programId, amount)];
                    case 4:
                        ix = _b.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getRecentBlockhash()];
                    case 5:
                        recentHash = _b.sent();
                        _b.label = 6;
                    case 6:
                        _b.trys.push([6, 8, , 9]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4 /*yield*/, this._signAndConfirm(tx)];
                    case 7:
                        res = _b.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2 /*return*/, {
                                status: "success",
                                message: "deposited token to zebec wallet.",
                                data: __assign({}, res)
                            }];
                    case 8:
                        e_13 = _b.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_13,
                                data: null
                            }];
                    case 9: return [2 /*return*/];
                }
            });
        });
    };
    TokenStream.prototype.withdrawDepositedToken = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, token, amount, senderAddress, tokenMintAddress, _a, zebecWalletAddress, _, _b, withdrawEscrowAddress, __, senderAssociatedTokenAddress, zebecWalletAssociatedTokenAddress, _TOKEN_PROGRAM_ID_, ix, tx, recentHash, res, e_14;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        sender = data.sender, token = data.token, amount = data.amount;
                        console.log("withdraw deposited token data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        tokenMintAddress = new web3_js_1.PublicKey(token);
                        return [4 /*yield*/, this._findZebecWalletAccount(senderAddress)];
                    case 1:
                        _a = _c.sent(), zebecWalletAddress = _a[0], _ = _a[1];
                        return [4 /*yield*/, this._findWithDrawEscrowAccount(senderAddress, tokenMintAddress)];
                    case 2:
                        _b = _c.sent(), withdrawEscrowAddress = _b[0], __ = _b[1];
                        return [4 /*yield*/, this._findAssociatedTokenAddress(senderAddress, tokenMintAddress)];
                    case 3:
                        senderAssociatedTokenAddress = _c.sent();
                        return [4 /*yield*/, this._findAssociatedTokenAddress(zebecWalletAddress, tokenMintAddress)];
                    case 4:
                        zebecWalletAssociatedTokenAddress = _c.sent();
                        _TOKEN_PROGRAM_ID_ = new web3_js_1.PublicKey(constants_1._TOKEN_PROGRAM_ID);
                        return [4 /*yield*/, INSTRUCTIONS.createWithdrawDepositedTokenInstruction(senderAddress, _TOKEN_PROGRAM_ID_, tokenMintAddress, senderAssociatedTokenAddress, zebecWalletAddress, withdrawEscrowAddress, zebecWalletAssociatedTokenAddress, this._programId, amount)];
                    case 5:
                        ix = _c.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getRecentBlockhash()];
                    case 6:
                        recentHash = _c.sent();
                        _c.label = 7;
                    case 7:
                        _c.trys.push([7, 9, , 10]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4 /*yield*/, this._signAndConfirm(tx)];
                    case 8:
                        res = _c.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2 /*return*/, {
                                status: "success",
                                message: "withdrawn token from zebec wallet.",
                                data: __assign({}, res)
                            }];
                    case 9:
                        e_14 = _c.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_14,
                                data: null
                            }];
                    case 10: return [2 /*return*/];
                }
            });
        });
    };
    return TokenStream;
}(ZebecStream));
exports.TokenStream = TokenStream;
