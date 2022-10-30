import { DirectoryOptions, EntityTypes, OpenOptions, FileOptions } from "./types/Filic";
import Entity from "./Entity";
import * as fs from 'fs';
import * as Path from 'path';
import Utils from "./Utils";
import * as FileTypes from "./types/File";
import Directory from "./Directory";

class File extends Entity {

    public constructor(options: FileOptions) {
        super({
            ...options,
            type: EntityTypes.FILE
        });

    }

    // Create Method
    public async create(options?: FileTypes.createOptions): Promise<this> {
        await fs.promises.appendFile(this.absolutePath, "", options)
        return this;
    }
    public createSync(options?: FileTypes.createSyncOptions): this {
        fs.appendFileSync(this.absolutePath, "", options)
        return this;
    }

    // Read Raw File
    public async readRaw(options?: FileTypes.readRawOptions) {
        if (!this.exists) return null;

        let content = await fs.promises.readFile(this.absolutePath, {
            encoding: "utf8",
            ...options
        });

        return content;
    }
    public readRawSync(options?: FileTypes.readRawSyncOptions) {
        if (!this.exists) return null;

        let content: string = fs.readFileSync(this.absolutePath, {
            encoding: "utf8",
            ...options
        });
        return content;
    }

    // Read File
    public async read(options?: FileTypes.readOptions) {
        if (!this.exists) return null;

        const content = await this.readRaw(options) as FileTypes.readReturn;

        Object.getPrototypeOf(content).toJSON = Utils.Try(() => JSON.parse(content));
        Object.getPrototypeOf(content).toBuffer = Utils.Try(() => Buffer.from(content))
        return content;
    }
    public readSync(options?: FileTypes.readSyncOptions) {
        if (!this.exists) return null;

        const content = this.readRawSync(options) as FileTypes.readSyncReturn;

        Object.getPrototypeOf(content).toJSON = Utils.Try(() => JSON.parse(content));
        Object.getPrototypeOf(content).toBuffer = Utils.Try(() => Buffer.from(content))


        return content;
    }

    public async append(content: string, readRawOptions?: FileTypes.readRawOptions, writeRawOptions?: FileTypes.writeRawOptions) {
        let readRaw = await this.readRaw(readRawOptions);
        readRaw += content;
        await this.writeRaw(readRaw, writeRawOptions)
        return readRaw;
    }
    public appendSync(content: string, readRawSyncOptions?: FileTypes.readRawSyncOptions, writeRawSyncOptions?: FileTypes.writeRawSyncOptions) {
        let readRaw = this.readRawSync(readRawSyncOptions);
        readRaw += content;
        this.writeRawSync(readRaw, writeRawSyncOptions)
        return readRaw;
    }

    public async prepend(content: string, readRawOptions?: FileTypes.readRawOptions, writeRawOptions?: FileTypes.writeRawOptions) {
        let readRaw = await this.readRaw(readRawOptions);
        content += readRaw;
        await this.writeRaw(content, writeRawOptions)
        return content;
    }
    public prependSync(content: string, readRawSyncOptions?: FileTypes.readRawSyncOptions, writeRawSyncOptions?: FileTypes.writeRawSyncOptions) {
        let readRaw = this.readRawSync(readRawSyncOptions);
        content += readRaw;
        this.writeRawSync(content, writeRawSyncOptions)
        return content;
    }

    // Write Raw
    public async writeRaw(content: string, options?: FileTypes.writeRawOptions): Promise<this> {
        if (!this.exists) return null;

        await fs.promises.writeFile(this.absolutePath, content, {
            encoding: "utf8",
            ...options
        })

        return this;
    }
    public writeRawSync(content: string, options?: FileTypes.writeRawSyncOptions): this {
        if (!this.exists) return null;

        fs.writeFileSync(this.absolutePath, content, {
            encoding: "utf8",
            ...options
        })

        return this;
    }

    // Write File
    public async write(content, options?: FileTypes.writeOptions): Promise<this> {
        if (!this.exists) return null;

        content = File.parseWrite(content);

        await this.writeRaw(content, options);

        return this;
    }
    public writeSync(content, options?: FileTypes.writeSyncOptions): this {
        if (!this.exists) return null;

        content = File.parseWrite(content);

        this.writeRawSync(content, options);

        return this;
    }

    public createReadStream(options?: FileTypes.createReadStreamOptions) {
        return fs.createReadStream(this.absolutePath, options)
    }
    public createWriteStream(options?: FileTypes.createWriteStreamOptions) {
        return fs.createWriteStream(this.absolutePath, options)
    }

    // Delete Method
    public async delete(options?: FileTypes.deleteOptions): Promise<this> {
        await fs.promises.rm(this.absolutePath, options)
        return this;
    }
    public deleteSync(options?: FileTypes.deleteSyncOptions): this {
        fs.rmSync(this.absolutePath, options)
        return this;
    }


    public async copy(destination: Directory, filename?: string, options?: FileTypes.copyOptions) {
        options = {
            override: false,
            ...options
        }
        if (!filename) {
            filename = this.filename
        }

        const file = destination.openFile(filename, {
            autoCreate: false
        })

        if (file.exists && !options?.override) {
            // NOTE: Add Warning or logging
            return null;
        }

        await fs.promises.copyFile(this.absolutePath, file.absolutePath,);

        return file;
    }
    public async copySync(destination: Directory, filename?: string, options?: FileTypes.copySyncOptions) {
        options = {
            override: false,
            ...options
        }
        if (!filename) {
            filename = this.filename
        }

        const file = destination.openFile(filename, {
            autoCreate: false
        })

        if (file.exists && !options?.override) {
            // NOTE: Add Warning or logging
            return null;
        }

        fs.copyFileSync(this.absolutePath, file.absolutePath);

        return file;
    }

    public async secondCopy(filename?: string, options?: FileTypes.copyOptions) {
        return await this.copy(this.parentDir, filename, options);
    }
    public secondCopySync(filename?: string, options?: FileTypes.copySyncOptions) {
        return this.copySync(this.parentDir, filename, options);
    }


    public async move(destination: Directory, filename?: string, options?: FileTypes.moveOptions) {
        options = {
            override: false,
            ...options
        }
        if (!filename) {
            filename = this.filename
        }

        const file = destination.openFile(filename, {
            autoCreate: false
        })

        if (file.exists && !options?.override) {
            // NOTE: Add Warning or logging
            return null;
        }

        await fs.promises.rename(this.absolutePath, file.absolutePath);

        return file;
    }
    public moveSync(destination: Directory, filename?: string, options?: FileTypes.moveSyncOptions) {
        options = {
            override: false,
            ...options
        }
        if (!filename) {
            filename = this.filename
        }

        const file = destination.openFile(filename, {
            autoCreate: false
        })

        if (file.exists && !options?.override) {
            // NOTE: Add Warning or logging
            return null;
        }

        fs.renameSync(this.absolutePath, file.absolutePath);

        return file;
    }

    public async rename(filename: string) {
        return await this.move(this.parentDir, filename);
    }
    public renameSync(filename: string) {
        return this.moveSync(this.parentDir, filename);
    }

    public async replaceWith(file: File) {
        const fileContent = await file.readRaw();
        await this.writeRaw(fileContent);
        return this;
    }
    public replaceWithSync(file: File) {
        const fileContent = file.readRawSync();
        this.writeRawSync(fileContent);
        return this;
    }

    public async update(callback: (content: FileTypes.readReturn) => any) {
        const content = await this.read();
        const newContent = callback(content);
        await this.write(newContent);
        return this;
    }
    public updateSync(callback: (content: FileTypes.readSyncReturn) => any) {
        const content = this.readSync();
        const newContent = callback(content);
        this.writeSync(newContent);
        return this;
    }

    public get filename() {
        return Path.basename(this.absolutePath);
    }


    // Parse any javascript related objects to string
    public static parseWrite(content: any) {
        if (content instanceof Buffer) {
            content = content.toString();
        }

        if (typeof content === 'object') {
            content = JSON.stringify(content);
        }

        if (typeof content === 'number' && isNaN(content) === false) {
            content = content.toString()
        }

        // Return filtered content
        return content;
    }

    // create new instance
    public static create(options: FileOptions): File {
        return new File(options);
    }


}


export default File;