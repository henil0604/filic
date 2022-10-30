import { DirectoryOptions, FileOptions } from '../types/Filic';
import Entity from './Entity';
import Directory from './Directory';
import File from './File';
declare class Filic {
    BasePath: string;
    constructor(BasePath?: string);
    private open;
    openDir(path: string, options?: DirectoryOptions): Directory;
    openFile(path: string, options?: FileOptions): File;
    ResolvePath(path: string): string;
    static create(BasePath?: string): Filic;
    static get Entity(): typeof Entity;
    static get Directory(): typeof Directory;
    static get File(): typeof File;
}
export default Filic;
//# sourceMappingURL=Filic.d.ts.map