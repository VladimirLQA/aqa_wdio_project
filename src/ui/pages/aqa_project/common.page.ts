import BasePage from './base.page';


export class CommonPage extends BasePage {
  readonly pageName: string;

  readonly ['Chip buttons'] = '#chip-buttons .chip';

  readonly ['Chip close button'] = '#chip-buttons .closebtn';

}
