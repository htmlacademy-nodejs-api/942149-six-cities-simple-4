import {IsEmail, IsString, Length} from 'class-validator';
import {MAX_PASSWORD_LENGTH, MIN_PASSWORD_LENGTH} from '../user.constant.js';

export default class LoginUserDto {
  @IsEmail({}, { message: 'Fail! Email must be a valid address' })
  public email!: string;

  @IsString({message: 'password is required'})
  @Length(MIN_PASSWORD_LENGTH, MAX_PASSWORD_LENGTH, {message: `Min length for password is ${MIN_PASSWORD_LENGTH}, max is ${MAX_PASSWORD_LENGTH}`})
  public password!: string;
}
