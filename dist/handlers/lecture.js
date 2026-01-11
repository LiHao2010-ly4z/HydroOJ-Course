var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
import { Handler, Types, param } from 'hydrooj';
import { listLectures, createLecture, getLecture, updateLecture, deleteLecture } from '../models/lecture';
import { getCourse } from '../models/course';
import { requireLogin, canManageCourse } from '../utils/perm';
let LectureListHandler = (() => {
    let _classSuper = Handler;
    let _instanceExtraInitializers = [];
    let _get_decorators;
    return class LectureListHandler extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _get_decorators = [param('courseId', Types.String)];
            __esDecorate(this, null, _get_decorators, { kind: "method", name: "get", static: false, private: false, access: { has: obj => "get" in obj, get: obj => obj.get }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async get(domainId, courseId) {
            requireLogin(this);
            const lectures = await listLectures(domainId, courseId);
            this.response.body = { lectures, courseId };
            this.response.template = 'lecture_list.html';
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
export { LectureListHandler };
let LectureCreateHandler = (() => {
    let _classSuper = Handler;
    let _instanceExtraInitializers = [];
    let _get_decorators;
    let _post_decorators;
    return class LectureCreateHandler extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _get_decorators = [param('courseId', Types.String)];
            _post_decorators = [param('courseId', Types.String), param('title', Types.String), param('type', Types.String), param('chapter', Types.String), param('order', Types.Number), param('content', Types.Content)];
            __esDecorate(this, null, _get_decorators, { kind: "method", name: "get", static: false, private: false, access: { has: obj => "get" in obj, get: obj => obj.get }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _post_decorators, { kind: "method", name: "post", static: false, private: false, access: { has: obj => "post" in obj, get: obj => obj.post }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async get(domainId, courseId) {
            requireLogin(this);
            const course = await getCourse(domainId, courseId);
            if (!course || !canManageCourse(this, course))
                this.throw(403);
            this.response.body = { courseId };
            this.response.template = 'lecture_create.html';
        }
        async post(domainId, courseId, title, type, chapter, order = 0, content) {
            requireLogin(this);
            const course = await getCourse(domainId, courseId);
            if (!course || !canManageCourse(this, course))
                this.throw(403);
            const id = await createLecture(domainId, { courseId, title, type, chapter, order, content });
            this.response.redirect = this.url('lecture_detail', { id });
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
export { LectureCreateHandler };
let LectureDetailHandler = (() => {
    let _classSuper = Handler;
    let _instanceExtraInitializers = [];
    let _get_decorators;
    let _postUpdate_decorators;
    let _postDelete_decorators;
    return class LectureDetailHandler extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _get_decorators = [param('id', Types.String)];
            _postUpdate_decorators = [param('id', Types.String), param('title', Types.String), param('type', Types.String), param('chapter', Types.String), param('order', Types.Number), param('content', Types.Content)];
            _postDelete_decorators = [param('id', Types.String)];
            __esDecorate(this, null, _get_decorators, { kind: "method", name: "get", static: false, private: false, access: { has: obj => "get" in obj, get: obj => obj.get }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _postUpdate_decorators, { kind: "method", name: "postUpdate", static: false, private: false, access: { has: obj => "postUpdate" in obj, get: obj => obj.postUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _postDelete_decorators, { kind: "method", name: "postDelete", static: false, private: false, access: { has: obj => "postDelete" in obj, get: obj => obj.postDelete }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async get(domainId, id) {
            requireLogin(this);
            const lecture = await getLecture(domainId, id);
            if (!lecture)
                this.throw(404);
            const course = await getCourse(domainId, lecture.courseId);
            this.response.body = { lecture, course };
            this.response.template = 'lecture_detail.html';
        }
        async postUpdate(domainId, id, title, type, chapter, order = 0, content) {
            requireLogin(this);
            const lecture = await getLecture(domainId, id);
            if (!lecture)
                this.throw(404);
            const course = await getCourse(domainId, lecture.courseId);
            if (!course || !canManageCourse(this, course))
                this.throw(403);
            await updateLecture(domainId, id, { title, type, chapter, order, content });
            this.back();
        }
        async postDelete(domainId, id) {
            requireLogin(this);
            const lecture = await getLecture(domainId, id);
            if (!lecture)
                this.throw(404);
            const course = await getCourse(domainId, lecture.courseId);
            if (!course || !canManageCourse(this, course))
                this.throw(403);
            await deleteLecture(domainId, id);
            this.response.redirect = this.url('lecture_list', { courseId: lecture.courseId });
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
export { LectureDetailHandler };
