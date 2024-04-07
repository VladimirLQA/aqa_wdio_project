import { IResponse, RequestOptions } from '../../types/api-request.type.js';

export abstract class BaseReporter {
  protected requestOptions: Partial<RequestOptions> | undefined;
  protected response: IResponse | undefined;

  /**
   * Attaches api request data to the report
   */
  protected abstract reportApiRequestData(): Promise<void>;

  /**
   * Attaches api response data to the report
   */
  protected abstract reportApiResponseData(): Promise<void>;

  /**
   * Attaches logs from Logger to report
   */
  public abstract attachLog(log: string): void;

  /**
   * Clears report results folder, e.g. allure-results for Allure reporter
   */
  public abstract clearReportResults(): void;

  /**
   * Attaches request and response data to report
   * @param requestOptions Request options provided to api client
   * @param response Response received from api client
   */
  public async reportApiRequest(requestOptions: Partial<RequestOptions>, response: IResponse) {
    this.requestOptions = requestOptions;
    this.response = response;
    await this.reportApiRequestData();
    await this.reportApiResponseData();
  }
}
