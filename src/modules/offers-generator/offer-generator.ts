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
    const date = dayjs().subtract(generateRandomValue(INTERVAL.durationInDays.min, INTERVAL.durationInDays.max), 'day').toISOString();
    const city = getRandomItem<{ name: string, coords: string }>(this.mockData.cities);
    const cityName = city.name;
    const coords = city.coords;
    const preview = getRandomItem<string>(this.mockData.images);
    const images = Array(PHOTO_OFFER_COUNT).fill((()=> getRandomItem<string>(this.mockData.images))());
    const isPremium = Boolean(generateRandomValue(0, 1));
    const ratingValue = generateRandomValue(INTERVAL.rating.min, INTERVAL.rating.max, 1);
    const offerType = getRandomItem<string>(this.mockData.offerTypes);
    const roomsCount = generateRandomValue(INTERVAL.rooms.min, INTERVAL.rooms.max);
    const guestsCount = generateRandomValue(INTERVAL.guests.min, INTERVAL.guests.max);
    const price = generateRandomValue(INTERVAL.price.min, INTERVAL.price.max);
    const amenitiesList = getRandomItems<string>(this.mockData.amenities).join(',');
    const author = getRandomItem<string>(this.mockData.authors);
    const commentsCount = generateRandomValue(INTERVAL.comments.min, INTERVAL.comments.max);


    return [
      title,
      description,
      date,
      cityName,
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
