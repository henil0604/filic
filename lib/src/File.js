var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { EntityTypes } from "../types/Filic";
import Entity from "./Entity";
import * as fs from 'fs';
import * as Path from 'path';
import Utils from "./Utils";
class File extends Entity {
    constructor(options) {
        super(Object.assign(Object.assign({}, options), { type: EntityTypes.FILE }));
    }
    // Create Method
    create(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs.promises.appendFile(this.absolutePath, "", options);
            return this;
        });
    }
    createSync(options) {
        fs.appendFileSync(this.absolutePath, "", options);
        return this;
    }
    // Read Raw File
    readRaw(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.exists)
                return null;
            let content = yield fs.promises.readFile(this.absolutePath, Object.assign({ encoding: "utf8" }, options));
            return content;
        });
    }
    readRawSync(options) {
        if (!this.exists)
            return null;
        let content = fs.readFileSync(this.absolutePath, Object.assign({ encoding: "utf8" }, options));
        return content;
    }
    // Read File
    read(options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.exists)
                return null;
            const content = yield this.readRaw(options);
            Object.getPrototypeOf(content).toJSON = Utils.Try(() => JSON.parse(content));
            Object.getPrototypeOf(content).toBuffer = Utils.Try(() => Buffer.from(content));
            return content;
        });
    }
    readSync(options) {
        if (!this.exists)
            return null;
        const content = this.readRawSync(options);
        Object.getPrototypeOf(content).toJSON = Utils.Try(() => JSON.parse(content));
        Object.getPrototypeOf(content).toBuffer = Utils.Try(() => Buffer.from(content));
        return content;
    }
    append(content, readRawOptions, writeRawOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let readRaw = yield this.readRaw(readRawOptions);
            readRaw += content;
            yield this.writeRaw(readRaw, writeRawOptions);
            return readRaw;
        });
    }
    appendSync(content, readRawSyncOptions, writeRawSyncOptions) {
        let readRaw = this.readRawSync(readRawSyncOptions);
        readRaw += content;
        this.writeRawSync(readRaw, writeRawSyncOptions);
        return readRaw;
    }
    prepend(content, readRawOptions, writeRawOptions) {
        return __awaiter(this, void 0, void 0, function* () {
            let readRaw = yield this.readRaw(readRawOptions);
            content += readRaw;
            yield this.writeRaw(content, writeRawOptions);
            return content;
        });
    }
    prependSync(content, readRawSyncOptions, writeRawSyncOptions) {
        let readRaw = this.readRawSync(readRawSyncOptions);
        content += readRaw;
        this.writeRawSync(content, writeRawSyncOptions);
        return content;
    }
    // Write Raw
    writeRaw(content, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.exists)
                return null;
            yield fs.promises.writeFile(this.absolutePath, content, Object.assign({ encoding: "utf8" }, options));
            return this;
        });
    }
    writeRawSync(content, options) {
        if (!this.exists)
            return null;
        fs.writeFileSync(this.absolutePath, content, Object.assign({ encoding: "utf8" }, options));
        return this;
    }
    // Write File
    write(content, options) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.exists)
                return null;
            content = File.parseWrite(content);
            yield this.writeRaw(content, options);
            return this;
        });
    }
    writeSync(content, options) {
        if (!this.exists)
            return null;
        content = File.parseWrite(content);
        this.writeRawSync(content, options);
        return this;
    }
    createReadStream(options) {
        return fs.createReadStream(this.absolutePath, options);
    }
    createWriteStream(options) {
        return fs.createWriteStream(this.absolutePath, options);
    }
    // Delete Method
    delete(options) {
        return __awaiter(this, void 0, void 0, function* () {
            yield fs.promises.rm(this.absolutePath, options);
            return this;
        });
    }
    deleteSync(options) {
        fs.rmSync(this.absolutePath, options);
        return this;
    }
    copy(destination, filename, options) {
        return __awaiter(this, void 0, void 0, function* () {
            options = Object.assign({ override: false }, options);
            if (!filename) {
                filename = this.filename;
            }
            const file = destination.openFile(filename, {
                autoCreate: false
            });
            if (file.exists && !(options === null || options === void 0 ? void 0 : options.override)) {
                // NOTE: Add Warning or logging
                return null;
            }
            yield fs.promises.copyFile(this.absolutePath, file.absolutePath);
            return file;
        });
    }
    copySync(destination, filename, options) {
        return __awaiter(this, void 0, void 0, function* () {
            options = Object.assign({ override: false }, options);
            if (!filename) {
                filename = this.filename;
            }
            const file = destination.openFile(filename, {
                autoCreate: false
            });
            if (file.exists && !(options === null || options === void 0 ? void 0 : options.override)) {
                // NOTE: Add Warning or logging
                return null;
            }
            fs.copyFileSync(this.absolutePath, file.absolutePath);
            return file;
        });
    }
    secondCopy(filename, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.copy(this.parentDir, filename, options);
        });
    }
    secondCopySync(filename, options) {
        return this.copySync(this.parentDir, filename, options);
    }
    move(destination, filename, options) {
        return __awaiter(this, void 0, void 0, function* () {
            options = Object.assign({ override: false }, options);
            if (!filename) {
                filename = this.filename;
            }
            const file = destination.openFile(filename, {
                autoCreate: false
            });
            if (file.exists && !(options === null || options === void 0 ? void 0 : options.override)) {
                // NOTE: Add Warning or logging
                return null;
            }
            yield fs.promises.rename(this.absolutePath, file.absolutePath);
            return file;
        });
    }
    moveSync(destination, filename, options) {
        options = Object.assign({ override: false }, options);
        if (!filename) {
            filename = this.filename;
        }
        const file = destination.openFile(filename, {
            autoCreate: false
        });
        if (file.exists && !(options === null || options === void 0 ? void 0 : options.override)) {
            // NOTE: Add Warning or logging
            return null;
        }
        fs.renameSync(this.absolutePath, file.absolutePath);
        return file;
    }
    rename(filename) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.move(this.parentDir, filename);
        });
    }
    renameSync(filename) {
        return this.moveSync(this.parentDir, filename);
    }
    replaceWith(file) {
        return __awaiter(this, void 0, void 0, function* () {
            const fileContent = yield file.readRaw();
            yield this.writeRaw(fileContent);
            return this;
        });
    }
    replaceWithSync(file) {
        const fileContent = file.readRawSync();
        this.writeRawSync(fileContent);
        return this;
    }
    update(callback) {
        return __awaiter(this, void 0, void 0, function* () {
            const content = yield this.read();
            const newContent = callback(content);
            yield this.write(newContent);
            return this;
        });
    }
    updateSync(callback) {
        const content = this.readSync();
        const newContent = callback(content);
        this.writeSync(newContent);
        return this;
    }
    get filename() {
        return Path.basename(this.absolutePath);
    }
    // Parse any javascript related objects to string
    static parseWrite(content) {
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
    }
    // create new instance
    static create(options) {
        return new File(options);
    }
}
export default File;
//# sourceMappingURL=File.js.map