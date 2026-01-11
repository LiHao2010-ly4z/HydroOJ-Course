import { addPage, NamedPage } from '@hydrooj/ui-default';

addPage(new NamedPage(['class_detail'], () => {
  console.log('[class.page] class_detail mounted');
}));
