import { CliCommandInterface } from './cli-command.interface';
import TSVFileReader from '../file-reader/tsv-file-reader.js';
import chalk from 'chalk';
import { getErrorMessage } from '../utils/common.js';
import { createOffer } from '../utils/offers.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  private onLine(line: string) {
    const offer = createOffer(line);
    console.log(offer);
  }

  private onReadEnd(count: number) {
    console.log(`${count} lines imported.`);
  }

  public async run(filepath: string): Promise<void> {
    const normalizedFilepath = filepath?.trim();
    if (!normalizedFilepath) {
      return console.log(chalk.bold.red('Не указан путь к файлу'));
    }
    const fileReader = new TSVFileReader(normalizedFilepath);

    fileReader.on('line', this.onLine);
    fileReader.on('end', this.onReadEnd);

    try {
      await fileReader.read();
    } catch (err) {

      console.log(`Can't read the file: ${getErrorMessage(err)}`);
    }
  }
}
