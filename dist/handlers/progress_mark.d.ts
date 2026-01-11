import { Handler } from 'hydrooj';
export declare class ProgressMarkHandler extends Handler {
    post(domainId: string, courseId: string, lectureId: string): Promise<void>;
}
