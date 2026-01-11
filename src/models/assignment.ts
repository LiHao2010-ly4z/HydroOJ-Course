import { db, nanoid } from 'hydrooj';
import { Assignment, ID } from '../types';

export const assignColl = db.collection<Assignment>('course_assignment');

export async function addAssignment(domainId: string, payload: Partial<Assignment>): Promise<ID> {
  const _id = nanoid();
  await assignColl.insertOne({
    _id,
    domainId,
    courseId: payload.courseId!,
    pid: payload.pid!,
    title: payload.title,
    dueAt: payload.dueAt,
    weight: payload.weight || 1,
    createdAt: new Date(),
  } as Assignment);
  return _id;
}

export async function listAssignments(domainId: string, courseId: ID) {
  return assignColl.find({ domainId, courseId }).toArray();
}

export async function removeAssignment(domainId: string, id: ID) {
  return assignColl.deleteOne({ _id: id, domainId });
}
