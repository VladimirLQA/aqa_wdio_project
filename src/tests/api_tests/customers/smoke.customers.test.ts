import ApiCustomersActions from '../../../api/api_actions/api-customers.actions';
import ApiSignInActions from '../../../api/api_actions/api-sign-in.actions';
import ApiCustomersAssertions from '../../../api/api_assertions/api-customers.assertions';
import { ICustomerResponse } from '../../../api/type/api.customers.type';
import { getNewCustomer } from '../../../data/customers/customers.data';
import { CREATE_CUSTOMER_SCHEMA } from '../../../data/json_schemas/customers.schema';
import { COUNTRIES, ICustomer } from '../../../ui/types/customers.types';

describe('Smoke customers test', () => {
  let token: string, id: string, createdCustomer: ICustomerResponse | ICustomer;

  before(async () => {
    token = await ApiSignInActions.signInAsAdminAndGetToken();
  });

  context('Default flow', () => {
    it('Should create customer', async () => {
      createdCustomer = getNewCustomer();

      const response = await ApiCustomersActions.createCustomer(token, createdCustomer);
      await ApiCustomersAssertions.verifyResponse(response, 201, true, null);
      await ApiCustomersAssertions.verifyResponseSchema(CREATE_CUSTOMER_SCHEMA, response.data);

      id = response.data.Customer._id;
    });

    it('Should get created customer by id', async () => {
      const response = await ApiCustomersActions.getCustomerByID(token, id);
      await ApiCustomersAssertions.verifyResponse(response, 200, true, null);
      await ApiCustomersAssertions.verifyResponseSchema(CREATE_CUSTOMER_SCHEMA, response.data);
      await ApiCustomersAssertions.verifyCustomer(response.data.Customer, createdCustomer);
    });

    it('Should update customer by id', async () => {
      const forUpdate: ICustomer = {
        email: 'updatedEmail@gmail.com',
        country: COUNTRIES.FRANCE,
        street: 'updated street',
        notes: 'updated notes',
        flat: 1,
        phone: '+28000000001',
        name: `updated name`,
        city: 'updated city',
        house: 1,
      };

      const response = await ApiCustomersActions.updateCustomer(token, id, forUpdate);
      await ApiCustomersAssertions.verifyResponse(response, 200, true, null);
      await ApiCustomersAssertions.verifyCustomer(response.data.Customer, forUpdate);
    });

    it('Should delete customer by id', async () => {
      const response = await ApiCustomersActions.deleteCustomer(token, id);
      await ApiCustomersAssertions.verifyResponse(response, 204);
    });

    it('Should verify that customer is deleted from server', async () => {
      const response = await ApiCustomersActions.getCustomerByID(token, id);
      await ApiCustomersAssertions.verifyResponse(response, 404, false, `Customer with id '${id}' wasn't found`);
    });
  });
});
