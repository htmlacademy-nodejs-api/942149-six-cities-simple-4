import { OfferType } from '../../../types/offer-type.enum.js';
import { City } from '../../../types/сity.type';
import { Amenities } from '../../../types/amenities.type';
import { Coordinates } from '../../../types/coordinates.type';
import {
  IsArray,
  IsDateString,
  ArrayMaxSize,
  ArrayMinSize,
  IsObject,
  IsBoolean,
  MaxLength,
  IsString,
  IsIn,
  MinLength,
  Min,
  Max,
  IsInt,
  ArrayUnique,
  IsNumber,
  IsEnum
} from 'class-validator';

export default class CreateOfferDto {
  @MinLength(10, {message: 'Minimum title length must be 10'})
  @MaxLength(100, {message: 'Maximum title length must be 100'})
    offerTitle!: string;

  @MinLength(20, {message: 'Minimum description length must be 20'})
  @MaxLength(1024, {message: 'Maximum description length must be 1024'})
    description!: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
    postDate!: Date;

  @IsIn(['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'])
    city!: City;

  @IsString()
    preview!: string;

  @IsArray()
  @ArrayMinSize(6)
  @ArrayMaxSize(6)
    images!: string[];

  @IsBoolean()
    isPremium!: boolean;

  @IsNumber({ maxDecimalPlaces: 1 }, { message: 'must be an number with precision 1' })
  @Min(1)
  @Max(5)
    ratingValue!: number;

  @IsEnum(OfferType, { message: 'OfferType must be apartment, room, house or hotel' })
    offerType!: OfferType;

  @IsInt()
  @Min(1)
  @Max(8)
    roomsCount!: number;

  @IsInt({ message: 'guestsCount must be an integer' })
  @Min(1, { message: 'Minimum guestsCount value is 1' })
  @Max(10, { message: 'Maximum guestsCount value is 10' })
    guestsCount!: number;

  @IsInt({ message: 'Price must be an integer' })
  @Min(100, { message: 'Minimum price is 100' })
  @Max(100000, { message: 'Maximum price is 100000' })
    price!: number;

  @IsArray()
  @IsIn(['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'], { each: true })
  @ArrayUnique({ message: 'Field goods must be contain unique item' })
    amenitiesList!: Amenities[];

  userId!: string;

  @IsInt()
    commentsCount!: number;

  @IsObject()
    coords!: Coordinates;
}
