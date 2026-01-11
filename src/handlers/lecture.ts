import { Handler, Types, param } from 'hydrooj';
import { listLectures, createLecture, getLecture, updateLecture, deleteLecture } from '../models/lecture';
import { getCourse } from '../models/course';
import { requireLogin, canManageCourse } from '../utils/perm';

export class LectureListHandler extends Handler {
  @param('courseId', Types.String)
  async get(domainId: string, courseId: string) {
    requireLogin(this);
    const lectures = await listLectures(domainId, courseId);
    this.response.body = { lectures, courseId };
    this.response.template = 'lecture_list.html';
  }
}

export class LectureCreateHandler extends Handler {
  @param('courseId', Types.String)
  async get(domainId: string, courseId: string) {
    requireLogin(this);
    const course = await getCourse(domainId, courseId);
    if (!course || !canManageCourse(this, course)) this.throw(403);
    this.response.body = { courseId };
    this.response.template = 'lecture_create.html';
  }

  @param('courseId', Types.String)
  @param('title', Types.String)
  @param('type', Types.String)
  @param('chapter', Types.String)
  @param('order', Types.Number)
  @param('content', Types.Content)
  async post(domainId: string, courseId: string, title: string, type: 'pdf'|'markdown'|'video', chapter?: string, order = 0, content?: string) {
    requireLogin(this);
    const course = await getCourse(domainId, courseId);
    if (!course || !canManageCourse(this, course)) this.throw(403);
    const id = await createLecture(domainId, { courseId, title, type, chapter, order, content });
    this.response.redirect = this.url('lecture_detail', { id });
  }
}

export class LectureDetailHandler extends Handler {
  @param('id', Types.String)
  async get(domainId: string, id: string) {
    requireLogin(this);
    const lecture = await getLecture(domainId, id);
    if (!lecture) this.throw(404);
    const course = await getCourse(domainId, lecture.courseId);
    this.response.body = { lecture, course };
    this.response.template = 'lecture_detail.html';
  }

  @param('id', Types.String)
  @param('title', Types.String)
  @param('type', Types.String)
  @param('chapter', Types.String)
  @param('order', Types.Number)
  @param('content', Types.Content)
  async postUpdate(domainId: string, id: string, title: string, type: 'pdf'|'markdown'|'video', chapter?: string, order = 0, content?: string) {
    requireLogin(this);
    const lecture = await getLecture(domainId, id);
    if (!lecture) this.throw(404);
    const course = await getCourse(domainId, lecture.courseId);
    if (!course || !canManageCourse(this, course)) this.throw(403);
    await updateLecture(domainId, id, { title, type, chapter, order, content });
    this.back();
  }

  @param('id', Types.String)
  async postDelete(domainId: string, id: string) {
    requireLogin(this);
    const lecture = await getLecture(domainId, id);
    if (!lecture) this.throw(404);
    const course = await getCourse(domainId, lecture.courseId);
    if (!course || !canManageCourse(this, course)) this.throw(403);
    await deleteLecture(domainId, id);
    this.response.redirect = this.url('lecture_list', { courseId: lecture.courseId });
  }
}
