import { validateSchema } from '../../utils/json-schema-validator.js';
import Expect from '../../utils/chai-expect/expect-collection.js';
import { IResponse } from '../../types/api-request.type.js';

export class ApiBaseAssertions {
  verifyResponseSchema(schema: any, json: any) {
    const valid = validateSchema({ schema, json });
    Expect.toEqual({ actual: valid, expected: true });
  }

  verifyResponse(response: IResponse, statusCode: number, IsSuccess?: boolean, ErrorMessage?: null | string) {
    Expect.toEqual({ actual: response.status, expected: statusCode });
    if (IsSuccess) expect(response.data.IsSuccess).toBe(IsSuccess);
    if (ErrorMessage) expect(response.data.ErrorMessage).toBe(ErrorMessage);
  }
}
