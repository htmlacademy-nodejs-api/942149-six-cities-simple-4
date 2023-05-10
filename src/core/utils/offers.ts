import { Offer } from '../../types/offer.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { Amenities } from '../../types/amenities.type';
import { City } from '../../types/сity.type';

export function createOffer(offerData: string): Offer {
  const [
    offerTitle,
    description,
    date,
    city,
    preview,
    images,
    isPremium,
    rating,
    type,
    roomsCount,
    guestsCount,
    price,
    amenities,
    author,
    commentsCount,
    coords,
  ] = offerData.replace('\n', '').split('\t');

  return {
    offerTitle,
    description,
    postDate: new Date(date),
    city: city as City,
    preview,
    images: images.split(','),
    isPremium: isPremium.toLowerCase() === 'true',
    ratingValue: Number(rating),
    offerType: OfferType[type as 'Apartment' | 'House' | 'Room' | 'Hotel'],
    roomsCount: Number(roomsCount),
    guestsCount: Number(guestsCount),
    price: Number(price),
    amenitiesList: amenities.split(',') as Amenities[],
    author: author,
    commentsCount: Number(commentsCount),
    coords: coords,
  } as Offer;
}
