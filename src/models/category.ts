import {Item} from './item';

export type Category = {
  id: string;
  name: string;
  description: string;
  items: Item[];
};
