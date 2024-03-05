import ModalPage from './modal.page.js';

class FilterModalPage extends ModalPage {
  readonly ['Modal title'] = '.modal-title';
  readonly ['Filter checkbox'] = (filterName: string) => `//input[@id="${filterName}-filter"]`;
  readonly ['Apply button'] = '#apply-filters';
  readonly ['Clear filters button'] = '#clear-filters';
}

export default new FilterModalPage();
