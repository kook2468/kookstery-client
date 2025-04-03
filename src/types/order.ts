import { Cart } from "./cart";
import { OrderItem } from "./order-item";
import { OrderStatus } from "./order-status";
import { User } from "./user";

export interface Order {
  id: number;
  status: OrderStatus;
  cart: Cart;
  user: User;
  orderItems: OrderItem[];
  receiverPhone: string; //수신인 전화번호
  receiverName: string; //수신인 이름
  deliveryNotes?: string; //배송 요청사항
  fullAddress: string; //배송지
}
