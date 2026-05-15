import {
  BookOpen,
  CalendarClock,
  CheckCircle,
  Egg,
  ExternalLink,
  Info,
  Mars,
  Scale,
  ShieldCheck,
  Sparkles,
  Thermometer,
  Turtle,
  Venus,
  Waves,
} from "lucide-react";

// Imágenes
import careyImg from "../../assets/carey.webp";
import baulaImg from "../../assets/baula.jpg";
import golfinaImg from "../../assets/golfina.png";
import prietaImg from "../../assets/prieta.jpg";

const species = [
  {
    name: "Carey",
    scientificName: "Eretmochelys imbricata",
    image: careyImg,
    tag: "Arrecifes",
    url: "https://www.fisheries.noaa.gov/species/hawksbill-turtle",
    description:
      "La arquitecta de los arrecifes. Destaca por su caparazón de placas superpuestas y su característico pico de halcón.",
  },
  {
    name: "Baula",
    scientificName: "Dermochelys coriacea",
    image: baulaImg,
    tag: "Gigante marina",
    url: "https://www.fisheries.noaa.gov/species/leatherback-turtle",
    description:
      "La tortuga marina más grande del mundo. Es única por su caparazón flexible y sus extensos viajes oceánicos.",
  },
  {
    name: "Golfina",
    scientificName: "Lepidochelys olivacea",
    image: golfinaImg,
    tag: "Arribadas",
    url: "https://www.fisheries.noaa.gov/species/olive-ridley-turtle",
    description:
      "La viajera gregaria. Es famosa por sus arribadas masivas y su presencia frecuente en las costas del Pacífico.",
  },
  {
    name: "Prieta",
    scientificName: "Chelonia mydas agassizii",
    image: prietaImg,
    tag: "Pacífico",
    url: "https://www.fisheries.noaa.gov/species/green-turtle",
    description:
      "La viajera de sombra. Se distingue por su caparazón oscuro y su importancia dentro de los ecosistemas marinos.",
  },
];

const temperatureZones = [
  {
    title: "Zona fría",
    range: "28°C - 29°C",
    result: "Predominan machos",
    className: "text-blue-600",
    bgClassName: "bg-blue-50",
    borderClassName: "border-blue-100",
    items: [
      "Incubación más lenta.",
      "Duración aproximada de 60 días.",
      "Mayor tendencia a nacimiento de machos.",
    ],
  },
  {
    title: "Zona crítica",
    range: "30°C",
    result: "Sexo variable",
    className: "text-amber-600",
    bgClassName: "bg-amber-50",
    borderClassName: "border-amber-100",
    items: [
      "Punto de inflexión térmica.",
      "Mayor variabilidad en los resultados.",
      "Requiere monitoreo constante.",
    ],
  },
  {
    title: "Zona cálida",
    range: "31°C - 32°C",
    result: "Predominan hembras",
    className: "text-red-600",
    bgClassName: "bg-red-50",
    borderClassName: "border-red-100",
    items: [
      "Incubación más rápida.",
      "Duración aproximada de 55 días.",
      "Mayor tendencia a nacimiento de hembras.",
    ],
  },
];

const recommendations = [
  "Monitorear temperatura 3 veces al día: 6 AM, 2 PM y 9 PM.",
  "Usar sombreado cuando existan temperaturas excesivas.",
  "Documentar cambios extremos inmediatamente.",
  "Mantener rangos estables sin variaciones mayores a 1°C.",
  "Registrar temperatura desde el día 1 hasta la eclosión.",
  "Proteger los nidos contra fluctuaciones térmicas.",
];

const summaryStats = [
  {
    label: "Especies incluidas",
    value: "04",
    icon: Turtle,
  },
  {
    label: "Rango crítico",
    value: "30°C",
    icon: Thermometer,
  },
  {
    label: "Monitoreos diarios",
    value: "03",
    icon: CalendarClock,
  },
];

function SectionHeader({ icon: Icon, eyebrow, title, description }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F4EF] text-[#0F6B3D]">
        <Icon size={24} />
      </div>

      <p className="text-xs font-bold uppercase tracking-[0.22em] text-[#7BB9A0]">
        {eyebrow}
      </p>

      <h2 className="mt-2 text-2xl font-bold text-[#163832] md:text-3xl">
        {title}
      </h2>

      {description && (
        <p className="mt-3 text-sm leading-6 text-slate-500">{description}</p>
      )}
    </div>
  );
}

function SpeciesCard({ specie }) {
  return (
    <a
      href={specie.url}
      target="_blank"
      rel="noopener noreferrer"
      title={`Ver información oficial sobre ${specie.name}`}
      className="group block overflow-hidden rounded-3xl border border-[#D6E1DE] bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-[#7BB9A0]/30"
    >
      <article>
        <div className="relative h-44 overflow-hidden">
          <img
            src={specie.image}
            alt={specie.name}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />

          <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[11px] font-bold text-[#0F6B3D] shadow-sm">
            {specie.tag}
          </span>

          <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-[#0F6B3D] opacity-0 shadow-sm transition-all group-hover:opacity-100">
            <ExternalLink size={15} />
          </span>

          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-2xl font-bold text-white">{specie.name}</h3>
            <p className="mt-1 text-xs italic text-white/85">
              {specie.scientificName}
            </p>
          </div>
        </div>

        <div className="p-5">
          <p className="text-sm leading-6 text-[#344E49]">
            {specie.description}
          </p>

          <div className="mt-4 inline-flex items-center gap-2 text-xs font-bold text-[#0F6B3D]">
            Ver información oficial
            <ExternalLink size={13} />
          </div>
        </div>
      </article>
    </a>
  );
}

function TemperaturePanel({
  type,
  icon: Icon,
  mainText,
  secondaryText,
  accentClassName,
  reverse = false,
}) {
  return (
    <article className="rounded-3xl border border-[#D6E1DE] bg-white p-6 shadow-sm">
      <div
        className={`flex flex-col items-center gap-8 md:flex-row md:justify-center ${
          reverse ? "md:flex-row-reverse" : ""
        }`}
      >
        <div className="relative flex h-72 w-24 flex-col justify-between rounded-3xl bg-gradient-to-t from-blue-400 via-amber-300 to-red-400 px-4 py-8 text-sm font-bold text-white shadow-md">
          <span>33°C</span>
          <span>32°C</span>
          <span>31°C</span>
          <span>30°C</span>
          <span>29°C</span>

          <div className="absolute -right-3 top-1/2 h-1 w-8 -translate-y-1/2 rounded-full bg-[#163832]" />
        </div>

        <div className="w-full max-w-xs space-y-4">
          <div className="rounded-3xl bg-[#F5FAF8] p-5 text-center">
            <div
              className={`mx-auto flex h-12 w-12 items-center justify-center rounded-2xl ${accentClassName}`}
            >
              <Icon size={25} />
            </div>

            <h3 className="mt-3 text-lg font-bold text-[#163832]">{type}</h3>
            <p className="mt-1 text-sm font-bold text-[#0F6B3D]">{mainText}</p>
            <p className="mt-1 text-xs text-slate-500">{secondaryText}</p>
          </div>

          <div className="rounded-3xl border border-[#D6E1DE] bg-white p-5 text-center">
            <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
              <Scale size={25} />
            </div>

            <h3 className="mt-3 text-lg font-bold text-[#163832]">
              Punto crítico
            </h3>
            <p className="mt-1 text-sm font-bold text-amber-600">30°C</p>
            <p className="mt-1 text-xs text-slate-500">
              Mayor variabilidad sexual
            </p>
          </div>
        </div>
      </div>
    </article>
  );
}

function ZoneCard({ zone }) {
  return (
    <article
      className={`rounded-3xl border ${zone.borderClassName} ${zone.bgClassName} p-5`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className={`text-base font-bold ${zone.className}`}>
            {zone.title}
          </h3>
          <p className="mt-1 text-2xl font-bold text-[#163832]">{zone.range}</p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-white/80">
          <Thermometer size={19} className={zone.className} />
        </div>
      </div>

      <p className="mt-3 rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-[#344E49]">
        {zone.result}
      </p>

      <ul className="mt-4 space-y-2">
        {zone.items.map((item) => (
          <li
            key={item}
            className="flex items-start gap-2 text-sm leading-5 text-slate-600"
          >
            <CheckCircle
              size={15}
              className={`mt-0.5 shrink-0 ${zone.className}`}
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </article>
  );
}

function RecommendationCard() {
  return (
    <section className="rounded-3xl border border-[#BFD8D2] bg-[#F5FAF8] p-6 shadow-sm">
      <div className="mb-5 flex items-start gap-3">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#DDF3EC] text-[#0F6B3D]">
          <ShieldCheck size={23} />
        </div>

        <div>
          <h3 className="text-lg font-bold text-[#163832]">
            Recomendaciones para manejo óptimo
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            Buenas prácticas para el control de temperatura y protección de
            nidos durante el proceso de incubación.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
        {recommendations.map((recommendation) => (
          <div
            key={recommendation}
            className="flex items-start gap-3 rounded-2xl bg-white p-4 text-sm text-[#344E49] shadow-sm"
          >
            <CheckCircle size={17} className="mt-0.5 shrink-0 text-[#0F6B3D]" />
            <span>{recommendation}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

function NestStatCard({ type }) {
  if (type === "capacity") {
    return (
      <article className="rounded-3xl border border-[#D6E1DE] bg-white p-7 shadow-sm">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7BB9A0]">
              Capacidad
            </p>
            <h3 className="mt-1 text-xl font-bold text-[#163832]">
              Nidos activos
            </h3>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F4EF] text-[#0F6B3D]">
            <Egg size={24} />
          </div>
        </div>

        <div className="mt-8 flex items-end justify-center">
          <div className="relative">
            <div className="h-32 w-56 rounded-t-full border-[18px] border-b-0 border-[#0F6B3D] border-r-[#9EC5B7]" />

            <div className="absolute left-1/2 top-[62px] -translate-x-1/2 text-center">
              <p className="text-6xl font-bold text-[#0F6B3D]">42</p>
              <p className="text-sm font-semibold text-slate-500">
                en incubación
              </p>
            </div>
          </div>
        </div>

        <div className="mt-12 rounded-2xl bg-[#F5FAF8] p-4">
          <div className="flex items-center justify-between text-sm">
            <span className="font-medium text-slate-500">Capacidad usada</span>
            <span className="font-bold text-[#0F6B3D]">65%</span>
          </div>

          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#D6E1DE]">
            <div className="h-full w-[65%] rounded-full bg-[#0F6B3D]" />
          </div>

          <p className="mt-2 text-xs text-slate-500">Límite: 64 nidos</p>
        </div>
      </article>
    );
  }

  return (
    <article className="rounded-3xl border border-[#D6E1DE] bg-white p-7 shadow-sm">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#7BB9A0]">
            Próximos eventos
          </p>
          <h3 className="mt-1 text-xl font-bold text-[#163832]">
            Eclosión estimada
          </h3>
        </div>

        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E5F4EF] text-[#0F6B3D]">
          <CalendarClock size={24} />
        </div>
      </div>

      <div className="mx-auto mt-8 flex h-40 w-40 items-center justify-center rounded-full border-[14px] border-[#0F6B3D] bg-[#F5FAF8]">
        <div className="text-center">
          <p className="text-5xl font-bold text-[#0F6B3D]">05</p>
          <p className="text-sm font-bold text-[#0F6B3D]">Nidos</p>
        </div>
      </div>

      <div className="mt-8 rounded-2xl bg-[#F5FAF8] p-4 text-center">
        <p className="text-sm font-semibold uppercase text-slate-500">
          Próximos 5 días
        </p>
        <p className="mt-1 text-xs text-slate-500">
          Semana del 05 al 10 de abril
        </p>
      </div>
    </article>
  );
}

function SummaryCard({ item }) {
  const Icon = item.icon;

  return (
    <article className="rounded-3xl border border-white/15 bg-white/10 p-5 text-white backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15">
          <Icon size={22} />
        </div>

        <div>
          <p className="text-2xl font-bold">{item.value}</p>
          <p className="text-xs text-white/70">{item.label}</p>
        </div>
      </div>
    </article>
  );
}

function GuiaIncubasePage() {
  return (
    <section className="space-y-10 pb-10">
      <section className="relative overflow-hidden rounded-[28px] bg-[#043D35] px-6 py-10 shadow-sm md:px-10">
        <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-[#7BB9A0]/20 blur-3xl" />
        <div className="absolute -bottom-24 left-10 h-64 w-64 rounded-full bg-[#B9F3D4]/10 blur-3xl" />

        <div className="relative grid grid-cols-1 gap-8 xl:grid-cols-[1.3fr_1fr] xl:items-end">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold text-white/80">
              <BookOpen size={15} />
              Guía informativa IncuBase
            </div>

            <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white md:text-6xl">
              Monitoreo y manejo de nidos de tortugas marinas
            </h1>

            <p className="mt-5 max-w-2xl text-sm leading-7 text-white/70 md:text-base">
              Consulta información clave sobre especies, temperatura de
              incubación, recomendaciones de monitoreo y datos importantes para
              el manejo de nidos dentro del sistema IncuBase.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 xl:grid-cols-1">
            {summaryStats.map((item) => (
              <SummaryCard key={item.label} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          icon={Turtle}
          eyebrow="Especies"
          title="Tortugas marinas registradas"
          description="Estas especies forman parte del contexto de monitoreo del sistema y ayudan a identificar información relevante durante el registro de nidos."
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
          {species.map((specie) => (
            <SpeciesCard key={specie.name} specie={specie} />
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <SectionHeader
          icon={Thermometer}
          eyebrow="Temperatura"
          title="Influencia de la temperatura en el sexo"
          description="La temperatura de incubación puede influir en la proporción sexual de las crías, por lo que el monitoreo constante es clave."
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <TemperaturePanel
            type="Machos"
            icon={Mars}
            mainText="Menor a 30°C"
            secondaryText="Predominan machos"
            accentClassName="bg-blue-50 text-blue-600"
          />

          <TemperaturePanel
            type="Hembras"
            icon={Venus}
            mainText="Mayor a 30°C"
            secondaryText="Predominan hembras"
            accentClassName="bg-red-50 text-red-600"
            reverse
          />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {temperatureZones.map((zone) => (
          <ZoneCard key={zone.title} zone={zone} />
        ))}
      </section>

      <RecommendationCard />

      <section className="space-y-6">
        <SectionHeader
          icon={Sparkles}
          eyebrow="Resumen operativo"
          title="Indicadores generales de monitoreo"
          description="Estos bloques pueden conectarse más adelante con datos reales del sistema para mostrar información actualizada."
        />

        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          <NestStatCard type="capacity" />
          <NestStatCard type="eclosion" />
        </div>
      </section>

      <section className="rounded-3xl border border-[#D6E1DE] bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-[#E5F4EF] text-[#0F6B3D]">
              <Info size={22} />
            </div>

            <div>
              <h3 className="text-lg font-bold text-[#163832]">
                Nota informativa
              </h3>
              <p className="mt-1 max-w-3xl text-sm leading-6 text-slate-500">
                Esta guía sirve como apoyo visual para usuarios del sistema. Los
                datos operativos deben validarse con los registros reales del
                módulo de temperatura, nidos, nacimientos y exhumación.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-2xl bg-[#F5FAF8] px-4 py-3 text-sm font-semibold text-[#0F6B3D]">
            <Waves size={18} />
            Playa Los Cóbanos
          </div>
        </div>
      </section>
    </section>
  );
}

export default GuiaIncubasePage;
