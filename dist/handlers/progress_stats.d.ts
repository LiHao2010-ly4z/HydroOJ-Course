import { Handler } from 'hydrooj';
export declare class ProgressStatsHandler extends Handler {
    get(domainId: string, courseId: string): Promise<void>;
}
