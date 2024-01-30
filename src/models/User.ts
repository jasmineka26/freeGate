export enum Role {
  Admin = 1,
  User = 2,
}

export default interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  subscription: Subscription | null;
  reserved_subscription: [];
  payment_card: PaymentCard | null;
  server_name: string;
  server_id: number;
  os: "android" | "ios";
  role_id: Role;
  xrayAccounts: XrayAccounts[];
  referer_id: number | null;
}

interface PaymentCard {
  id: number;
  card_owner_name: string;
  card_number: string;
  owner_id: number;
  title: string;
}

interface Subscription {
  is_active: boolean;
  remainGB: number;
  remainDays: number;
}

interface XrayAccounts {
  id: number;
  xray_username: string;
  inbound_id: number;
}
