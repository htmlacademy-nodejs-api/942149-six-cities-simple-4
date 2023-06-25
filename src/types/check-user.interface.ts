import { DocumentType } from '@typegoose/typegoose';
import { OfferEntity } from '../modules/offer/offer.entity';

export interface CheckUserInterface {
  findById(id: string): Promise<DocumentType<OfferEntity> | null>;
}
