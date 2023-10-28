"use strict";
exports.__esModule = true;
exports.UserObj = void 0;
var common_1 = require("@nestjs/common");
exports.UserObj = (0, common_1.createParamDecorator)(function (data, context) {
    return context.switchToHttp().getRequest().user;
});
