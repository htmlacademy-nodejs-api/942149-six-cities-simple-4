import { User } from '../../types/user.type.js';
import { UserType } from '../../types/user-type.enum.js';
import typegoose, { defaultClasses, getModelForClass } from '@typegoose/typegoose';
import { createSHA256 } from '../../core/utils/common.js';

const { prop, modelOptions } = typegoose;

export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users'
  }
})

export class UserEntity extends defaultClasses.TimeStamps implements User {
  @prop({ required: true, default: '' })
  public name!: string;

  @prop({ unique: true, required: true })
  public email!: string;

  @prop({ required: false, default: '' })
  public avatarPath!: string;

  @prop({ required: true, default: 'standard' })
  public type!: UserType;

  @prop({required: true, default: '' })
  private password?: string;

  constructor(userData: User) {
    super();

    this.name = userData.name;
    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.type = userData.type;
  }

  public setPassword(password: string, salt: string) {
    this.password = createSHA256(password, salt);
  }

  public getPassword() {
    return this.password;
  }
}

export const UserModel = getModelForClass(UserEntity);
