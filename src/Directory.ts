import { DirectoryOptions, EntityTypes, FileOptions, OpenOptions } from "./types/Filic";
import Entity from "./Entity";
import Filic from "./Filic";
import File from './File';
import * as fs from 'fs';
import * as Path from 'path';
import * as DirectoryTypes from './types/Directory';
import * as FileTypes from './types/File';

class Directory extends Entity {

    public constructor(options: DirectoryOptions) {
        super({
            ...options,
            type: EntityTypes.DIR
        });

    }

    // Create Method
    public async create(options?: DirectoryTypes.createOptions): Promise<this> {
        await fs.promises.mkdir(this.absolutePath, options)
        return this;
    }
    public createSync(options?: DirectoryTypes.createSyncOptions): this {
        fs.mkdirSync(this.absolutePath, options)
        return this;
    }

    // Delete Method
    public async deleteSelf(options?: DirectoryTypes.deleteSelfOptions): Promise<this> {
        await fs.promises.rm(this.absolutePath, options)
        return this;
    }
    public deleteSelfSync(options?: DirectoryTypes.deleteSelfSyncOptions): this {
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
    public async deleteDir(path: (string | Directory), openDirOptions?: DirectoryOptions, deleteSelfOptions?: DirectoryTypes.deleteSelfOptions): Promise<this> {
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
    public deleteDirSync(path: (string | Directory), openDirOptions?: DirectoryOptions, deleteSelfOptions?: DirectoryTypes.deleteSelfSyncOptions): this {
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
    public async deleteFile(path: (string | File), openFileOptions?: FileOptions, deleteOptions?: FileTypes.deleteOptions): Promise<this> {
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
    public deleteFileSync(path: (string | File), openFileOptions?: FileOptions, deleteOptions?: FileTypes.deleteSyncOptions): this {
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

    // Clear Directory
    public async clear() {
        const list = await this.list()
        for (const entity of list) {
            if (entity.type === EntityTypes.DIR) {
                await (entity as Directory).deleteSelf({ force: true, recursive: true });
            }
            if (entity.type === EntityTypes.FILE) {
                await (entity as File).delete();
            }
        }
        return this;
    }
    public clearSync() {
        const list = this.listSync()
        for (const entity of list) {
            if (entity.type === EntityTypes.DIR) {
                (entity as Directory).deleteSelfSync({ force: true, recursive: true });
            }
            if (entity.type === EntityTypes.FILE) {
                (entity as File).deleteSync();
            }
        }
        return this;
    }

    public has(path: string) {
        return fs.existsSync(this.ResolvePath(path));
    }

    public async copyAll(destination: Directory) {
        const list = await this.list()

        for (const entity of list) {
            if (entity.type === EntityTypes.DIR) {
                await (entity as Directory).copyAll(destination.openDir((entity as Directory).dirname));
            }
            if (entity.type === EntityTypes.FILE) {
                await (entity as File).copy(destination);
            }
        }

        return this;
    }
    public copyAllSync(destination: Directory) {
        const list = this.listSync()

        for (const entity of list) {
            if (entity.type === EntityTypes.DIR) {
                (entity as Directory).copyAllSync(destination.openDir((entity as Directory).dirname));
            }
            if (entity.type === EntityTypes.FILE) {
                (entity as File).copySync(destination);
            }
        }

        return this;
    }

    public async copy(destination: Directory) {
        destination = destination.openDir(this.dirname);
        await this.copyAll(destination);
        return this;
    }
    public copySync(destination: Directory) {
        destination = destination.openDir(this.dirname);
        this.copyAllSync(destination);
        return this;
    }

    public async moveAll(destination: Directory) {
        const list = await this.list()

        for (const entity of list) {
            if (entity.type === EntityTypes.DIR) {
                await (entity as Directory).moveAll(destination.openDir((entity as Directory).dirname));
            }
            if (entity.type === EntityTypes.FILE) {
                await (entity as File).move(destination);
            }
        }

        return this;
    }
    public moveAllSync(destination: Directory) {
        const list = this.listSync()

        for (const entity of list) {
            if (entity.type === EntityTypes.DIR) {
                (entity as Directory).moveAllSync(destination.openDir((entity as Directory).dirname));
            }
            if (entity.type === EntityTypes.FILE) {
                (entity as File).moveSync(destination);
            }
        }

        return this;
    }

    public async move(destination: Directory) {
        destination = destination.openDir(this.dirname);
        await this.moveAll(destination);
        await this.deleteSelf({ force: true, recursive: true })
        return this;
    }
    public moveSync(destination: Directory) {
        destination = destination.openDir(this.dirname);
        this.moveAllSync(destination);
        this.deleteSelfSync({ force: true, recursive: true })
        return this;
    }

    public async secondCopy(dirname: string) {
        await this.copyAll(this.parentDir.openDir(dirname));
        return this;
    }
    public secondCopySync(dirname: string) {
        this.copyAllSync(this.parentDir.openDir(dirname));
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

    public get dirname() {
        return Path.basename(this.absolutePath);
    }

    // create new instance
    public static create(options?: DirectoryOptions): Directory {
        return new Directory(options);
    }

}


export default Directory;