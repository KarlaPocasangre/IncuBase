import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Fence } from "lucide-react";

import AdminChartCard from "./AdminChartCard";
import { ocupacionCorrales } from "../../../data/dashboardAdmin.data";

function getBarColor(ocupacion) {
  if (ocupacion >= 90) return "#EF4444";
  if (ocupacion >= 70) return "#F59E0B";
  return "#0F7A4F";
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;

  return (
    <div className="rounded-xl border border-[#C9DDD8] bg-white px-3 py-2 text-[12px] shadow-md">
      <p className="font-semibold text-[#0B2F2A]">{label}</p>

      <div className="mt-2 space-y-1">
        <p className="text-slate-500">
          Ocupación:{" "}
          <span className="font-bold text-[#0F7A4F]">{item.ocupacion}%</span>
        </p>

        <p className="text-slate-500">
          Estado:{" "}
          <span className="font-bold text-[#0B2F2A]">{item.estado}</span>
        </p>
      </div>
    </div>
  );
}

function OcupacionCorralesChart() {
  const promedio = Math.round(
    ocupacionCorrales.reduce((acc, item) => acc + item.ocupacion, 0) /
      ocupacionCorrales.length,
  );

  return (
    <AdminChartCard
      title="Ocupación de corrales"
      subtitle="Porcentaje de uso actual por corral registrado."
      icon={Fence}
      badge={`${promedio}% promedio`}
      className="min-h-[380px]"
    >
      <div className="h-[290px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={ocupacionCorrales}
            layout="vertical"
            margin={{
              top: 8,
              right: 30,
              left: 28,
              bottom: 8,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#E3EFEB"
            />

            <XAxis
              type="number"
              domain={[0, 100]}
              tickFormatter={(value) => `${value}%`}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 11 }}
            />

            <YAxis
              dataKey="corral"
              type="category"
              axisLine={false}
              tickLine={false}
              width={105}
              tick={{ fill: "#334155", fontSize: 11, fontWeight: 600 }}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F1F8F5" }} />

            <Bar
              dataKey="ocupacion"
              radius={[0, 10, 10, 0]}
              barSize={24}
              isAnimationActive={true}
              animationDuration={900}
              animationEasing="ease-out"
            >
              {ocupacionCorrales.map((entry) => (
                <Cell key={entry.corral} fill={getBarColor(entry.ocupacion)} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-2 text-[11px] font-semibold text-slate-500">
        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#0F7A4F]" />
          Disponible
        </span>

        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#F59E0B]" />
          Alta ocupación
        </span>

        <span className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#EF4444]" />
          Capacidad crítica
        </span>
      </div>
    </AdminChartCard>
  );
}

export default OcupacionCorralesChart;
