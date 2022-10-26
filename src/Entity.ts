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
            this.options.Filic = Filic.create(Path.dirname(this.options.path))
        }

        this.path = this.options.path;
        this.type = this.options.type;

        if (this.path.includes("/")) {
            const entities = this.path.split('/');
            let currentEntity = null;
            for (let i = 0; i < entities.length; i++) {
                const entity = entities[i];
                if (currentEntity) {
                    if (i === entities.length - 1 && this.type === EntityTypes.FILE) {
                        currentEntity = currentEntity.openFile(entity);
                    } else {
                        currentEntity = currentEntity.openDir(entity);
                    }
                } else {
                    currentEntity = this.Filic.openDir(entity);
                }
            }

            return currentEntity;
        }


        if (!this.exists && this.options.autoCreate) {
            this.createSync?.({
                recursive: true
            })
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

    public get parentDir() {
        return Filic.Directory.create({
            path: Path.basename(Path.dirname(this.absolutePath)),
            Filic: Filic.create(Path.dirname(Path.dirname(this.absolutePath))),
            type: EntityTypes.DIR
        });
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