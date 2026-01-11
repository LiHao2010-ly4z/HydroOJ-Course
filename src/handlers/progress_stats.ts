import { Handler, Types, param } from 'hydrooj';
import { listAssignments } from '../models/assignment';
import { getCourseProgress } from '../models/progress';
import { requireLogin } from '../utils/perm';

export class ProgressStatsHandler extends Handler {
  @param('courseId', Types.String)
  async get(domainId: string, courseId: string) {
    requireLogin(this);
    const assigns = await listAssignments(domainId, courseId);
    const progress = await getCourseProgress(domainId, courseId);
    this.response.body = { assigns, progress };
  }
}
