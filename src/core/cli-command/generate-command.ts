import got from 'got';
import { writeFile } from 'node:fs/promises';
import { CliCommandInterface } from './cli-command.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import OfferGenerator from '../../modules/offers-generator/offer-generator.js';
import TSVFileWriter from '../file-writer/tsv-file-writer.js';

export default class GenerateCommand implements CliCommandInterface {
  public readonly name = '--generate';
  private initialData!: MockData;
  private async clearFile(filepath: string): Promise<void> {
    try {
      await writeFile(filepath, '', { encoding: 'utf8', flag: 'w' });
      console.log('The file has been successfully cleaned');
    } catch (err) {
      console.error(err);
    }
  }

  public async run(...parameters:string[]): Promise<void> {
    const [count, filepath, url] = parameters;
    const offerCount = Number.parseInt(count, 10);

    try {
      this.initialData = await got.get(url).json();
    } catch {
      console.log(`Can't fetch data from ${url}.`);
    }
    const offerGeneratorString = new OfferGenerator(this.initialData);

    await this.clearFile(filepath);

    const tsvFileWriter = new TSVFileWriter(filepath);

    for (let i = 0; i < offerCount; i++) {
      await tsvFileWriter.write(offerGeneratorString.generate());
    }

    console.log(`File ${filepath} was created!`);
  }
}
