import { Course, ID } from '../types';
export declare const courseColl: import("mongodb").Collection<unknown>;
export declare function createCourse(domainId: string, payload: Partial<Course>, owner: number): Promise<ID>;
export declare function getCourse(domainId: string, id: ID): Promise<import("mongodb").WithId<unknown> | null>;
export declare function listCourses(domainId: string, filter?: any): Promise<import("mongodb").WithId<unknown>[]>;
export declare function updateCourse(domainId: string, id: ID, payload: Partial<Course>): Promise<import("mongodb").UpdateResult<unknown>>;
export declare function deleteCourse(domainId: string, id: ID): Promise<void>;
