export default interface Payment {
  // [x: string]: any;
  id: number;
  uid: number;
  package_id: number;
  paid: number;
  receipt_url: string;
  confirmed: number;
  created_at: string;
  user_desc: string;
  admin_desc: string;
  dest_card_id: number;
  is_manual: boolean;
  dest_card: DestCard;
  user: User;
  package: Package;
}

interface DestCard {
  title: string;
  card_owner_name: string;
}
interface User {
  id: number;
  name: string;
  current_subscription: CurrentSubscription;
  server: Server;
}

interface CurrentSubscription {
  is_active: boolean;
  remainGB: number;
  remainDays: number;
}

interface ServerCategory {
  id: number;
  title: string;
}

interface Server {
  server_category: ServerCategory;
}

interface Package {
  title: string;
  server_category: ServerCategory;
}
