import { DirectoryOptions, EntityTypes, FileOptions, OpenOptions } from "../types/Filic";
import Entity from "./Entity";
import Filic from "./Filic";
import File from './File';
import * as fs from 'fs';
import * as Path from 'path';

class Directory extends Entity {

    public constructor(options: DirectoryOptions) {
        super({
            ...options,
            type: EntityTypes.DIR
        });

    }

    // Create Method
    public async create(options?: fs.MakeDirectoryOptions): Promise<this> {
        await fs.promises.mkdir(this.absolutePath, options)
        return this;
    }
    public createSync(options?: fs.MakeDirectoryOptions): this {
        fs.mkdirSync(this.absolutePath, options)
        return this;
    }

    // Delete Method
    public async deleteSelf(options?: fs.RmOptions): Promise<this> {
        await fs.promises.rm(this.absolutePath, options)
        return this;
    }
    public deleteSelfSync(options?: fs.RmOptions): this {
        fs.rmSync(this.absolutePath, options)
        return this;
    }

    // List All Entities (Raw File Names)
    public async listRaw() {
        return await fs.promises.readdir(this.absolutePath, { withFileTypes: false });
    }
    public listRawSync() {
        return fs.readdirSync(this.absolutePath, { withFileTypes: false });
    }

    // List Entities with their instance created
    public async list() {
        const entities: (Directory | File)[] = [];
        const rawList = await this.listRaw()

        for (const entity of rawList) {
            const absolutePath = this.ResolvePath(entity);
            const type = Entity.detectTypeWithPath(absolutePath);
            const caller = (type === EntityTypes.DIR) ? this.openDir : this.openFile;
            const entityInstance = caller.call(this, entity)

            entities.push(entityInstance);
        }

        return entities;
    }
    public listSync() {
        const entities: (Directory | File)[] = [];
        const rawList = this.listRawSync() as string[]

        for (const entity of rawList) {
            const absolutePath = this.ResolvePath(entity);
            const type = Entity.detectTypeWithPath(absolutePath);
            const caller = (type === EntityTypes.DIR) ? this.openDir : this.openFile;
            const entityInstance = caller.call(this, entity)

            entities.push(entityInstance);
        }

        return entities;
    }

    // deletes a directory
    public async deleteDir(path: (string | Directory), openDirOptions?: DirectoryOptions, deleteSelfOptions?: fs.RmOptions): Promise<this> {
        let instance: Directory;
        if (path instanceof Directory === false) {
            instance = this.openDir(path as string, {
                autoCreate: false,
                ...openDirOptions
            });
        }
        await instance.deleteSelf(deleteSelfOptions)
        return this;
    }
    public deleteDirSync(path: (string | Directory), openDirOptions?: DirectoryOptions, deleteSelfOptions?: fs.RmOptions): this {
        let instance: Directory;
        if (path instanceof Directory === false) {
            instance = this.openDir(path as string, {
                autoCreate: false,
                ...openDirOptions
            });
        }
        instance.deleteSelfSync(deleteSelfOptions)
        return this;
    }

    // deletes a file 
    public async deleteFile(path: (string | File), openFileOptions?: FileOptions, deleteOptions?: fs.RmOptions): Promise<this> {
        let instance: File;
        if (path instanceof File === false) {
            instance = this.openFile(path as string, {
                autoCreate: false,
                ...openFileOptions
            });
        }
        await instance.delete(deleteOptions)
        return this;
    }
    public deleteFileSync(path: (string | File), openFileOptions?: FileOptions, deleteOptions?: fs.RmOptions): this {
        let instance: File;
        if (path instanceof File === false) {
            instance = this.openFile(path as string, {
                autoCreate: false,
                ...openFileOptions
            });
        }
        instance.deleteSync(deleteOptions)
        return this;
    }


    // Path Resolver
    // Appends the given path to absolutePath
    public ResolvePath(path: string): string {
        return Path.resolve(this.absolutePath, path);
    }

    // Open Directory inside a directory
    public openDir(path: string, options?: DirectoryOptions): Directory {
        return this.toFilic().openDir(path, {
            Filic: this.toFilic(),
            ...options,
        });
    }

    // Open File inside a directory
    public openFile(path: string, options?: FileOptions): File {
        return this.toFilic().openFile(path, {
            Filic: this.toFilic(),
            ...options
        });
    }

    // convert directory to filic instance
    public toFilic(): Filic {
        return Filic.create(this.absolutePath);
    }

    // create new instance
    public static create(options?: DirectoryOptions): Directory {
        return new Directory(options);
    }

}


export default Directory;