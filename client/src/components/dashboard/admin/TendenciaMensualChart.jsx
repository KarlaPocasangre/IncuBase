import {
  Area,
  AreaChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartNoAxesColumnIncreasing } from "lucide-react";

import AdminChartCard from "./AdminChartCard";
import { tendenciaMensual } from "../../../data/dashboardAdmin.data";

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

function TendenciaMensualChart() {
  return (
    <AdminChartCard
      title="Tendencia mensual"
      subtitle="Comparativa mensual de nidos, eclosiones y exhumaciones."
      icon={ChartNoAxesColumnIncreasing}
      badge="Últimos 6 meses"
      className="min-h-[380px]"
    >
      <div className="h-[290px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={tendenciaMensual}
            margin={{
              top: 10,
              right: 18,
              left: -18,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="nidosGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#0F7A4F" stopOpacity={0.24} />
                <stop offset="95%" stopColor="#0F7A4F" stopOpacity={0.02} />
              </linearGradient>

              <linearGradient
                id="eclosionesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.02} />
              </linearGradient>

              <linearGradient
                id="exhumacionesGradient"
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor="#F59E0B" stopOpacity={0.18} />
                <stop offset="95%" stopColor="#F59E0B" stopOpacity={0.02} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" stroke="#E3EFEB" />

            <XAxis
              dataKey="mes"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#64748B", fontSize: 11 }}
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

            <Area
              type="monotone"
              dataKey="nidos"
              name="Nidos"
              stroke="#0F7A4F"
              strokeWidth={3}
              fill="url(#nidosGradient)"
              isAnimationActive={true}
              animationDuration={950}
              animationEasing="ease-out"
            />

            <Area
              type="monotone"
              dataKey="eclosiones"
              name="Eclosiones"
              stroke="#3B82F6"
              strokeWidth={3}
              fill="url(#eclosionesGradient)"
              isAnimationActive={true}
              animationDuration={950}
              animationEasing="ease-out"
            />

            <Area
              type="monotone"
              dataKey="exhumaciones"
              name="Exhumaciones"
              stroke="#F59E0B"
              strokeWidth={3}
              fill="url(#exhumacionesGradient)"
              isAnimationActive={true}
              animationDuration={950}
              animationEasing="ease-out"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </AdminChartCard>
  );
}

export default TendenciaMensualChart;
