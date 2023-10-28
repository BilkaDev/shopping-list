"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
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
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var argon2 = require("argon2");
var user_entity_1 = require("./user.entity");
var random_password_1 = require("../utils/random-password");
var mail_service_1 = require("../mail/mail.service");
var recover_password_1 = require("../templates/recover-password");
var fs = require("fs/promises");
var path = require("path");
var storage_1 = require("../utils/storage");
var sing_up_1 = require("../templates/sing-up");
var UserService = /** @class */ (function () {
    function UserService(mailService) {
        this.mailService = mailService;
    }
    UserService.prototype.register = function (newUser) {
        return __awaiter(this, void 0, void 0, function () {
            var checkEmail, user, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, user_entity_1.User.findOne({ where: { email: newUser.email } })];
                    case 1:
                        checkEmail = _b.sent();
                        if (!(!checkEmail && newUser.email.length > 0)) return [3 /*break*/, 5];
                        user = new user_entity_1.User();
                        user.email = newUser.email;
                        _a = user;
                        return [4 /*yield*/, argon2.hash(newUser.pwd)];
                    case 2:
                        _a.pwdHash = _b.sent();
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.mailService.sendMail(newUser.email, "recover password", (0, sing_up_1.singUpEmailTemplate)())];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, { id: user.id, email: user.email }];
                    case 5: throw new common_1.NotFoundException("email is already in use");
                }
            });
        });
    };
    UserService.prototype.changePassword = function (_a, user) {
        var pwd = _a.pwd, newPwd = _a.newPwd;
        return __awaiter(this, void 0, void 0, function () {
            var isValidPassword, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, argon2.verify(user.pwdHash, pwd)];
                    case 1:
                        isValidPassword = _c.sent();
                        if (isValidPassword) {
                            throw new common_1.BadRequestException("Incorrect credentials.");
                        }
                        _b = user;
                        return [4 /*yield*/, argon2.hash(newPwd)];
                    case 2:
                        _b.pwdHash = _c.sent();
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _c.sent();
                        return [2 /*return*/, {
                                message: "Password has changed successfully!"
                            }];
                }
            });
        });
    };
    UserService.prototype.recover = function (recover) {
        return __awaiter(this, void 0, void 0, function () {
            var user, password, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, user_entity_1.User.findOne({
                            where: {
                                email: recover.email
                            }
                        })];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, {
                                    message: "If e-mail is active then the message was sent"
                                }];
                        }
                        password = (0, random_password_1.randomPassword)();
                        _a = user;
                        return [4 /*yield*/, argon2.hash(password)];
                    case 2:
                        _a.pwdHash = _b.sent();
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _b.sent();
                        return [4 /*yield*/, this.mailService.sendMail(recover.email, "recover password", (0, recover_password_1.recoverPasswordEmailTemplate)(password))];
                    case 4:
                        _b.sent();
                        return [2 /*return*/, {
                                message: "If e-mail is active then the message was sent"
                            }];
                }
            });
        });
    };
    UserService.prototype.addAvatar = function (user, files) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var photo, e2_1, e_1, e2_2;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        photo = (_b = (_a = files === null || files === void 0 ? void 0 : files.photo) === null || _a === void 0 ? void 0 : _a[0]) !== null && _b !== void 0 ? _b : null;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 8, , 14]);
                        if (!user.photoFn) return [3 /*break*/, 6];
                        _c.label = 2;
                    case 2:
                        _c.trys.push([2, 5, , 6]);
                        return [4 /*yield*/, fs.unlink(path.join((0, storage_1.storageDir)(), "avatar-photos", user.photoFn))];
                    case 3:
                        _c.sent();
                        user.photoFn = null;
                        return [4 /*yield*/, user.save()];
                    case 4:
                        _c.sent();
                        return [3 /*break*/, 6];
                    case 5:
                        e2_1 = _c.sent();
                        return [3 /*break*/, 6];
                    case 6:
                        if (photo) {
                            user.photoFn = photo.filename;
                        }
                        return [4 /*yield*/, user.save()];
                    case 7:
                        _c.sent();
                        return [2 /*return*/, { message: "Avatar saved successfully!" }];
                    case 8:
                        e_1 = _c.sent();
                        _c.label = 9;
                    case 9:
                        _c.trys.push([9, 12, , 13]);
                        console.error(e_1);
                        if (!photo) return [3 /*break*/, 11];
                        return [4 /*yield*/, fs.unlink(path.join((0, storage_1.storageDir)(), "avatar-photos", photo.filename))];
                    case 10:
                        _c.sent();
                        _c.label = 11;
                    case 11: return [3 /*break*/, 13];
                    case 12:
                        e2_2 = _c.sent();
                        return [3 /*break*/, 13];
                    case 13: throw e_1;
                    case 14: return [2 /*return*/];
                }
            });
        });
    };
    UserService.prototype.getPhoto = function (user, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    if (!user.photoFn) {
                        return [2 /*return*/, res.status(400).json({
                                status: 400,
                                message: "No photo in this entity!"
                            })];
                    }
                    return [2 /*return*/, res.sendFile(user.photoFn, {
                            root: path.join((0, storage_1.storageDir)(), "avatar-photos")
                        })];
                }
                catch (e) {
                    res.json({
                        status: 500,
                        message: "Something went wrong. Please try again later!"
                    });
                }
                return [2 /*return*/];
            });
        });
    };
    UserService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)(mail_service_1.MailService))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
