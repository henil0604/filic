import { DirectoryOptions, EntityTypes, OpenOptions, FileOptions } from "../types/Filic";
import Entity from "./Entity";
import * as fs from 'fs';
import * as Path from 'path';
import Utils from "./Utils";
import { Abortable } from "events";
import * as FileTypes from "../types/File";

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

        const content = await this.readRaw(options) as string & { toJSON: () => null | object, toBuffer: () => number[] };

        Object.getPrototypeOf(content).toJSON = Utils.Try(() => JSON.parse(content));
        Object.getPrototypeOf(content).toBuffer = Utils.Try(() => Buffer.from(content))
        return content;
    }
    public readSync(options?: FileTypes.readSyncOptions) {
        if (!this.exists) return null;

        const content = this.readRawSync(options) as string & { toJSON: () => null | object, toBuffer: () => number[] };

        Object.getPrototypeOf(content).toJSON = Utils.Try(() => JSON.parse(content));
        Object.getPrototypeOf(content).toBuffer = Utils.Try(() => Buffer.from(content))


        return content;
    }

    // public async append(content: string, readOptions) {
    //     const readRaw = await this.readRaw(readOptions);
    // }

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