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
import * as Path from 'path';
import * as fs from 'fs';
import { EntityTypes } from '../types/Filic';
import Entity from './Entity';
import Directory from './Directory';
import File from './File';
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
            opts.type = Entity.detectTypeWithPath(absolutePath) || EntityTypes.FILE;
        }
        if (opts.type === EntityTypes.DIR) {
            return Directory.create(__assign({ path: path, Filic: this, autoCreate: true }, opts.EntityOptions));
        }
        if (opts.type === EntityTypes.FILE) {
            return File.create(__assign({ path: path, Filic: this, autoCreate: true }, opts.EntityOptions));
        }
    };
    Filic.prototype.openDir = function (path, options) {
        return this.open(path, {
            EntityOptions: __assign({}, options),
            type: EntityTypes.DIR
        });
    };
    Filic.prototype.openFile = function (path, options) {
        return this.open(path, {
            EntityOptions: __assign({}, options),
            type: EntityTypes.FILE
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
            return Entity;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Filic, "Directory", {
        get: function () {
            return Directory;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Filic, "File", {
        get: function () {
            return File;
        },
        enumerable: false,
        configurable: true
    });
    return Filic;
}());
export default Filic;
