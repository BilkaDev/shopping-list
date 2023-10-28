"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Basket = void 0;
var typeorm_1 = require("typeorm");
var list_entity_1 = require("../list/list.entity");
var item_in_list_entity_1 = require("../list/item-in-list.entity");
var Basket = /** @class */ (function (_super) {
    __extends(Basket, _super);
    function Basket() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
    ], Basket.prototype, "id");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return list_entity_1.List; }, {
            onDelete: "CASCADE"
        })
    ], Basket.prototype, "list");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return item_in_list_entity_1.ItemInList; }, function (entity) { return entity.basket; }, { eager: true, onDelete: "CASCADE" })
    ], Basket.prototype, "item");
    Basket = __decorate([
        (0, typeorm_1.Entity)()
    ], Basket);
    return Basket;
}(typeorm_1.BaseEntity));
exports.Basket = Basket;
