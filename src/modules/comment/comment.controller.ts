import { Request, Response } from 'express';
import {inject} from 'inversify';
import {StatusCodes} from 'http-status-codes';
import { Controller } from '../../core/controller/controller.abstract.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { CommentServiceInterface } from './comment-service.interface.js';
import CreateCommentDto from './dto/create-comment.dto.js';
import { OfferServiceInterface } from '../offer/offer-service.interface.js';
import HttpError from '../../core/errors/http-error.js';
import { HttpMethod } from '../../types/http-method.enum.js';
import { fillDTO } from '../../core/utils/common.js';
import CommentRdo from './rdo/comment.rdo.js';
import { ParamsDictionary } from 'express-serve-static-core';
import { ValidateObjectIdMiddleware } from '../../core/middlewares/validate-objectid.middleware.js';
import { ValidateDtoMiddleware } from '../../core/middlewares/validate-dto.middleware.js';
import { PrivateRouteMiddleware } from '../../core/middlewares/private-route.middleware.js';
import { RestSchema } from '../../core/config/rest.schema.js';
import { ConfigInterface } from '../../core/config/config.interface.js';

type OfferDetailsParams = {
  offerId: string;
} | ParamsDictionary


export default class CommentController extends Controller {
  constructor(
    @inject(AppComponent.LoggerInterface) logger: LoggerInterface,
    @inject(AppComponent.CommentServiceInterface) private readonly commentService: CommentServiceInterface,
    @inject(AppComponent.OfferServiceInterface) private readonly offerService: OfferServiceInterface,
    @inject(AppComponent.ConfigInterface) configService: ConfigInterface<RestSchema>,
  ) {
    super(logger, configService);

    this.logger.info('Register routes for CommentController…');
    this.addRoute({
      path: '/',
      method: HttpMethod.Post,
      handler: this.create,
      middlewares: [
        new PrivateRouteMiddleware(),
        new ValidateDtoMiddleware(CreateCommentDto)
      ]
    });
    this.addRoute({
      path: '/:offerId',
      method: HttpMethod.Get,
      handler: this.index,
      middlewares: [new ValidateObjectIdMiddleware('offerId')]
    });
  }

  public async create(
    {body ,user}: Request<object, object, CreateCommentDto>,
    res: Response
  ): Promise<void> {

    if (!await this.offerService.exists(body.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${body.offerId} not found.`,
        'CommentController'
      );
    }

    const comment = await this.commentService.create({ ...body, userId: user.id });
    await this.offerService.incCommentsCount(body.offerId);
    this.created(res, fillDTO(CommentRdo, comment));
  }

  public async index(
    { params }: Request<OfferDetailsParams>,
    res: Response
  ): Promise<void> {
    if (!await this.offerService.exists(params.offerId)) {
      throw new HttpError(
        StatusCodes.NOT_FOUND,
        `Offer with id ${params.offerId} not found.`,
        'OfferController'
      );
    }

    const comments = await this.commentService.findByOfferId(params.offerId);
    const commentsToResponse = fillDTO(CommentRdo, comments);
    this.ok(res, commentsToResponse);
  }
}
