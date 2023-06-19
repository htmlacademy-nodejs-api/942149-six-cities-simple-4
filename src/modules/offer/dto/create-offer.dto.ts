import { OfferType } from '../../../types/offer-type.enum.js';
import { City } from '../../../types/сity.type';
import { Amenities } from '../../../types/amenities.type';
import { Coordinates } from '../../../types/coordinates.type';

export default class CreateOfferDto {
  offerTitle!: string;
  description!: string;
  postDate!: Date;
  city!: City;
  preview!: string;
  images!: string[];
  isPremium!: boolean;
  ratingValue!: number;
  offerType!: OfferType;
  roomsCount!: number;
  guestsCount!: number;
  price!: number;
  amenitiesList!: Amenities[];
  userId!: string;
  commentsCount!: number;
  coords!: Coordinates;
}
