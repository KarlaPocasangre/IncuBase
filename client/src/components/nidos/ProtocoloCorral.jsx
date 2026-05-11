import {
  ClipboardList,
  Info,
  LockKeyhole,
  MousePointerClick,
} from "lucide-react";

export default function ProtocoloCorral() {
  return (
    <div className="rounded-2xl border border-[#BFD8D2] bg-[#EAF3F0] px-6 py-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50">
          <Info className="h-5 w-5 text-blue-600" />
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#111827]">
            Protocolo de llenado del corral
          </h3>

          <p className="mt-1 text-sm text-[#6B7280]">
            El sistema guía la selección de posiciones siguiendo el patrón
            alterno establecido para distribuir correctamente los nidos.
          </p>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2">
        <ProtocoloItem
          icon={MousePointerClick}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
          badge="Primero"
          badgeClass="bg-emerald-50 text-emerald-700"
          color="bg-white"
          border="border-[#D7E4E0]"
          title="Casillas claras disponibles"
          text="Se deben seleccionar primero las casillas claras disponibles."
        />

        <ProtocoloItem
          icon={LockKeyhole}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
          badge="Luego"
          badgeClass="bg-amber-50 text-amber-700"
          color="bg-[#BFD8D2]"
          border="border-[#BFD8D2]"
          title="Casillas alternas habilitadas"
          text="Cuando todas las casillas claras estén ocupadas, el sistema permitirá seleccionar las casillas alternas oscuras."
        />
      </div>
    </div>
  );
}

function ProtocoloItem({
  icon: Icon,
  iconBg,
  iconColor,
  badge,
  badgeClass,
  color,
  border,
  title,
  text,
}) {
  return (
    <div className="rounded-2xl border border-[#C9DDD8] bg-white/70 p-4">
      <div className="flex items-start gap-3">
        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${iconBg}`}
        >
          <Icon className={`h-5 w-5 ${iconColor}`} />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span
              className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${badgeClass}`}
            >
              {badge}
            </span>

            <div className={`h-5 w-5 rounded-md border ${color} ${border}`} />

            <h4 className="text-sm font-bold text-[#163832]">{title}</h4>
          </div>

          <p className="mt-2 text-sm leading-6 text-[#374151]">{text}</p>
        </div>
      </div>
    </div>
  );
}
