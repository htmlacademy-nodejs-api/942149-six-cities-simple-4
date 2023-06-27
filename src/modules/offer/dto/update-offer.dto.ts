import { OfferType } from '../../../types/offer-type.enum.js';
import { Amenities } from '../../../types/amenities.type';
import { City } from '../../../types/сity.type';
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
  IsEnum,
  IsOptional
} from 'class-validator';
import {
  MAX_IMAGES_COUNT,
  MAX_OFFER_TITLE_LENGTH,
  MAXIMUM_OFFER_DESCRIPTION_LENGTH,
  MAXIMUM_OFFER_GUESTS, MAXIMUM_OFFER_PRICE,
  MAXIMUM_OFFER_ROOMS,
  MIN_IMAGES_COUNT,
  MINIMUM_OFFER_DESCRIPTION_LENGTH,
  MINIMUM_OFFER_GUESTS, MINIMUM_OFFER_PRICE,
  MINIMUM_OFFER_ROOMS,
  MINIMUM_OFFER_TITLE_LENGTH
} from '../offer.constant.js';

export default class UpdateOfferDto {
  @IsOptional()
  @MinLength(MINIMUM_OFFER_TITLE_LENGTH, {message: `Minimum title length must be ${MINIMUM_OFFER_TITLE_LENGTH}`})
  @MaxLength(MAX_OFFER_TITLE_LENGTH, {message: `Maximum title length must be ${MAX_OFFER_TITLE_LENGTH}`})
    offerTitle?: string;

  @IsOptional()
  @MinLength(MINIMUM_OFFER_DESCRIPTION_LENGTH, {message: `Minimum description length must be ${MINIMUM_OFFER_DESCRIPTION_LENGTH}`})
  @MaxLength(MAXIMUM_OFFER_DESCRIPTION_LENGTH, {message: `Maximum description length must be ${MAXIMUM_OFFER_DESCRIPTION_LENGTH}`})
    description?: string;

  @IsOptional()
  @IsDateString({}, {message: 'postDate must be valid ISO date'})
    postDate?: Date;

  @IsOptional()
  @IsIn(['Paris', 'Cologne', 'Brussels', 'Amsterdam', 'Hamburg', 'Dusseldorf'])
    city?: City;

  @IsOptional()
  @IsString()
    preview?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(MIN_IMAGES_COUNT)
  @ArrayMaxSize(MAX_IMAGES_COUNT)
    images?: string[];

  @IsOptional()
  @IsBoolean()
    isPremium?: boolean;

  @IsOptional()
  @IsEnum(OfferType, { message: 'OfferType must be apartment, room, house or hotel' })
    offerType?: OfferType;

  @IsOptional()
  @IsInt()
  @Min(MINIMUM_OFFER_ROOMS)
  @Max(MAXIMUM_OFFER_ROOMS)
    roomsCount?: number;

  @IsOptional()
  @IsInt({ message: 'guestsCount must be an integer' })
  @Min(MINIMUM_OFFER_GUESTS, { message: `Minimum guestsCount value is ${MINIMUM_OFFER_GUESTS}` })
  @Max(MAXIMUM_OFFER_GUESTS, { message: `Maximum guestsCount value is ${MAXIMUM_OFFER_GUESTS}` })
    guestsCount?: number;

  @IsOptional()
  @IsInt({ message: 'Price must be an integer' })
  @Min(MINIMUM_OFFER_PRICE, { message: `Minimum price is ${MINIMUM_OFFER_PRICE}` })
  @Max(MAXIMUM_OFFER_PRICE, { message: `Maximum price is ${MAXIMUM_OFFER_PRICE}` })
    price?: number;

  @IsOptional()
  @IsArray()
  @IsIn(['Breakfast', 'Air conditioning', 'Laptop friendly workspace', 'Baby seat', 'Washer', 'Towels', 'Fridge'], { each: true })
  @ArrayUnique({ message: 'Field goods must be contain unique item' })
    amenitiesList?: Amenities[];

  @IsOptional()
  @IsObject()
    coords?: Coordinates;
}
