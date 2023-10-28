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
exports.RecipeService = void 0;
var common_1 = require("@nestjs/common");
var recipe_entity_1 = require("./recipe.entity");
var list_service_1 = require("../list/list.service");
var typeorm_1 = require("typeorm");
var RecipeService = /** @class */ (function () {
    function RecipeService(listService) {
        var _this = this;
        this.listService = listService;
        this.filter = function (recipes) {
            return recipes.map(function (recipe) { return ({
                name: recipe.name,
                id: recipe.id
            }); });
        };
        this.editDescriptionRecipe = function (_a, userId) {
            var description = _a.description, id = _a.id;
            return __awaiter(_this, void 0, void 0, function () {
                var recipe;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4 /*yield*/, this.getOneRecipeOrFail(id, userId)];
                        case 1:
                            recipe = _b.sent();
                            recipe.description = description;
                            return [4 /*yield*/, recipe.save()];
                        case 2:
                            _b.sent();
                            return [2 /*return*/, { message: "Recipe has been update!" }];
                    }
                });
            });
        };
    }
    RecipeService.prototype.noRecipeNameOrFail = function (userId, name) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recipe_entity_1.Recipe.findOne({
                            where: {
                                name: (0, typeorm_1.ILike)(name),
                                user: { id: userId }
                            }
                        })];
                    case 1:
                        recipe = _a.sent();
                        if (recipe)
                            throw new common_1.BadRequestException("The given name is already taken.");
                        return [2 /*return*/, true];
                }
            });
        });
    };
    RecipeService.prototype.getOneRecipeOrFail = function (recipeId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, recipe_entity_1.Recipe.findOne({
                            where: { id: recipeId, user: { id: userId } },
                            relations: ["items"]
                        })];
                    case 1:
                        recipe = _a.sent();
                        if (!recipe) {
                            throw new common_1.NotFoundException("Cannot find recipe.");
                        }
                        return [2 /*return*/, recipe];
                }
            });
        });
    };
    RecipeService.prototype.getOneRecipeResponse = function (recipeId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOneRecipeOrFail(recipeId, userId)];
                    case 1:
                        recipe = _a.sent();
                        return [2 /*return*/, { recipe: recipe }];
                }
            });
        });
    };
    RecipeService.prototype.getUserRecipes = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var recipes, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _a = this.filter;
                        return [4 /*yield*/, recipe_entity_1.Recipe.find({
                                where: { user: { id: userId } }
                            })];
                    case 1:
                        recipes = _a.apply(this, [_b.sent()]);
                        return [2 /*return*/, { recipes: recipes }];
                }
            });
        });
    };
    RecipeService.prototype.createRecipe = function (_a, user) {
        var userId = _a.userId, name = _a.name, items = _a.items, description = _a.description;
        return __awaiter(this, void 0, void 0, function () {
            var newRecipe, _i, items_1, item, createItem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.noRecipeNameOrFail(userId, name)];
                    case 1:
                        _b.sent();
                        newRecipe = new recipe_entity_1.Recipe();
                        newRecipe.items = [];
                        _i = 0, items_1 = items;
                        _b.label = 2;
                    case 2:
                        if (!(_i < items_1.length)) return [3 /*break*/, 5];
                        item = items_1[_i];
                        return [4 /*yield*/, this.listService.createItem({
                                itemId: item.itemId,
                                count: item.count,
                                weight: item.weight
                            })];
                    case 3:
                        createItem = _b.sent();
                        newRecipe.items.push(createItem);
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5:
                        newRecipe.description = description;
                        newRecipe.name = name;
                        newRecipe.user = user;
                        return [4 /*yield*/, newRecipe.save()];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, { id: newRecipe.id }];
                }
            });
        });
    };
    RecipeService.prototype.addItemToRecipe = function (_a, userId) {
        var recipeId = _a.recipeId, itemId = _a.itemId, weight = _a.weight, count = _a.count;
        return __awaiter(this, void 0, void 0, function () {
            var recipe, createItem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getOneRecipeOrFail(recipeId, userId)];
                    case 1:
                        recipe = _b.sent();
                        return [4 /*yield*/, this.listService.createItem({
                                itemId: itemId,
                                count: count,
                                weight: weight
                            })];
                    case 2:
                        createItem = _b.sent();
                        recipe.items.push(createItem);
                        return [4 /*yield*/, recipe.save()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, { id: createItem.id }];
                }
            });
        });
    };
    RecipeService.prototype.editNamedRecipe = function (_a, userId) {
        var id = _a.id, name = _a.name;
        return __awaiter(this, void 0, void 0, function () {
            var recipe;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getOneRecipeOrFail(id, userId)];
                    case 1:
                        recipe = _b.sent();
                        return [4 /*yield*/, this.noRecipeNameOrFail(userId, name)];
                    case 2:
                        _b.sent();
                        recipe.name = name;
                        return [4 /*yield*/, recipe.save()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, { message: "Recipe has been updated!" }];
                }
            });
        });
    };
    RecipeService.prototype.deleteRecipe = function (recipeId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var recipe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getOneRecipeOrFail(recipeId, userId)];
                    case 1:
                        recipe = _a.sent();
                        return [4 /*yield*/, recipe.remove()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: "Recipe has been remove!" }];
                }
            });
        });
    };
    RecipeService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)((0, common_1.forwardRef)(function () { return list_service_1.ListService; })))
    ], RecipeService);
    return RecipeService;
}());
exports.RecipeService = RecipeService;
