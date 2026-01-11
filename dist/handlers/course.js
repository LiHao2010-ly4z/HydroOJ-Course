import { Service } from 'hydrooj';
import { listCourses, createCourse, getCourse, updateCourse, deleteCourse } from '../models/course';
import { listLectures } from '../models/lecture';
import { listAssignments } from '../models/assignment';
import { classColl } from '../models/class';
import { requireLogin, canManageCourse, isAdmin, isCourseTeacher, isClassMember } from '../utils/perm';
function parseIds(str) {
    return str ? str.split(',').map(s => s.trim()).filter(Boolean) : [];
}
function parseNumIds(str) {
    return str
        ? str
            .split(',')
            .map(s => Number(s.trim()))
            .filter(n => !Number.isNaN(n))
        : [];
}
export class CourseService extends Service {
    constructor(ctx) {
        super(ctx, 'course');
        this.ctx.get('/course', this.courseList);
        this.ctx.get('/course/create', this.courseCreateGet);
        this.ctx.post('/course/create', this.courseCreatePost);
        this.ctx.get('/course/:id', this.courseDetail);
        this.ctx.post('/course/:id', this.courseUpdate); // 假设 update 和 delete 用不同方法区分
        // 需要调整
    }
    courseList = async (ctx) => {
        requireLogin(ctx);
        const courses = await listCourses(ctx.domainId);
        ctx.response.body = { courses };
        ctx.response.template = 'course_list.html';
    };
    courseCreateGet = async (ctx) => {
        requireLogin(ctx);
        ctx.response.template = 'course_create.html';
    };
    courseCreatePost = async (ctx) => {
        requireLogin(ctx);
        const { name, desc, cover, classIds, teacherIds } = ctx.request.body;
        const id = await createCourse(ctx.domainId, {
            name,
            desc,
            cover,
            classIds: parseIds(classIds),
            teacherIds: parseNumIds(teacherIds),
        }, ctx.user._id);
        ctx.response.redirect = ctx.url('course_detail', { id });
    };
    courseDetail = async (ctx) => {
        requireLogin(ctx);
        const { id } = ctx.params;
        const course = await getCourse(ctx.domainId, id);
        if (!course)
            ctx.throw(404);
        const lectures = await listLectures(ctx.domainId, id);
        const assignments = await listAssignments(ctx.domainId, id);
        const classes = await classColl.find({ domainId: ctx.domainId, _id: { $in: course.classIds } }).toArray();
        const isMember = classes.some(c => isClassMember(ctx, c.studentIds));
        ctx.response.body = {
            course,
            lectures,
            assignments,
            isAdmin: isAdmin(ctx),
            isTeacher: isCourseTeacher(ctx, course),
            isMember,
        };
        ctx.response.template = 'course_detail.html';
    };
    courseUpdate = async (ctx) => {
        requireLogin(ctx);
        const { id } = ctx.params;
        const { name, desc, cover, classIds, teacherIds } = ctx.request.body;
        const course = await getCourse(ctx.domainId, id);
        if (!course || !canManageCourse(ctx, course))
            ctx.throw(403);
        await updateCourse(ctx.domainId, id, {
            name,
            desc,
            cover,
            classIds: parseIds(classIds),
            teacherIds: parseNumIds(teacherIds),
        });
        ctx.back();
    };
    courseDelete = async (ctx) => {
        requireLogin(ctx);
        const { id } = ctx.params;
        const course = await getCourse(ctx.domainId, id);
        if (!course || !canManageCourse(ctx, course))
            ctx.throw(403);
        await deleteCourse(ctx.domainId, id);
        ctx.response.redirect = ctx.url('course_list');
    };
}
