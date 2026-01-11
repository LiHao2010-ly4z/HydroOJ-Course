import { Handler, Types, param, MessageModel } from 'hydrooj';
import { getCourse } from '../models/course';
import { classColl } from '../models/class';
import { requireLogin, canManageCourse } from '../utils/perm';

export class AnnounceHandler extends Handler {
  @param('courseId', Types.String)
  async get(domainId: string, courseId: string) {
    requireLogin(this);
    const course = await getCourse(domainId, courseId);
    if (!course || !canManageCourse(this, course)) this.throw(403);
    this.response.body = { courseId };
    this.response.template = 'announce_create.html';
  }

  @param('courseId', Types.String)
  @param('title', Types.String)
  @param('content', Types.Content)
  async post(domainId: string, courseId: string, title: string, content: string) {
    requireLogin(this);
    const course = await getCourse(domainId, courseId);
    if (!course || !canManageCourse(this, course)) this.throw(403);
    const classes = await classColl.find({ domainId, _id: { $in: course.classIds } }).toArray();
    const students = new Set<number>(classes.flatMap(c => c.studentIds));
    for (const uid of students) {
      await MessageModel.send(domainId, this.user._id, uid, { title, content });
    }
    this.back();
  }
}
