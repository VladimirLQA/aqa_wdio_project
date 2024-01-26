import BasePage from './base.page.js';

class SidebarPage extends BasePage {
  readonly ['User dropdown menu'] = '#sidebar #dropdownUser1';

  readonly ['Sign out button'] = '#signOut';

  readonly ['Sidebar title'] = '#sidebar > a > span.fs-4';

  readonly ['Home button'] = '#sidebar > ul > li:nth-child(1) > a';

  readonly ['Orders button'] = '#sidebar > ul > li:nth-child(2) > a';

  readonly ['Products button'] = '#sidebar > ul > li:nth-child(3) > a';

  readonly ['Customers button'] = '#sidebar > ul > li:nth-child(4) > a';

  readonly ['Currency input'] = '#currency-input';

  readonly ["Currency 'Buy' button"] = '#sidebar > div > button';
}

export default new SidebarPage();
