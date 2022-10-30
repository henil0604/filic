import * as Path from 'path';
import * as fs from 'fs';
import { EntityTypes } from '../types/Filic';
import Entity from './Entity';
import Directory from './Directory';
import File from './File';
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
            opts.type = Entity.detectTypeWithPath(absolutePath) || EntityTypes.FILE;
        }
        if (opts.type === EntityTypes.DIR) {
            return Directory.create(Object.assign({ path: path, Filic: this, autoCreate: true }, opts.EntityOptions));
        }
        if (opts.type === EntityTypes.FILE) {
            return File.create(Object.assign({ path: path, Filic: this, autoCreate: true }, opts.EntityOptions));
        }
    }
    openDir(path, options) {
        return this.open(path, {
            EntityOptions: Object.assign({}, options),
            type: EntityTypes.DIR
        });
    }
    openFile(path, options) {
        return this.open(path, {
            EntityOptions: Object.assign({}, options),
            type: EntityTypes.FILE
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
        return Entity;
    }
    static get Directory() {
        return Directory;
    }
    static get File() {
        return File;
    }
}
export default Filic;
//# sourceMappingURL=Filic.js.map