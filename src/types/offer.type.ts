import { City } from './сity.type.js';
import { OfferType } from './offer-type.enum.js';
import { Amenities } from './amenities.type.js';
import {User} from './user.type';

export type Offer = {
  offerTitle: string;
  description: string;
  postDate: Date;
  city: City;
  preview: string,
  images: string[];
  isPremium: boolean;
  ratingValue: number;
  offerType: OfferType;
  roomsCount: number;
  guestsCount: number;
  price: number;
  amenitiesList: Amenities[];
  author: User;
  commentsCount: number;
  coords: string;
}
