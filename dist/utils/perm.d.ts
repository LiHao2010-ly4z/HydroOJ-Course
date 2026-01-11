import { Course } from '../types';
export declare function requireLogin(ctx: any): void;
export declare function isAdmin(ctx: any): any;
export declare function isCourseTeacher(ctx: any, course: Course): boolean;
export declare function canManageCourse(ctx: any, course: Course): any;
export declare function isClassMember(ctx: any, classStudentIds: number[]): boolean;
