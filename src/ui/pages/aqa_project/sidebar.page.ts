import BasePage from './base.page';

class SidebarPage extends BasePage {
  readonly ['User dropdown menu'] = '#sidebar #dropdownUser1';

  readonly ['Sign out button'] = '#signOut';

  readonly ['Sidebar title'] = '#sidebar > a > span.fs-4';

  readonly ['Home page'] = '#sidebar > ul > li:nth-child(1) > a';

  readonly ['Orders page'] = '#sidebar > ul > li:nth-child(2) > a';

  readonly ['Products page'] = '#sidebar > ul > li:nth-child(3) > a';

  readonly ['Customers page'] = '#sidebar > ul > li:nth-child(4) > a';

  readonly ['Currency input'] = '#currency-input';

  readonly ["Currency 'Buy' button"] = '#sidebar > div > button';

  readonly ['Sign out button'] =  '#signOut';
}

export default new SidebarPage();
