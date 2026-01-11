import { Handler, Types, param } from 'hydrooj';
import { createClass, listClasses, getClass, updateClass } from '../models/class';
import { listCourses } from '../models/course';
import { requireLogin } from '../utils/perm';

export class ClassListHandler extends Handler {
  async get(domainId: string) {
    requireLogin(this);
    const classes = await listClasses(domainId);
    this.response.body = { classes };
    this.response.template = 'class_list.html';
  }
}

export class ClassCreateHandler extends Handler {
  async get() {
    requireLogin(this);
    this.response.template = 'class_create.html';
  }

  @param('name', Types.String)
  @param('desc', Types.Content)
  async post(domainId: string, name: string, desc?: string) {
    requireLogin(this);
    const id = await createClass(domainId, { name, desc });
    this.response.redirect = this.url('class_detail', { id });
  }
}

export class ClassDetailHandler extends Handler {
  @param('id', Types.String)
  async get(domainId: string, id: string) {
    requireLogin(this);
    const cls = await getClass(domainId, id);
    if (!cls) this.throw(404);
    const courses = await listCourses(domainId, { _id: { $in: cls.courseIds } });
    this.response.body = { cls, courses };
    this.response.template = 'class_detail.html';
  }

  @param('id', Types.String)
  @param('name', Types.String)
  @param('desc', Types.Content)
  @param('studentIds', Types.Array)
  @param('courseIds', Types.Array)
  async postUpdate(domainId: string, id: string, name: string, desc?: string, studentIds: number[] = [], courseIds: string[] = []) {
    requireLogin(this);
    await updateClass(domainId, id, { name, desc, studentIds, courseIds });
    this.back();
  }
}
