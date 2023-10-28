"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AppModule = void 0;
var common_1 = require("@nestjs/common");
var product_module_1 = require("./product/product.module");
var list_module_1 = require("./list/list.module");
var recipe_module_1 = require("./recipe/recipe.module");
var database_module_1 = require("./database/database.module");
var user_module_1 = require("./user/user.module");
var auth_module_1 = require("./auth/auth.module");
var config_1 = require("@nestjs/config");
var mail_module_1 = require("./mail/mail.module");
var basket_module_1 = require("./basket/basket.module");
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        (0, common_1.Module)({
            imports: [
                database_module_1.DatabaseModule,
                product_module_1.ProductModule,
                list_module_1.ListModule,
                recipe_module_1.RecipeModule,
                user_module_1.UserModule,
                auth_module_1.AuthModule,
                config_1.ConfigModule.forRoot({
                    isGlobal: true
                }),
                mail_module_1.MailModule,
                basket_module_1.BasketModule,
            ]
        })
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
