import Filic from "../src/Filic"

export enum EntityTypes {
    FILE = "FILE",
    DIR = "DIR"
}

export interface OpenOptions {
    type?: EntityTypes,
    EntityOptions?: DirectoryOptions | FileOptions
}

export interface EntityOptions {
    autoCreate?: boolean,
    path?: string,
    Filic?: Filic,
    type?: EntityTypes,
}

export interface DirectoryOptions extends EntityOptions { }
export interface FileOptions extends EntityOptions { }
