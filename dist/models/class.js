import { db, nanoid } from 'hydrooj';
export const classColl = db.collection('class');
export async function createClass(domainId, payload) {
    const _id = nanoid();
    const now = new Date();
    await classColl.insertOne({
        _id,
        domainId,
        name: payload.name,
        desc: payload.desc,
        studentIds: payload.studentIds || [],
        courseIds: payload.courseIds || [],
        createdAt: now,
        updatedAt: now,
    });
    return _id;
}
export async function getClass(domainId, id) {
    return classColl.findOne({ _id: id, domainId });
}
export async function listClasses(domainId) {
    return classColl.find({ domainId }).toArray();
}
export async function updateClass(domainId, id, payload) {
    return classColl.updateOne({ _id: id, domainId }, {
        $set: { ...payload, updatedAt: new Date() },
    });
}
