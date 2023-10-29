import { ModalPage } from './modal.page';

class FilterModalPage extends ModalPage {
  readonly ['Modal title'] = '.modal-title';

  readonly ['Filter checkbox'] = (filterName: string) => `.modal-filters-body input#${filterName}-filter`;

  readonly ['Apply button'] = '#apply-filters';

  readonly ['Clear filters button'] = '#clear-filters';
}

export default new FilterModalPage();
