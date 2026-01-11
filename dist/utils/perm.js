import { PRIV } from 'hydrooj';
export function requireLogin(ctx) {
    ctx.checkPriv(PRIV.PRIV_USER_PROFILE);
}
export function isAdmin(ctx) {
    return Boolean(ctx.user?.priv & PRIV.PRIV_ALL) || ctx.user?.isAdmin;
}
export function isCourseTeacher(ctx, course) {
    const uid = ctx.user?._id;
    return !!uid && course.teacherIds.includes(uid);
}
export function canManageCourse(ctx, course) {
    return isAdmin(ctx) || isCourseTeacher(ctx, course);
}
export function isClassMember(ctx, classStudentIds) {
    const uid = ctx.user?._id;
    return !!uid && classStudentIds.includes(uid);
}
