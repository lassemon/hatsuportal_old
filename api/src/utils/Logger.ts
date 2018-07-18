import * as moment from 'moment';

export default class Logger {

  public DATE_FORMAT = 'DD-MM-YYYY HH:mm:ssZ';

  public name: string;
  constructor(name: string, dateFormat?: string) {
    this.name = name;
    this.DATE_FORMAT = dateFormat;
  }

  public debug(message: string) {
    if (process.env.LOG_LEVEL === 'DEBUG') {
      const formatted = this.formatMessage(message, 'DEBUG');
      console.log(formatted);
      console.log(message);
    }
  }

  public info(message: string) {
    const formatted = this.formatMessage(message, 'INFO');
    console.log(formatted);
    console.log(message);
  }

  public warn(message: string) {
    const formatted = this.formatMessage(message, 'WARN');
    console.warn(formatted);
    console.warn(message);
  }

  public error(message: string) {
    const formatted = this.formatMessage(message, 'ERROR');
    console.error(formatted);
    console.error(message);
  }

  private formatMessage(message: string, level: string) {
    return this.name + ' ' + this.getTimestamp() + ' ' + level;
  }

  private getTimestamp() {
    return moment().format(this.DATE_FORMAT);
  }
}
