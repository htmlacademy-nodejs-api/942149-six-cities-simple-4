import { UserType } from '../../../types/user-type.enum.js';
import { IsEmail, IsString, Length, IsEnum } from 'class-validator';
import {
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH
} from '../user.constant.js';

export default class CreateUserDto {
  @IsString({message: 'name is required'})
  @Length(MIN_NAME_LENGTH, MAX_NAME_LENGTH, {message: `Min length is ${MIN_NAME_LENGTH}, max is ${MAX_NAME_LENGTH}`})
  public name!: string;

  @IsEmail({}, {message: 'email must be valid address'})
  public email!: string;

  @IsEnum(UserType)
  public type!: UserType;

  @IsString({message: 'password is required'})
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {message: `Min length for password is ${MIN_PASSWORD_LENGTH}, max is ${MAX_PASSWORD_LENGTH}`})
  public password!: string;
}
