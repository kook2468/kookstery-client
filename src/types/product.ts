import { Category } from "./category";

export interface Product {
  id: number;
  name: string;
  slug: string;
  identifier: string;
  description: string;
  imageUrn: string;
  regularPrice: number;
  discountPrice: number;
  finalPrice: number;
  category: Category;
  url: string;
}
