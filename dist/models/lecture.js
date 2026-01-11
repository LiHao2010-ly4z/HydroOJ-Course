import { db, nanoid } from 'hydrooj';
export const lectureColl = db.collection('lecture');
export async function createLecture(domainId, payload) {
    const _id = nanoid();
    const now = new Date();
    await lectureColl.insertOne({
        _id,
        domainId,
        courseId: payload.courseId,
        title: payload.title,
        type: payload.type,
        fileId: payload.fileId,
        content: payload.content,
        chapter: payload.chapter,
        order: payload.order || 0,
        createdAt: now,
        updatedAt: now,
        isPrivate: payload.isPrivate || false,
    });
    return _id;
}
export async function getLecture(domainId, id) {
    return lectureColl.findOne({ _id: id, domainId });
}
export async function listLectures(domainId, courseId) {
    return lectureColl.find({ domainId, courseId }).sort({ order: 1 }).toArray();
}
export async function updateLecture(domainId, id, payload) {
    return lectureColl.updateOne({ _id: id, domainId }, {
        $set: { ...payload, updatedAt: new Date() },
    });
}
export async function deleteLecture(domainId, id) {
    return lectureColl.deleteOne({ _id: id, domainId });
}
