"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Filic_1 = require("../types/Filic");
const Entity_1 = require("./Entity");
const Filic_2 = require("./Filic");
const File_1 = require("./File");
const fs = require("fs");
const Path = require("path");
class Directory extends Entity_1.default {
    constructor(options) {
        super(Object.assign(Object.assign({}, options), { type: Filic_1.EntityTypes.DIR }));
    }
    // Create Method
    create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs.promises.mkdir(this.absolutePath, options);
            return this;
        });
    }
    createSync(options) {
        fs.mkdirSync(this.absolutePath, options);
        return this;
    }
    // Delete Method
    deleteSelf(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs.promises.rm(this.absolutePath, options);
            return this;
        });
    }
    deleteSelfSync(options) {
        fs.rmSync(this.absolutePath, options);
        return this;
    }
    // List All Entities (Raw File Names)
    listRaw() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield fs.promises.readdir(this.absolutePath, { withFileTypes: false });
        });
    }
    listRawSync() {
        return fs.readdirSync(this.absolutePath, { withFileTypes: false });
    }
    // List Entities with their instance created
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            const entities = [];
            const rawList = yield this.listRaw();
            for (const entity of rawList) {
                const absolutePath = this.ResolvePath(entity);
                const type = Entity_1.default.detectTypeWithPath(absolutePath);
                const caller = (type === Filic_1.EntityTypes.DIR) ? this.openDir : this.openFile;
                const entityInstance = caller.call(this, entity);
                entities.push(entityInstance);
            }
            return entities;
        });
    }
    listSync() {
        const entities = [];
        const rawList = this.listRawSync();
        for (const entity of rawList) {
            const absolutePath = this.ResolvePath(entity);
            const type = Entity_1.default.detectTypeWithPath(absolutePath);
            const caller = (type === Filic_1.EntityTypes.DIR) ? this.openDir : this.openFile;
            const entityInstance = caller.call(this, entity);
            entities.push(entityInstance);
        }
        return entities;
    }
    // deletes a directory
    deleteDir(path, openDirOptions, deleteSelfOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let instance;
            if (path instanceof Directory === false) {
                instance = this.openDir(path, Object.assign({ autoCreate: false }, openDirOptions));
            }
            yield instance.deleteSelf(deleteSelfOptions);
            return this;
        });
    }
    deleteDirSync(path, openDirOptions, deleteSelfOptions) {
        let instance;
        if (path instanceof Directory === false) {
            instance = this.openDir(path, Object.assign({ autoCreate: false }, openDirOptions));
        }
        instance.deleteSelfSync(deleteSelfOptions);
        return this;
    }
    // deletes a file 
    deleteFile(path, openFileOptions, deleteOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let instance;
            if (path instanceof File_1.default === false) {
                instance = this.openFile(path, Object.assign({ autoCreate: false }, openFileOptions));
            }
            yield instance.delete(deleteOptions);
            return this;
        });
    }
    deleteFileSync(path, openFileOptions, deleteOptions) {
        let instance;
        if (path instanceof File_1.default === false) {
            instance = this.openFile(path, Object.assign({ autoCreate: false }, openFileOptions));
        }
        instance.deleteSync(deleteOptions);
        return this;
    }
    // Clear Directory
    clear() {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.list();
            for (const entity of list) {
                if (entity.type === Filic_1.EntityTypes.DIR) {
                    yield entity.deleteSelf({ force: true, recursive: true });
                }
                if (entity.type === Filic_1.EntityTypes.FILE) {
                    yield entity.delete();
                }
            }
            return this;
        });
    }
    clearSync() {
        const list = this.listSync();
        for (const entity of list) {
            if (entity.type === Filic_1.EntityTypes.DIR) {
                entity.deleteSelfSync({ force: true, recursive: true });
            }
            if (entity.type === Filic_1.EntityTypes.FILE) {
                entity.deleteSync();
            }
        }
        return this;
    }
    has(path) {
        return fs.existsSync(this.ResolvePath(path));
    }
    copyAll(destination) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.list();
            for (const entity of list) {
                if (entity.type === Filic_1.EntityTypes.DIR) {
                    yield entity.copyAll(destination.openDir(entity.dirname));
                }
                if (entity.type === Filic_1.EntityTypes.FILE) {
                    yield entity.copy(destination);
                }
            }
            return this;
        });
    }
    copyAllSync(destination) {
        const list = this.listSync();
        for (const entity of list) {
            if (entity.type === Filic_1.EntityTypes.DIR) {
                entity.copyAllSync(destination.openDir(entity.dirname));
            }
            if (entity.type === Filic_1.EntityTypes.FILE) {
                entity.copySync(destination);
            }
        }
        return this;
    }
    copy(destination) {
        return __awaiter(this, void 0, void 0, function* () {
            destination = destination.openDir(this.dirname);
            yield this.copyAll(destination);
            return this;
        });
    }
    copySync(destination) {
        destination = destination.openDir(this.dirname);
        this.copyAllSync(destination);
        return this;
    }
    moveAll(destination) {
        return __awaiter(this, void 0, void 0, function* () {
            const list = yield this.list();
            for (const entity of list) {
                if (entity.type === Filic_1.EntityTypes.DIR) {
                    yield entity.moveAll(destination.openDir(entity.dirname));
                }
                if (entity.type === Filic_1.EntityTypes.FILE) {
                    yield entity.move(destination);
                }
            }
            return this;
        });
    }
    moveAllSync(destination) {
        const list = this.listSync();
        for (const entity of list) {
            if (entity.type === Filic_1.EntityTypes.DIR) {
                entity.moveAllSync(destination.openDir(entity.dirname));
            }
            if (entity.type === Filic_1.EntityTypes.FILE) {
                entity.moveSync(destination);
            }
        }
        return this;
    }
    move(destination) {
        return __awaiter(this, void 0, void 0, function* () {
            destination = destination.openDir(this.dirname);
            yield this.moveAll(destination);
            yield this.deleteSelf({ force: true, recursive: true });
            return this;
        });
    }
    moveSync(destination) {
        destination = destination.openDir(this.dirname);
        this.moveAllSync(destination);
        this.deleteSelfSync({ force: true, recursive: true });
        return this;
    }
    secondCopy(dirname) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.copyAll(this.parentDir.openDir(dirname));
            return this;
        });
    }
    secondCopySync(dirname) {
        this.copyAllSync(this.parentDir.openDir(dirname));
        return this;
    }
    // Path Resolver
    // Appends the given path to absolutePath
    ResolvePath(path) {
        return Path.resolve(this.absolutePath, path);
    }
    // Open Directory inside a directory
    openDir(path, options) {
        return this.toFilic().openDir(path, Object.assign({ Filic: this.toFilic() }, options));
    }
    // Open File inside a directory
    openFile(path, options) {
        return this.toFilic().openFile(path, Object.assign({ Filic: this.toFilic() }, options));
    }
    // convert directory to filic instance
    toFilic() {
        return Filic_2.default.create(this.absolutePath);
    }
    get dirname() {
        return Path.basename(this.absolutePath);
    }
    // create new instance
    static create(options) {
        return new Directory(options);
    }
}
exports.default = Directory;
