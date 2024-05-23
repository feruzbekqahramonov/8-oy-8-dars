import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import dataJson from "../data.json";
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Line Chart",
    },
  },
};

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

export function Chart() {
  const [dataChart, setDataChart] = useState({});
  const [chartIndex, setChartIndex] = useState(0);

  useEffect(() => {
    const labels = [];
    const values = [];
    const selectedBatch = dataJson.batchList[chartIndex];
    selectedBatch.rates.forEach((el, index) => {
      labels.push(
        timeConverter(selectedBatch.startTime + index * selectedBatch.interval)
      );
      values.push(el);
    });
    setDataChart({
      labels,
      datasets: [
        {
          label: `Dataset ${chartIndex + 1}`,
          data: values,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
        },
      ],
    });
  }, [chartIndex]);

  const handleButtonClick = (index) => {
    setChartIndex(index);
  };

  return (
    <>
      <div className="butons">
        {[0, 1, 2, 3, 4].map((index) => (
          <button key={index} onClick={() => handleButtonClick(index)} className="button">
             {index + 1}
          </button>
        ))}
      </div>
      {dataChart?.labels?.length && <Line options={options} data={dataChart} />}
    </>
  );
}
