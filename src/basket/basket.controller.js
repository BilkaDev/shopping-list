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
exports.BasketController = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var user_obj_decorator_1 = require("../decorators/user-obj.decorator");
var BasketController = /** @class */ (function () {
    function BasketController(basketService) {
        this.basketService = basketService;
    }
    BasketController.prototype.addToBasket = function (user, itemId, listId) {
        return this.basketService.addToBasket(itemId, listId, user.id);
    };
    BasketController.prototype.clearBasket = function (user, listId) {
        return this.basketService.clearBasket(listId);
    };
    BasketController.prototype.removeFromBasket = function (itemId, listId) {
        return this.basketService.removeFromBasket(itemId, listId);
    };
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Post)("/:itemId/:listId"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Param)("itemId")),
        __param(2, (0, common_1.Param)("listId"))
    ], BasketController.prototype, "addToBasket");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Delete)("/clear-basket/:listId"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Param)("listId"))
    ], BasketController.prototype, "clearBasket");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Delete)("/:itemId/:listId"),
        __param(0, (0, common_1.Param)("itemId")),
        __param(1, (0, common_1.Param)("listId"))
    ], BasketController.prototype, "removeFromBasket");
    BasketController = __decorate([
        (0, common_1.Controller)("basket")
    ], BasketController);
    return BasketController;
}());
exports.BasketController = BasketController;