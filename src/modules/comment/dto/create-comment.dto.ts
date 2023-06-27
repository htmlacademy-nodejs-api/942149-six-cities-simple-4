import { IsMongoId, IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';
import {
  MAX_COMMENT_LENGTH,
  MAX_RATING_DECIMAL_PLACES,
  MIN_COMMENT_LENGTH, MIN_RATING_VALUE, MAX_RATING_VALUE
} from '../comment.constants.js';

export default class CreateCommentDto {
  @MinLength(MIN_COMMENT_LENGTH, { message: `Min text length must be ${MIN_COMMENT_LENGTH}` })
  @MaxLength(MAX_COMMENT_LENGTH, { message: `Maximum text length must be ${MAX_COMMENT_LENGTH}` })
  public text!: string;

  @IsMongoId({ message: 'offerId must be a valid id' })
  public offerId!: string;

  public userId!: string;

  @IsNumber({ maxDecimalPlaces: MAX_RATING_DECIMAL_PLACES }, { message: `must be an number with precision ${MAX_RATING_DECIMAL_PLACES}` })
  @Min(MIN_RATING_VALUE)
  @Max(MAX_RATING_VALUE)
  public rating!: number;
}
