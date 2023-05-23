import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  APP_PORT: number;
  SALT: string;
  DB_HOST: string;
}

export const configRestSchema = convict<RestSchema>({
  APP_PORT: {
    doc: 'app port',
    format: 'port',
    env: 'APP_PORT',
    default: 5500
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP address of the database server (MongoDB)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  }
});
