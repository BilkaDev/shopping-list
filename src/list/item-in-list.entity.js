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
exports.ItemInList = void 0;
var typeorm_1 = require("typeorm");
var list_entity_1 = require("./list.entity");
var product_entity_1 = require("../product/product.entity");
var recipe_entity_1 = require("../recipe/recipe.entity");
var basket_entity_1 = require("../basket/basket.entity");
var ItemInList = /** @class */ (function (_super) {
    __extends(ItemInList, _super);
    function ItemInList() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
    ], ItemInList.prototype, "id");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return product_entity_1.Product; }, function (entity) { return entity.items; }, { eager: true, onDelete: "CASCADE" }),
        (0, typeorm_1.JoinColumn)()
    ], ItemInList.prototype, "product");
    __decorate([
        (0, typeorm_1.Column)({
            "default": 0
        })
    ], ItemInList.prototype, "count");
    __decorate([
        (0, typeorm_1.Column)({
            "default": 0
        })
    ], ItemInList.prototype, "weight");
    __decorate([
        (0, typeorm_1.Column)({
            "default": false
        })
    ], ItemInList.prototype, "itemInBasket");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return list_entity_1.List; }, function (entity) { return entity.items; }, {
            onDelete: "CASCADE"
        }),
        (0, typeorm_1.JoinColumn)()
    ], ItemInList.prototype, "list");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return recipe_entity_1.Recipe; }, function (entity) { return entity.items; }, {
            onDelete: "CASCADE"
        })
    ], ItemInList.prototype, "recipe");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return basket_entity_1.Basket; }, function (entity) { return entity.item; })
    ], ItemInList.prototype, "basket");
    ItemInList = __decorate([
        (0, typeorm_1.Entity)()
    ], ItemInList);
    return ItemInList;
}(typeorm_1.BaseEntity));
exports.ItemInList = ItemInList;
