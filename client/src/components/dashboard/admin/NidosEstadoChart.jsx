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
import { Egg } from "lucide-react";

import AdminChartCard from "./AdminChartCard";
import { nidosPorEstado } from "../../../data/dashboardAdmin.data";

const colors = {
  Registrado: "#14B8A6",
  "En incubación": "#0F7A4F",
  "Próximo a eclosión": "#F59E0B",
  Eclosionado: "#3B82F6",
  Exhumado: "#EF4444",
};

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null;

  return (
    <div className="rounded-xl border border-[#C9DDD8] bg-white px-3 py-2 text-[12px] shadow-md">
      <p className="font-semibold text-[#0B2F2A]">{label}</p>
      <p className="mt-1 text-slate-500">
        Total:{" "}
        <span className="font-bold text-[#0F7A4F]">{payload[0].value}</span>
      </p>
    </div>
  );
}

function NidosEstadoChart() {
  return (
    <AdminChartCard
      title="Nidos por estado"
      subtitle="Distribución general de los nidos registrados en el sistema."
      icon={Egg}
      badge={`${nidosPorEstado.length} estados`}
      className="min-h-[360px]"
    >
      <div className="h-[275px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={nidosPorEstado}
            layout="vertical"
            margin={{
              top: 8,
              right: 24,
              left: 36,
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
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 11 }}
            />

            <YAxis
              dataKey="estado"
              type="category"
              axisLine={false}
              tickLine={false}
              width={120}
              tick={{ fill: "#334155", fontSize: 11, fontWeight: 600 }}
            />

            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#F1F8F5" }} />

            <Bar
              dataKey="total"
              radius={[0, 10, 10, 0]}
              barSize={24}
              isAnimationActive={true}
              animationDuration={900}
              animationEasing="ease-out"
            >
              {nidosPorEstado.map((entry) => (
                <Cell
                  key={entry.estado}
                  fill={colors[entry.estado] || "#0F7A4F"}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </AdminChartCard>
  );
}

export default NidosEstadoChart;
