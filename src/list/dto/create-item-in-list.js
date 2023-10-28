"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CreateItemInListDto = void 0;
var class_validator_1 = require("class-validator");
var CreateItemInListDto = /** @class */ (function () {
    function CreateItemInListDto() {
    }
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsOptional)()
    ], CreateItemInListDto.prototype, "listId");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)(),
        (0, class_validator_1.IsOptional)()
    ], CreateItemInListDto.prototype, "recipeId");
    __decorate([
        (0, class_validator_1.IsString)(),
        (0, class_validator_1.IsNotEmpty)()
    ], CreateItemInListDto.prototype, "itemId");
    __decorate([
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.Min)(0),
        (0, class_validator_1.Max)(1000)
    ], CreateItemInListDto.prototype, "count");
    __decorate([
        (0, class_validator_1.IsInt)(),
        (0, class_validator_1.Min)(0),
        (0, class_validator_1.Max)(1000000)
    ], CreateItemInListDto.prototype, "weight");
    return CreateItemInListDto;
}());
exports.CreateItemInListDto = CreateItemInListDto;