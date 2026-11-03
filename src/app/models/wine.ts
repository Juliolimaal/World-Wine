export type WineCategory = 'red' | 'white' | 'rose';

export interface Wine {
  id: number | string;
  name: string;
  subtitle: string;
  description: string;
  price: number;
  category: WineCategory;
  image: string;
  region: string;
}

