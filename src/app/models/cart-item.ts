import { Wine } from './wine';

export interface CartItem extends Wine {
  quantity: number;
}
