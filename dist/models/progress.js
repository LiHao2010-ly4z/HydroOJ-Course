import { db, nanoid } from 'hydrooj';
export const progressColl = db.collection('progress');
export async function markRead(domainId, courseId, uid, lectureId) {
    const _id = nanoid();
    await progressColl.updateOne({ domainId, courseId, uid, lectureId }, { $set: { readAt: new Date(), updatedAt: new Date() }, $setOnInsert: { _id } }, { upsert: true });
}
export async function getCourseProgress(domainId, courseId, uid) {
    const filter = { domainId, courseId };
    if (uid)
        filter.uid = uid;
    return progressColl.find(filter).toArray();
}
