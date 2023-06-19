import { inject, injectable } from 'inversify';
import { DocumentType, types } from '@typegoose/typegoose';
import { OfferEntity } from './offer.entity.js';
import { AppComponent } from '../../types/app-component.enum.js';
import { LoggerInterface } from '../../core/logger/logger.interface.js';
import { OfferServiceInterface } from './offer-service.interface.js';
import UpdateOfferDto from './dto/update-offer.dto';
import CreateOfferDto from './dto/create-offer.dto.js';
import { DEFAULT_OFFER_COUNT } from './offer.constant.js';
import { SortType } from '../../types/sort.type.enum.js';

@injectable()
export default class OfferService implements OfferServiceInterface {
  constructor(
    @inject(AppComponent.LoggerInterface) private readonly logger: LoggerInterface,
    @inject(AppComponent.OfferModel) private readonly offerModel: types.ModelType<OfferEntity>
  ) {}

  public async create(dto: CreateOfferDto): Promise<DocumentType<OfferEntity>> {
    const result = await this.offerModel.create(dto);
    this.logger.info(`New offer created: ${dto.offerTitle}`);
    return result;
  }

  public async findById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel.findById(offerId).populate(['userId']).exec();
  }

  public async find(): Promise<DocumentType<OfferEntity>[]> {
    const offer = await this.offerModel
      .find()
      .populate(['userId'])
      .exec();
    return offer;
  }

  public async deleteById(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndDelete(offerId)
      .exec();
  }

  public async updateById(offerId: string, dto: UpdateOfferDto): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(offerId, dto, {new: true})
      .populate(['userId'])
      .exec();
  }

  public async findSomeOffers(count: number): Promise<DocumentType<OfferEntity>[]> {
    const limit = count ?? DEFAULT_OFFER_COUNT;
    const offers = await this.offerModel
      .find()
      .sort({createdAt: SortType.Down})
      .limit(limit)
      .populate(['userId'])
      .exec();

    return offers;
  }

  public async calcOfferRating(offerId: string): Promise<number | null> {
    const values = await this.offerModel
      .aggregate([
        {
          $lookup: {
            from: 'comment',
            pipeline: [
              { $match: { offerId: offerId } },
              { $project: { rating: 1}}
            ],
            as: 'ratingValues'
          },
        },
        {
          $project: {
            averageRating: { $avg: '$ratingValues.rating' },
          }
        }
      ]).exec();

    return values[0]?.averageRating || 0;
  }

  public async exists(offerId: string): Promise<boolean> {
    return (await this.offerModel
      .exists({_id: offerId})) !== null;
  }

  public async incCommentsCount(offerId: string): Promise<DocumentType<OfferEntity> | null> {
    return this.offerModel
      .findByIdAndUpdate(
        offerId,
        {
          $inc: {
            commentsCount: 1,
          },
        },
        { new: true },
      )
      .exec();
  }
}
