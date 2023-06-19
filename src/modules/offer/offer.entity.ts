import typegoose, {defaultClasses, getModelForClass, Ref} from '@typegoose/typegoose';
import { OfferType } from '../../types/offer-type.enum.js';
import { UserEntity } from '../user/user.entity.js';
import { City } from '../../types/сity.type';
import { Amenities } from '../../types/amenities.type';
import { Coordinates } from '../../types/coordinates.type';

const { prop, modelOptions } = typegoose;

export interface OfferEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'offers'
  }
})
export class OfferEntity extends defaultClasses.TimeStamps {
  @prop({trim: true, required: true})
  public offerTitle!: string;

  @prop({trim: true})
  public description!: string;

  @prop()
  public postDate!: Date;

  @prop({trim: true, required: true})
  public city!: City;

  @prop({trim: true})
  public preview!: string;

  @prop({required: true})
  public images!: string[];

  @prop({required: true})
  public isPremium!: boolean;

  @prop({required: true})
  public ratingValue!: number;

  @prop({
    type: () => String,
    enum: OfferType,
    required: true
  })
  public offerType!: OfferType;

  @prop({required: true})
  public roomsCount!: number;

  @prop({required: true})
  public guestsCount!: number;

  @prop({required: true})
  public price!: number;

  @prop({required: true})
  public amenitiesList!: Amenities[];

  @prop({
    ref: UserEntity,
    required: true
  })
  public userId!: Ref<UserEntity>;

  @prop({ required: false, default: 0})
  public commentsCount!: number;

  @prop({required: true})
  public coords!: Coordinates;
}

export const OfferModel = getModelForClass(OfferEntity);
