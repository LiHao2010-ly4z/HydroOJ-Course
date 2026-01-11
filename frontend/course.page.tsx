import { addPage, NamedPage } from '@hydrooj/ui-default';

addPage(new NamedPage(['course_detail'], () => {
  console.log('[course.page] course_detail mounted');
}));
