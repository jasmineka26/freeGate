export default interface User {
  id: number;
  name: string;
  username: string;
  password: string;
  subscription: any;
  reserved_subscription: any[];
  payment_card: any;
  os: string;
  role_id: number;
  xrayAccounts: any[];
  referer_id: number | null;
}
