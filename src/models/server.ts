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
  inbounds: Inbounds;
}

interface ServerCategory {
  title: string;
}

interface Inbounds {
  id: number;
  title: string;
  configs: Configs;
  active_accounts: number;
}

interface Configs {
  id: number;
  title: string;
}
