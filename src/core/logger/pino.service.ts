import { LoggerInterface } from './logger.interface.js';
import { Logger, pino } from 'pino';
import { createWriteStream } from 'node:fs';
import { injectable } from 'inversify';

@injectable()
export default class PinoService implements LoggerInterface {
  private readonly logger: Logger;

  constructor() {
    const stream = createWriteStream('logs.log', { flags: 'a' });
    this.logger = pino(stream);
  }

  public debug(message: string, ...args: unknown[]): void {
    this.logger.debug(message, ...args);
  }

  public error(message: string, ...args: unknown[]): void {
    this.logger.error(message, ...args);
  }

  public info(message: string, ...args: unknown[]): void {
    this.logger.info(message, ...args);
  }

  public warn(message: string, ...args: unknown[]): void {
    this.logger.warn(message, ...args);
  }
}
