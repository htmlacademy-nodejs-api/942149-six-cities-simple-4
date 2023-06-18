import { OfferType } from '../../../types/offer-type.enum.js';
import { Amenities } from '../../../types/amenities.type';
import { City } from '../../../types/сity.type';
import { Coordinates } from '../../../types/coordinates.type';

export default class UpdateOfferDto {
  offerTitle?: string;
  description?: string;
  postDate?: Date;
  city?: City;
  preview?: string;
  images?: string[];
  isPremium?: boolean;
  offerType?: OfferType;
  roomsCount?: number;
  guestsCount?: number;
  price?: number;
  amenitiesList?: Amenities[];
  coords?: Coordinates;
}
