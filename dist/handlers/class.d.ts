import { Handler } from 'hydrooj';
export declare class ClassListHandler extends Handler {
    get(domainId: string): Promise<void>;
}
export declare class ClassCreateHandler extends Handler {
    get(): Promise<void>;
    post(domainId: string, name: string, desc?: string): Promise<void>;
}
export declare class ClassDetailHandler extends Handler {
    get(domainId: string, id: string): Promise<void>;
    postUpdate(domainId: string, id: string, name: string, desc?: string, studentIds?: number[], courseIds?: string[]): Promise<void>;
}
