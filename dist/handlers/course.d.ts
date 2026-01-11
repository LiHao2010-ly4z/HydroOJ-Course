import { Service } from 'hydrooj';
export declare class CourseService extends Service {
    constructor(ctx: any);
    courseList: (ctx: any) => Promise<void>;
    courseCreateGet: (ctx: any) => Promise<void>;
    courseCreatePost: (ctx: any) => Promise<void>;
    courseDetail: (ctx: any) => Promise<void>;
    courseUpdate: (ctx: any) => Promise<void>;
    courseDelete: (ctx: any) => Promise<void>;
}
