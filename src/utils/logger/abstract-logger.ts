import _ from 'lodash';

export type LogStatus = 'info' | 'error';

export abstract class BaseLogger {
  protected logArray: string[] = [];
  private static instance: BaseLogger;

  constructor() {
    if (BaseLogger.instance) {
      return BaseLogger.instance;
    }
    BaseLogger.instance = this;
  }

  abstract log(message: string, logStatus: LogStatus): void;

  abstract logApiRequest(requestInfo: string): void;

  abstract logApiResponse(responseInfo: string, level?: LogStatus): void;

  abstract sendLogsToReport(): void;

  protected clearLogs(): void {
    _.remove(this.logArray);
  }
}
