"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Utils {
    constructor() { }
    static ByteArrayToString(byteArray) {
        let string = '';
        for (const code of byteArray) {
            string += String.fromCharCode(code);
        }
        return string;
    }
    static StringToByteArray(string) {
        let ByteArray = [];
        for (var i = 0; i < string.length; i++) {
            var code = string.charCodeAt(i);
            ByteArray.push(code);
        }
        return ByteArray;
    }
    static Try(callback) {
        return (...args) => {
            try {
                return callback === null || callback === void 0 ? void 0 : callback(...args);
            }
            catch (e) {
                return null;
            }
        };
    }
}
exports.default = Utils;
