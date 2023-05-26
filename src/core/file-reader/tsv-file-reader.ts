import EventEmitter from 'node:events';
import { createInterface } from 'node:readline/promises';
import { createReadStream, statSync } from 'node:fs';
import { FileReaderInterface } from './file-reader.interface.js';

const CHUNK_SIZE = 2 ** 11;

export default class TSVFileReader extends EventEmitter implements FileReaderInterface {
  constructor(public filename: string) {
    super();
  }

  private getFileSizeInkBytes(filename: string): string {
    const stats = statSync(filename);
    return (stats.size / 2 ** 10).toFixed(2);
  }

  public async read(): Promise<void> {
    const fileSize = this.getFileSizeInkBytes(this.filename);
    console.log(`starts reading the file with size ${fileSize} kB`);
    const stream = createReadStream(this.filename, {
      highWaterMark: CHUNK_SIZE,
      encoding: 'utf-8',
    });

    let importedLineCount = 0;

    const readLine = createInterface({
      input: stream,
      crlfDelay: Infinity
    });

    const promisesArray:Promise<any>[] = [];

    readLine.on('line', (line) => {
      importedLineCount++;
      const promise = new Promise((resolve) => {
        this.emit('line', line, resolve);
      });
      promisesArray.push(promise);
    });

    readLine.on('close', () => {
      Promise.all(promisesArray)
        .then(() => {
          this.emit('end', importedLineCount);
        })
        .catch((err) => {
          console.log(`something went wrong, ${err}`);
        });
    });
  }
}
