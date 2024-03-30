class DropdownPage {
  readonly ['Dropdown page title'] = 'div > h3';

  readonly ['Dropdown'] = 'select#dropdown';

  readonly ['Dropdown list'] = 'select#dropdown > option';

  readonly ['Dropdown selected option'] = "select#dropdown > option[selected='selected']";

  readonly ['Dropdown Option 1'] = "select#dropdown > option[value='1']";

  readonly ['Dropdown Option 2'] = "select#dropdown > option[value='2']";
}

export default new DropdownPage();
