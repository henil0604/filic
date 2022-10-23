import * as Path from 'path';
import * as fs from 'fs';
import { EntityOptions, EntityTypes } from '../types/Filic';
import Filic from './Filic';

class Entity {
    public type: EntityTypes;
    public path: string;
    private options: EntityOptions;

    public constructor(options: EntityOptions) {
        this.options = { ...options };

        if (!this.options.Filic || this.options.Filic instanceof Filic === false) {
            throw new Error("Parent not found!");
        }

        this.path = this.options.path;
        this.type = this.options.type;

        if (!this.exists && this.options.autoCreate) {
            this.createSync?.()
        }

    }

    public createSync(...args): void { }


    public get absolutePath() {
        return this.Filic.ResolvePath(this.path);
    }

    public get Filic() {
        return this.options.Filic;
    }

    public get exists() {
        return fs.existsSync(this.absolutePath);
    }


    // Detect type of entity based on its stats
    public static detectTypeWithPath(path: string): EntityTypes | null {
        if (!fs.existsSync(path)) return null;
        return Entity.getEntityStats(path).isDirectory() ? EntityTypes.DIR : EntityTypes.FILE;
    }

    // Getting stats from fs.statSync
    public static getEntityStats(path: string) {
        return fs.statSync(path);
    }

    public static create(options: EntityOptions): Entity {
        return new Entity(options)
    }

}

export default Entity;