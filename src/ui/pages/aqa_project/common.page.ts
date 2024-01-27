import BasePage from './base.page.js';

export class CommonPage extends BasePage {
  readonly pageName: string = '';

  readonly ['Chip buttons'] = '#chip-buttons .chip';

  readonly ['Chip close button'] = '#chip-buttons .closebtn';

  readonly ['Table page'] = (pageName: string) => `#table-${pageName}`;

  readonly ['Chip label'] = (pageName: string, chipName: string) => `.chip[data-chip-${pageName}='${chipName}']`;

  readonly ['Filter button'] = '#filter';

  readonly ['Search input'] = "[type='search']";

  readonly ['Search button'] = (pageName: string) => `#search-${pageName}`;

  readonly ['Table row selector'] = (searchValue: string) => `//tr[./td[text()="${searchValue}"]]`;

  readonly ['Table row action button'] = (searchValue: string, actionButton: string) =>
    `${this['Table row selector'](searchValue)}/td/button[@title='${actionButton}']`;
}
