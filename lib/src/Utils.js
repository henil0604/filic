"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Utils = /** @class */ (function () {
    function Utils() {
    }
    Utils.ByteArrayToString = function (byteArray) {
        var string = '';
        for (var _i = 0, byteArray_1 = byteArray; _i < byteArray_1.length; _i++) {
            var code = byteArray_1[_i];
            string += String.fromCharCode(code);
        }
        return string;
    };
    Utils.StringToByteArray = function (string) {
        var ByteArray = [];
        for (var i = 0; i < string.length; i++) {
            var code = string.charCodeAt(i);
            ByteArray.push(code);
        }
        return ByteArray;
    };
    return Utils;
}());
exports.default = Utils;
