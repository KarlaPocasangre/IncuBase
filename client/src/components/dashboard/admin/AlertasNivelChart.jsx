import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { AlertTriangle } from "lucide-react";

import AdminChartCard from "./AdminChartCard";
import { alertasPorNivel } from "../../../data/dashboardAdmin.data";

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;

  const item = payload[0].payload;

  return (
    <div className="rounded-xl border border-[#C9DDD8] bg-white px-3 py-2 text-[12px] shadow-md">
      <p className="font-semibold text-[#0B2F2A]">Nivel {item.nivel}</p>
      <p className="mt-1 text-slate-500">
        Total: <span className="font-bold text-[#0F7A4F]">{item.total}</span>
      </p>
    </div>
  );
}

function CustomLegend({ payload }) {
  if (!payload?.length) return null;

  return (
    <div className="mt-3 grid grid-cols-2 gap-2">
      {payload.map((entry) => (
        <div
          key={entry.value}
          className="flex items-center justify-between rounded-xl border border-[#DDEBE7] bg-[#F8FCFA] px-3 py-2"
        >
          <div className="flex items-center gap-2">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="text-[12px] font-semibold text-[#334155]">
              {entry.value}
            </span>
          </div>

          <span className="text-[12px] font-bold text-[#0B2F2A]">
            {entry.payload.total}
          </span>
        </div>
      ))}
    </div>
  );
}

function AlertasNivelChart() {
  const totalAlertas = alertasPorNivel.reduce(
    (acc, item) => acc + item.total,
    0,
  );

  return (
    <AdminChartCard
      title="Alertas por nivel"
      subtitle="Clasificación de alertas generadas según su severidad."
      icon={AlertTriangle}
      badge={`${totalAlertas} alertas`}
      className="min-h-[360px]"
    >
      <div className="relative h-[275px]">
        <div className="pointer-events-none absolute left-1/2 top-[42%] z-10 -translate-x-1/2 -translate-y-1/2 text-center">
          <p className="text-[26px] font-extrabold text-[#0B2F2A]">
            {totalAlertas}
          </p>
          <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
            Alertas
          </p>
        </div>

        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />

            <Pie
              data={alertasPorNivel}
              dataKey="total"
              nameKey="nivel"
              innerRadius={62}
              outerRadius={92}
              paddingAngle={4}
              cornerRadius={8}
              isAnimationActive={true}
              animationDuration={900}
              animationEasing="ease-out"
            >
              {alertasPorNivel.map((entry) => (
                <Cell key={entry.nivel} fill={entry.color} />
              ))}
            </Pie>

            <Legend
              verticalAlign="bottom"
              align="center"
              content={<CustomLegend />}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </AdminChartCard>
  );
}

export default AlertasNivelChart;
