export default interface Server {
  id: number;
  title: string;
  address: string;
  xui_port: string;
  xui_user: string;
  xui_pass: string;
  last_status: number;
  last_status_date: string;
  server_category_id: number;
  server_category: ServerCategory;
  inbounds: Inbound[];
}

interface ServerCategory {
  title: string;
}

interface Inbound {
  id: number;
  title: string;
  configs: Config[];
  active_accounts: number;
}

interface Config {
  id: number;
  title: string;
}
