import { Offer } from '../../types/offer.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { Amenities } from '../../types/amenities.type';
import { City } from '../../types/сity.type';
import { UserType } from '../../types/user-type.enum';

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
    userName,
    userEmail,
    userPath,
    userType,
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
    author: {
      name: userName,
      email: userEmail,
      avatarPath: userPath,
      type: userType as UserType,
    },
    commentsCount: Number(commentsCount),
    coords: {
      latitude: coords.split(',')[0],
      longitude: coords.split(',')[1]},
  } as Offer;
}
