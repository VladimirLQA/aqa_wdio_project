import BasePage from '../../base.page';

class FiltersModalPage extends BasePage {
  readonly ['Modal title'] = '.modal-title';

  readonly ['Filter checkbox'] =
    (filterName: string) => `.modal-filters-body input#${filterName}-filter`;

  readonly ['Apply button'] =  '#apply-filters';

  readonly ['Clear filters button'] = '#clear-filters';
}

export default new FiltersModalPage();
