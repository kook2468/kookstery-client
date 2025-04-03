import { User } from "./user";

export interface ShippingAddress {
  id: number;
  name: string;
  receiverName: string; //수신인 이름
  receiverPhone: string; //수신인 전화번호
  user: User;
  addressStreet: string; //주요 주소
  addressDetail?: string; //부가 주소
  city: string;
  state: string;
  postalCode: string;
  isDefault: boolean;
}
