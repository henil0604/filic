import * as Path from 'path';
import * as fs from 'fs';
import { DirectoryOptions, EntityTypes, FileOptions, OpenOptions } from './types/Filic';
import Entity from './Entity';
import Directory from './Directory';
import File from './File';

class Filic {
    public BasePath: string

    public constructor(BasePath?: string) {
        // Checking if BasePath is provided
        if (!BasePath) {
            // if not just set it to current working directory
            this.BasePath = process.cwd();
        } else {
            // otherwise make it public
            this.BasePath = BasePath;
        }

        // Checking if directory exists, if not create one
        if (!fs.existsSync(this.BasePath)) {
            fs.mkdirSync(this.BasePath);
        }

        // if given path is not directory, throw the error
        if (fs.statSync(this.BasePath).isDirectory() === false) {
            throw new Error(`${this.BasePath} is not a directory`)
        }

    }

    // Open Method to open Files and Directories
    private open(path: string, options?: OpenOptions): Entity | Directory | File {
        // Resolving Absolute Path
        const absolutePath = this.ResolvePath(path);
        // Cloning Original options
        const opts: OpenOptions = {
            ...options
        }

        // Detecting Entity Type if not provide, still cant figure out? just giving it a FILE type
        if (!opts.type) {
            opts.type = Entity.detectTypeWithPath(absolutePath) || EntityTypes.FILE;
        }

        if (opts.type === EntityTypes.DIR) {
            return Directory.create({
                path: path,
                Filic: this,
                autoCreate: true,
                ...(opts.EntityOptions as DirectoryOptions)
            })
        }

        if (opts.type === EntityTypes.FILE) {
            return File.create({
                path: path,
                Filic: this,
                autoCreate: true,
                ...(opts.EntityOptions as FileOptions)
            })
        }

    }

    public openDir(path: string, options?: DirectoryOptions): Directory {
        return this.open(path, {
            EntityOptions: { ...options },
            type: EntityTypes.DIR
        }) as Directory
    }

    public openFile(path: string, options?: FileOptions): File {
        return this.open(path, {
            EntityOptions: { ...options },
            type: EntityTypes.FILE
        }) as File
    }

    // Path Resolver
    // Appends the given path to BasePath
    public ResolvePath(path: string): string {
        return Path.resolve(this.BasePath, path);
    }


    // Static Initializer function
    public static create(BasePath?: string) {
        return new Filic(BasePath)
    }

    public static get Entity() {
        return Entity;
    }

    public static get Directory() {
        return Directory;
    }

    public static get File() {
        return File;
    }


}

export default Filic;