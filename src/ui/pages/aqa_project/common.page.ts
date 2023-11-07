import BasePage from './base.page';


export class CommonPage extends BasePage {
  readonly pageName: string;

  readonly ['Chip buttons'] = '#chip-buttons .chip';

  readonly ['Chip close button'] = '#chip-buttons .closebtn';

  readonly ['Table page'] = (pageName: string) => `#table-${pageName}`;

  readonly ['Chip label'] = (pageName: string, chipName: string) => `.chip[data-chip-${pageName}='${chipName}']`;

  readonly ['Filter button'] = '#filter';

}
