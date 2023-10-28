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
exports.__esModule = true;
exports.ProductController = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var user_obj_decorator_1 = require("../decorators/user-obj.decorator");
var ProductController = /** @class */ (function () {
    function ProductController(productService) {
        this.productService = productService;
    }
    ProductController.prototype.getUserProductsList = function (user) {
        return this.productService.getUserProducts(user.id);
    };
    ProductController.prototype.getProduct = function (productId) {
        return this.productService.getProductOrFail(productId);
    };
    ProductController.prototype.addProduct = function (user, product) {
        return this.productService.addProduct(product, user);
    };
    ProductController.prototype.removeProduct = function (productId) {
        return this.productService.deleteProduct(productId);
    };
    ProductController.prototype.updateProduct = function (user, productId, product) {
        return this.productService.updateProduct(productId, user.id, product);
    };
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Get)("/"),
        __param(0, (0, user_obj_decorator_1.UserObj)())
    ], ProductController.prototype, "getUserProductsList");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Get)("/item/:productId"),
        __param(0, (0, common_1.Param)("productId"))
    ], ProductController.prototype, "getProduct");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Post)("/"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Body)())
    ], ProductController.prototype, "addProduct");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Delete)("/:productId"),
        __param(0, (0, common_1.Param)("productId"))
    ], ProductController.prototype, "removeProduct");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Patch)("/:productId"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Param)("productId")),
        __param(2, (0, common_1.Body)())
    ], ProductController.prototype, "updateProduct");
    ProductController = __decorate([
        (0, common_1.Controller)("product")
    ], ProductController);
    return ProductController;
}());
exports.ProductController = ProductController;
