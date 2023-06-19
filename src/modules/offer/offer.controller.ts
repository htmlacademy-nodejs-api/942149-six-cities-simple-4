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
import CreateOfferDto from './dto/create-offer.dto';
import UpdateOfferDto from './dto/update-offer.dto';
import { ParamsDictionary } from 'express-serve-static-core';
import HttpError from '../../core/errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-objectid.middleware.js';

type OfferDetailsParams = {
  offerId: string;
} | ParamsDictionary

@injectable()
export default class OfferController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.OfferServiceInterface) private readonly offersService: OfferServiceInterface,
  ) {
    super(logger);

    this.logger.info('Register routes for OfferController…');

    this.addRoute({path: '/', method: HttpMethod.Get, handler: this.index});
    this.addRoute({path: '/', method: HttpMethod.Post, handler: this.create});
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Patch,
      handler: this.update,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Delete,
      handler: this.delete,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.getDetails,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
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
    {body}: Request<Record<string, unknown>, Record<string, unknown>, CreateOfferDto>,
    res: Response
  ): Promise<void> {
    const result = await this.offersService.create({ ...body});
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
    if (!offer) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        'offer not found'
      );
    }
    const offersToResponse = fillDTO(ExtendedOfferRdo, offer);
    this.ok(res, offersToResponse);
  }
}
