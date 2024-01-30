import User from "./User";

export default interface Sub {
  id: number;
  total_traffic: number;
  used_traffic: number;
  created_at: string;
  expired_at: string;
  is_active: boolean;
  failed_to_deactive: boolean;
  uid: number;
  user: User;
}
