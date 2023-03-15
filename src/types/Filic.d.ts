import { Except, PartialDeep } from "type-fest"
import Filic from "@/Filic.js"

export enum EntityTypes {
    FILE = "FILE",
    DIR = "DIR"
}

export interface OpenOptions {
    type: EntityTypes,
    EntityOptions: DirectoryOptions | FileOptions
}

export interface EntityOptions {
    autoCreate: boolean,
    path: string,
    Filic: Filic,
    type: EntityTypes,
}

export interface DirectoryOptions extends EntityOptions {
    type: EntityTypes.DIR
}
export interface FileOptions extends EntityOptions {
    type: EntityTypes.FILE
}

export type openOptions = PartialDeep<OpenOptions>
export type openDirOptions = Except<Partial<DirectoryOptions>, 'Filic' | 'type'>
export type openFileOptions = Except<Partial<FileOptions>, 'Filic' | 'type'>