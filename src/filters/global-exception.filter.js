"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.GlobalExceptionFilter = void 0;
var common_1 = require("@nestjs/common");
var GlobalExceptionFilter = /** @class */ (function () {
    function GlobalExceptionFilter() {
    }
    GlobalExceptionFilter.prototype["catch"] = function (exception, host) {
        var _a;
        var ctx = host.switchToHttp();
        var response = ctx.getResponse();
        var request = ctx.getRequest();
        var status = exception instanceof common_1.HttpException ? exception.getStatus() : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        console.error(exception === null || exception === void 0 ? void 0 : exception.message);
        console.error(exception);
        if (status === 500) {
            return response.status(500).json({
                status: status,
                message: (_a = exception === null || exception === void 0 ? void 0 : exception.message) !== null && _a !== void 0 ? _a : "Please try again in a few minutes."
            });
        }
        else {
            return response.status(status).json({
                status: status,
                message: exception.response.message instanceof Array ? exception.response.message[0] : exception.message
            });
        }
    };
    GlobalExceptionFilter = __decorate([
        (0, common_1.Catch)()
    ], GlobalExceptionFilter);
    return GlobalExceptionFilter;
}());
exports.GlobalExceptionFilter = GlobalExceptionFilter;
