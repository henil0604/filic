"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Path = require("path");
const fs = require("fs");
const Filic_1 = require("../types/Filic");
const Entity_1 = require("./Entity");
const Directory_1 = require("./Directory");
const File_1 = require("./File");
class Filic {
    constructor(BasePath) {
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
            throw new Error(`${this.BasePath} is not a directory`);
        }
    }
    // Open Method to open Files and Directories
    open(path, options) {
        // Resolving Absolute Path
        const absolutePath = this.ResolvePath(path);
        // Cloning Original options
        const opts = Object.assign({}, options);
        // Detecting Entity Type if not provide, still cant figure out? just giving it a FILE type
        if (!opts.type) {
            opts.type = Entity_1.default.detectTypeWithPath(absolutePath) || Filic_1.EntityTypes.FILE;
        }
        if (opts.type === Filic_1.EntityTypes.DIR) {
            return Directory_1.default.create(Object.assign({ path: path, Filic: this, autoCreate: true }, opts.EntityOptions));
        }
        if (opts.type === Filic_1.EntityTypes.FILE) {
            return File_1.default.create(Object.assign({ path: path, Filic: this, autoCreate: true }, opts.EntityOptions));
        }
    }
    openDir(path, options) {
        return this.open(path, {
            EntityOptions: Object.assign({}, options),
            type: Filic_1.EntityTypes.DIR
        });
    }
    openFile(path, options) {
        return this.open(path, {
            EntityOptions: Object.assign({}, options),
            type: Filic_1.EntityTypes.FILE
        });
    }
    // Path Resolver
    // Appends the given path to BasePath
    ResolvePath(path) {
        return Path.resolve(this.BasePath, path);
    }
    // Static Initializer function
    static create(BasePath) {
        return new Filic(BasePath);
    }
    static get Entity() {
        return Entity_1.default;
    }
    static get Directory() {
        return Directory_1.default;
    }
    static get File() {
        return File_1.default;
    }
}
exports.default = Filic;
