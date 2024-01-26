import { AxiosResponse } from 'axios';
import ApiCustomersActions from '../../../api/api_actions/api-customers.actions.js';
import ApiSignInActions from '../../../api/api_actions/api-sign-in.actions.js';
import ApiCustomersAssertions from '../../../api/api_assertions/api-customers.assertions.js';
import { STATUS_CODES } from '../../../api/type/api.common.type.js';
import { ICustomerResponse } from '../../../api/type/api.customers.type.js';
import { getNewCustomer } from '../../../data/customers/customers.data.js';
import { CREATE_CUSTOMER_SCHEMA } from '../../../data/json_schemas/customers.schema.js';
import { ICustomer } from '../../../ui/types/customers.types.js';
import Expect from '../../../utils/chai-expect/expect-collection.js';
import { expect } from 'chai';

describe('[CRUD] CUSTOMERS test', () => {
  let token: string, id: string, createdCustomer: ICustomerResponse | ICustomer, response: AxiosResponse;

  before(async () => {
    token = await ApiSignInActions.signInAsAdminAndGetToken();
  });

  context('[CRUD] test', () => {
    it('Should create customer', async () => {
      createdCustomer = getNewCustomer();

      response = await ApiCustomersActions.createCustomer(token, createdCustomer);

      ApiCustomersAssertions.verifyResponse(response, STATUS_CODES.CREATED, true, null);
      ApiCustomersAssertions.verifyResponseSchema(CREATE_CUSTOMER_SCHEMA, response.data);
      ApiCustomersAssertions.verifyCustomer(response.data.Customer, createdCustomer);

      id = response.data.Customer._id;
    });

    it('Should get created customer by id', async () => {
      response = await ApiCustomersActions.getCustomerByID(token, id);

      ApiCustomersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
      ApiCustomersAssertions.verifyResponseSchema(CREATE_CUSTOMER_SCHEMA, response.data);
    });

    it('Should update customer by id', async () => {
      const updatedCustomer = getNewCustomer();

      response = await ApiCustomersActions.updateCustomer(token, id, updatedCustomer);

      ApiCustomersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
      ApiCustomersAssertions.verifyCustomer(response.data.Customer, updatedCustomer);
    });
    it('Should get all customers', async () => {
      response = await ApiCustomersActions.getAllPrCustomers(token);

      ApiCustomersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
      Expect.toBeNotEmpty({ actual: response.data.Customers });
      expect(response.data.Customers).to.be.an('array');
    });

    it('Should delete customer by id', async () => {
      response = await ApiCustomersActions.deleteCustomer(token, id);
      ApiCustomersAssertions.verifyResponse(response, STATUS_CODES.NO_CONTENT);

      response = await ApiCustomersActions.getCustomerByID(token, id);
      ApiCustomersAssertions.verifyResponse(response, STATUS_CODES.NOT_FOUND, false, `Customer with id '${id}' wasn't found`);
    });
  });
});
