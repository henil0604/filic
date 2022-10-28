"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var Path = require("path");
var fs = require("fs");
var Filic_1 = require("../types/Filic");
var Entity_1 = require("./Entity");
var Directory_1 = require("./Directory");
var File_1 = require("./File");
var Filic = /** @class */ (function () {
    function Filic(BasePath) {
        // Checking if BasePath is provided
        if (!BasePath) {
            // if not just set it to current working directory
            this.BasePath = process.cwd();
        }
        else {
            // otherwise make it public
            this.BasePath = BasePath;
        }
        // Checking if directory exists, if not create one
        if (!fs.existsSync(this.BasePath)) {
            fs.mkdirSync(this.BasePath);
        }
        // if given path is not directory, throw the error
        if (fs.statSync(this.BasePath).isDirectory() === false) {
            throw new Error("".concat(this.BasePath, " is not a directory"));
        }
    }
    // Open Method to open Files and Directories
    Filic.prototype.open = function (path, options) {
        // Resolving Absolute Path
        var absolutePath = this.ResolvePath(path);
        // Cloning Original options
        var opts = __assign({}, options);
        // Detecting Entity Type if not provide, still cant figure out? just giving it a FILE type
        if (!opts.type) {
            opts.type = Entity_1.default.detectTypeWithPath(absolutePath) || Filic_1.EntityTypes.FILE;
        }
        if (opts.type === Filic_1.EntityTypes.DIR) {
            return Directory_1.default.create(__assign({ path: path, Filic: this, autoCreate: true }, opts.EntityOptions));
        }
        if (opts.type === Filic_1.EntityTypes.FILE) {
            return File_1.default.create(__assign({ path: path, Filic: this, autoCreate: true }, opts.EntityOptions));
        }
    };
    Filic.prototype.openDir = function (path, options) {
        return this.open(path, {
            EntityOptions: __assign({}, options),
            type: Filic_1.EntityTypes.DIR
        });
    };
    Filic.prototype.openFile = function (path, options) {
        return this.open(path, {
            EntityOptions: __assign({}, options),
            type: Filic_1.EntityTypes.FILE
        });
    };
    // Path Resolver
    // Appends the given path to BasePath
    Filic.prototype.ResolvePath = function (path) {
        return Path.resolve(this.BasePath, path);
    };
    // Static Initializer function
    Filic.create = function (BasePath) {
        return new Filic(BasePath);
    };
    Object.defineProperty(Filic, "Entity", {
        get: function () {
            return Entity_1.default;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Filic, "Directory", {
        get: function () {
            return Directory_1.default;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Filic, "File", {
        get: function () {
            return File_1.default;
        },
        enumerable: false,
        configurable: true
    });
    return Filic;
}());
exports.default = Filic;
