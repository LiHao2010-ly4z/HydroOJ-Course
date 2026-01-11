import { Handler, Types, param } from 'hydrooj';
import { markRead } from '../models/progress';
import { requireLogin } from '../utils/perm';

export class ProgressMarkHandler extends Handler {
  @param('courseId', Types.String)
  @param('lectureId', Types.String)
  async post(domainId: string, courseId: string, lectureId: string) {
    requireLogin(this);
    await markRead(domainId, courseId, this.user._id, lectureId);
    this.response.body = { ok: true };
  }
}
