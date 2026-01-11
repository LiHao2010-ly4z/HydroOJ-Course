import { db, nanoid } from 'hydrooj';
import { Progress, ID } from '../types';

export const progressColl = db.collection<Progress>('progress');

export async function markRead(domainId: string, courseId: ID, uid: number, lectureId: ID) {
  const _id = nanoid();
  await progressColl.updateOne(
    { domainId, courseId, uid, lectureId },
    { $set: { readAt: new Date(), updatedAt: new Date() }, $setOnInsert: { _id } },
    { upsert: true },
  );
}

export async function getCourseProgress(domainId: string, courseId: ID, uid?: number) {
  const filter: any = { domainId, courseId };
  if (uid) filter.uid = uid;
  return progressColl.find(filter).toArray();
}
