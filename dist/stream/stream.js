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
exports.StreamNative = exports.BaseStream = void 0;
var web3_js_1 = require("@solana/web3.js");
var constants_1 = require("../constants");
var INSTRUCTIONS = __importStar(require("./instructions"));
var BaseStream = /** @class */ (function () {
    function BaseStream(walletProvider, rpcUrl, commitment) {
        this._programId = new web3_js_1.PublicKey(constants_1.ZEBEC_PROGRAM_ID);
        this.walletProvider = walletProvider;
        this._connection = new web3_js_1.Connection(rpcUrl, this._commitment);
        this._commitment = commitment;
    }
    // TODO: add return type
    BaseStream.prototype._signAndConfirm = function (tx, commitment) {
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
    BaseStream.prototype._findZebecWalletAccount = function (walletAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([walletAddress.toBuffer()], this._programId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    return BaseStream;
}());
exports.BaseStream = BaseStream;
// TODO: Add Data type
var StreamNative = /** @class */ (function (_super) {
    __extends(StreamNative, _super);
    function StreamNative(walletProvider, rpcUrl, commitment) {
        if (rpcUrl === void 0) { rpcUrl = constants_1.RPC_ENDPOINTS.DEFAULT; }
        if (commitment === void 0) { commitment = "confirmed"; }
        var _this = _super.call(this, walletProvider, rpcUrl, commitment) || this;
        console.log("Native Stream Initialized!", walletProvider, rpcUrl);
        return _this;
    }
    StreamNative.prototype._findWithDrawEscrowAccount = function (sender) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, web3_js_1.PublicKey.findProgramAddress([Buffer.from(constants_1.WITHDRAW_SOL_STRING), sender.toBuffer()], this._programId)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    StreamNative.prototype.init = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, recipient, start_time, end_time, amount, senderAddress, receipientAddress, _a, withdraw_escrow, _, tx_escrow, ix, tx, recentHash, res, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        sender = data.sender, recipient = data.recipient, start_time = data.start_time, end_time = data.end_time, amount = data.amount;
                        console.log("init solana stream data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        receipientAddress = new web3_js_1.PublicKey(recipient);
                        return [4 /*yield*/, this._findWithDrawEscrowAccount(sender)];
                    case 1:
                        _a = _b.sent(), withdraw_escrow = _a[0], _ = _a[1];
                        tx_escrow = new web3_js_1.Keypair();
                        return [4 /*yield*/, INSTRUCTIONS.createInitSolStreamInstruction(senderAddress, receipientAddress, tx_escrow, withdraw_escrow, this._programId, start_time, end_time, amount)];
                    case 2:
                        ix = _b.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getLatestBlockhash()];
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
                                message: "transaction success",
                                data: __assign({ pda: tx_escrow.publicKey.toBase58() }, res)
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
    StreamNative.prototype.pause = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, recipient, tx_escrow, senderAddress, receipientAddress, escrowAddress, ix, tx, recentHash, res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, recipient = data.recipient, tx_escrow = data.tx_escrow;
                        senderAddress = new web3_js_1.PublicKey(sender);
                        receipientAddress = new web3_js_1.PublicKey(recipient);
                        escrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        return [4 /*yield*/, INSTRUCTIONS.createPauseSolStreamInstruction(senderAddress, receipientAddress, escrowAddress, this._programId)];
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
                                message: "transaction success",
                                data: __assign({}, res)
                            }];
                    case 5:
                        e_2 = _a.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_2,
                                data: null
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    StreamNative.prototype.resume = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, recipient, tx_escrow, senderAddress, receipientAddress, escrowAddress, ix, tx, recentHash, res, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, recipient = data.recipient, tx_escrow = data.tx_escrow;
                        senderAddress = new web3_js_1.PublicKey(sender);
                        receipientAddress = new web3_js_1.PublicKey(recipient);
                        escrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        return [4 /*yield*/, INSTRUCTIONS.createResumeSolStreamInstruction(senderAddress, receipientAddress, escrowAddress, this._programId)];
                    case 1:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getLatestBlockhash()];
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
                                message: "transaction success",
                                data: __assign({}, res)
                            }];
                    case 5:
                        e_3 = _a.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_3,
                                data: null
                            }];
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    StreamNative.prototype.cancel = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, recipient, tx_escrow, senderAddress, receipientAddress, escrowAddress, _a, zebecWallet, __, _b, withdrawEscrow, _, ix, tx, recentHash, res, e_4;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        sender = data.sender, recipient = data.recipient, tx_escrow = data.tx_escrow;
                        senderAddress = new web3_js_1.PublicKey(sender);
                        receipientAddress = new web3_js_1.PublicKey(recipient);
                        escrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        return [4 /*yield*/, this._findZebecWalletAccount(sender)];
                    case 1:
                        _a = _c.sent(), zebecWallet = _a[0], __ = _a[1];
                        return [4 /*yield*/, this._findWithDrawEscrowAccount(sender)];
                    case 2:
                        _b = _c.sent(), withdrawEscrow = _b[0], _ = _b[1];
                        return [4 /*yield*/, INSTRUCTIONS.createCancelSolStreamInstruction(senderAddress, receipientAddress, escrowAddress, zebecWallet, withdrawEscrow, this._programId)];
                    case 3:
                        ix = _c.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4 /*yield*/, this._connection.getLatestBlockhash()];
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
                                message: "transaction success",
                                data: __assign({}, res)
                            }];
                    case 7:
                        e_4 = _c.sent();
                        return [2 /*return*/, {
                                status: "error",
                                message: e_4,
                                data: null
                            }];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    return StreamNative;
}(BaseStream));
exports.StreamNative = StreamNative;
