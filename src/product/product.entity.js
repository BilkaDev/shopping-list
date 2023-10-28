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
exports.Product = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../user/user.entity");
var item_in_list_entity_1 = require("../list/item-in-list.entity");
var Product = /** @class */ (function (_super) {
    __extends(Product, _super);
    function Product() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)("uuid")
    ], Product.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({
            length: 50,
            nullable: false
        })
    ], Product.prototype, "name");
    __decorate([
        (0, typeorm_1.Column)({
            "default": 0
        })
    ], Product.prototype, "category");
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return item_in_list_entity_1.ItemInList; }, function (entity) { return entity.product; })
    ], Product.prototype, "items");
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return user_entity_1.User; }, function (entity) { return entity.products; }),
        (0, typeorm_1.JoinColumn)()
    ], Product.prototype, "user");
    Product = __decorate([
        (0, typeorm_1.Entity)()
    ], Product);
    return Product;
}(typeorm_1.BaseEntity));
exports.Product = Product;
