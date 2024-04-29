import { RequestOptions } from '../../types/api-request.type.js';
import { BaseLogger } from '../../utils/logger/abstract-logger.js';
import { BaseReporter } from '../../utils/reporter/abstract-reporter.js';

export interface IResponse<T = unknown> {
  data: T;
  status: string;
  headers: Record<string, string | number | boolean>;
}

export abstract class AbstractRequest {
  protected response: any;
  protected options: RequestOptions | null;

  private logErrorResponse(error: any) {
    this.loggerService.log(`Error: ${(error as Error).message}`, 'error');
    this.loggerService.log(`Request URL: [${this.options?.method}] [${this.options?.url}]`, 'error');
  }

  private async logRequest() {
    await this.reporterService.reportApiRequest(this.options!, this.response);
    this.loggerService.logApiRequest(JSON.stringify(this.options, null, 2));
    this.loggerService.logApiResponse(JSON.stringify(this.response, null, 2));
  }

  /**
   * Sends request with provided options
   */
  protected abstract send(): Promise<object>;

  /**
   * Transforms response to IResponse
   */
  protected abstract transformResponse(response?: any): void;

  /**
   * Transforms requestOptions from IRequestOptions to satisfy the api client options type based on the requestType field of requestOptions
   */
  protected abstract transformRequest(): void;

  constructor(private reporterService: BaseReporter, private loggerService: BaseLogger) {
    this.options = null;
  }

  public async sendRequest<T>(initOptions: RequestOptions): Promise<IResponse<T>> {
    try {
      this.options = initOptions;
      if (!this.options) throw new Error(`Request options were not provided`);
      this.transformRequest();
      this.response = await this.send();
      this.transformResponse();
    } catch (error: any) {
      if (error) this.logErrorResponse(error);
      this.transformResponse(error);
    } finally {
      this.logRequest();
    }
    return this.response;
  }
}
