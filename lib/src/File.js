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
var fs = require("fs");
var Path = require("path");
var Utils_1 = require("./Utils");
var File = /** @class */ (function (_super) {
    __extends(File, _super);
    function File(options) {
        return _super.call(this, __assign(__assign({}, options), { type: Filic_1.EntityTypes.FILE })) || this;
    }
    // Create Method
    File.prototype.create = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, fs.promises.appendFile(this.absolutePath, "", options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    File.prototype.createSync = function (options) {
        fs.appendFileSync(this.absolutePath, "", options);
        return this;
    };
    // Read Raw File
    File.prototype.readRaw = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.exists)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, fs.promises.readFile(this.absolutePath, __assign({ encoding: "utf8" }, options))];
                    case 1:
                        content = _a.sent();
                        return [2 /*return*/, content];
                }
            });
        });
    };
    File.prototype.readRawSync = function (options) {
        if (!this.exists)
            return null;
        var content = fs.readFileSync(this.absolutePath, __assign({ encoding: "utf8" }, options));
        return content;
    };
    // Read File
    File.prototype.read = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            var content;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.exists)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, this.readRaw(options)];
                    case 1:
                        content = _a.sent();
                        Object.getPrototypeOf(content).toJSON = Utils_1.default.Try(function () { return JSON.parse(content); });
                        Object.getPrototypeOf(content).toBuffer = Utils_1.default.Try(function () { return Buffer.from(content); });
                        return [2 /*return*/, content];
                }
            });
        });
    };
    File.prototype.readSync = function (options) {
        if (!this.exists)
            return null;
        var content = this.readRawSync(options);
        Object.getPrototypeOf(content).toJSON = Utils_1.default.Try(function () { return JSON.parse(content); });
        Object.getPrototypeOf(content).toBuffer = Utils_1.default.Try(function () { return Buffer.from(content); });
        return content;
    };
    File.prototype.append = function (content, readRawOptions, writeRawOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var readRaw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readRaw(readRawOptions)];
                    case 1:
                        readRaw = _a.sent();
                        readRaw += content;
                        return [4 /*yield*/, this.writeRaw(readRaw, writeRawOptions)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, readRaw];
                }
            });
        });
    };
    File.prototype.appendSync = function (content, readRawSyncOptions, writeRawSyncOptions) {
        var readRaw = this.readRawSync(readRawSyncOptions);
        readRaw += content;
        this.writeRawSync(readRaw, writeRawSyncOptions);
        return readRaw;
    };
    File.prototype.prepend = function (content, readRawOptions, writeRawOptions) {
        return __awaiter(this, void 0, void 0, function () {
            var readRaw;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.readRaw(readRawOptions)];
                    case 1:
                        readRaw = _a.sent();
                        content += readRaw;
                        return [4 /*yield*/, this.writeRaw(content, writeRawOptions)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, content];
                }
            });
        });
    };
    File.prototype.prependSync = function (content, readRawSyncOptions, writeRawSyncOptions) {
        var readRaw = this.readRawSync(readRawSyncOptions);
        content += readRaw;
        this.writeRawSync(content, writeRawSyncOptions);
        return content;
    };
    // Write Raw
    File.prototype.writeRaw = function (content, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.exists)
                            return [2 /*return*/, null];
                        return [4 /*yield*/, fs.promises.writeFile(this.absolutePath, content, __assign({ encoding: "utf8" }, options))];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    File.prototype.writeRawSync = function (content, options) {
        if (!this.exists)
            return null;
        fs.writeFileSync(this.absolutePath, content, __assign({ encoding: "utf8" }, options));
        return this;
    };
    // Write File
    File.prototype.write = function (content, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!this.exists)
                            return [2 /*return*/, null];
                        content = File.parseWrite(content);
                        return [4 /*yield*/, this.writeRaw(content, options)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    File.prototype.writeSync = function (content, options) {
        if (!this.exists)
            return null;
        content = File.parseWrite(content);
        this.writeRawSync(content, options);
        return this;
    };
    File.prototype.createReadStream = function (options) {
        return fs.createReadStream(this.absolutePath, options);
    };
    File.prototype.createWriteStream = function (options) {
        return fs.createWriteStream(this.absolutePath, options);
    };
    // Delete Method
    File.prototype.delete = function (options) {
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
    File.prototype.deleteSync = function (options) {
        fs.rmSync(this.absolutePath, options);
        return this;
    };
    File.prototype.copy = function (destination, filename, options) {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = __assign({ override: false }, options);
                        if (!filename) {
                            filename = this.filename;
                        }
                        file = destination.openFile(filename, {
                            autoCreate: false
                        });
                        if (file.exists && !(options === null || options === void 0 ? void 0 : options.override)) {
                            // NOTE: Add Warning or logging
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, fs.promises.copyFile(this.absolutePath, file.absolutePath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, file];
                }
            });
        });
    };
    File.prototype.copySync = function (destination, filename, options) {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                options = __assign({ override: false }, options);
                if (!filename) {
                    filename = this.filename;
                }
                file = destination.openFile(filename, {
                    autoCreate: false
                });
                if (file.exists && !(options === null || options === void 0 ? void 0 : options.override)) {
                    // NOTE: Add Warning or logging
                    return [2 /*return*/, null];
                }
                fs.copyFileSync(this.absolutePath, file.absolutePath);
                return [2 /*return*/, file];
            });
        });
    };
    File.prototype.secondCopy = function (filename, options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.copy(this.parentDir, filename, options)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    File.prototype.secondCopySync = function (filename, options) {
        return this.copySync(this.parentDir, filename, options);
    };
    File.prototype.move = function (destination, filename, options) {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        options = __assign({ override: false }, options);
                        if (!filename) {
                            filename = this.filename;
                        }
                        file = destination.openFile(filename, {
                            autoCreate: false
                        });
                        if (file.exists && !(options === null || options === void 0 ? void 0 : options.override)) {
                            // NOTE: Add Warning or logging
                            return [2 /*return*/, null];
                        }
                        return [4 /*yield*/, fs.promises.rename(this.absolutePath, file.absolutePath)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/, file];
                }
            });
        });
    };
    File.prototype.moveSync = function (destination, filename, options) {
        options = __assign({ override: false }, options);
        if (!filename) {
            filename = this.filename;
        }
        var file = destination.openFile(filename, {
            autoCreate: false
        });
        if (file.exists && !(options === null || options === void 0 ? void 0 : options.override)) {
            // NOTE: Add Warning or logging
            return null;
        }
        fs.renameSync(this.absolutePath, file.absolutePath);
        return file;
    };
    File.prototype.rename = function (filename) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.move(this.parentDir, filename)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    File.prototype.renameSync = function (filename) {
        return this.moveSync(this.parentDir, filename);
    };
    File.prototype.replaceWith = function (file) {
        return __awaiter(this, void 0, void 0, function () {
            var fileContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, file.readRaw()];
                    case 1:
                        fileContent = _a.sent();
                        return [4 /*yield*/, this.writeRaw(fileContent)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    File.prototype.replaceWithSync = function (file) {
        var fileContent = file.readRawSync();
        this.writeRawSync(fileContent);
        return this;
    };
    File.prototype.update = function (callback) {
        return __awaiter(this, void 0, void 0, function () {
            var content, newContent;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.read()];
                    case 1:
                        content = _a.sent();
                        newContent = callback(content);
                        return [4 /*yield*/, this.write(newContent)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, this];
                }
            });
        });
    };
    File.prototype.updateSync = function (callback) {
        var content = this.readSync();
        var newContent = callback(content);
        this.writeSync(newContent);
        return this;
    };
    Object.defineProperty(File.prototype, "filename", {
        get: function () {
            return Path.basename(this.absolutePath);
        },
        enumerable: false,
        configurable: true
    });
    // Parse any javascript related objects to string
    File.parseWrite = function (content) {
        if (content instanceof Buffer) {
            content = content.toString();
        }
        if (typeof content === 'object') {
            content = JSON.stringify(content);
        }
        if (typeof content === 'number' && isNaN(content) === false) {
            content = content.toString();
        }
        // Return filtered content
        return content;
    };
    // create new instance
    File.create = function (options) {
        return new File(options);
    };
    return File;
}(Entity_1.default));
exports.default = File;
