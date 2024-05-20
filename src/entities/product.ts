import { ProductsImage } from '.';

export interface Product {
  id: number;
  price: number;
  description: string;
  contactNumber: number;
  images: ProductsImage[] | FileList;
}
