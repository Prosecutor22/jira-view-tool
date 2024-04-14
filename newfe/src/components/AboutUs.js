import { Typography } from "antd";
import React from "react";
import { Iconify } from "../utils/Iconify";
import ReactApexChart from "react-apexcharts";
import { lineChart } from "./config/lineChart";

const { Title, Paragraph } = Typography;
export default function LineChart() {
  return (
    <>
      <div className="linechart">
        <div>
          <Title level={2}>Number of search</Title>
        </div>
      </div>
      <ReactApexChart
        series={lineChart.series}
        options={lineChart.options}
        className="full-width"
        type="area"
        height={350}
        width={"100%"}
      />
    </>
  );
}