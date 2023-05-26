import { CliCommandInterface } from './cli-command.interface';
import TSVFileReader from '../file-reader/tsv-file-reader.js';
import chalk from 'chalk';
import { getErrorMessage } from '../utils/common.js';
import { createOffer } from '../utils/offers.js';
import { getMongoURI } from '../utils/db.js';
import { UserServiceInterface } from '../../modules/user/user-service.interface.js';
import { DatabaseClientInterface } from '../database-client/database-client.interface.js';
import { LoggerInterface } from '../logger/logger.interface.js';
import ConsoleLoggerService from '../logger/console.service.js';
import UserService from '../../modules/user/user.service.js';
import { UserModel } from '../../modules/user/user.entity.js';
import { OfferModel } from '../../modules/offer/offer.entity.js';
import OfferService from '../../modules/offer/offer.service.js';
import MongoClientService from '../database-client/mongo-client.service.js';
import { Offer } from '../../types/offer.type.js';
import { OfferServiceInterface } from '../../modules/offer/offer-service.interface.js';

const DEFAULT_DB_PORT = '27017';
const DEFAULT_USER_PASSWORD = '123456';

export default class ImportCommand implements CliCommandInterface {
  public readonly name = '--import';
  private userService!: UserServiceInterface;
  private databaseService!: DatabaseClientInterface;
  private readonly logger: LoggerInterface;
  private salt!: string;
  private offerService!: OfferServiceInterface;

  constructor() {
    this.onLine = this.onLine.bind(this);
    this.onReadEnd = this.onReadEnd.bind(this);

    this.logger = new ConsoleLoggerService();
    this.offerService = new OfferService(this.logger, OfferModel);
    this.userService = new UserService(this.logger, UserModel);
    this.databaseService = new MongoClientService(this.logger);
  }

  private async onLine(line: string, resolve: () => void) {
    const offer = createOffer(line);
    console.log(offer);
    await this.saveOffer(offer);
    resolve();
  }

  private async saveOffer(offer: Offer) {
    const user = await this.userService.findOrCreate({
      ...offer.author,
      password: DEFAULT_USER_PASSWORD
    }, this.salt);

    await this.offerService.create({
      ...offer,
      userId: user.id,
    });
  }

  private onReadEnd(count: number) {
    console.log(`${count} lines imported.`);
    this.databaseService.disconnect();
  }

  public async run(filepath: string, login: string, password: string, host: string, dbname: string, salt: string): Promise<void> {
    const uri = getMongoURI(login, password, host, DEFAULT_DB_PORT, dbname);
    this.salt = salt;

    const normalizedFilepath = filepath?.trim();
    if (!normalizedFilepath) {
      return console.log(chalk.bold.red('Не указан путь к файлу'));
    }
    await this.databaseService.connect(uri);

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
