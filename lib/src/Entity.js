import * as Path from 'path';
import * as fs from 'fs';
import { EntityTypes } from '../types/Filic';
import Filic from './Filic';
class Entity {
    constructor(options) {
        var _a;
        this.options = Object.assign({}, options);
        if (!this.options.Filic || this.options.Filic instanceof Filic === false) {
            this.options.Filic = Filic.create(Path.dirname(this.options.path));
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
                    }
                    else {
                        currentEntity = currentEntity.openDir(entity);
                    }
                }
                else {
                    currentEntity = this.Filic.openDir(entity);
                }
            }
            return currentEntity;
        }
        if (!this.exists && this.options.autoCreate) {
            (_a = this.createSync) === null || _a === void 0 ? void 0 : _a.call(this, {
                recursive: true
            });
        }
    }
    createSync(...args) { }
    get absolutePath() {
        return this.Filic.ResolvePath(this.path);
    }
    get Filic() {
        return this.options.Filic;
    }
    get exists() {
        return fs.existsSync(this.absolutePath);
    }
    get parentDir() {
        return Filic.Directory.create({
            path: Path.basename(this.dirPath),
            Filic: Filic.create(Path.dirname(this.dirPath)),
            type: EntityTypes.DIR
        });
    }
    get dirPath() {
        return Path.dirname(this.absolutePath);
    }
    // Detect type of entity based on its stats
    static detectTypeWithPath(path) {
        if (!fs.existsSync(path))
            return null;
        return Entity.getEntityStats(path).isDirectory() ? EntityTypes.DIR : EntityTypes.FILE;
    }
    // Getting stats from fs.statSync
    static getEntityStats(path) {
        return fs.statSync(path);
    }
    static create(options) {
        return new Entity(options);
    }
}
export default Entity;
//# sourceMappingURL=Entity.js.map