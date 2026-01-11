import { db, nanoid } from 'hydrooj';
import { Lecture, ID } from '../types';

export const lectureColl = db.collection<Lecture>('lecture');

export async function createLecture(domainId: string, payload: Partial<Lecture>): Promise<ID> {
  const _id = nanoid();
  const now = new Date();
  await lectureColl.insertOne({
    _id,
    domainId,
    courseId: payload.courseId!,
    title: payload.title!,
    type: payload.type!,
    fileId: payload.fileId,
    content: payload.content,
    chapter: payload.chapter,
    order: payload.order || 0,
    createdAt: now,
    updatedAt: now,
    isPrivate: payload.isPrivate || false,
  } as Lecture);
  return _id;
}

export async function getLecture(domainId: string, id: ID) {
  return lectureColl.findOne({ _id: id, domainId });
}

export async function listLectures(domainId: string, courseId: ID) {
  return lectureColl.find({ domainId, courseId }).sort({ order: 1 }).toArray();
}

export async function updateLecture(domainId: string, id: ID, payload: Partial<Lecture>) {
  return lectureColl.updateOne({ _id: id, domainId }, {
    $set: { ...payload, updatedAt: new Date() },
  });
}

export async function deleteLecture(domainId: string, id: ID) {
  return lectureColl.deleteOne({ _id: id, domainId });
}
