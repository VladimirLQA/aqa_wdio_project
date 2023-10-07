import { BasePage} from '../../base.page';

class FiltersProductModalPage extends BasePage {
  get ['Modal title']() {
    return '.modal-title';
  }

  get ['Modal lose button']() {
    return '.btn-close';
  }

  get ['Filter checkbox']() {
    return (filterName: string) => `.modal-filters-body input#${filterName}-filter`;
  }

  get ['Modal apply button']() {
    return '#apply-filters';
  }
  get ['Modal clear filters']() {
    return '#clear-filters';
  }
}