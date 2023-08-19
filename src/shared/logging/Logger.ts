/* eslint-disable no-console */
export class Logger {
  static info(message: string, ...optionalParams: string[]) {
    console.log(message, ...optionalParams);
  }

  static error(message: string, ...optionalParams: string[]) {
    console.error(message, ...optionalParams);
  }
}

export const logger = new Logger();
