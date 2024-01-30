export default interface Packes {
  id: number;
  title: string;
  duration: number;
  traffic: number;
  price: number;
  server_category_id: number;
  server_category: ServerCategory | undefined;
}

interface ServerCategory {
  title: string;
}
