import { Expose } from 'class-transformer';
import { City } from '../../../types/сity.type.js';
import { OfferType } from '../../../types/offer-type.enum.js';

export default class OfferRdo {
  @Expose()
  public id!: string;

  @Expose()
  public offerTitle!: string;


  @Expose()
  public postDate!: Date;

  @Expose()
  public city!: City;

  @Expose()
  public preview!: string;

  @Expose()
  public isPremium!: boolean;

  @Expose()
  public ratingValue!: number;

  @Expose()
  public offerType!: OfferType;

  @Expose()
  public price!: number;

  @Expose()
  public commentsCount!: number;
}
