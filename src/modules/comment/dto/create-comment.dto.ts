import { IsMongoId, IsNumber, Max, MaxLength, Min, MinLength } from 'class-validator';

export default class CreateCommentDto {
  @MinLength(5)
  @MaxLength(1024, { message: 'Maximum text length must be 1024' })
  public text!: string;

  @IsMongoId({ message: 'offerId must be a valid id' })
  public offerId!: string;

  public userId!: string;

  @IsNumber({ maxDecimalPlaces: 1 }, { message: 'must be an number with precision 1' })
  @Min(1)
  @Max(5)
  public rating!: number;
}
