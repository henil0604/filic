"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
Object.defineProperty(exports, "__esModule", { value: true });
var Filic_1 = require("../types/Filic");
var Entity_1 = require("./Entity");
var Filic_2 = require("./Filic");
var File_1 = require("./File");
var fs = require("fs");
var Path = require("path");
var Directory = /** @class */ (function (_super) {
    __extends(Directory, _super);
    function Directory(options) {
        return _super.call(this, __assign(__assign({}, options), { type: Filic_1.EntityTypes.DIR })) || this;
    }
    // Create Method
    Directory.prototype.create = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.promises.mkdir(this.absolutePath, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Directory.prototype.createSync = function (options) {
        fs.mkdirSync(this.absolutePath, options);
        return this;
    };
    // Delete Method
    Directory.prototype.deleteSelf = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.promises.rm(this.absolutePath, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Directory.prototype.deleteSelfSync = function (options) {
        fs.rmSync(this.absolutePath, options);
        return this;
    };
    // List All Entities (Raw File Names)
    Directory.prototype.listRaw = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.promises.readdir(this.absolutePath, { withFileTypes: false })];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    Directory.prototype.listRawSync = function () {
        return fs.readdirSync(this.absolutePath, { withFileTypes: false });
    };
    // List Entities with their instance created
    Directory.prototype.list = function () {
        return __awaiter(this, void 0, void 0, function () {
            var entities, rawList, _i, rawList_1, entity, absolutePath, type, caller, entityInstance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        entities = [];
                        return [4 /*yield*/, this.listRaw()];
                    case 1:
                        rawList = _a.sent();
                        for (_i = 0, rawList_1 = rawList; _i < rawList_1.length; _i++) {
                            entity = rawList_1[_i];
                            absolutePath = this.ResolvePath(entity);
                            type = Entity_1.default.detectTypeWithPath(absolutePath);
                            caller = (type === Filic_1.EntityTypes.DIR) ? this.openDir : this.openFile;
                            entityInstance = caller.call(this, entity);
                            entities.push(entityInstance);
                        }
                        return [2 /*return*/, entities];
                }
            });
        });
    };
    Directory.prototype.listSync = function () {
        var entities = [];
        var rawList = this.listRawSync();
        for (var _i = 0, rawList_2 = rawList; _i < rawList_2.length; _i++) {
            var entity = rawList_2[_i];
            var absolutePath = this.ResolvePath(entity);
            var type = Entity_1.default.detectTypeWithPath(absolutePath);
            var caller = (type === Filic_1.EntityTypes.DIR) ? this.openDir : this.openFile;
            var entityInstance = caller.call(this, entity);
            entities.push(entityInstance);
        }
        return entities;
    };
    // deletes a directory
    Directory.prototype.deleteDir = function (path, openDirOptions, deleteSelfOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (path instanceof Directory === false) {
                            instance = this.openDir(path, __assign({ autoCreate: false }, openDirOptions));
                        }
                        return [4 /*yield*/, instance.deleteSelf(deleteSelfOptions)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Directory.prototype.deleteDirSync = function (path, openDirOptions, deleteSelfOptions) {
        var instance;
        if (path instanceof Directory === false) {
            instance = this.openDir(path, __assign({ autoCreate: false }, openDirOptions));
        }
        instance.deleteSelfSync(deleteSelfOptions);
        return this;
    };
    // deletes a file 
    Directory.prototype.deleteFile = function (path, openFileOptions, deleteOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var instance;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (path instanceof File_1.default === false) {
                            instance = this.openFile(path, __assign({ autoCreate: false }, openFileOptions));
                        }
                        return [4 /*yield*/, instance.delete(deleteOptions)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Directory.prototype.deleteFileSync = function (path, openFileOptions, deleteOptions) {
        var instance;
        if (path instanceof File_1.default === false) {
            instance = this.openFile(path, __assign({ autoCreate: false }, openFileOptions));
        }
        instance.deleteSync(deleteOptions);
        return this;
    };
    // Clear Directory
    Directory.prototype.clear = function () {
        return __awaiter(this, void 0, void 0, function () {
            var list, _i, list_1, entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.list()];
                    case 1:
                        list = _a.sent();
                        _i = 0, list_1 = list;
                        _a.label = 2;
                    case 2:
                        if (!(_i < list_1.length)) return [3 /*break*/, 7];
                        entity = list_1[_i];
                        if (!(entity.type === Filic_1.EntityTypes.DIR)) return [3 /*break*/, 4];
                        return [4 /*yield*/, entity.deleteSelf({ force: true, recursive: true })];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(entity.type === Filic_1.EntityTypes.FILE)) return [3 /*break*/, 6];
                        return [4 /*yield*/, entity.delete()];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, this];
                }
            });
        });
    };
    Directory.prototype.clearSync = function () {
        var list = this.listSync();
        for (var _i = 0, list_2 = list; _i < list_2.length; _i++) {
            var entity = list_2[_i];
            if (entity.type === Filic_1.EntityTypes.DIR) {
                entity.deleteSelfSync({ force: true, recursive: true });
            }
            if (entity.type === Filic_1.EntityTypes.FILE) {
                entity.deleteSync();
            }
        }
        return this;
    };
    Directory.prototype.has = function (path) {
        return fs.existsSync(this.ResolvePath(path));
    };
    Directory.prototype.copyAll = function (destination) {
        return __awaiter(this, void 0, void 0, function () {
            var list, _i, list_3, entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.list()];
                    case 1:
                        list = _a.sent();
                        _i = 0, list_3 = list;
                        _a.label = 2;
                    case 2:
                        if (!(_i < list_3.length)) return [3 /*break*/, 7];
                        entity = list_3[_i];
                        if (!(entity.type === Filic_1.EntityTypes.DIR)) return [3 /*break*/, 4];
                        return [4 /*yield*/, entity.copyAll(destination.openDir(entity.dirname))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(entity.type === Filic_1.EntityTypes.FILE)) return [3 /*break*/, 6];
                        return [4 /*yield*/, entity.copy(destination)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, this];
                }
            });
        });
    };
    Directory.prototype.copyAllSync = function (destination) {
        var list = this.listSync();
        for (var _i = 0, list_4 = list; _i < list_4.length; _i++) {
            var entity = list_4[_i];
            if (entity.type === Filic_1.EntityTypes.DIR) {
                entity.copyAllSync(destination.openDir(entity.dirname));
            }
            if (entity.type === Filic_1.EntityTypes.FILE) {
                entity.copySync(destination);
            }
        }
        return this;
    };
    Directory.prototype.copy = function (destination) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        destination = destination.openDir(this.dirname);
                        return [4 /*yield*/, this.copyAll(destination)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Directory.prototype.copySync = function (destination) {
        destination = destination.openDir(this.dirname);
        this.copyAllSync(destination);
        return this;
    };
    Directory.prototype.moveAll = function (destination) {
        return __awaiter(this, void 0, void 0, function () {
            var list, _i, list_5, entity;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.list()];
                    case 1:
                        list = _a.sent();
                        _i = 0, list_5 = list;
                        _a.label = 2;
                    case 2:
                        if (!(_i < list_5.length)) return [3 /*break*/, 7];
                        entity = list_5[_i];
                        if (!(entity.type === Filic_1.EntityTypes.DIR)) return [3 /*break*/, 4];
                        return [4 /*yield*/, entity.moveAll(destination.openDir(entity.dirname))];
                    case 3:
                        _a.sent();
                        _a.label = 4;
                    case 4:
                        if (!(entity.type === Filic_1.EntityTypes.FILE)) return [3 /*break*/, 6];
                        return [4 /*yield*/, entity.move(destination)];
                    case 5:
                        _a.sent();
                        _a.label = 6;
                    case 6:
                        _i++;
                        return [3 /*break*/, 2];
                    case 7: return [2 /*return*/, this];
                }
            });
        });
    };
    Directory.prototype.moveAllSync = function (destination) {
        var list = this.listSync();
        for (var _i = 0, list_6 = list; _i < list_6.length; _i++) {
            var entity = list_6[_i];
            if (entity.type === Filic_1.EntityTypes.DIR) {
                entity.moveAllSync(destination.openDir(entity.dirname));
            }
            if (entity.type === Filic_1.EntityTypes.FILE) {
                entity.moveSync(destination);
            }
        }
        return this;
    };
    Directory.prototype.move = function (destination) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        destination = destination.openDir(this.dirname);
                        return [4 /*yield*/, this.moveAll(destination)];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, this.deleteSelf({ force: true, recursive: true })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Directory.prototype.moveSync = function (destination) {
        destination = destination.openDir(this.dirname);
        this.moveAllSync(destination);
        this.deleteSelfSync({ force: true, recursive: true });
        return this;
    };
    Directory.prototype.secondCopy = function (dirname) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.copyAll(this.parentDir.openDir(dirname))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    Directory.prototype.secondCopySync = function (dirname) {
        this.copyAllSync(this.parentDir.openDir(dirname));
        return this;
    };
    // Path Resolver
    // Appends the given path to absolutePath
    Directory.prototype.ResolvePath = function (path) {
        return Path.resolve(this.absolutePath, path);
    };
    // Open Directory inside a directory
    Directory.prototype.openDir = function (path, options) {
        return this.toFilic().openDir(path, __assign({ Filic: this.toFilic() }, options));
    };
    // Open File inside a directory
    Directory.prototype.openFile = function (path, options) {
        return this.toFilic().openFile(path, __assign({ Filic: this.toFilic() }, options));
    };
    // convert directory to filic instance
    Directory.prototype.toFilic = function () {
        return Filic_2.default.create(this.absolutePath);
    };
    Object.defineProperty(Directory.prototype, "dirname", {
        get: function () {
            return Path.basename(this.absolutePath);
        },
        enumerable: false,
        configurable: true
    });
    // create new instance
    Directory.create = function (options) {
        return new Directory(options);
    };
    return Directory;
}(Entity_1.default));
exports.default = Directory;
