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
  os: string;
  role_id: number;
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
  id: 3;
  xray_username: "jasmine_iphone_PfqdT";
  inbound_id: 2;
}
