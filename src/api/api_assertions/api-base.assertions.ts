import { AxiosResponse } from 'axios';
import { validateSchema } from '../../utils/json-schema-validator';

export class ApiBaseAssertions {
  public async verifyResponseSchema(schema: any, json: any) {
    const valid = await validateSchema({ schema, json });
    expect(valid).toBe(true);
  }

  public async verifyResponse(response: AxiosResponse, statusCode: number, IsSuccess?: boolean, ErrorMessage?: null | string) {
    expect(response.status).toBe(statusCode);
    expect(response.data.IsSuccess).toBe(IsSuccess);
    expect(response.data.ErrorMessage).toBe(ErrorMessage);
  }
}
