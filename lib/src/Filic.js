"use strict";
exports.__esModule = true;
var Path = require("path");
var fs = require("fs");
var Filic = /** @class */ (function () {
    function Filic(BasePath) {
        if (!BasePath) {
            this.BasePath = process.cwd();
        }
        else {
            this.BasePath = BasePath;
        }
        if (!fs.existsSync(this.BasePath)) {
            fs.mkdirSync(this.BasePath);
        }
        if (fs.statSync(this.BasePath).isDirectory() === false) {
            throw new Error("".concat(this.BasePath, " is not a directory"));
        }
    }
    // Path Resolver
    // Appends the given path to BasePath
    Filic.prototype.ResolvePath = function (path) {
        return Path.resolve(this.BasePath, path);
    };
    // Static Initializer function
    Filic.create = function (BasePath) {
        return new Filic(BasePath);
    };
    return Filic;
}());
exports["default"] = Filic;
