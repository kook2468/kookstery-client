import { Order } from "./order";
import { Product } from "./product";
import { User } from "./user";

export interface OrderItem {
  order: Order;
  user: User;
  quantity: number;
  product: Product;
  regularPrice: number;
  discountPrice: number;
  finalPrice: number;
}
