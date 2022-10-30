/// <reference types="node" />
import { DirectoryOptions, FileOptions } from "../types/Filic";
import Entity from "./Entity";
import Filic from "./Filic";
import File from './File';
import * as DirectoryTypes from '../types/Directory';
import * as FileTypes from '../types/File';
declare class Directory extends Entity {
    constructor(options: DirectoryOptions);
    create(options?: DirectoryTypes.createOptions): Promise<this>;
    createSync(options?: DirectoryTypes.createSyncOptions): this;
    deleteSelf(options?: DirectoryTypes.deleteSelfOptions): Promise<this>;
    deleteSelfSync(options?: DirectoryTypes.deleteSelfSyncOptions): this;
    listRaw(): Promise<string[]>;
    listRawSync(): string[] | Buffer[];
    list(): Promise<(Directory | File)[]>;
    listSync(): (Directory | File)[];
    deleteDir(path: (string | Directory), openDirOptions?: DirectoryOptions, deleteSelfOptions?: DirectoryTypes.deleteSelfOptions): Promise<this>;
    deleteDirSync(path: (string | Directory), openDirOptions?: DirectoryOptions, deleteSelfOptions?: DirectoryTypes.deleteSelfSyncOptions): this;
    deleteFile(path: (string | File), openFileOptions?: FileOptions, deleteOptions?: FileTypes.deleteOptions): Promise<this>;
    deleteFileSync(path: (string | File), openFileOptions?: FileOptions, deleteOptions?: FileTypes.deleteSyncOptions): this;
    clear(): Promise<this>;
    clearSync(): this;
    has(path: string): boolean;
    copyAll(destination: Directory): Promise<this>;
    copyAllSync(destination: Directory): this;
    copy(destination: Directory): Promise<this>;
    copySync(destination: Directory): this;
    moveAll(destination: Directory): Promise<this>;
    moveAllSync(destination: Directory): this;
    move(destination: Directory): Promise<this>;
    moveSync(destination: Directory): this;
    secondCopy(dirname: string): Promise<this>;
    secondCopySync(dirname: string): this;
    ResolvePath(path: string): string;
    openDir(path: string, options?: DirectoryOptions): Directory;
    openFile(path: string, options?: FileOptions): File;
    toFilic(): Filic;
    get dirname(): string;
    static create(options?: DirectoryOptions): Directory;
}
export default Directory;
//# sourceMappingURL=Directory.d.ts.map