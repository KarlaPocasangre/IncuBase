import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Thermometer } from "lucide-react";

import AdminChartCard from "./AdminChartCard";
import { temperaturaPromedio } from "../../../data/dashboardAdmin.data";

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-[#C9DDD8] bg-white px-3 py-2 text-[12px] shadow-md">
      <p className="mb-2 font-semibold text-[#0B2F2A]">{label}</p>

      <div className="space-y-1">
        {payload.map((item) => (
          <div key={item.dataKey} className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-slate-500">{item.name}:</span>
            <span className="font-bold text-[#0B2F2A]">{item.value} °C</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TemperaturaPromedioChart() {
  const promedioGeneral = (
    temperaturaPromedio.reduce((acc, item) => acc + item.promedio, 0) /
    temperaturaPromedio.length
  ).toFixed(1);

  return (
    <AdminChartCard
      title="Temperatura promedio"
      subtitle="Comportamiento semanal de temperatura registrada en corrales."
      icon={Thermometer}
      badge={`${promedioGeneral} °C prom.`}
      className="min-h-[380px]"
    >
      <div className="h-[290px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={temperaturaPromedio}
            margin={{
              top: 12,
              right: 18,
              left: -18,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E3EFEB" />

            <XAxis
              dataKey="dia"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#334155", fontSize: 11, fontWeight: 600 }}
            />

            <YAxis
              domain={[26, 36]}
              tickFormatter={(value) => `${value}°`}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 11 }}
            />

            <Tooltip content={<CustomTooltip />} />

            <Legend
              iconType="circle"
              wrapperStyle={{
                fontSize: 12,
                fontWeight: 600,
                color: "#334155",
                paddingTop: 12,
              }}
            />

            <Line
              type="monotone"
              dataKey="promedio"
              name="Promedio"
              stroke="#0F7A4F"
              strokeWidth={3}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: "#FFFFFF",
                stroke: "#0F7A4F",
              }}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                fill: "#0F7A4F",
                stroke: "#FFFFFF",
              }}
              isAnimationActive={true}
              animationDuration={950}
              animationEasing="ease-out"
            />

            <Line
              type="monotone"
              dataKey="max"
              name="Máxima"
              stroke="#F97316"
              strokeWidth={3}
              dot={{
                r: 4,
                strokeWidth: 2,
                fill: "#FFFFFF",
                stroke: "#F97316",
              }}
              activeDot={{
                r: 6,
                strokeWidth: 2,
                fill: "#F97316",
                stroke: "#FFFFFF",
              }}
              isAnimationActive={true}
              animationDuration={950}
              animationEasing="ease-out"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </AdminChartCard>
  );
}

export default TemperaturaPromedioChart;
