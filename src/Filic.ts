import * as Path from 'path';
import * as fs from 'fs';
import { DirectoryOptions, EntityTypes, FileOptions, openDirOptions, openFileOptions, openOptions } from '@/types/Filic';
import Entity from '@/Entity.js';
import Directory from '@/Directory.js';
import File from '@/File.js';

class Filic {
    public BasePath: string

    public constructor(BasePath?: string, autoCreateDir: boolean = true) {
        // Checking if BasePath is provided
        if (!BasePath) {
            // if not just set it to current working directory
            this.BasePath = process.cwd();
        } else {
            // otherwise make it public
            this.BasePath = BasePath;
        }

        // Checking if directory exists, if not create one
        if (!fs.existsSync(this.BasePath) && autoCreateDir === true) {
            fs.mkdirSync(this.BasePath);
        }

        // if directory exists and if given path is not directory, throw the error
        if (fs.existsSync(this.BasePath) && fs.statSync(this.BasePath).isDirectory() === false) {
            throw new Error(`${this.BasePath} is not a directory`)
        }

    }

    // Open Method to open Files and Directories
    public open(path: string, options?: openOptions): Entity | Directory | File | null {
        // Resolving Absolute Path
        const absolutePath = this.ResolvePath(path);
        // Cloning Original options
        const opts = {
            ...options
        }

        // Detecting Entity Type if not provide, still cant figure out? just giving it a FILE type
        if (!opts.type) {
            opts.type = Entity.detectTypeWithPath(absolutePath) || EntityTypes.FILE;
        }

        if (opts.type === EntityTypes.DIR) {
            return Directory.create({
                path,
                Filic: this,
                autoCreate: true,
                ...(opts.EntityOptions as DirectoryOptions)
            })
        }

        if (opts.type === EntityTypes.FILE) {
            return File.create({
                path,
                Filic: this,
                autoCreate: true,
                ...(opts.EntityOptions as FileOptions)
            })
        }

        return null
    }

    public get asDir() {
        return this.openDir(".", {

        })
    }

    public openDir(path: string, options?: openDirOptions): Directory {
        return this.open(path, {
            EntityOptions: { ...options },
            type: EntityTypes.DIR
        }) as Directory
    }

    public openFile(path: string, options?: openFileOptions): File {
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
    public static create(BasePath?: string, autoCreateDir: boolean = true) {
        return new Filic(BasePath, autoCreateDir);
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

    public static UNIX_ROOT_DIR = "/"
    public static HOME_DIR = process.env.HOME

}

export default Filic;