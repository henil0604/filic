/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
/// <reference types="node" />
import { Abortable } from "events";
import * as fs from "fs";
export declare type createOptions = (fs.ObjectEncodingOptions & fs.promises.FlagAndOpenMode) | BufferEncoding | null;
export declare type createSyncOptions = fs.WriteFileOptions;
export declare type readRawOptions = ({
    encoding: BufferEncoding;
    flag?: fs.OpenMode | undefined;
} & Abortable);
export declare type readRawSyncOptions = {
    encoding: BufferEncoding;
    flag?: string | undefined;
};
export declare type readOptions = readRawOptions;
export declare type readSyncOptions = readRawSyncOptions;
export declare type writeRawOptions = (fs.ObjectEncodingOptions & {
    mode?: fs.Mode | undefined;
    flag?: fs.OpenMode | undefined;
} & Abortable) | null;
export declare type writeRawSyncOptions = (fs.ObjectEncodingOptions & Abortable & {
    mode?: fs.Mode | undefined;
    flag?: string | undefined;
}) | null;
export declare type writeOptions = writeRawOptions;
export declare type writeSyncOptions = writeRawSyncOptions;
export declare type createReadStreamOptions = BufferEncoding | fs.promises.CreateReadStreamOptions;
export declare type createWriteStreamOptions = BufferEncoding | fs.promises.CreateWriteStreamOptions;
export declare type deleteOptions = fs.RmOptions;
export declare type deleteSyncOptions = deleteOptions;
export interface copyOptions {
    override?: boolean;
}
export interface copySyncOptions extends copyOptions {
}
export interface moveOptions {
    override?: boolean;
}
export interface moveSyncOptions extends moveOptions {
}
export declare type readReturn = string & {
    toJSON: () => any;
    toBuffer: () => number[];
};
export declare type readSyncReturn = readReturn;
