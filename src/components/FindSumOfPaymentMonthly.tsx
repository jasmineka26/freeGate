interface MonthlyData {
  month: string;
  totalPaid: number;
}

export default function findMonthlyData(
  date: string[],
  paid: number[]
): MonthlyData[] {
  const monthlyData: MonthlyData[] = [];

  for (let i = 0; i < date.length; i++) {
    const month: string = date[i].slice(5, 7);
    const payment: number = paid[i];

    const existingData = monthlyData.find((data) => data.month === month);

    if (existingData) {
      existingData.totalPaid += payment;
    } else {
      monthlyData.push({ month, totalPaid: payment });
    }
    console.log(monthlyData);
  }

  return monthlyData;
}
