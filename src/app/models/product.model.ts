export interface Product {
  id: string;
  name: string;
  type: 'Tinto' | 'Rosé' | 'Branco';
  price: number;
  image: string;
  description?: string;
}
