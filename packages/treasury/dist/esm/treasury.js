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
exports.TokenTreasury = exports.NativeTreasury = void 0;
var spl_token_1 = require("@solana/spl-token");
var web3_js_1 = require("@solana/web3.js");
var constants_1 = require("./constants");
var INSTRUCTIONS = __importStar(require("./instructions"));
var schema_1 = require("./schema");
var ZebecTreasury = (function () {
    function ZebecTreasury(walletProvider, rpcUrl, commitment) {
        this._programId = new web3_js_1.PublicKey(constants_1.ZEBEC_PROGRAM_ID);
        this.walletProvider = walletProvider;
        this._connection = new web3_js_1.Connection(rpcUrl, this._commitment);
        this._commitment = commitment;
    }
    ZebecTreasury.prototype._signAndConfirm = function (tx, commitment) {
        if (commitment === void 0) { commitment = "confirmed"; }
        return __awaiter(this, void 0, void 0, function () {
            var signed, signature;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, this.walletProvider.signTransaction(tx)];
                    case 1:
                        signed = _a.sent();
                        return [4, this._connection.sendRawTransaction(signed.serialize())];
                    case 2:
                        signature = _a.sent();
                        return [4, this._connection.confirmTransaction(signature, commitment)];
                    case 3:
                        _a.sent();
                        return [2, {
                                transactionHash: signature
                            }];
                }
            });
        });
    };
    ZebecTreasury.prototype._findZebecSafeAccount = function (walletAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, web3_js_1.PublicKey.findProgramAddress([Buffer.from(constants_1.SAFE_STRING), walletAddress.toBuffer()], this._programId)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    ZebecTreasury.prototype._findZebecWalletAccount = function (walletAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, web3_js_1.PublicKey.findProgramAddress([walletAddress.toBuffer()], this._programId)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    return ZebecTreasury;
}());
var NativeTreasury = (function (_super) {
    __extends(NativeTreasury, _super);
    function NativeTreasury(walletProvider, rpcUrl, commitment) {
        if (rpcUrl === void 0) { rpcUrl = constants_1.RPC_ENDPOINTS.DEFAULT; }
        if (commitment === void 0) { commitment = "confirmed"; }
        var _this = _super.call(this, walletProvider, rpcUrl, commitment) || this;
        console.log("Native Treasury Intialized!");
        return _this;
    }
    NativeTreasury.prototype._findWithdrawEscrowAccount = function (withdrawString, walletAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, web3_js_1.PublicKey.findProgramAddress([Buffer.from(withdrawString), walletAddress.toBuffer()], this._programId)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    NativeTreasury.prototype.createSafe = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, owners, min_confirmation_required, escrow, senderAddress, zebecSafeAddress, withdrawEscrowAddress, signers, whiteList, ix, tx, recentHash, res, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, owners = data.owners, min_confirmation_required = data.min_confirmation_required;
                        console.log("create zebec safe data: ", data);
                        escrow = new web3_js_1.Keypair();
                        senderAddress = new web3_js_1.PublicKey(sender);
                        return [4, this._findZebecSafeAccount(escrow.publicKey)];
                    case 1:
                        zebecSafeAddress = (_a.sent())[0];
                        return [4, this._findWithdrawEscrowAccount(constants_1.WITHDRAW_MULTISIG_SOL_STRING, zebecSafeAddress)];
                    case 2:
                        withdrawEscrowAddress = (_a.sent())[0];
                        console.log("now creating signers array");
                        signers = [];
                        owners.map(function (owner) {
                            var ownerAddress = new web3_js_1.PublicKey(owner.wallet_address);
                            signers.push(new schema_1.Signer({ address: ownerAddress, counter: 0 }));
                        });
                        console.log(signers, "SINGERS");
                        whiteList = new schema_1.MultiSigSafe({ signers: signers, m: min_confirmation_required });
                        return [4, INSTRUCTIONS.createMultiSigSafeInstruction(senderAddress, escrow.publicKey, withdrawEscrowAddress, this._programId, whiteList)];
                    case 3:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 4:
                        recentHash = _a.sent();
                        _a.label = 5;
                    case 5:
                        _a.trys.push([5, 7, , 8]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        tx.partialSign(escrow);
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 6:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "safe created.",
                                data: __assign(__assign({}, res), { safe_escrow: escrow.publicKey.toBase58(), zebec_safe: zebecSafeAddress.toBase58() })
                            }];
                    case 7:
                        e_1 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_1,
                                data: null
                            }];
                    case 8: return [2];
                }
            });
        });
    };
    NativeTreasury.prototype.deposit = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, multisig_escrow, amount, senderAddress, escrowAddress, withdrawEscrowAddress, zebecSafeAddress, zebecWalletAddress, ix, tx, recentHash, res, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, multisig_escrow = data.multisig_escrow, amount = data.amount;
                        console.log("deposit to safe data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        escrowAddress = new web3_js_1.PublicKey(multisig_escrow);
                        return [4, this._findWithdrawEscrowAccount(constants_1.WITHDRAW_SOL_STRING, escrowAddress)];
                    case 1:
                        withdrawEscrowAddress = (_a.sent())[0];
                        return [4, this._findZebecSafeAccount(escrowAddress)];
                    case 2:
                        zebecSafeAddress = (_a.sent())[0];
                        return [4, this._findZebecWalletAccount(senderAddress)];
                    case 3:
                        zebecWalletAddress = (_a.sent())[0];
                        return [4, INSTRUCTIONS.createMultiSigDepositInstruction(senderAddress, zebecWalletAddress, zebecSafeAddress, escrowAddress, withdrawEscrowAddress, this._programId, amount)];
                    case 4:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 5:
                        recentHash = _a.sent();
                        _a.label = 6;
                    case 6:
                        _a.trys.push([6, 8, , 9]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 7:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "deposit successful",
                                data: __assign({}, res)
                            }];
                    case 8:
                        e_2 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_2,
                                data: null
                            }];
                    case 9: return [2];
                }
            });
        });
    };
    NativeTreasury.prototype.sign = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, zebec_wallet, tx_escrow, zebec_wallet_pda, signer, senderAddress, zebecWalletAddress, txEscrowAddress, zebecWalletEscrowAddress, withdrawEscrowAddress, ix, tx, recentHash, res, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, zebec_wallet = data.zebec_wallet, tx_escrow = data.tx_escrow, zebec_wallet_pda = data.zebec_wallet_pda, signer = data.signer;
                        console.log("sign tx data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        zebecWalletAddress = new web3_js_1.PublicKey(zebec_wallet);
                        txEscrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        zebecWalletEscrowAddress = new web3_js_1.PublicKey(zebec_wallet_pda);
                        return [4, this._findWithdrawEscrowAccount(constants_1.WITHDRAW_MULTISIG_SOL_STRING, zebecWalletAddress)];
                    case 1:
                        withdrawEscrowAddress = (_a.sent())[0];
                        return [4, INSTRUCTIONS.createMultiSigSignInstruction(senderAddress, txEscrowAddress, zebecWalletEscrowAddress, withdrawEscrowAddress, this._programId, signer)];
                    case 2:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 3:
                        recentHash = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 5:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "tx signed.",
                                data: __assign({}, res)
                            }];
                    case 6:
                        e_3 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_3,
                                data: null
                            }];
                    case 7: return [2];
                }
            });
        });
    };
    NativeTreasury.prototype.reject = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, tx_escrow, vault_escrow, senderAddress, txEscrowAddress, zebecWalletEscrowAddress, ix, tx, recentHash, res, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, tx_escrow = data.tx_escrow, vault_escrow = data.vault_escrow;
                        console.log("reject multisig txsign data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        txEscrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        zebecWalletEscrowAddress = new web3_js_1.PublicKey(vault_escrow);
                        return [4, INSTRUCTIONS.createMultiSigRejectSignInstruction(senderAddress, txEscrowAddress, zebecWalletEscrowAddress, this._programId)];
                    case 1:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 2:
                        recentHash = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 4:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "rejected.",
                                data: __assign({}, res)
                            }];
                    case 5:
                        e_4 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_4,
                                data: null
                            }];
                    case 6: return [2];
                }
            });
        });
    };
    NativeTreasury.prototype.init = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, start_time, end_time, amount, zebec_wallet_escrow, escrow, senderAddress, recipientAddress, zebecWalletEscrowAddress, signers, ix, tx, recentHash, res, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, start_time = data.start_time, end_time = data.end_time, amount = data.amount, zebec_wallet_escrow = data.zebec_wallet_escrow;
                        console.log("start multisig tx data: ", data);
                        escrow = new web3_js_1.Keypair();
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        zebecWalletEscrowAddress = new web3_js_1.PublicKey(zebec_wallet_escrow);
                        signers = [new schema_1.Signer({ address: senderAddress, counter: 0 })];
                        return [4, INSTRUCTIONS.createMultiSigInitInstruction(senderAddress, recipientAddress, zebecWalletEscrowAddress, escrow.publicKey, this._programId, start_time, end_time, amount, signers)];
                    case 1:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 2:
                        recentHash = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 4:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "tx started.",
                                data: __assign({}, res)
                            }];
                    case 5:
                        e_5 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_5,
                                data: null
                            }];
                    case 6: return [2];
                }
            });
        });
    };
    NativeTreasury.prototype.pause = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, tx_escrow, vault_escrow, senderAddress, recipientAddress, txEscrowAddress, zebecWalletEscrowAddress, ix, tx, recentHash, res, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, tx_escrow = data.tx_escrow, vault_escrow = data.vault_escrow;
                        console.log("pause multisig tx data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        txEscrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        zebecWalletEscrowAddress = new web3_js_1.PublicKey(vault_escrow);
                        return [4, INSTRUCTIONS.createMultiSigPauseInstruction(senderAddress, recipientAddress, txEscrowAddress, zebecWalletEscrowAddress, this._programId)];
                    case 1:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 2:
                        recentHash = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 4:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "stream paused.",
                                data: __assign({}, res)
                            }];
                    case 5:
                        e_6 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_6,
                                data: null
                            }];
                    case 6: return [2];
                }
            });
        });
    };
    NativeTreasury.prototype.cancel = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, zebec_safe, tx_escrow, vault_escrow, senderAddress, recipientAddress, zebecSafeAddress, txEscrowAddress, zebecWalletEscrowAddress, _FEE_ADDRESS, withdrawEscrowAddress, ix, tx, recentHash, res, e_7;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, zebec_safe = data.zebec_safe, tx_escrow = data.tx_escrow, vault_escrow = data.vault_escrow;
                        console.log("cancel multisig tx data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        zebecSafeAddress = new web3_js_1.PublicKey(zebec_safe);
                        txEscrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        zebecWalletEscrowAddress = new web3_js_1.PublicKey(vault_escrow);
                        _FEE_ADDRESS = new web3_js_1.PublicKey(constants_1.FEE_ADDRESS);
                        return [4, this._findWithdrawEscrowAccount(constants_1.WITHDRAW_MULTISIG_SOL_STRING, zebecSafeAddress)];
                    case 1:
                        withdrawEscrowAddress = (_a.sent())[0];
                        return [4, INSTRUCTIONS.createMultiSigCancelInstruction(senderAddress, recipientAddress, zebecSafeAddress, txEscrowAddress, zebecWalletEscrowAddress, withdrawEscrowAddress, _FEE_ADDRESS, this._programId)];
                    case 2:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 3:
                        recentHash = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 5:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "tx canceled.",
                                data: __assign({}, res)
                            }];
                    case 6:
                        e_7 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_7,
                                data: null
                            }];
                    case 7: return [2];
                }
            });
        });
    };
    NativeTreasury.prototype.resume = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, tx_escrow, vault_escrow, senderAddress, recipientAddress, txEscrowAddress, zebecWalletEscrowAddress, ix, tx, recentHash, res, e_8;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, tx_escrow = data.tx_escrow, vault_escrow = data.vault_escrow;
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        txEscrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        zebecWalletEscrowAddress = new web3_js_1.PublicKey(vault_escrow);
                        return [4, INSTRUCTIONS.createMultiSigResumeInstruction(senderAddress, recipientAddress, txEscrowAddress, zebecWalletEscrowAddress, this._programId)];
                    case 1:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 2:
                        recentHash = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 4:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "tx resumed.",
                                data: __assign({}, res)
                            }];
                    case 5:
                        e_8 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_8,
                                data: null
                            }];
                    case 6: return [2];
                }
            });
        });
    };
    NativeTreasury.prototype.withdraw = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, zebec_safe, tx_escrow, vault_escrow, amount, senderAddress, recipientAddress, zebecSafeAddress, txEscrowAddress, zebecWalletEscrowAddress, _FEE_ADDRESS, withdrawEscrowAddress, ix, tx, recentHash, res, e_9;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, zebec_safe = data.zebec_safe, tx_escrow = data.tx_escrow, vault_escrow = data.vault_escrow, amount = data.amount;
                        console.log("Withdraw multisig tx data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        zebecSafeAddress = new web3_js_1.PublicKey(zebec_safe);
                        txEscrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        zebecWalletEscrowAddress = new web3_js_1.PublicKey(vault_escrow);
                        _FEE_ADDRESS = new web3_js_1.PublicKey(constants_1.FEE_ADDRESS);
                        return [4, this._findWithdrawEscrowAccount(constants_1.WITHDRAW_MULTISIG_SOL_STRING, zebecSafeAddress)];
                    case 1:
                        withdrawEscrowAddress = (_a.sent())[0];
                        return [4, INSTRUCTIONS.createMultiSigWithdrawInstruction(senderAddress, recipientAddress, zebecSafeAddress, txEscrowAddress, zebecWalletEscrowAddress, withdrawEscrowAddress, _FEE_ADDRESS, this._programId, amount)];
                    case 2:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 3:
                        recentHash = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 5:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "tx resumed.",
                                data: __assign({}, res)
                            }];
                    case 6:
                        e_9 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_9,
                                data: null
                            }];
                    case 7: return [2];
                }
            });
        });
    };
    NativeTreasury.prototype.signInstant = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, zebec_safe, vault_escrow, tx_escrow, signed_by, senderAddress, recipientAddress, zebecSafeAddress, zebecWalletEscrowAddress, txEscrowAddress, ix, tx, recentHash, res, e_10;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, zebec_safe = data.zebec_safe, vault_escrow = data.vault_escrow, tx_escrow = data.tx_escrow, signed_by = data.signed_by;
                        console.log("sign instant transaction data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        zebecSafeAddress = new web3_js_1.PublicKey(zebec_safe);
                        zebecWalletEscrowAddress = new web3_js_1.PublicKey(vault_escrow);
                        txEscrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        return [4, INSTRUCTIONS.createMultiSigSignInstantInstruction(senderAddress, recipientAddress, zebecSafeAddress, zebecWalletEscrowAddress, txEscrowAddress, this._programId, signed_by)];
                    case 1:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 2:
                        recentHash = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 4:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "signed instant tx",
                                data: __assign({}, res)
                            }];
                    case 5:
                        e_10 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_10,
                                data: null
                            }];
                    case 6: return [2];
                }
            });
        });
    };
    NativeTreasury.prototype.rejectInstant = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, vault_escrow, tx_escrow, senderAddress, zebecWalletEscrowAddress, txEscrowAddress, ix, tx, recentHash, res, e_11;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, vault_escrow = data.vault_escrow, tx_escrow = data.tx_escrow;
                        console.log("reject instant tx data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        zebecWalletEscrowAddress = new web3_js_1.PublicKey(vault_escrow);
                        txEscrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        return [4, INSTRUCTIONS.createMultiSigRejectInstantInstruction(senderAddress, zebecWalletEscrowAddress, txEscrowAddress, this._programId)];
                    case 1:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 2:
                        recentHash = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 4:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "rejected instant tx",
                                data: __assign({}, res)
                            }];
                    case 5:
                        e_11 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_11,
                                data: null
                            }];
                    case 6: return [2];
                }
            });
        });
    };
    NativeTreasury.prototype.initInstant = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, amount, vault_escrow, senderAddress, recipientAddress, zebecWalletEscrowAddress, escrow, signer, ix, tx, recentHash, res, e_12;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, amount = data.amount, vault_escrow = data.vault_escrow;
                        console.log("init instant multisig tx datA: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        zebecWalletEscrowAddress = new web3_js_1.PublicKey(vault_escrow);
                        escrow = new web3_js_1.Keypair();
                        signer = [new schema_1.Signer({ address: senderAddress, counter: 0 })];
                        return [4, INSTRUCTIONS.createMultiSigInitInstantInstruction(senderAddress, recipientAddress, zebecWalletEscrowAddress, escrow.publicKey, this._programId, amount, signer)];
                    case 1:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 2:
                        recentHash = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        tx.partialSign(escrow);
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 4:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "started instant tx",
                                data: __assign(__assign({}, res), { tx_escrow: escrow.publicKey.toBase58() })
                            }];
                    case 5:
                        e_12 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_12,
                                data: null
                            }];
                    case 6: return [2];
                }
            });
        });
    };
    return NativeTreasury;
}(ZebecTreasury));
exports.NativeTreasury = NativeTreasury;
var TokenTreasury = (function (_super) {
    __extends(TokenTreasury, _super);
    function TokenTreasury(walletProvider, rpcUrl, commitment) {
        if (rpcUrl === void 0) { rpcUrl = constants_1.RPC_ENDPOINTS.DEFAULT; }
        if (commitment === void 0) { commitment = "confirmed"; }
        var _this = _super.call(this, walletProvider, rpcUrl, commitment) || this;
        console.log("Token Treasury Intialized!");
        return _this;
    }
    TokenTreasury.prototype._findWithdrawEscrowAccount = function (withdrawString, walletAddress, tokenMintAddress) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, web3_js_1.PublicKey.findProgramAddress([Buffer.from(withdrawString), walletAddress.toBuffer(), tokenMintAddress.toBuffer()], this._programId)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    TokenTreasury.prototype._findAssociatedTokenAddress = function (walletAddress, tokenMintAddress) {
        return __awaiter(this, void 0, void 0, function () {
            var TOKEN_PROGRAM_ADDRESS, SPL_ASSOCIATED_TOKEN_ADDRESS;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        TOKEN_PROGRAM_ADDRESS = new web3_js_1.PublicKey(constants_1._TOKEN_PROGRAM_ID);
                        SPL_ASSOCIATED_TOKEN_ADDRESS = new web3_js_1.PublicKey(constants_1.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID);
                        return [4, web3_js_1.PublicKey.findProgramAddress([walletAddress.toBuffer(), TOKEN_PROGRAM_ADDRESS.toBuffer(), tokenMintAddress.toBuffer()], SPL_ASSOCIATED_TOKEN_ADDRESS)];
                    case 1: return [2, _a.sent()];
                }
            });
        });
    };
    TokenTreasury.prototype.deposit = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, token_mint_address, zebec_safe, vault_escrow, amount, senderAddress, tokenMintAddress, zebecSafeAddress, zebecWalletEscrowAddress, TOKEN_PROGRAM_ADDRESS, SYSTEM_RENT_ADDRESS, SPL_ASSOCIATED_TOKEN_ADDRESS, withdrawEscrowAddress, senderAssociatedAddress, zebecWalletAddress, escrowAssociatedAddress, zebecWalletAssociatedAddress, ix, tx, recentHash, res, e_13;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, token_mint_address = data.token_mint_address, zebec_safe = data.zebec_safe, vault_escrow = data.vault_escrow, amount = data.amount;
                        console.log("deposit token to zebec safe: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        tokenMintAddress = new web3_js_1.PublicKey(token_mint_address);
                        zebecSafeAddress = new web3_js_1.PublicKey(zebec_safe);
                        zebecWalletEscrowAddress = new web3_js_1.PublicKey(vault_escrow);
                        TOKEN_PROGRAM_ADDRESS = new web3_js_1.PublicKey(constants_1._TOKEN_PROGRAM_ID);
                        SYSTEM_RENT_ADDRESS = new web3_js_1.PublicKey(constants_1.SYSTEM_RENT);
                        SPL_ASSOCIATED_TOKEN_ADDRESS = new web3_js_1.PublicKey(constants_1.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID);
                        return [4, this._findWithdrawEscrowAccount(constants_1.WITHDRAW_TOKEN_STRING, senderAddress, tokenMintAddress)];
                    case 1:
                        withdrawEscrowAddress = (_a.sent())[0];
                        return [4, this._findAssociatedTokenAddress(senderAddress, tokenMintAddress)];
                    case 2:
                        senderAssociatedAddress = (_a.sent())[0];
                        return [4, this._findZebecWalletAccount(senderAddress)];
                    case 3:
                        zebecWalletAddress = (_a.sent())[0];
                        return [4, this._findAssociatedTokenAddress(zebecSafeAddress, tokenMintAddress)];
                    case 4:
                        escrowAssociatedAddress = (_a.sent())[0];
                        return [4, this._findAssociatedTokenAddress(zebecWalletAddress, tokenMintAddress)];
                    case 5:
                        zebecWalletAssociatedAddress = (_a.sent())[0];
                        return [4, INSTRUCTIONS.createMultiSigDepositTokenInstruction(senderAddress, zebecSafeAddress, zebecWalletEscrowAddress, TOKEN_PROGRAM_ADDRESS, tokenMintAddress, senderAssociatedAddress, zebecWalletAddress, withdrawEscrowAddress, escrowAssociatedAddress, zebecWalletAssociatedAddress, SYSTEM_RENT_ADDRESS, SPL_ASSOCIATED_TOKEN_ADDRESS, this._programId, amount)];
                    case 6:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 7:
                        recentHash = _a.sent();
                        _a.label = 8;
                    case 8:
                        _a.trys.push([8, 10, , 11]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 9:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "deposited token.",
                                data: __assign({}, res)
                            }];
                    case 10:
                        e_13 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_13,
                                data: null
                            }];
                    case 11: return [2];
                }
            });
        });
    };
    TokenTreasury.prototype.sign = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, zebec_safe, token_mint_address, tx_escrow, vault_escrow, senderAddress, tokenMintAddress, txEscrowAddress, zebecWalletEscrowAddress, zebecSafeAddress, withdrawEscrowAddress, signer, ix, tx, recentHash, res, e_14;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, zebec_safe = data.zebec_safe, token_mint_address = data.token_mint_address, tx_escrow = data.tx_escrow, vault_escrow = data.vault_escrow;
                        console.log("sign token stream tx data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        tokenMintAddress = new web3_js_1.PublicKey(token_mint_address);
                        txEscrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        zebecWalletEscrowAddress = new web3_js_1.PublicKey(vault_escrow);
                        zebecSafeAddress = new web3_js_1.PublicKey(zebec_safe);
                        return [4, this._findWithdrawEscrowAccount(constants_1.WITHDRAW_MULTISIG_TOKEN_STRING, zebecSafeAddress, tokenMintAddress)];
                    case 1:
                        withdrawEscrowAddress = (_a.sent())[0];
                        signer = new schema_1.Signer({ address: senderAddress, counter: 0 });
                        return [4, INSTRUCTIONS.createMultiSigTokenSignInstruction(senderAddress, txEscrowAddress, zebecWalletEscrowAddress, withdrawEscrowAddress, this._programId, signer)];
                    case 2:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 3:
                        recentHash = _a.sent();
                        _a.label = 4;
                    case 4:
                        _a.trys.push([4, 6, , 7]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 5:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "signed tx.",
                                data: __assign({}, res)
                            }];
                    case 6:
                        e_14 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_14,
                                data: null
                            }];
                    case 7: return [2];
                }
            });
        });
    };
    TokenTreasury.prototype.reject = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, tx_escrow, vault_escrow, senderAddress, escrowAddress, vaultEscrowAddress, ix, tx, recentHash, res, e_15;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, tx_escrow = data.tx_escrow, vault_escrow = data.vault_escrow;
                        console.log("data for reject tx sign: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        escrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        vaultEscrowAddress = new web3_js_1.PublicKey(vault_escrow);
                        return [4, INSTRUCTIONS.createMultiSigTokenRejectInstruction(senderAddress, escrowAddress, vaultEscrowAddress, this._programId)];
                    case 1:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 2:
                        recentHash = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 4:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "sign rejected.",
                                data: __assign({}, res)
                            }];
                    case 5:
                        e_15 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_15,
                                data: null
                            }];
                    case 6: return [2];
                }
            });
        });
    };
    TokenTreasury.prototype.init = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, vault_escrow, token_mint_address, start_time, end_time, amount, senderAddress, recipientAddress, vaultEscrowAddress, TOKEN_PROGRAM_ADDRESS, tokenMintAddress, escrow, paused, withdraw_limit, ix, tx, recentHash, res, e_16;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, vault_escrow = data.vault_escrow, token_mint_address = data.token_mint_address, start_time = data.start_time, end_time = data.end_time, amount = data.amount;
                        console.log("treasury start stream data: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        vaultEscrowAddress = new web3_js_1.PublicKey(vault_escrow);
                        TOKEN_PROGRAM_ADDRESS = new web3_js_1.PublicKey(spl_token_1.TOKEN_PROGRAM_ID);
                        tokenMintAddress = new web3_js_1.PublicKey(token_mint_address);
                        escrow = new web3_js_1.Keypair();
                        paused = 0;
                        withdraw_limit = 0;
                        return [4, INSTRUCTIONS.createMultiSigTokenInitInstruction(senderAddress, recipientAddress, escrow.publicKey, vaultEscrowAddress, TOKEN_PROGRAM_ADDRESS, tokenMintAddress, this._programId, start_time, end_time, amount, paused, withdraw_limit)];
                    case 1:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 2:
                        recentHash = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        tx.partialSign(escrow);
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 4:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "signed tx.",
                                data: __assign(__assign({}, res), { tx_escrow: escrow.publicKey.toString() })
                            }];
                    case 5:
                        e_16 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_16,
                                data: null
                            }];
                    case 6: return [2];
                }
            });
        });
    };
    TokenTreasury.prototype.pause = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, tx_escrow, vault_escrow, senderAddress, recipientAddress, txEscrowAddress, vaultEscrowAddress, ix, tx, recentHash, res, e_17;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, tx_escrow = data.tx_escrow, vault_escrow = data.vault_escrow;
                        console.log("data for treasury stream pause: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        txEscrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        vaultEscrowAddress = new web3_js_1.PublicKey(vault_escrow);
                        return [4, INSTRUCTIONS.createMultiSigTokenPauseInstruction(senderAddress, recipientAddress, txEscrowAddress, vaultEscrowAddress, this._programId)];
                    case 1:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 2:
                        recentHash = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 4:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "paused token stream.",
                                data: __assign({}, res)
                            }];
                    case 5:
                        e_17 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_17,
                                data: null
                            }];
                    case 6: return [2];
                }
            });
        });
    };
    TokenTreasury.prototype.cancel = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, token_mint_address, multisig_vault, tx_escrow, vault_escrow, senderAddress, recipientAddress, tokenMintAddress, multisigVaultAddress, txEscrowAddress, vaultEscrowAddress, feeAddress, TOKEN_PROGRAM_ADDRESS, SYSTEM_RENT_ADDRESS, SPL_ASSOCIATED_TOKEN_ADDRESS, recipientAssociatedAddress, escrowAssociatedAddress, feeAssociatedAddress, withdrawEscrowAddress, ix, tx, recentHash, res, e_18;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, token_mint_address = data.token_mint_address, multisig_vault = data.multisig_vault, tx_escrow = data.tx_escrow, vault_escrow = data.vault_escrow;
                        console.log("data for treasury token stream: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        tokenMintAddress = new web3_js_1.PublicKey(token_mint_address);
                        multisigVaultAddress = new web3_js_1.PublicKey(multisig_vault);
                        txEscrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        vaultEscrowAddress = new web3_js_1.PublicKey(vault_escrow);
                        feeAddress = new web3_js_1.PublicKey(constants_1.FEE_ADDRESS);
                        TOKEN_PROGRAM_ADDRESS = new web3_js_1.PublicKey(spl_token_1.TOKEN_PROGRAM_ID);
                        SYSTEM_RENT_ADDRESS = new web3_js_1.PublicKey(constants_1.SYSTEM_RENT);
                        SPL_ASSOCIATED_TOKEN_ADDRESS = new web3_js_1.PublicKey(constants_1.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID);
                        return [4, this._findAssociatedTokenAddress(recipientAddress, tokenMintAddress)];
                    case 1:
                        recipientAssociatedAddress = (_a.sent())[0];
                        return [4, this._findAssociatedTokenAddress(multisigVaultAddress, tokenMintAddress)];
                    case 2:
                        escrowAssociatedAddress = (_a.sent())[0];
                        return [4, this._findAssociatedTokenAddress(feeAddress, tokenMintAddress)];
                    case 3:
                        feeAssociatedAddress = (_a.sent())[0];
                        return [4, this._findWithdrawEscrowAccount(constants_1.WITHDRAW_MULTISIG_SOL_STRING, multisigVaultAddress, tokenMintAddress)];
                    case 4:
                        withdrawEscrowAddress = (_a.sent())[0];
                        return [4, INSTRUCTIONS.createMultiSigTokenCancelInstruction(senderAddress, recipientAddress, multisigVaultAddress, txEscrowAddress, vaultEscrowAddress, withdrawEscrowAddress, TOKEN_PROGRAM_ADDRESS, tokenMintAddress, SYSTEM_RENT_ADDRESS, recipientAssociatedAddress, escrowAssociatedAddress, SPL_ASSOCIATED_TOKEN_ADDRESS, feeAddress, feeAssociatedAddress, this._programId)];
                    case 5:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 6:
                        recentHash = _a.sent();
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 8:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "canceled stream",
                                data: __assign({}, res)
                            }];
                    case 9:
                        e_18 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_18,
                                data: null
                            }];
                    case 10: return [2];
                }
            });
        });
    };
    TokenTreasury.prototype.resume = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, tx_escrow, vault_escrow, senderAddress, recipientAddress, txEscrowAddress, vaultEscrowAddress, ix, tx, recentHash, res, e_19;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, tx_escrow = data.tx_escrow, vault_escrow = data.vault_escrow;
                        console.log("data for treasury token stream resume: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        txEscrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        vaultEscrowAddress = new web3_js_1.PublicKey(vault_escrow);
                        return [4, INSTRUCTIONS.createMultiSigTokenResumeInstruction(senderAddress, recipientAddress, txEscrowAddress, vaultEscrowAddress, this._programId)];
                    case 1:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 2:
                        recentHash = _a.sent();
                        _a.label = 3;
                    case 3:
                        _a.trys.push([3, 5, , 6]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 4:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "tx resumed",
                                data: __assign({}, res)
                            }];
                    case 5:
                        e_19 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_19,
                                data: null
                            }];
                    case 6: return [2];
                }
            });
        });
    };
    TokenTreasury.prototype.withdraw = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            var sender, receiver, amount, multisig_vault, vault_escrow, tx_escrow, token_mint_address, senderAddress, recipientAddress, multisigVaultAddress, txEscrowAddress, vaultEscrowAddress, tokenMintAddress, feeAddress, TOKEN_PROGRAM_ADDRESS, SYSTEM_RENT_ADDRESS, SPL_ASSOCIATED_TOKEN_ADDRESS, recipientAssociatedAddress, escrowAssociatedAddress, feeAssociatedAddress, withdrawEscrowAddress, ix, tx, recentHash, res, e_20;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        sender = data.sender, receiver = data.receiver, amount = data.amount, multisig_vault = data.multisig_vault, vault_escrow = data.vault_escrow, tx_escrow = data.tx_escrow, token_mint_address = data.token_mint_address;
                        console.log("data for withdraw stream token: ", data);
                        senderAddress = new web3_js_1.PublicKey(sender);
                        recipientAddress = new web3_js_1.PublicKey(receiver);
                        multisigVaultAddress = new web3_js_1.PublicKey(multisig_vault);
                        txEscrowAddress = new web3_js_1.PublicKey(tx_escrow);
                        vaultEscrowAddress = new web3_js_1.PublicKey(vault_escrow);
                        tokenMintAddress = new web3_js_1.PublicKey(token_mint_address);
                        feeAddress = new web3_js_1.PublicKey(constants_1.FEE_ADDRESS);
                        TOKEN_PROGRAM_ADDRESS = new web3_js_1.PublicKey(spl_token_1.TOKEN_PROGRAM_ID);
                        SYSTEM_RENT_ADDRESS = new web3_js_1.PublicKey(constants_1.SYSTEM_RENT);
                        SPL_ASSOCIATED_TOKEN_ADDRESS = new web3_js_1.PublicKey(constants_1.SPL_ASSOCIATED_TOKEN_ACCOUNT_PROGRAM_ID);
                        return [4, this._findAssociatedTokenAddress(recipientAddress, tokenMintAddress)];
                    case 1:
                        recipientAssociatedAddress = (_a.sent())[0];
                        return [4, this._findAssociatedTokenAddress(multisigVaultAddress, tokenMintAddress)];
                    case 2:
                        escrowAssociatedAddress = (_a.sent())[0];
                        return [4, this._findAssociatedTokenAddress(feeAddress, tokenMintAddress)];
                    case 3:
                        feeAssociatedAddress = (_a.sent())[0];
                        return [4, this._findWithdrawEscrowAccount(constants_1.WITHDRAW_MULTISIG_SOL_STRING, multisigVaultAddress, tokenMintAddress)];
                    case 4:
                        withdrawEscrowAddress = (_a.sent())[0];
                        return [4, INSTRUCTIONS.createMultiSigTokenWithdrawInstruction(senderAddress, recipientAddress, multisigVaultAddress, vaultEscrowAddress, txEscrowAddress, withdrawEscrowAddress, TOKEN_PROGRAM_ADDRESS, tokenMintAddress, SYSTEM_RENT_ADDRESS, escrowAssociatedAddress, recipientAssociatedAddress, SPL_ASSOCIATED_TOKEN_ADDRESS, feeAddress, feeAssociatedAddress, this._programId, amount)];
                    case 5:
                        ix = _a.sent();
                        tx = new web3_js_1.Transaction().add(__assign({}, ix));
                        return [4, this._connection.getRecentBlockhash()];
                    case 6:
                        recentHash = _a.sent();
                        _a.label = 7;
                    case 7:
                        _a.trys.push([7, 9, , 10]);
                        tx.recentBlockhash = recentHash.blockhash;
                        tx.feePayer = this.walletProvider.publicKey;
                        console.log("transaction ix after adding properties: ", tx);
                        return [4, this._signAndConfirm(tx)];
                    case 8:
                        res = _a.sent();
                        console.log("response from sign and confirm: ", res);
                        return [2, {
                                status: "success",
                                message: "withdraw successful",
                                data: __assign({}, res)
                            }];
                    case 9:
                        e_20 = _a.sent();
                        return [2, {
                                status: "error",
                                message: e_20,
                                data: null
                            }];
                    case 10: return [2];
                }
            });
        });
    };
    return TokenTreasury;
}(ZebecTreasury));
exports.TokenTreasury = TokenTreasury;
