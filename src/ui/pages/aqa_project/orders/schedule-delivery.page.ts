import BasePage from '../base.page.js';

class EditDeliveryPage extends BasePage {
  readonly ['Delivery Type dropdown'] = '#inputType';

  readonly ['Delivery type dropdown option'] = (option: 'delivery' | 'pickup') =>
    `${this['Delivery Type dropdown']} > [value="${option}"]`;

  readonly ['Date picker'] = '#date-input';

  readonly ['Date picker days'] = '.datepicker-days';

  readonly ['Date picker months'] = '.datepicker-months';

  readonly ['Date picker years'] = '.datepicker-years';

  readonly ['Location dropdown'] = '#inputLocation';

  readonly ['Location dropdown list'] = '#inputLocation > option';

  readonly ['Country dropdown'] = '#selectCountry';

  readonly ['Country dropdown list'] = '#selectCountry > option';

  readonly ['City field'] = '#inputCity';

  readonly ['Street field'] = '#inputStreet';

  readonly ['House field'] = '#inputHouse';

  readonly ['Flat field'] = '#inputFlat';

  readonly ['Error field'] = (fieldName: 'inputCity' | 'inputStreet' | 'inputHouse' | 'inputFlat') => `#error-${fieldName}`;

  readonly ['Save delivery button'] = '#save-delivery';

  readonly ['Cancel button'] = '#back-to-order-details-page';
}

export default new EditDeliveryPage();
