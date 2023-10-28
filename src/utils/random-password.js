"use strict";
exports.__esModule = true;
exports.randomPassword = void 0;
var randomPassword = function (length) {
    if (length === void 0) { length = 12; }
    var chars = "0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    var passwordLength = length;
    var password = "";
    for (var i = 0; i <= passwordLength; i++) {
        var randomNumber = Math.floor(Math.random() * chars.length);
        password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
};
exports.randomPassword = randomPassword;
