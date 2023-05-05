import { CliCommandInterface } from './cli-command.interface';
import TSVFileReader from '../file-reader/tsv-file-reader.js';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';

  public run(filepath: string): void {
    const normalizedFilepath = filepath?.trim();
    if (!normalizedFilepath) {
      return console.log('Не указан путь к файлу');
    }
    const fileReader = new TSVFileReader(normalizedFilepath);

    try {
      fileReader.read();
      console.log(fileReader.toArray());
    } catch (err) {

      if (!(err instanceof Error)) {
        throw err;
      }

      console.log(`Не удалось импортировать данные из файла по причине: «${err.message}»`);
    }
  }
}
