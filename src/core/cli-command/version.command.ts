import { readFile } from 'node:fs/promises';
import { CliCommandInterface } from './cli-command.interface';
import path from 'node:path';

export default class VersionCommand implements CliCommandInterface {
  public readonly name = '--version';

  public async readVersion(): Promise<string> {
    return readFile(path.resolve('./package.json'), 'utf-8')
      .then((rawContent) => JSON.parse(rawContent))
      .then((content) => content.version);
  }

  public async run(): Promise<void> {
    const version = await this.readVersion();
    console.log(version);
  }
}
