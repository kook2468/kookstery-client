import { CartItem } from "./cart-item";
import { CartStatus } from "./cart-status";
import { Order } from "./order";
import { ShippingAddress } from "./shipping-address";
import { User } from "./user";

export interface Cart {
  id: number;
  status: CartStatus;
  user: User;
  shippingAddress: ShippingAddress;
  cartItems: CartItem[];
  order: Order;
}
