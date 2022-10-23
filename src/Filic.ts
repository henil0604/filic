import * as Path from 'path';
import * as fs from 'fs';
import Utils from './Utils';

class Filic {
    public BasePath: string

    constructor(BasePath?: string) {
        if (!BasePath) {
            this.BasePath = process.cwd();
        } else {
            this.BasePath = BasePath;
        }

        if (!fs.existsSync(this.BasePath)) {
            fs.mkdirSync(this.BasePath);
        }

        if (fs.statSync(this.BasePath).isDirectory() === false) {
            throw new Error(`${this.BasePath} is not a directory`)
        }

    }

    // Path Resolver
    // Appends the given path to BasePath
    ResolvePath(path: string): string {
        return Path.resolve(this.BasePath, path);
    }


    // Static Initializer function
    public static create(BasePath?: string) {
        return new Filic(BasePath)
    }

}

export default Filic;