import React from "react";
import Chart from "react-apexcharts";
import useFetch from "../hooks/useFetch";
import client from "../services/client";

const PaymentChart: React.FC = () => {
  const {
    data: payments,
    error,
    loading,
  } = useFetch(client.getPayments, "payments");

  const chartOptions: ApexCharts.ApexOptions = {
    chart: {
      height: "100%",
      width: "100%",
      type: "area", // Use "area" for area chart
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
        show: false,
      },
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.55,
        opacityTo: 0,
        shade: "#1C64F2",
        gradientToColors: ["#1C64F2"],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 4,
    },
    grid: {
      show: false,
      strokeDashArray: 4,
      padding: {
        left: 2,
        right: 2,
        top: 0,
      },
    },
    series: [
      {
        name: "New users",
        data: payments?.map((payment) => payment.paid) || [],
        color: "#1A56DB",
      },
    ],
    xaxis: {
      categories: [
        "01 February",
        "02 February",
        "03 February",
        "04 February",
        "05 February",
        "06 February",
        "07 February",
      ],
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
  };

  return (
    <div className="max-w-sm w-full bg-white rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
      <Chart
        options={chartOptions}
        series={[
          {
            name: "New users",
            data: payments?.map((payment) => payment.paid) || [],
          },
        ]}
        type="area"
        height={350}
        width={500}
      />
      {loading ? <p>Loading...</p> : error ? <p>Error: {error}</p> : null}
    </div>
  );
};

export default PaymentChart;
