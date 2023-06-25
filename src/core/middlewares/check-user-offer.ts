import { MiddlewareInterface } from '../../types/middleware.interface.js';
import { NextFunction, Request, Response } from 'express';
import HttpError from '../errors/http-error.js';
import { StatusCodes } from 'http-status-codes';
import { CheckUserInterface } from '../../types/check-user.interface';

export class CheckIsUserOfferMiddleware implements MiddlewareInterface {
  constructor(
    private readonly service: CheckUserInterface
  ) {}

  public async execute(
    { user, params }: Request,
    _res: Response,
    next: NextFunction,
  ): Promise<void> {
    const offer = await this.service.findById(params.offerId);

    const userID = user.id;
    const offerUserId = offer?.userId._id.toString();

    if (offerUserId !== userID) {
      throw new HttpError(StatusCodes.FORBIDDEN, 'no rules', 'CheckUserMatchInOfferMiddleware');
    }

    return next();
  }
}
