import { Class, ID } from '../types';
export declare const classColl: import("mongodb").Collection<unknown>;
export declare function createClass(domainId: string, payload: Partial<Class>): Promise<ID>;
export declare function getClass(domainId: string, id: ID): Promise<import("mongodb").WithId<unknown> | null>;
export declare function listClasses(domainId: string): Promise<import("mongodb").WithId<unknown>[]>;
export declare function updateClass(domainId: string, id: ID, payload: Partial<Class>): Promise<import("mongodb").UpdateResult<unknown>>;
