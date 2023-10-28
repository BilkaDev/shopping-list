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
exports.ProductService = void 0;
var common_1 = require("@nestjs/common");
var product_entity_1 = require("./product.entity");
var typeorm_1 = require("typeorm");
var ProductService = /** @class */ (function () {
    function ProductService() {
    }
    ProductService.prototype.noProductNameOrFail = function (userId, name) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_entity_1.Product.findOne({
                            where: {
                                user: { id: userId },
                                name: (0, typeorm_1.ILike)(name)
                            }
                        })];
                    case 1:
                        product = _a.sent();
                        if (product)
                            throw new common_1.BadRequestException("The given product name is taken");
                        return [2 /*return*/, true];
                }
            });
        });
    };
    ProductService.prototype.getUserProducts = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var products;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_entity_1.Product.find({
                            where: {
                                user: { id: userId }
                            }
                        })];
                    case 1:
                        products = _a.sent();
                        return [2 /*return*/, { products: products }];
                }
            });
        });
    };
    ProductService.prototype.getProductOrFail = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var product;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, product_entity_1.Product.findOne({ where: { id: productId } })];
                    case 1:
                        product = _a.sent();
                        if (!product)
                            throw new common_1.NotFoundException("Product does not exist.");
                        return [2 /*return*/, product];
                }
            });
        });
    };
    ProductService.prototype.addProduct = function (_a, user) {
        var name = _a.name, category = _a.category;
        return __awaiter(this, void 0, void 0, function () {
            var newProduct;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.noProductNameOrFail(user.id, name)];
                    case 1:
                        _b.sent();
                        newProduct = new product_entity_1.Product();
                        newProduct.name = name;
                        newProduct.category = category;
                        newProduct.user = user;
                        return [4 /*yield*/, newProduct.save()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, { product: { id: newProduct.id } }];
                }
            });
        });
    };
    ProductService.prototype.deleteProduct = function (productId) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getProductOrFail(productId)];
                    case 1:
                        item = _a.sent();
                        return [4 /*yield*/, item.remove()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: "Product was deleted successfully!" }];
                }
            });
        });
    };
    ProductService.prototype.updateProduct = function (productId, userId, _a) {
        var category = _a.category, name = _a.name;
        return __awaiter(this, void 0, void 0, function () {
            var product, _b, affected;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, this.getProductOrFail(productId)];
                    case 1:
                        product = _c.sent();
                        _b = name === product.name;
                        if (_b) return [3 /*break*/, 3];
                        return [4 /*yield*/, this.noProductNameOrFail(userId, name)];
                    case 2:
                        _b = (_c.sent());
                        _c.label = 3;
                    case 3:
                        if (!_b) return [3 /*break*/, 5];
                        return [4 /*yield*/, product_entity_1.Product.update(productId, {
                                name: name,
                                category: category
                            })];
                    case 4:
                        affected = (_c.sent()).affected;
                        if (affected)
                            return [2 /*return*/, { message: "Product has been updated!" }];
                        _c.label = 5;
                    case 5: return [2 /*return*/];
                }
            });
        });
    };
    ProductService = __decorate([
        (0, common_1.Injectable)()
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
