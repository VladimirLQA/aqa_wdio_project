import { AxiosResponse } from 'axios';
import { validateSchema } from '../../utils/json-schema-validator.js';
import Expect from '../../utils/chai-expect/expect-collection.js';

export class ApiBaseAssertions {
  verifyResponseSchema(schema: any, json: any) {
    const valid = validateSchema({ schema, json });
    Expect.toEqual({ actual: valid, expected: true });
  }

  verifyResponse(response: AxiosResponse, statusCode: number, IsSuccess?: boolean, ErrorMessage?: null | string) {
    Expect.toEqual({ actual: response.status, expected: statusCode });
    Expect.toEqual({ actual: response.data.IsSuccess, expected: IsSuccess });
    Expect.toEqual({ actual: response.data.ErrorMessage, expected: ErrorMessage });
  }
}
