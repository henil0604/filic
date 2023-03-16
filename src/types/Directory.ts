import * as fs from 'fs';
import { EntityTypes } from '@/types/Filic';

export type createOptions = fs.MakeDirectoryOptions;
export type createSyncOptions = fs.MakeDirectoryOptions;

export type deleteSelfOptions = fs.RmOptions;
export type deleteSelfSyncOptions = fs.RmOptions;


export interface searchOptions {
    type?: EntityTypes
    deep?: boolean
}