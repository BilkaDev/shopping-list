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
exports.ListController = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var user_obj_decorator_1 = require("../decorators/user-obj.decorator");
var ListController = /** @class */ (function () {
    function ListController(listService) {
        this.listService = listService;
    }
    ListController.prototype.getUserLists = function (userId) {
        return this.listService.getUserLists(userId);
    };
    ListController.prototype.getListOfItems = function (userId) {
        return this.listService.getListOfItems(userId);
    };
    ListController.prototype.getList = function (user, listId) {
        return this.listService.getListResponse(listId, user.id);
    };
    ListController.prototype.createList = function (user, list) {
        return this.listService.createList(list, user);
    };
    ListController.prototype.addRecipeToList = function (user, listId, recipeId) {
        return this.listService.addRecipeToList(listId, recipeId, user.id);
    };
    ListController.prototype.deleteRecipeFromList = function (user, listId, recipeId) {
        return this.listService.deleteRecipeFromList(listId, recipeId, user.id);
    };
    ListController.prototype.addProductToList = function (user, newProduct) {
        return this.listService.addItemToList(newProduct, user.id);
    };
    ListController.prototype.editList = function (user, listId, list) {
        return this.listService.editList(listId, list, user.id);
    };
    ListController.prototype.updateItemInList = function (user, itemId, items) {
        return this.listService.updateItemInList(itemId, items, user.id);
    };
    ListController.prototype.deleteList = function (user, listId) {
        return this.listService.deleteList(listId, user.id);
    };
    ListController.prototype.deleteItemInList = function (user, itemId) {
        return this.listService.deleteItemInList(itemId, user.id);
    };
    ListController.prototype.clearList = function (user, listId) {
        return this.listService.clearList(listId, user.id);
    };
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Get)("/:userId"),
        __param(0, (0, common_1.Param)("userId"))
    ], ListController.prototype, "getUserLists");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Get)("/item/:userId"),
        __param(0, (0, common_1.Param)("userId"))
    ], ListController.prototype, "getListOfItems");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Get)("/user/:listId"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Param)("listId"))
    ], ListController.prototype, "getList");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Post)("/"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Body)())
    ], ListController.prototype, "createList");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Post)("/add-recipe/:listId/:recipeId"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Param)("listId")),
        __param(2, (0, common_1.Param)("recipeId"))
    ], ListController.prototype, "addRecipeToList");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Delete)("/delete-recipe/:listId/:recipeId"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Param)("listId")),
        __param(2, (0, common_1.Param)("recipeId"))
    ], ListController.prototype, "deleteRecipeFromList");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Post)("/item"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Body)())
    ], ListController.prototype, "addProductToList");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Patch)("/:listId"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Param)("listId")),
        __param(2, (0, common_1.Body)())
    ], ListController.prototype, "editList");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Patch)("/item/:itemId"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Param)("itemId")),
        __param(2, (0, common_1.Body)())
    ], ListController.prototype, "updateItemInList");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Delete)("/:listId"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Param)("listId"))
    ], ListController.prototype, "deleteList");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Delete)("/item/:itemId"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Param)("itemId"))
    ], ListController.prototype, "deleteItemInList");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Delete)("/item/clear/:listId"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Param)("listId"))
    ], ListController.prototype, "clearList");
    ListController = __decorate([
        (0, common_1.Controller)("list")
    ], ListController);
    return ListController;
}());
exports.ListController = ListController;
