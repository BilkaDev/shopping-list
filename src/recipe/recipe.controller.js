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
exports.RecipeController = void 0;
var common_1 = require("@nestjs/common");
var passport_1 = require("@nestjs/passport");
var user_obj_decorator_1 = require("../decorators/user-obj.decorator");
var RecipeController = /** @class */ (function () {
    function RecipeController(recipeService) {
        this.recipeService = recipeService;
    }
    RecipeController.prototype.getUserRecipes = function (userId) {
        return this.recipeService.getUserRecipes(userId);
    };
    RecipeController.prototype.getOneRecipe = function (user, recipeId) {
        return this.recipeService.getOneRecipeResponse(recipeId, user.id);
    };
    RecipeController.prototype.createRecipe = function (user, recipe) {
        return this.recipeService.createRecipe(recipe, user);
    };
    RecipeController.prototype.addItemToRecipe = function (user, recipe) {
        return this.recipeService.addItemToRecipe(recipe, user.id);
    };
    RecipeController.prototype.editNamedRecipe = function (user, recipe) {
        return this.recipeService.editNamedRecipe(recipe, user.id);
    };
    RecipeController.prototype.editDescriptionRecipe = function (user, recipe) {
        return this.recipeService.editDescriptionRecipe(recipe, user.id);
    };
    RecipeController.prototype.deleteRecipe = function (user, recipeId) {
        return this.recipeService.deleteRecipe(recipeId, user.id);
    };
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Get)("/:userId"),
        __param(0, (0, common_1.Param)("userId"))
    ], RecipeController.prototype, "getUserRecipes");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Get)("/user/:recipeId"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Param)("recipeId"))
    ], RecipeController.prototype, "getOneRecipe");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Post)("/"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Body)())
    ], RecipeController.prototype, "createRecipe");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Post)("/add-item"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Body)())
    ], RecipeController.prototype, "addItemToRecipe");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Patch)("/edit"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Body)())
    ], RecipeController.prototype, "editNamedRecipe");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Patch)("/edit-description"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Body)())
    ], RecipeController.prototype, "editDescriptionRecipe");
    __decorate([
        (0, common_1.UseGuards)((0, passport_1.AuthGuard)("jwt")),
        (0, common_1.Delete)("/:recipeId"),
        __param(0, (0, user_obj_decorator_1.UserObj)()),
        __param(1, (0, common_1.Param)("recipeId"))
    ], RecipeController.prototype, "deleteRecipe");
    RecipeController = __decorate([
        (0, common_1.Controller)("recipe")
    ], RecipeController);
    return RecipeController;
}());
exports.RecipeController = RecipeController;
