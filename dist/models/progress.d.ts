import { ID } from '../types';
export declare const progressColl: import("mongodb").Collection<unknown>;
export declare function markRead(domainId: string, courseId: ID, uid: number, lectureId: ID): Promise<void>;
export declare function getCourseProgress(domainId: string, courseId: ID, uid?: number): Promise<import("mongodb").WithId<unknown>[]>;
