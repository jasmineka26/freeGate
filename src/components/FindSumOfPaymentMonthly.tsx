interface MonthlyData {
  month: string;
  totalPaid: number;
}

export default function findMonthlyData(
  date: string[],
  paid: number[]
): MonthlyData[] {
  const monthlyData: MonthlyData[] = [];
  const persianMonths = [
    "فروردین",
    "اردیبهشت",
    "خرداد",
    "تیر",
    "مرداد",
    "شهریور",
    "مهر",
    "آبان",
    "آذر",
    "دی",
    "بهمن",
    "اسفند",
  ];

  for (let i = 0; i < date.length; i++) {
    const monthIndex: number = parseInt(date[i].slice(5, 7)) - 1;
    const month: string = persianMonths[monthIndex];
    const payment: number = paid[i];

    const existingData = monthlyData.find((data) => data.month === month);

    if (existingData) {
      existingData.totalPaid += payment;
    } else {
      monthlyData.push({ month, totalPaid: payment });
    }
  }
  monthlyData.sort((a, b) => parseInt(a.month) - parseInt(b.month));

  return monthlyData;
}
