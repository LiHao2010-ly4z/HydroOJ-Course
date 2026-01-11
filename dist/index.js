import { CourseService } from './handlers/course';
import { ClassListHandler, ClassCreateHandler, ClassDetailHandler } from './handlers/class';
import { LectureListHandler, LectureCreateHandler, LectureDetailHandler } from './handlers/lecture';
import { ProgressMarkHandler } from './handlers/progress_mark';
import { ProgressStatsHandler } from './handlers/progress_stats';
import { AnnounceHandler } from './handlers/announce';
export async function apply(ctx) {
    ctx.plugin(CourseService);
    // 注册 docType=course，使 /record?tid=courseId 可用
    // ctx.registerDocType('course'); // 可能不存在
    // 其他路由暂时保持
    ctx.Route('lecture_list', '/course/:courseId/lecture', LectureListHandler, PRIV.PRIV_USER_PROFILE);
    ctx.Route('lecture_create', '/course/:courseId/lecture/create', LectureCreateHandler, PRIV.PRIV_USER_PROFILE);
    ctx.Route('lecture_detail', '/lecture/:id', LectureDetailHandler, PRIV.PRIV_USER_PROFILE);
    // 班级
    ctx.Route('class_list', '/class', ClassListHandler, PRIV.PRIV_USER_PROFILE);
    ctx.Route('class_create', '/class/create', ClassCreateHandler, PRIV.PRIV_USER_PROFILE);
    ctx.Route('class_detail', '/class/:id', ClassDetailHandler, PRIV.PRIV_USER_PROFILE);
    // 进度
    ctx.Route('progress_mark', '/api/course/:courseId/progress/mark', ProgressMarkHandler, PRIV.PRIV_USER_PROFILE);
    ctx.Route('progress_stats', '/api/course/:courseId/progress/stats', ProgressStatsHandler, PRIV.PRIV_USER_PROFILE);
    // 公告
    ctx.Route('course_announce', '/course/:courseId/announce', AnnounceHandler, PRIV.PRIV_USER_PROFILE);
}
