import { Handler } from 'hydrooj';
export declare class AnnounceHandler extends Handler {
    get(domainId: string, courseId: string): Promise<void>;
    post(domainId: string, courseId: string, title: string, content: string): Promise<void>;
}
