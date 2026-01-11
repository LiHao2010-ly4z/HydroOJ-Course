import { Lecture, ID } from '../types';
export declare const lectureColl: import("mongodb").Collection<unknown>;
export declare function createLecture(domainId: string, payload: Partial<Lecture>): Promise<ID>;
export declare function getLecture(domainId: string, id: ID): Promise<import("mongodb").WithId<unknown> | null>;
export declare function listLectures(domainId: string, courseId: ID): Promise<import("mongodb").WithId<unknown>[]>;
export declare function updateLecture(domainId: string, id: ID, payload: Partial<Lecture>): Promise<import("mongodb").UpdateResult<unknown>>;
export declare function deleteLecture(domainId: string, id: ID): Promise<import("mongodb").DeleteResult>;
