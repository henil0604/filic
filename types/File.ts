import { Abortable } from "events";
import * as fs from "fs";

export type createOptions = (fs.ObjectEncodingOptions & fs.promises.FlagAndOpenMode) | BufferEncoding | null

export type createSyncOptions = fs.WriteFileOptions

export type readRawOptions = ({
    encoding: BufferEncoding;
    flag?: fs.OpenMode | undefined;
} & Abortable)

export type readRawSyncOptions = {
    encoding: BufferEncoding;
    flag?: string | undefined;
}

export type readOptions = readRawOptions;
export type readSyncOptions = readRawSyncOptions;

export type writeRawOptions = (fs.ObjectEncodingOptions & {
    mode?: fs.Mode | undefined;
    flag?: fs.OpenMode | undefined;
} & Abortable)
    | null;

export type writeRawSyncOptions = (fs.ObjectEncodingOptions &
    Abortable & {
        mode?: fs.Mode | undefined;
        flag?: string | undefined;
    })
    | null;

export type writeOptions = writeRawOptions;

export type writeSyncOptions = writeRawSyncOptions;

export type createReadStreamOptions = BufferEncoding | fs.promises.CreateReadStreamOptions;

export type createWriteStreamOptions = BufferEncoding | fs.promises.CreateWriteStreamOptions;

export type deleteOptions = fs.RmOptions;
export type deleteSyncOptions = deleteOptions;

export interface copyOptions {
    override?: boolean
}
export interface copySyncOptions extends copyOptions { }

export interface moveOptions {
    override?: boolean
}
export interface moveSyncOptions extends moveOptions { }