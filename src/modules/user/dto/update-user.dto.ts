import {IsString, Length, IsOptional} from 'class-validator';
import {MAX_NAME_LENGTH, MIN_NAME_LENGTH} from '../user.constant.js';

export default class UpdateUserDto {
  @IsOptional()
  @IsString({message: 'name is required'})
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH, {message: `Min length is ${MIN_NAME_LENGTH}, max is ${MAX_NAME_LENGTH}`})
  public name?: string;

  @IsOptional()
  public avatarPath?: string;
}
