import * as moment from 'moment';

const DATE_FORMAT = 'DD-MM-YYYY HH:mm:ssZ';

export default class Logger {
  public name: string;
  constructor(name: string) {
    this.name = name;
  }
  public info(message: string) {
    const formatted = this.formatMessage(message, 'INFO');
    console.log(formatted);
  }
  public warn(message: string) {
    const formatted = this.formatMessage(message, 'WARN');
    console.warn(formatted);
  }
  public error(message: string) {
    const formatted = this.formatMessage(message, 'ERROR');
    console.error(formatted);
  }

  private formatMessage(message: string, level: string) {
    return this.name + ' ' + this.getTimestamp() + ' ' + level + ' ' + message;
  }

  private getTimestamp() {
    return moment().format(DATE_FORMAT);
  }
}
