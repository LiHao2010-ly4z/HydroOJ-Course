import { addPage, NamedPage } from '@hydrooj/ui-default';

addPage(new NamedPage(['lecture_detail'], () => {
  const btn = document.querySelector('form[action*="/progress/mark"] button');
  if (btn) {
    btn.addEventListener('click', () => {
      console.log('[lecture.page] mark read clicked');
    });
  }
}));
