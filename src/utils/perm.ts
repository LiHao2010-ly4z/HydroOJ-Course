import { Handler, PRIV } from 'hydrooj';
import { Course } from '../types';

export function requireLogin(h: Handler) {
  h.checkPriv(PRIV.PRIV_USER_PROFILE);
}

export function isAdmin(h: Handler) {
  return Boolean(h.user?.priv & PRIV.PRIV_ALL) || (h.user as any)?.isAdmin;
}

export function isCourseTeacher(h: Handler, course: Course) {
  const uid = h.user?._id;
  return !!uid && course.teacherIds.includes(uid);
}

export function canManageCourse(h: Handler, course: Course) {
  return isAdmin(h) || isCourseTeacher(h, course);
}

export function isClassMember(h: Handler, classStudentIds: number[]) {
  const uid = h.user?._id;
  return !!uid && classStudentIds.includes(uid);
}
