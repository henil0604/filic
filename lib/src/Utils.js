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
    Utils.Try = function (callback) {
        return function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            try {
                return callback === null || callback === void 0 ? void 0 : callback.apply(void 0, args);
            }
            catch (e) {
                return null;
            }
        };
    };
    return Utils;
}());
export default Utils;
