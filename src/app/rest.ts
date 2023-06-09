import { LoggerInterface } from '../core/logger/logger.interface.js';
import { ConfigInterface } from '../core/config/config.interface.js';
import { ControllerInterface } from '../core/controller/controller.interface.js';
import { DatabaseClientInterface } from '../core/database-client/database-client.interface.js';
import { RestSchema } from '../core/config/rest.schema.js';
import { AppComponent } from '../types/app-component.enum.js';
import { inject, injectable } from 'inversify';
import { getMongoURI } from '../core/utils/db.js';
import express, { Express } from 'express';

@injectable()
export default class RestApplication {
  private expressApplication: Express;

  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.ConfigInterface) private readonly config: ConfigInterface<RestSchema>,
    @inject(AppComponent.DatabaseClientInterface) private readonly databaseClient: DatabaseClientInterface,
    @inject(AppComponent.OfferController) private readonly OfferController: ControllerInterface,
  ) {
    this.expressApplication = express();
  }

  private async _initDb() {
    this.logger.info('Init database…');

    const mongoUri = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    await this.databaseClient.connect(mongoUri);
    this.logger.info('Init database completed');
  }

  private async _initRoutes() {
    this.logger.info('Controller initialization…');
    this.expressApplication.use('/offers', this.OfferController.router);
    this.logger.info('Controller initialization completed');
  }

  private async _initServer() {
    this.logger.info('Try to init server…');

    const port = this.config.get('APP_PORT');
    this.expressApplication.listen(port);

    this.logger.info(`Server started on http://localhost:${this.config.get('APP_PORT')}`);
  }


  public async init() {
    this.logger.info('Application initialization…');
    await this._initDb();
    await this._initRoutes();
    await this._initServer();
  }
}
