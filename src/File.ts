import { DirectoryOptions, EntityTypes, OpenOptions, FileOptions } from "../types/Filic";
import Entity from "./Entity";
import Filic from "./Filic";
import Directory from "./Directory";
import * as fs from 'fs';
import * as Path from 'path';

class File extends Entity {

    public constructor(options: FileOptions) {
        super({
            ...options,
            type: EntityTypes.FILE
        });

    }

    // Create Method
    public async create(options?: any): Promise<this> {
        await fs.promises.appendFile(this.absolutePath, "", options)
        return this;
    }
    public createSync(options?: any): this {
        fs.appendFileSync(this.absolutePath, "", options)
        return this;
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

    // create new instance
    public static create(options: FileOptions): File {
        return new File(options);
    }

}


export default File;