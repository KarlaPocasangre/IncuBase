import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
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
      <div className="w-full min-w-0">
        <div className="relative h-[220px] w-full min-w-0">
          <div className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
            <p className="text-[26px] font-extrabold text-[#0B2F2A]">
              {totalAlertas}
            </p>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Alertas
            </p>
          </div>

          <ResponsiveContainer
            width="100%"
            height="100%"
            minWidth={220}
            minHeight={220}
          >
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
                isAnimationActive
                animationDuration={900}
                animationEasing="ease-out"
              >
                {alertasPorNivel.map((entry) => (
                  <Cell key={entry.nivel} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2">
          {alertasPorNivel.map((item) => (
            <div
              key={item.nivel}
              className="flex items-center justify-between rounded-xl border border-[#DDEBE7] bg-[#F8FCFA] px-3 py-2"
            >
              <div className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-[12px] font-semibold text-[#334155]">
                  {item.nivel}
                </span>
              </div>

              <span className="text-[12px] font-bold text-[#0B2F2A]">
                {item.total}
              </span>
            </div>
          ))}
        </div>
      </div>
    </AdminChartCard>
  );
}

export default AlertasNivelChart;
