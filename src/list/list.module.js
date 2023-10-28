"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.ListModule = void 0;
var common_1 = require("@nestjs/common");
var list_controller_1 = require("./list.controller");
var list_service_1 = require("./list.service");
var product_module_1 = require("../product/product.module");
var recipe_module_1 = require("../recipe/recipe.module");
var basket_module_1 = require("../basket/basket.module");
var ListModule = /** @class */ (function () {
    function ListModule() {
    }
    ListModule = __decorate([
        (0, common_1.Module)({
            imports: [(0, common_1.forwardRef)(function () { return basket_module_1.BasketModule; }), product_module_1.ProductModule, recipe_module_1.RecipeModule],
            controllers: [list_controller_1.ListController],
            providers: [list_service_1.ListService],
            exports: [list_service_1.ListService]
        })
    ], ListModule);
    return ListModule;
}());
exports.ListModule = ListModule;
