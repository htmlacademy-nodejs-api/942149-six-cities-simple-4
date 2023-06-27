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
  IsIn,
  MinLength,
  Min,
  Max,
  IsInt,
  ArrayUnique,
  IsNumber,
  IsEnum
} from 'class-validator';
import {
  MAX_IMAGES_COUNT,
  MAX_OFFER_TITLE_LENGTH,
  MAX_RATING_DECIMAL_PLACES,
  MAX_RATING_VALUE,
  MAXIMUM_OFFER_DESCRIPTION_LENGTH,
  MIN_IMAGES_COUNT,
  MINIMUM_OFFER_DESCRIPTION_LENGTH,
  MINIMUM_OFFER_TITLE_LENGTH,
  MIN_RATING_VALUE,
  MINIMUM_OFFER_ROOMS,
  MAXIMUM_OFFER_ROOMS,
  MINIMUM_OFFER_GUESTS,
  MAXIMUM_OFFER_GUESTS,
  MINIMUM_OFFER_PRICE, MAXIMUM_OFFER_PRICE
} from '../offer.constant.js';

export default class CreateOfferDto {
  @MinLength(MINIMUM_OFFER_TITLE_LENGTH, {message: `Minimum title length must be ${MINIMUM_OFFER_TITLE_LENGTH}`})
  @MaxLength(MAX_OFFER_TITLE_LENGTH, {message: `Maximum title length must be ${MAX_OFFER_TITLE_LENGTH}`})
    offerTitle!: string;

  @MinLength(MINIMUM_OFFER_DESCRIPTION_LENGTH, {message: `Minimum description length must be ${MINIMUM_OFFER_DESCRIPTION_LENGTH}`})
  @MaxLength(MAXIMUM_OFFER_DESCRIPTION_LENGTH, {message: `Maximum description length must be ${MAXIMUM_OFFER_DESCRIPTION_LENGTH}`})
    description!: string;

  @IsDateString({}, {message: 'postDate must be valid ISO date'})
    postDate!: Date;

  @IsIn(['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'])
    city!: City;

  @IsArray()
  @ArrayMinSize(MIN_IMAGES_COUNT)
  @ArrayMaxSize(MAX_IMAGES_COUNT)
    images!: string[];

  @IsBoolean()
    isPremium!: boolean;

  @IsNumber({ maxDecimalPlaces: MAX_RATING_DECIMAL_PLACES }, { message: `must be an number with precision ${MAX_RATING_DECIMAL_PLACES}` })
  @Min(MIN_RATING_VALUE)
  @Max(MAX_RATING_VALUE)
    ratingValue!: number;

  @IsEnum(OfferType, { message: 'OfferType must be apartment, room, house or hotel' })
    offerType!: OfferType;

  @IsInt()
  @Min(MINIMUM_OFFER_ROOMS)
  @Max(MAXIMUM_OFFER_ROOMS)
    roomsCount!: number;

  @IsInt({ message: 'guestsCount must be an integer' })
  @Min(MINIMUM_OFFER_GUESTS, { message: `Minimum guestsCount value is ${MINIMUM_OFFER_GUESTS}` })
  @Max(MAXIMUM_OFFER_GUESTS, { message: `Maximum guestsCount value is ${MAXIMUM_OFFER_GUESTS}` })
    guestsCount!: number;

  @IsInt({ message: 'Price must be an integer' })
  @Min(MINIMUM_OFFER_PRICE, { message: `Minimum price is ${MINIMUM_OFFER_PRICE}` })
  @Max(MAXIMUM_OFFER_PRICE, { message: `Maximum price is ${MAXIMUM_OFFER_PRICE}` })
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
