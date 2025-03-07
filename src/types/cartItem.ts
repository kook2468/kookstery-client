import { Product } from "./product";

export interface CartItem {
  isSelected: boolean;
  quantity: number;
  note: string;
  product: Product;
  regularPrice: number;
  discountPrice: number;
  finalPrice: number;
}
