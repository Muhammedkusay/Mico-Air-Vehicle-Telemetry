import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip } from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, Tooltip);

function AltitudeChart({ telemetry }) {
  const altitude = [...telemetry].reverse().map((item) => item.altitude);

  const data = {
    labels: altitude.map((_, index) => index + 1),
    datasets: [
      {
        label: "Altitude",
        data: altitude,
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 5,
        fill: true,
        backgroundColor: "rgba(59, 130, 246, 0.08)", // Corrected to string
        borderColor: "rgb(59, 130, 246)",           // Corrected to string
        borderCapStyle: "round",
        borderJoinStyle: "round",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      intersect: false,
      mode: "index",
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        displayColors: false,
        backgroundColor: "#ffffff", 
        titleColor: "#18181b",      
        bodyColor: "#4b5563",       
        borderColor: "#e4e4e7",     
        borderWidth: 1,
        padding: 12,
        callbacks: {
          label: (context) => `${context.parsed.y.toFixed(2)} m`,
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: { color: "#71717a", maxTicksLimit: 8 },
      },
      y: {
        beginAtZero: true,
        grid: { color: "rgba(113, 113, 122, 0.12)" }, // Light crisp gridlines
        border: { display: false },
        ticks: {
          color: "#71717a",
          callback: (value) => `${value} m`,
        },
      },
    },
  };

  return (
    <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm text-zinc-900 style={{ colorScheme: 'light' }}">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-zinc-900">Altitude</h2>
        <p className="text-sm text-zinc-500">Flight altitude over telemetry points</p>
      </div>
      <div className="h-65">
        <Line key="light-altitude-chart" data={data} options={options} />
      </div>
    </div>
  );
}

export default AltitudeChart;
