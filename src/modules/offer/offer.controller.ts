import { inject, injectable } from 'inversify';
import { Request, Response } from 'express';
import { Controller } from '../../core/controller/controller.abstract.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import { fillDTO } from '../../core/utils/common.js';
import OfferRdo from './rdo/offer.rdo.js';
import ExtendedOfferRdo from './rdo/extended-offer.rdo.js';
import CreateOfferDto from './dto/create-offer.dto.js';
import UpdateOfferDto from './dto/update-offer.dto.js';
import { ParamsDictionary } from 'express-serve-static-core';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { DocumentExistsMiddleware } from '../../core/middlewares/document-exists.middleware.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { CheckIsUserOfferMiddleware } from '../../core/middlewares/check-user-offer.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { ConfigInterface } from '../../core/config/config.interface.js';
import { UploadFileMiddleware } from '../../core/middlewares/upload-file.middleware.js';
import UploadImageResponse from './rdo/upload-image.response.js';

type OfferDetailsParams = {
  offerId: string;
} | ParamsDictionary

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.OfferServiceInterface) private readonly offersService: OfferServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateOfferDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new ValidateDtoMiddleware(UpdateOfferDto),
        new DocumentExistsMiddleware(this.offersService, 'Offer', 'offerId'),
        new CheckIsUserOfferMiddleware(this.offersService),
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offersService, 'Offer', 'offerId'),
        new CheckIsUserOfferMiddleware(this.offersService),
      ],
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getDetails,
      middlewares: [
        new ValidateObjectIdMiddleware('offerId'),
        new DocumentExistsMiddleware(this.offersService, 'Offer', 'offerId'),
      ]
    });
    this.addRoute({
      path: '/:offerId/image',
      method: HttpMethod.Post,
      handler: this.uploadImage,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateObjectIdMiddleware('offerId'),
        new UploadFileMiddleware(this.configService.get('UPLOAD_DIRECTORY'), 'image'),
      ]
    });
  }

  public async index(
    { query }: Request<unknown>,
    res: Response
  ): Promise<void> {
    const offers = await this.offersService.findSomeOffers(Number(query.limit) || 0);
    const offersToResponse = fillDTO(OfferRdo, offers);
    this.ok(res, offersToResponse);
  }

  public async create(
    { body, user }: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offersService.create({ ...body, userId: user.id });
    const offerToResponse = fillDTO(ExtendedOfferRdo, result);
    this.created<OfferRdo>(res, offerToResponse);
  }

  public async update(
    { body, params }: Request<OfferDetailsParams, Record<string, unknown>, UpdateOfferDto>,
    res: Response
  ): Promise<void> {
    const updatedOffer = await this.offersService.updateById(params.offerId, body);
    const offersToResponse = fillDTO(ExtendedOfferRdo, updatedOffer);
    this.ok<OfferRdo>(res, offersToResponse);
  }

  public async delete(
    { params }: Request<OfferDetailsParams>,
    res: Response
  ): Promise<void> {
    const { offerId } = params;
    const offer = await this.offersService.deleteById(offerId);
    this.noContent(res, offer);
  }

  public async getDetails(
    { params }: Request<OfferDetailsParams>,
    res: Response
  ): Promise<void> {
    const offer = await this.offersService.findById(params.offerId);
    const offersToResponse = fillDTO(ExtendedOfferRdo, offer);
    this.ok(res, offersToResponse);
  }

  public async uploadImage(req: Request<OfferDetailsParams>, res: Response) {
    const {offerId} = req.params;
    const updateDto = { preview: req.file?.filename };
    await this.offersService.updateById(offerId, updateDto);
    this.created(res, fillDTO(UploadImageResponse, {updateDto}));
  }
}
