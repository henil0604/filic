/// <reference types="node" />
import { FileOptions } from "../types/Filic";
import Entity from "./Entity";
import * as fs from 'fs';
import * as FileTypes from "../types/File";
import Directory from "./Directory";
declare class File extends Entity {
    constructor(options: FileOptions);
    create(options?: FileTypes.createOptions): Promise<this>;
    createSync(options?: FileTypes.createSyncOptions): this;
    readRaw(options?: FileTypes.readRawOptions): Promise<string>;
    readRawSync(options?: FileTypes.readRawSyncOptions): string;
    read(options?: FileTypes.readOptions): Promise<FileTypes.readReturn>;
    readSync(options?: FileTypes.readSyncOptions): FileTypes.readReturn;
    append(content: string, readRawOptions?: FileTypes.readRawOptions, writeRawOptions?: FileTypes.writeRawOptions): Promise<string>;
    appendSync(content: string, readRawSyncOptions?: FileTypes.readRawSyncOptions, writeRawSyncOptions?: FileTypes.writeRawSyncOptions): string;
    prepend(content: string, readRawOptions?: FileTypes.readRawOptions, writeRawOptions?: FileTypes.writeRawOptions): Promise<string>;
    prependSync(content: string, readRawSyncOptions?: FileTypes.readRawSyncOptions, writeRawSyncOptions?: FileTypes.writeRawSyncOptions): string;
    writeRaw(content: string, options?: FileTypes.writeRawOptions): Promise<this>;
    writeRawSync(content: string, options?: FileTypes.writeRawSyncOptions): this;
    write(content: any, options?: FileTypes.writeOptions): Promise<this>;
    writeSync(content: any, options?: FileTypes.writeSyncOptions): this;
    createReadStream(options?: FileTypes.createReadStreamOptions): fs.ReadStream;
    createWriteStream(options?: FileTypes.createWriteStreamOptions): fs.WriteStream;
    delete(options?: FileTypes.deleteOptions): Promise<this>;
    deleteSync(options?: FileTypes.deleteSyncOptions): this;
    copy(destination: Directory, filename?: string, options?: FileTypes.copyOptions): Promise<File>;
    copySync(destination: Directory, filename?: string, options?: FileTypes.copySyncOptions): Promise<File>;
    secondCopy(filename?: string, options?: FileTypes.copyOptions): Promise<File>;
    secondCopySync(filename?: string, options?: FileTypes.copySyncOptions): Promise<File>;
    move(destination: Directory, filename?: string, options?: FileTypes.moveOptions): Promise<File>;
    moveSync(destination: Directory, filename?: string, options?: FileTypes.moveSyncOptions): File;
    rename(filename: string): Promise<File>;
    renameSync(filename: string): File;
    replaceWith(file: File): Promise<this>;
    replaceWithSync(file: File): this;
    update(callback: (content: FileTypes.readReturn) => any): Promise<this>;
    updateSync(callback: (content: FileTypes.readSyncReturn) => any): this;
    get filename(): string;
    static parseWrite(content: any): any;
    static create(options: FileOptions): File;
}
export default File;
//# sourceMappingURL=File.d.ts.map