import dayjs from 'dayjs';
import { OfferGeneratorInterface } from './offer-generator.interface.js';
import { MockData } from '../../types/mock-data.type.js';
import { generateRandomValue, getRandomItem, getRandomItems } from '../../core/utils/random.js';

const INTERVAL = {
  price: {
    min: 100,
    max: 10e4,
  },
  durationInDays: {
    min: 1,
    max: 30,
  },
  rating: {
    min: 1,
    max: 5,
  },
  rooms: {
    min: 1,
    max: 8,
  },
  guests: {
    min: 1,
    max: 10,
  },
  comments: {
    min: 1,
    max: 10,
  }
};

const PHOTO_OFFER_COUNT = 6;


export default class OfferGenerator implements OfferGeneratorInterface {
  constructor(private readonly mockData: MockData) {}

  public generate(): string {
    const title = getRandomItem<string>(this.mockData.titles);
    const description = getRandomItem<string>(this.mockData.descriptions);

    return [
      title,
      description,
      postDate,
      city,
      preview,
      images,
      isPremium,
      ratingValue,
      offerType,
      roomsCount,
      guestsCount,
      price,
      amenitiesList,
      author,
      commentsCount,
      coords,
    ].join('\t');
  }
}
