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
exports.ListService = void 0;
var common_1 = require("@nestjs/common");
var list_entity_1 = require("./list.entity");
var product_service_1 = require("../product/product.service");
var item_in_list_entity_1 = require("./item-in-list.entity");
var recipe_service_1 = require("../recipe/recipe.service");
var typeorm_1 = require("typeorm");
var basket_service_1 = require("../basket/basket.service");
var basket_entity_1 = require("../basket/basket.entity");
var ListService = /** @class */ (function () {
    function ListService(productService, recipeService, basketService) {
        this.productService = productService;
        this.recipeService = recipeService;
        this.basketService = basketService;
        this.setItemInBasket = function (item, baskets) {
            for (var _i = 0, baskets_1 = baskets; _i < baskets_1.length; _i++) {
                var basket = baskets_1[_i];
                if (item.id === basket.item.id) {
                    item.itemInBasket = true;
                    return;
                }
            }
        };
    }
    ListService.prototype.noListNameOrFail = function (userId, name) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, list_entity_1.List.findOne({
                            where: {
                                user: { id: userId },
                                listName: (0, typeorm_1.ILike)(name)
                            }
                        })];
                    case 1:
                        list = _a.sent();
                        if (list)
                            throw new common_1.BadRequestException("The given name is already taken.");
                        return [2 /*return*/, true];
                }
            });
        });
    };
    ListService.prototype.getListOrFail = function (listId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, list_entity_1.List.findOne({
                            where: {
                                id: listId,
                                user: { id: userId }
                            },
                            relations: ["items", "recipes", "recipes.items"]
                        })];
                    case 1:
                        list = _a.sent();
                        if (!list) {
                            throw new common_1.NotFoundException("List does not exist.");
                        }
                        return [2 /*return*/, list];
                }
            });
        });
    };
    ListService.prototype.getItemInListOrFail = function (id, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, item_in_list_entity_1.ItemInList.findOne({ where: { id: id, product: { user: { id: userId } } } })];
                    case 1:
                        item = _a.sent();
                        if (!item)
                            throw new common_1.NotFoundException("Product item does not exist.");
                        return [2 /*return*/, item];
                }
            });
        });
    };
    ListService.prototype.getUserLists = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var lists;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, list_entity_1.List.find({ where: { user: { id: userId } } })];
                    case 1:
                        lists = _a.sent();
                        return [2 /*return*/, { lists: lists }];
                }
            });
        });
    };
    ListService.prototype.getListResponse = function (listId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var list, baskets;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getListOrFail(listId, userId)];
                    case 1:
                        list = _a.sent();
                        return [4 /*yield*/, basket_entity_1.Basket.find({ where: { list: { id: listId } } })];
                    case 2:
                        baskets = _a.sent();
                        list.items.forEach(function (item) { return _this.setItemInBasket(item, baskets); });
                        list.recipes.forEach(function (recipe) { return recipe.items.forEach(function (item) { return _this.setItemInBasket(item, baskets); }); });
                        return [2 /*return*/, { list: list }];
                }
            });
        });
    };
    ListService.prototype.createList = function (_a, user) {
        var listName = _a.listName;
        return __awaiter(this, void 0, void 0, function () {
            var newList;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        newList = new list_entity_1.List();
                        return [4 /*yield*/, this.noListNameOrFail(user.id, listName)];
                    case 1:
                        _b.sent();
                        newList.listName = listName;
                        newList.user = user;
                        return [4 /*yield*/, newList.save()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, {
                                id: newList.id
                            }];
                }
            });
        });
    };
    ListService.prototype.deleteList = function (listId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getListOrFail(listId, userId)];
                    case 1:
                        list = _a.sent();
                        return [4 /*yield*/, list.remove()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: "List was deleted successfully!" }];
                }
            });
        });
    };
    ListService.prototype.editList = function (listId, _a, userId) {
        var listName = _a.listName;
        return __awaiter(this, void 0, void 0, function () {
            var affected;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.noListNameOrFail(userId, listName)];
                    case 1:
                        _b.sent();
                        return [4 /*yield*/, list_entity_1.List.update(listId, {
                                listName: listName
                            })];
                    case 2:
                        affected = (_b.sent()).affected;
                        if (affected)
                            return [2 /*return*/, { message: "List has been updated!" }];
                        else {
                            throw new common_1.NotFoundException("List does not exist.");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ListService.prototype.addItemToList = function (item, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var newItem, list, recipe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.createItem(item)];
                    case 1:
                        newItem = _a.sent();
                        if (!item.listId) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.getListOrFail(item.listId, userId)];
                    case 2:
                        list = _a.sent();
                        list.items.push(newItem);
                        return [4 /*yield*/, list.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, {
                                id: newItem.id
                            }];
                    case 4:
                        if (!item.recipeId) return [3 /*break*/, 7];
                        return [4 /*yield*/, this.recipeService.getOneRecipeOrFail(item.recipeId, userId)];
                    case 5:
                        recipe = _a.sent();
                        recipe.items.push(newItem);
                        return [4 /*yield*/, recipe.save()];
                    case 6:
                        _a.sent();
                        return [2 /*return*/, {
                                id: newItem.id
                            }];
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    ListService.prototype.createItem = function (_a) {
        var itemId = _a.itemId, count = _a.count, weight = _a.weight;
        return __awaiter(this, void 0, void 0, function () {
            var product, newItem;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.productService.getProductOrFail(itemId)];
                    case 1:
                        product = _b.sent();
                        newItem = new item_in_list_entity_1.ItemInList();
                        newItem.product = product;
                        newItem.count = count;
                        newItem.weight = weight;
                        return [4 /*yield*/, newItem.save()];
                    case 2:
                        _b.sent();
                        return [2 /*return*/, newItem];
                }
            });
        });
    };
    ListService.prototype.getListOfItems = function (userId) {
        return __awaiter(this, void 0, void 0, function () {
            var itemsList;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, item_in_list_entity_1.ItemInList.find({ where: { product: { user: { id: userId } } } })];
                    case 1:
                        itemsList = _a.sent();
                        return [2 /*return*/, { items: itemsList }];
                }
            });
        });
    };
    ListService.prototype.updateItemInList = function (itemId, _a, userId) {
        var count = _a.count, weight = _a.weight, category = _a.category;
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getItemInListOrFail(itemId, userId)];
                    case 1:
                        item = _b.sent();
                        item.count = count;
                        item.weight = weight;
                        item.product.category = category;
                        return [4 /*yield*/, item.product.save()];
                    case 2:
                        _b.sent();
                        return [4 /*yield*/, item.save()];
                    case 3:
                        _b.sent();
                        return [2 /*return*/, { message: "Product has been updated!" }];
                }
            });
        });
    };
    ListService.prototype.deleteItemInList = function (itemId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getItemInListOrFail(itemId, userId)];
                    case 1:
                        item = _a.sent();
                        return [4 /*yield*/, item.remove()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: "Product has been remove!" }];
                }
            });
        });
    };
    ListService.prototype.clearList = function (listId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var list, _i, _a, item;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, this.getListOrFail(listId, userId)];
                    case 1:
                        list = _b.sent();
                        _i = 0, _a = list.items;
                        _b.label = 2;
                    case 2:
                        if (!(_i < _a.length)) return [3 /*break*/, 5];
                        item = _a[_i];
                        return [4 /*yield*/, item.remove()];
                    case 3:
                        _b.sent();
                        _b.label = 4;
                    case 4:
                        _i++;
                        return [3 /*break*/, 2];
                    case 5: return [4 /*yield*/, list.save()];
                    case 6:
                        _b.sent();
                        return [2 /*return*/, { message: "List has been cleared!" }];
                }
            });
        });
    };
    ListService.prototype.addRecipeToList = function (listId, recipeId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var list, recipe;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getListOrFail(listId, userId)];
                    case 1:
                        list = _a.sent();
                        return [4 /*yield*/, this.recipeService.getOneRecipeOrFail(recipeId, userId)];
                    case 2:
                        recipe = _a.sent();
                        list.recipes.push(recipe);
                        return [4 /*yield*/, list.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, { message: "Recipe has been added!" }];
                }
            });
        });
    };
    ListService.prototype.deleteRecipeFromList = function (listId, recipeId, userId) {
        return __awaiter(this, void 0, void 0, function () {
            var list;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getListOrFail(listId, userId)];
                    case 1:
                        list = _a.sent();
                        list.recipes = list.recipes.filter(function (recipeInList) {
                            return recipeInList.id !== recipeId;
                        });
                        return [4 /*yield*/, list.save()];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, { message: "Recipe has been remove!" }];
                }
            });
        });
    };
    ListService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, common_1.Inject)(product_service_1.ProductService)),
        __param(1, (0, common_1.Inject)(recipe_service_1.RecipeService)),
        __param(2, (0, common_1.Inject)((0, common_1.forwardRef)(function () { return basket_service_1.BasketService; })))
    ], ListService);
    return ListService;
}());
exports.ListService = ListService;
