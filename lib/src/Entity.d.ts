/// <reference types="node" />
import * as fs from 'fs';
import { EntityOptions, EntityTypes } from '../types/Filic';
import Filic from './Filic';
declare class Entity {
    type: EntityTypes;
    path: string;
    private options;
    constructor(options: EntityOptions);
    createSync(...args: any[]): void;
    get absolutePath(): string;
    get Filic(): Filic;
    get exists(): boolean;
    get parentDir(): import("./Directory").default;
    get dirPath(): string;
    static detectTypeWithPath(path: string): EntityTypes | null;
    static getEntityStats(path: string): fs.Stats;
    static create(options: EntityOptions): Entity;
}
export default Entity;
//# sourceMappingURL=Entity.d.ts.map