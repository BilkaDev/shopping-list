"use strict";
exports.__esModule = true;
exports.multerFileFilter = exports.multerStorage = exports.storageDir = void 0;
var path = require("path");
var multer_1 = require("multer");
var uuid_1 = require("uuid");
var common_1 = require("@nestjs/common");
var MIME_TYPE_MAP;
(function (MIME_TYPE_MAP) {
    MIME_TYPE_MAP["image/png"] = "png";
    MIME_TYPE_MAP["image/jpeg"] = "jpeg";
    MIME_TYPE_MAP["image/jpg"] = "jpg";
})(MIME_TYPE_MAP || (MIME_TYPE_MAP = {}));
function storageDir() {
    return path.join(__dirname, "../../../src/storage");
}
exports.storageDir = storageDir;
function multerStorage(dest) {
    return (0, multer_1.diskStorage)({
        destination: function (req, file, cb) { return cb(null, dest); },
        filename: function (req, file, cb) {
            var ext = MIME_TYPE_MAP[file.mimetype];
            return cb(null, "".concat((0, uuid_1.v4)(), ".").concat(ext));
        }
    });
}
exports.multerStorage = multerStorage;
function multerFileFilter(req, file, cb) {
    var isValid = !!MIME_TYPE_MAP[file.mimetype];
    if (!isValid) {
        cb(new common_1.BadRequestException("Unsupported file type"), false);
    }
    else {
        cb(null, true);
    }
}
exports.multerFileFilter = multerFileFilter;
