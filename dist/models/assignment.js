import { db, nanoid } from 'hydrooj';
export const assignColl = db.collection('course_assignment');
export async function addAssignment(domainId, payload) {
    const _id = nanoid();
    await assignColl.insertOne({
        _id,
        domainId,
        courseId: payload.courseId,
        pid: payload.pid,
        title: payload.title,
        dueAt: payload.dueAt,
        weight: payload.weight || 1,
        createdAt: new Date(),
    });
    return _id;
}
export async function listAssignments(domainId, courseId) {
    return assignColl.find({ domainId, courseId }).toArray();
}
export async function removeAssignment(domainId, id) {
    return assignColl.deleteOne({ _id: id, domainId });
}
