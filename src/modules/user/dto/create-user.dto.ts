import { UserType } from '../../../types/user-type.enum.js';

export default class CreateUserDto {
  public name!: string;
  public email!: string;
  public avatarPath!: string;
  public type!: UserType;
  public password!: string;
}
