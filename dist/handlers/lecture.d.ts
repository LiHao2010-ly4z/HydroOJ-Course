import { Handler } from 'hydrooj';
export declare class LectureListHandler extends Handler {
    get(domainId: string, courseId: string): Promise<void>;
}
export declare class LectureCreateHandler extends Handler {
    get(domainId: string, courseId: string): Promise<void>;
    post(domainId: string, courseId: string, title: string, type: 'pdf' | 'markdown' | 'video', chapter?: string, order?: number, content?: string): Promise<void>;
}
export declare class LectureDetailHandler extends Handler {
    get(domainId: string, id: string): Promise<void>;
    postUpdate(domainId: string, id: string, title: string, type: 'pdf' | 'markdown' | 'video', chapter?: string, order?: number, content?: string): Promise<void>;
    postDelete(domainId: string, id: string): Promise<void>;
}
