import { db, nanoid, DocumentModel } from 'hydrooj';
import { Course, ID } from '../types';

export const courseColl = db.collection<Course>('course');

export async function createCourse(domainId: string, payload: Partial<Course>, owner: number): Promise<ID> {
  const _id = nanoid();
  const now = new Date();
  await courseColl.insertOne({
    _id,
    domainId,
    name: payload.name!,
    desc: payload.desc,
    cover: payload.cover,
    classIds: payload.classIds || [],
    teacherIds: payload.teacherIds || [],
    createdAt: now,
    updatedAt: now,
    active: true,
  } as Course);

  // 注册到 document 集合，docType=course
  await DocumentModel.add(domainId, {
    _id,
    docType: 'course',
    title: payload.name!,
    content: payload.desc || '',
    owner,
  });

  return _id;
}

export async function getCourse(domainId: string, id: ID) {
  return courseColl.findOne({ _id: id, domainId });
}

export async function listCourses(domainId: string, filter: any = {}) {
  return courseColl.find({ domainId, ...filter }).toArray();
}

export async function updateCourse(domainId: string, id: ID, payload: Partial<Course>) {
  return courseColl.updateOne({ _id: id, domainId }, {
    $set: { ...payload, updatedAt: new Date() },
  });
}

export async function deleteCourse(domainId: string, id: ID) {
  await courseColl.deleteOne({ _id: id, domainId });
  await DocumentModel.delete(domainId, id);
}
