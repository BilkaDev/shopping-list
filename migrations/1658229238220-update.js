"use strict";
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
exports.update1658229238220 = void 0;
var update1658229238220 = /** @class */ (function () {
    function update1658229238220() {
        this.name = 'update1658229238220';
    }
    update1658229238220.prototype.up = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("CREATE TABLE `recipe` (`id` varchar(36) NOT NULL, `name` varchar(100) NOT NULL, `description` text NOT NULL, `userId` varchar(36) NULL, PRIMARY KEY (`id`)) ENGINE=InnoDB")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_329b8ae12068b23da547d3b4798`")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `product` CHANGE `userId` `userId` varchar(36) NULL")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `list` DROP FOREIGN KEY `FK_46ded14b26382088c9f032f8953`")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `list` CHANGE `userId` `userId` varchar(36) NULL")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` DROP FOREIGN KEY `FK_0f0fcdebe059aa8ae3ed0fed503`")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` DROP FOREIGN KEY `FK_7f6cca577485a5fb130e09c2a22`")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` DROP FOREIGN KEY `FK_d636b087c9976dbea910f182464`")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` CHANGE `productId` `productId` varchar(36) NULL")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` CHANGE `listId` `listId` varchar(36) NULL")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` CHANGE `recipeId` `recipeId` varchar(36) NULL")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_329b8ae12068b23da547d3b4798` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `recipe` ADD CONSTRAINT `FK_fe30fdc515f6c94d39cd4bbfa76` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `list` ADD CONSTRAINT `FK_46ded14b26382088c9f032f8953` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` ADD CONSTRAINT `FK_0f0fcdebe059aa8ae3ed0fed503` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` ADD CONSTRAINT `FK_7f6cca577485a5fb130e09c2a22` FOREIGN KEY (`listId`) REFERENCES `list`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` ADD CONSTRAINT `FK_d636b087c9976dbea910f182464` FOREIGN KEY (`recipeId`) REFERENCES `recipe`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION")];
                    case 17:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    update1658229238220.prototype.down = function (queryRunner) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` DROP FOREIGN KEY `FK_d636b087c9976dbea910f182464`")];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` DROP FOREIGN KEY `FK_7f6cca577485a5fb130e09c2a22`")];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` DROP FOREIGN KEY `FK_0f0fcdebe059aa8ae3ed0fed503`")];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `list` DROP FOREIGN KEY `FK_46ded14b26382088c9f032f8953`")];
                    case 4:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `recipe` DROP FOREIGN KEY `FK_fe30fdc515f6c94d39cd4bbfa76`")];
                    case 5:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `product` DROP FOREIGN KEY `FK_329b8ae12068b23da547d3b4798`")];
                    case 6:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` CHANGE `recipeId` `recipeId` varchar(36) NULL DEFAULT 'NULL'")];
                    case 7:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` CHANGE `listId` `listId` varchar(36) NULL DEFAULT 'NULL'")];
                    case 8:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` CHANGE `productId` `productId` varchar(36) NULL DEFAULT 'NULL'")];
                    case 9:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` ADD CONSTRAINT `FK_d636b087c9976dbea910f182464` FOREIGN KEY (`recipeId`) REFERENCES `recipe`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION")];
                    case 10:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` ADD CONSTRAINT `FK_7f6cca577485a5fb130e09c2a22` FOREIGN KEY (`listId`) REFERENCES `list`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION")];
                    case 11:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `item_in_list` ADD CONSTRAINT `FK_0f0fcdebe059aa8ae3ed0fed503` FOREIGN KEY (`productId`) REFERENCES `product`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION")];
                    case 12:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `list` CHANGE `userId` `userId` varchar(36) NULL DEFAULT 'NULL'")];
                    case 13:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `list` ADD CONSTRAINT `FK_46ded14b26382088c9f032f8953` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 14:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `product` CHANGE `userId` `userId` varchar(36) NULL DEFAULT 'NULL'")];
                    case 15:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("ALTER TABLE `product` ADD CONSTRAINT `FK_329b8ae12068b23da547d3b4798` FOREIGN KEY (`userId`) REFERENCES `user`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION")];
                    case 16:
                        _a.sent();
                        return [4 /*yield*/, queryRunner.query("DROP TABLE `recipe`")];
                    case 17:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    return update1658229238220;
}());
exports.update1658229238220 = update1658229238220;
