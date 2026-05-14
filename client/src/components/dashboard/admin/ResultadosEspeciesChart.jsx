import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Turtle } from "lucide-react";

import AdminChartCard from "./AdminChartCard";
import { resultadosPorEspecie } from "../../../data/dashboardAdmin.data";

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
            <span className="font-bold text-[#0B2F2A]">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ResultadosEspeciesChart() {
  const totalNidos = resultadosPorEspecie.reduce(
    (acc, item) => acc + item.nidos,
    0,
  );

  return (
    <AdminChartCard
      title="Resultados por especie"
      subtitle="Comparativa entre nidos registrados y eclosiones por especie."
      icon={Turtle}
      badge={`${totalNidos} nidos`}
      className="min-h-[380px]"
    >
      <div className="w-full min-w-0">
        <div className="h-[290px] w-full min-w-0">
          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={300}
            minHeight={250}
          >
            <BarChart
              data={resultadosPorEspecie}
              margin={{
                top: 12,
                right: 16,
                left: -18,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#E3EFEB" />

              <XAxis
                dataKey="especie"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#334155", fontSize: 11, fontWeight: 600 }}
              />

              <YAxis
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

              <Bar
                dataKey="nidos"
                name="Nidos"
                fill="#0F7A4F"
                radius={[10, 10, 0, 0]}
                barSize={24}
                isAnimationActive
                animationDuration={900}
                animationEasing="ease-out"
              />

              <Bar
                dataKey="eclosiones"
                name="Eclosiones"
                fill="#3B82F6"
                radius={[10, 10, 0, 0]}
                barSize={24}
                isAnimationActive
                animationDuration={900}
                animationEasing="ease-out"
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </AdminChartCard>
  );
}

export default ResultadosEspeciesChart;
