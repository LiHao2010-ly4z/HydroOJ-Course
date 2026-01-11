import { db, nanoid } from 'hydrooj';
import { Class, ID } from '../types';

export const classColl = db.collection<Class>('class');

export async function createClass(domainId: string, payload: Partial<Class>): Promise<ID> {
  const _id = nanoid();
  const now = new Date();
  await classColl.insertOne({
    _id,
    domainId,
    name: payload.name!,
    desc: payload.desc,
    studentIds: payload.studentIds || [],
    courseIds: payload.courseIds || [],
    createdAt: now,
    updatedAt: now,
  } as Class);
  return _id;
}

export async function getClass(domainId: string, id: ID) {
  return classColl.findOne({ _id: id, domainId });
}

export async function listClasses(domainId: string) {
  return classColl.find({ domainId }).toArray();
}

export async function updateClass(domainId: string, id: ID, payload: Partial<Class>) {
  return classColl.updateOne({ _id: id, domainId }, {
    $set: { ...payload, updatedAt: new Date() },
  });
}
