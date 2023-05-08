import { readFileSync } from 'node:fs';
import { FileReaderInterface } from './file-reader.interface.js';
import { Offer } from '../../types/offer.type.js';
import { OfferType } from '../../types/offer-type.enum.js';
import { Amenities } from '../../types/amenities.type';
import { City } from '../../types/сity.type';

export default class TSVFileReader implements FileReaderInterface {
  private rawData = '';

  constructor(public filename: string) { }

  public read(): void {
    this.rawData = readFileSync(this.filename, { encoding: 'utf8' });
  }

  public toArray(): Offer[] {
    if (!this.rawData) {
      return [];
    }

    return this.rawData
      .split('\n')
      .filter((row) => row.trim() !== '')
      .map((line) => line.split('\t'))
      .map(([
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
      ]) => ({
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
      }));
  }
}
