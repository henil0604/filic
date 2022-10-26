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
var Filic_2 = require("./Filic");
var Directory_1 = require("./Directory");
var Entity = /** @class */ (function () {
    function Entity(options) {
        var _a;
        this.options = __assign({}, options);
        if (!this.options.Filic || this.options.Filic instanceof Filic_2.default === false) {
            this.options.Filic = Filic_2.default.create(Path.dirname(this.options.path));
        }
        this.path = this.options.path;
        this.type = this.options.type;
        if (this.path.includes("/")) {
            var entities = this.path.split('/');
            var currentEntity = null;
            for (var i = 0; i < entities.length; i++) {
                var entity = entities[i];
                if (currentEntity) {
                    if (i === entities.length - 1 && this.type === Filic_1.EntityTypes.FILE) {
                        currentEntity = currentEntity.openFile(entity);
                    }
                    else {
                        currentEntity = currentEntity.openDir(entity);
                    }
                }
                else {
                    currentEntity = this.Filic.openDir(entity);
                }
            }
            return currentEntity;
        }
        if (!this.exists && this.options.autoCreate) {
            (_a = this.createSync) === null || _a === void 0 ? void 0 : _a.call(this, {
                recursive: true
            });
        }
    }
    Entity.prototype.createSync = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
    };
    Object.defineProperty(Entity.prototype, "absolutePath", {
        get: function () {
            return this.Filic.ResolvePath(this.path);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "Filic", {
        get: function () {
            return this.options.Filic;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "exists", {
        get: function () {
            return fs.existsSync(this.absolutePath);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Entity.prototype, "parentDir", {
        get: function () {
            return Directory_1.default.create({
                path: Path.basename(Path.dirname(this.absolutePath)),
                Filic: Filic_2.default.create(Path.dirname(Path.dirname(this.absolutePath))),
                type: Filic_1.EntityTypes.DIR
            });
        },
        enumerable: false,
        configurable: true
    });
    // Detect type of entity based on its stats
    Entity.detectTypeWithPath = function (path) {
        if (!fs.existsSync(path))
            return null;
        return Entity.getEntityStats(path).isDirectory() ? Filic_1.EntityTypes.DIR : Filic_1.EntityTypes.FILE;
    };
    // Getting stats from fs.statSync
    Entity.getEntityStats = function (path) {
        return fs.statSync(path);
    };
    Entity.create = function (options) {
        return new Entity(options);
    };
    return Entity;
}());
exports.default = Entity;
