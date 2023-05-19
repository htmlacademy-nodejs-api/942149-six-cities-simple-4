import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  APP_PORT: number;
}

export const configRestSchema = convict<RestSchema>({
  APP_PORT: {
    doc: 'app port',
    format: 'port',
    env: 'APP_PORT',
    default: 5500
  },
});
