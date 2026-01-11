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
import { createClass, listClasses, getClass, updateClass } from '../models/class';
import { listCourses } from '../models/course';
import { requireLogin } from '../utils/perm';
export class ClassListHandler extends Handler {
    async get(domainId) {
        requireLogin(this);
        const classes = await listClasses(domainId);
        this.response.body = { classes };
        this.response.template = 'class_list.html';
    }
}
let ClassCreateHandler = (() => {
    let _classSuper = Handler;
    let _instanceExtraInitializers = [];
    let _post_decorators;
    return class ClassCreateHandler extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _post_decorators = [param('name', Types.String), param('desc', Types.Content)];
            __esDecorate(this, null, _post_decorators, { kind: "method", name: "post", static: false, private: false, access: { has: obj => "post" in obj, get: obj => obj.post }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async get() {
            requireLogin(this);
            this.response.template = 'class_create.html';
        }
        async post(domainId, name, desc) {
            requireLogin(this);
            const id = await createClass(domainId, { name, desc });
            this.response.redirect = this.url('class_detail', { id });
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
export { ClassCreateHandler };
let ClassDetailHandler = (() => {
    let _classSuper = Handler;
    let _instanceExtraInitializers = [];
    let _get_decorators;
    let _postUpdate_decorators;
    return class ClassDetailHandler extends _classSuper {
        static {
            const _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(_classSuper[Symbol.metadata] ?? null) : void 0;
            _get_decorators = [param('id', Types.String)];
            _postUpdate_decorators = [param('id', Types.String), param('name', Types.String), param('desc', Types.Content), param('studentIds', Types.Array), param('courseIds', Types.Array)];
            __esDecorate(this, null, _get_decorators, { kind: "method", name: "get", static: false, private: false, access: { has: obj => "get" in obj, get: obj => obj.get }, metadata: _metadata }, null, _instanceExtraInitializers);
            __esDecorate(this, null, _postUpdate_decorators, { kind: "method", name: "postUpdate", static: false, private: false, access: { has: obj => "postUpdate" in obj, get: obj => obj.postUpdate }, metadata: _metadata }, null, _instanceExtraInitializers);
            if (_metadata) Object.defineProperty(this, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        }
        async get(domainId, id) {
            requireLogin(this);
            const cls = await getClass(domainId, id);
            if (!cls)
                this.throw(404);
            const courses = await listCourses(domainId, { _id: { $in: cls.courseIds } });
            this.response.body = { cls, courses };
            this.response.template = 'class_detail.html';
        }
        async postUpdate(domainId, id, name, desc, studentIds = [], courseIds = []) {
            requireLogin(this);
            await updateClass(domainId, id, { name, desc, studentIds, courseIds });
            this.back();
        }
        constructor() {
            super(...arguments);
            __runInitializers(this, _instanceExtraInitializers);
        }
    };
})();
export { ClassDetailHandler };
