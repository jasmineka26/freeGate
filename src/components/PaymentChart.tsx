import moment from "jalali-moment";
import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import useApi from "../useApi";
import findMonthlyPayments from "./FindSumOfPaymentMonthly";

const PaymentChart: React.FC = () => {
  const {
    request: getPayments,
    loading: paymentsLoading,
    error: paymentsError,
    data: payments,
  } = useApi("getPayments");

  const prices = payments ? payments.map((p) => p.paid) : [];

  const convertedDates = payments
    ? payments.map((p) =>
        moment(p.created_at, "YYYY-MM-DD").locale("fa").format("YYYY-MM-DD")
      )
    : [];

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      height: "100%",
      width: "100%",
      type: "area",
      fontFamily: "Inter, sans-serif",
      dropShadow: {
        enabled: false,
      },
      toolbar: {
        show: true,
      },
    },
    tooltip: {
      enabled: true,
      x: {
        show: true,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#0000ff",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 3,
    },
    grid: {
      show: true,
      strokeDashArray: 0,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: "Payments Chart",
        color: "#1A56DB",
        data: payments?.map((p) => p.paid) || [],
      },
    ],
    xaxis: {
      categories:
        findMonthlyPayments(convertedDates, prices).map((d) => d.month) || [],
      labels: {
        show: true,
      },
      axisBorder: {
        show: true,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  useEffect(() => {
    getPayments();
  }, [getPayments]);

  return (
    <div>
      <Chart
        options={chartOptions}
        series={[
          {
            name: "  گزارش پرداخت ها  ",
            data: findMonthlyPayments(convertedDates, prices).map(
              (d) => d.totalPaid
            ),
          },
        ]}
        type="area"
        height={350}
        width={500}
      />
      {paymentsLoading ? (
        <p>paymentsLoading...</p>
      ) : paymentsError ? (
        <p>Error: {paymentsError}</p>
      ) : null}
    </div>
  );
};

export default PaymentChart;
