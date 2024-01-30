interface Owner {
  ownerId: number;
  ownerName: string;
  total: number;
  cards: Card[];
}

interface Card {
  id: number;
  title: string;
  total: number;
}

export default interface ReportPayment {
  owners: Owner[];
  total: number;
}
