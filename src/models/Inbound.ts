export default interface Inbound {
  id: number;
  title: string;
  XrayAccounts: XrayAccount[];
}

export interface XrayAccount {
  id: number;
  xray_username: string;
  is_active: boolean;
  uid: number;
}
