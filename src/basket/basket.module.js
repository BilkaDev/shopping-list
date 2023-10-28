"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.BasketModule = void 0;
var common_1 = require("@nestjs/common");
var basket_controller_1 = require("./basket.controller");
var basket_service_1 = require("./basket.service");
var list_module_1 = require("../list/list.module");
var BasketModule = /** @class */ (function () {
    function BasketModule() {
    }
    BasketModule = __decorate([
        (0, common_1.Module)({
            controllers: [basket_controller_1.BasketController],
            providers: [basket_service_1.BasketService],
            imports: [(0, common_1.forwardRef)(function () { return list_module_1.ListModule; })],
            exports: [basket_service_1.BasketService]
        })
    ], BasketModule);
    return BasketModule;
}());
exports.BasketModule = BasketModule;
