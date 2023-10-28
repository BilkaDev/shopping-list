"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
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
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var argon2 = require("argon2");
var user_entity_1 = require("../user/user.entity");
var jsonwebtoken_1 = require("jsonwebtoken");
var uuid_1 = require("uuid");
var client_config_1 = require("../config/client-config");
var AuthService = /** @class */ (function () {
    function AuthService() {
    }
    AuthService.prototype.createToken = function (currentTokenId) {
        var payload = { id: currentTokenId };
        var expiresIn = 60 * 60 * 24;
        var accessToken = (0, jsonwebtoken_1.sign)(payload, process.env.JWT_KEY, { expiresIn: expiresIn });
        return {
            accessToken: accessToken,
            expiresIn: expiresIn
        };
    };
    AuthService.prototype.generateToken = function (user) {
        return __awaiter(this, void 0, void 0, function () {
            var token, userWithThisToken;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        userWithThisToken = null;
                        _a.label = 1;
                    case 1:
                        token = (0, uuid_1.v4)();
                        return [4 /*yield*/, user_entity_1.User.findOne({
                                where: {
                                    currentTokenId: token
                                }
                            })];
                    case 2:
                        userWithThisToken = _a.sent();
                        _a.label = 3;
                    case 3:
                        if (!!userWithThisToken) return [3 /*break*/, 1];
                        _a.label = 4;
                    case 4:
                        user.currentTokenId = token;
                        return [4 /*yield*/, user.save()];
                    case 5:
                        _a.sent();
                        return [2 /*return*/, token];
                }
            });
        });
    };
    AuthService.prototype.login = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, isValidPassword, token, _a, e_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 4, , 5]);
                        if (!req.email.includes("@")) {
                            return [2 /*return*/, res.status(400).json({
                                    status: 400,
                                    message: "Wrong e-mail."
                                })];
                        }
                        if (req.pwd.length < 6) {
                            return [2 /*return*/, res.status(400).json({
                                    status: 400,
                                    message: "The password must not be shorter than 6 characters"
                                })];
                        }
                        return [4 /*yield*/, user_entity_1.User.findOne({
                                where: {
                                    email: req.email
                                }
                            })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(400).json({
                                    status: 400,
                                    message: "Incorrect login credentials!"
                                })];
                        }
                        return [4 /*yield*/, argon2.verify(user.pwdHash, req.pwd)];
                    case 2:
                        isValidPassword = _b.sent();
                        if (!isValidPassword) {
                            return [2 /*return*/, res.status(400).json({
                                    status: 400,
                                    message: "Incorrect login credentials!"
                                })];
                        }
                        _a = this.createToken;
                        return [4 /*yield*/, this.generateToken(user)];
                    case 3:
                        token = _a.apply(this, [_b.sent()]);
                        return [2 /*return*/, res
                                .cookie("jwt", token.accessToken, {
                                secure: client_config_1.CONFIG.secure,
                                domain: client_config_1.CONFIG.domain,
                                httpOnly: true
                            })
                                .json({
                                status: 200,
                                data: {
                                    user: {
                                        userId: user.id,
                                        email: user.email
                                    }
                                }
                            })];
                    case 4:
                        e_1 = _b.sent();
                        return [2 /*return*/, res.status(500).json({
                                status: 500,
                                message: "Something went wrong. Please try again later"
                            })];
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.logout = function (user, res) {
        return __awaiter(this, void 0, void 0, function () {
            var e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        user.currentTokenId = null;
                        return [4 /*yield*/, user.save()];
                    case 1:
                        _a.sent();
                        res.clearCookie("jwt", {
                            secure: client_config_1.CONFIG.secure,
                            domain: client_config_1.CONFIG.domain,
                            httpOnly: true
                        });
                        return [2 /*return*/, res.json({ status: 200, data: { message: "Login successful!" } })];
                    case 2:
                        e_2 = _a.sent();
                        return [2 /*return*/, res.status(500).json({
                                status: 500,
                                error: e_2.message
                            })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    AuthService.prototype.autoLogin = function (user, res) {
        return __awaiter(this, void 0, void 0, function () {
            var token, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.createToken;
                        return [4 /*yield*/, this.generateToken(user)];
                    case 1:
                        token = _a.apply(this, [_b.sent()]);
                        return [2 /*return*/, res
                                .cookie("jwt", token.accessToken, {
                                secure: client_config_1.CONFIG.secure,
                                domain: client_config_1.CONFIG.domain,
                                httpOnly: true
                            })
                                .json({
                                status: 200,
                                data: { user: { userId: user.id, email: user.email } }
                            })];
                }
            });
        });
    };
    AuthService.prototype.testUserLogin = function (res) {
        return __awaiter(this, void 0, void 0, function () {
            var user, token, _a, e_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        return [4 /*yield*/, user_entity_1.User.findOne({
                                where: {
                                    email: "test@example.com"
                                }
                            })];
                    case 1:
                        user = _b.sent();
                        _a = this.createToken;
                        return [4 /*yield*/, this.generateToken(user)];
                    case 2:
                        token = _a.apply(this, [_b.sent()]);
                        return [2 /*return*/, res
                                .cookie("jwt", token.accessToken, {
                                secure: client_config_1.CONFIG.secure,
                                domain: client_config_1.CONFIG.domain,
                                httpOnly: true
                            })
                                .json({
                                status: 200,
                                data: {
                                    user: {
                                        userId: user.id,
                                        email: user.email
                                    }
                                }
                            })];
                    case 3:
                        e_3 = _b.sent();
                        return [2 /*return*/, res.status(500).json({
                                status: 500,
                                message: "Something went wrong. Please try again later"
                            })];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    AuthService = __decorate([
        (0, common_1.Injectable)()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
