import ApiSignInActions from '../../../api/api_actions/api-sign-in.actions.js';
import ApiCustomersAssertions from '../../../api/api_assertions/api-customers.assertions.js';
import { getNewCustomer } from '../../../data/customers/customers.data.js';
import { CREATE_CUSTOMER_SCHEMA } from '../../../data/json_schemas/customers.schema.js';
import { ICustomer, ICustomerResponse } from '../../../types/customers.types.js';
import Expect from '../../../utils/chai-expect/expect-collection.js';
import { expect } from 'chai';
import { ApiActions } from '../../../api/api_actions/api-actions.index.js';
import { IResponse } from '../../../types/api-request.type.js';
import { STATUS_CODES } from '../../../types/http.types.js';

describe('[CRUD] CUSTOMERS test', () => {
  let token: string, id: string, createdCustomer: ICustomerResponse | ICustomer, response: IResponse;

  before(async () => {
    token = await ApiSignInActions.signInAsAdminAndGetToken();
  });

  context('[CRUD] test', () => {
    it('Should create customer', async () => {
      createdCustomer = getNewCustomer();

      response = await ApiActions.customers.createCustomer(token, createdCustomer);

      ApiCustomersAssertions.verifyResponse(response, STATUS_CODES.CREATED, true, null);
      ApiCustomersAssertions.verifyResponseSchema(CREATE_CUSTOMER_SCHEMA, response.data);
      ApiCustomersAssertions.verifyCustomer(response.data.Customer, createdCustomer);

      id = response.data.Customer._id;
    });

    it('Should get created customer by id', async () => {
      response = await ApiActions.customers.getCustomerByID(token, id);

      ApiCustomersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
      ApiCustomersAssertions.verifyResponseSchema(CREATE_CUSTOMER_SCHEMA, response.data);
    });

    it('Should update customer by id', async () => {
      const updatedCustomer = getNewCustomer();

      response = await ApiActions.customers.updateCustomer(token, id, updatedCustomer);

      ApiCustomersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
      ApiCustomersAssertions.verifyCustomer(response.data.Customer, updatedCustomer);
    });
    it('Should get all customers', async () => {
      response = await ApiActions.customers.getAllPrCustomers(token);

      ApiCustomersAssertions.verifyResponse(response, STATUS_CODES.OK, true, null);
      Expect.toBeNotEmpty({ actual: response.data.Customers });
      expect(response.data.Customers).to.be.an('array');
    });

    it('Should delete customer by id', async () => {
      response = await ApiActions.customers.deleteCustomer(token, id);
      ApiCustomersAssertions.verifyResponse(response, STATUS_CODES.NO_CONTENT);

      response = await ApiActions.customers.getCustomerByID(token, id);
      ApiCustomersAssertions.verifyResponse(response, STATUS_CODES.NOT_FOUND, false, `Customer with id '${id}' wasn't found`);
    });
  });
});
