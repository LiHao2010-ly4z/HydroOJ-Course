import { PRIV } from 'hydrooj';
import { Course } from '../types';

export function requireLogin(ctx: any) {
  ctx.checkPriv(PRIV.PRIV_USER_PROFILE);
}

export function isAdmin(ctx: any) {
  return Boolean(ctx.user?.priv & PRIV.PRIV_ALL) || (ctx.user as any)?.isAdmin;
}

export function isCourseTeacher(ctx: any, course: Course) {
  const uid = ctx.user?._id;
  return !!uid && course.teacherIds.includes(uid);
}

export function canManageCourse(ctx: any, course: Course) {
  return isAdmin(ctx) || isCourseTeacher(ctx, course);
}

export function isClassMember(ctx: any, classStudentIds: number[]) {
  const uid = ctx.user?._id;
  return !!uid && classStudentIds.includes(uid);
}
