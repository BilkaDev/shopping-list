"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.RecipeModule = void 0;
var common_1 = require("@nestjs/common");
var recipe_controller_1 = require("./recipe.controller");
var recipe_service_1 = require("./recipe.service");
var list_module_1 = require("../list/list.module");
var RecipeModule = /** @class */ (function () {
    function RecipeModule() {
    }
    RecipeModule = __decorate([
        (0, common_1.Module)({
            imports: [(0, common_1.forwardRef)(function () { return list_module_1.ListModule; })],
            controllers: [recipe_controller_1.RecipeController],
            providers: [recipe_service_1.RecipeService],
            exports: [recipe_service_1.RecipeService]
        })
    ], RecipeModule);
    return RecipeModule;
}());
exports.RecipeModule = RecipeModule;
