import { db, nanoid, DocumentModel } from 'hydrooj';
export const courseColl = db.collection('course');
export async function createCourse(domainId, payload, owner) {
    const _id = nanoid();
    const now = new Date();
    await courseColl.insertOne({
        _id,
        domainId,
        name: payload.name,
        desc: payload.desc,
        cover: payload.cover,
        classIds: payload.classIds || [],
        teacherIds: payload.teacherIds || [],
        createdAt: now,
        updatedAt: now,
        active: true,
    });
    // 注册到 document 集合，docType=course
    await DocumentModel.add(domainId, {
        _id,
        docType: 'course',
        title: payload.name,
        content: payload.desc || '',
        owner,
    });
    return _id;
}
export async function getCourse(domainId, id) {
    return courseColl.findOne({ _id: id, domainId });
}
export async function listCourses(domainId, filter = {}) {
    return courseColl.find({ domainId, ...filter }).toArray();
}
export async function updateCourse(domainId, id, payload) {
    return courseColl.updateOne({ _id: id, domainId }, {
        $set: { ...payload, updatedAt: new Date() },
    });
}
export async function deleteCourse(domainId, id) {
    await courseColl.deleteOne({ _id: id, domainId });
    // 同时删除 document 记录
    await DocumentModel.delete(domainId, id);
}
