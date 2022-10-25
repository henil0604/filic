import { DirectoryOptions, EntityTypes, OpenOptions, FileOptions } from "../types/Filic";
import Entity from "./Entity";
import Filic from "./Filic";
import Directory from "./Directory";
import * as fs from 'fs';
import * as Path from 'path';
import Utils from "./Utils";
import { Abortable } from "events";

class File extends Entity {

    public constructor(options: FileOptions) {
        super({
            ...options,
            type: EntityTypes.FILE
        });

    }

    // Create Method
    public async create(options?: fs.WriteFileOptions & { recursive: boolean }): Promise<this> {
        await fs.promises.appendFile(this.absolutePath, "", options)
        return this;
    }
    public createSync(options?: fs.WriteFileOptions & { recursive: boolean }): this {
        fs.appendFileSync(this.absolutePath, "", options)
        return this;
    }

    // Read Raw File
    public async readRaw(options?: {
        encoding: BufferEncoding;
        flag?: fs.OpenMode | undefined;
    }) {
        if (!this.exists) return null;

        let content = await fs.promises.readFile(this.absolutePath, {
            encoding: "utf8",
            ...options
        });

        return content;
    }
    public readRawSync(options?: {
        encoding: BufferEncoding;
        flag?: string | undefined;
    }) {
        if (!this.exists) return null;

        let content: Buffer | string = fs.readFileSync(this.absolutePath, {
            encoding: "utf8",
            ...options
        });
        return content;
    }

    // Read File
    public async read() {
        if (!this.exists) return null;

        const content = await this.readRawSync() as string & { toJSON: () => null | object, toBuffer: () => number[] };

        Object.getPrototypeOf(content).toJSON = Utils.Try(() => JSON.parse(content));
        Object.getPrototypeOf(content).toBuffer = Utils.Try(() => Buffer.from(content))
        return content;
    }
    public readSync() {
        if (!this.exists) return null;

        const content = this.readRawSync() as string & { toJSON: () => null | object, toBuffer: () => number[] };

        Object.getPrototypeOf(content).toJSON = Utils.Try(() => JSON.parse(content));
        Object.getPrototypeOf(content).toBuffer = Utils.Try(() => Buffer.from(content))


        return content;
    }

    // Write Raw
    public async writeRaw(content: string, options?: (fs.ObjectEncodingOptions & {
        mode?: fs.Mode | undefined;
        flag?: fs.OpenMode | undefined;
    } & Abortable)
        | null): Promise<this> {
        if (!this.exists) return null;

        await fs.promises.writeFile(this.absolutePath, content, {
            encoding: "utf8",
            ...options
        })

        return this;
    }
    public writeRawSync(content: string, options?: (fs.ObjectEncodingOptions &
        Abortable & {
            mode?: fs.Mode | undefined;
            flag?: string | undefined;
        })
        | null): this {
        if (!this.exists) return null;

        fs.writeFileSync(this.absolutePath, content, {
            encoding: "utf8",
            ...options
        })

        return this;
    }

    // Write File
    public async write(content, options?: (fs.ObjectEncodingOptions & {
        mode?: fs.Mode | undefined;
        flag?: fs.OpenMode | undefined;
    } & Abortable)
        | null): Promise<this> {
        if (!this.exists) return null;

        content = File.parseWrite(content);

        await this.writeRaw(content, options);

        return this;
    }
    public writeSync(content, options?: (fs.ObjectEncodingOptions &
        Abortable & {
            mode?: fs.Mode | undefined;
            flag?: string | undefined;
        })
        | null): this {
        if (!this.exists) return null;

        content = File.parseWrite(content);

        this.writeRawSync(content, options);

        return this;
    }

    public createReadStream(options?: BufferEncoding | fs.promises.CreateReadStreamOptions) {
        return fs.createReadStream(this.absolutePath, options)
    }
    public createWriteStream(options?: BufferEncoding | fs.promises.CreateWriteStreamOptions) {
        return fs.createWriteStream(this.absolutePath, options)
    }

    // Delete Method
    public async delete(options?: fs.RmOptions): Promise<this> {
        await fs.promises.rm(this.absolutePath, options)
        return this;
    }
    public deleteSync(options?: fs.RmOptions): this {
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