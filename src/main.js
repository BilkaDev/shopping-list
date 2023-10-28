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
var core_1 = require("@nestjs/core");
var app_module_1 = require("./app.module");
var common_1 = require("@nestjs/common");
var global_exception_filter_1 = require("./filters/global-exception.filter");
var cookieParser = require("cookie-parser");
var api_transform_interceptors_1 = require("./interceptors/api-transform.interceptors");
var client_config_1 = require("./config/client-config");
var checkEnvironment = function () {
    var errorsMessages = [];
    /** ENV FOR CONNECT WITH DATABASE*/
    if (!process.env.DB_TYPE)
        errorsMessages.push("environment variable name=DB_TYPE not specified");
    if (!process.env.DB_HOST)
        errorsMessages.push("environment variable name=DB_HOST not specified");
    if (!process.env.DB_USERNAME)
        errorsMessages.push("environment variable name=DB_USERNAME not specified");
    if (!process.env.DB_PASSWORD)
        errorsMessages.push("environment variable name=DB_PASSWORD not specified");
    if (!process.env.DB_DATABASE)
        errorsMessages.push("environment variable name=DB_DATABASE not specified");
    /** ENV FOR CONNECT WITH CLIENT*/
    if (!process.env.FE_DOMAIN)
        errorsMessages.push("environment variable name=FE_DOMAIN not specified");
    if (!process.env.FE_SSL)
        errorsMessages.push("environment variable name=FE_SSL not specified");
    if (!process.env.FE_CORS_ORIGIN)
        errorsMessages.push("environment variable name=FE_CORS_ORIGIN not specified");
    if (errorsMessages.length > 0) {
        throw new Error(errorsMessages.join("\n"));
    }
};
checkEnvironment();
function bootstrap() {
    return __awaiter(this, void 0, void 0, function () {
        var app;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, core_1.NestFactory.create(app_module_1.AppModule)];
                case 1:
                    app = _a.sent();
                    app.setGlobalPrefix("api");
                    app.enableCors({
                        origin: client_config_1.CONFIG.corsOrigin,
                        credentials: true
                    });
                    app.useGlobalPipes(new common_1.ValidationPipe({
                        disableErrorMessages: true,
                        whitelist: true,
                        forbidNonWhitelisted: true,
                        transformOptions: { enableImplicitConversion: true },
                        transform: true,
                        forbidUnknownValues: true
                    }));
                    app.useGlobalFilters(new global_exception_filter_1.GlobalExceptionFilter());
                    app.useGlobalInterceptors(new api_transform_interceptors_1.ApiTransformInterceptor());
                    app.use(cookieParser());
                    return [4 /*yield*/, app.listen(3002)];
                case 2:
                    _a.sent();
                    return [2 /*return*/];
            }
        });
    });
}
bootstrap();
