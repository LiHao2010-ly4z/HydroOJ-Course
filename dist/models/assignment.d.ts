import { Assignment, ID } from '../types';
export declare const assignColl: import("mongodb").Collection<unknown>;
export declare function addAssignment(domainId: string, payload: Partial<Assignment>): Promise<ID>;
export declare function listAssignments(domainId: string, courseId: ID): Promise<import("mongodb").WithId<unknown>[]>;
export declare function removeAssignment(domainId: string, id: ID): Promise<import("mongodb").DeleteResult>;
