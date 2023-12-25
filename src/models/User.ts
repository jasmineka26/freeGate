export default interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  subscription: Subscription | null;
  reserved_subscription: any[];
  payment_card: PaymentCard | null;
  server_name: string;
	server_id: number;
  os: string;
  role_id: number;
  xrayAccounts: any[];
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
  "is_active": boolean,
  "remainGB": number,
  "remainDays": number
},