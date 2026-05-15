import {
  CalendarClock,
  CheckCircle,
  Egg,
  Mars,
  Scale,
  Thermometer,
  Venus,
} from "lucide-react";

//Imagenes
import careyImg from "../../assets/baula.jpg";
import baulaImg from "../../assets/carey.webp";
import golfinaImg from "../../assets/golfina.png";
import prietaImg from "../../assets/prieta.jpg";

const species = [
  {
    name: "Carey",
    scientificName: "Eretmochelys imbricata",
    image: careyImg,
    description:
      "La arquitecta de los arrecifes. Destaca por su hermoso caparazón de placas superpuestas y su característico pico de halcón.",
  },
  {
    name: "Baula",
    scientificName: "Dermochelys coriacea",
    image: baulaImg,
    description:
      "La gigante del océano. Es la tortuga marina más grande del mundo, única por su caparazón flexible y sus viajes extensos.",
  },
  {
    name: "Golfina",
    scientificName: "Lepidochelys olivacea",
    image: golfinaImg,
    description:
      "La viajera gregaria. Es famosa por sus arribadas masivas y su presencia frecuente en las costas del Pacífico.",
  },
  {
    name: "Prieta",
    scientificName: "Chelonia mydas agassizii",
    image: prietaImg,
    description:
      "La viajera de sombra. Se distingue por su caparazón oscuro y su importancia dentro de los ecosistemas marinos.",
  },
];

const temperatureZones = [
  {
    title: "Zona fría",
    className: "text-blue-500",
    items: [
      "Temperatura 28-29°C",
      "Resultado 100% machos",
      "Incubación más lenta",
      "60 días de duración",
    ],
  },
  {
    title: "Zona crítica",
    className: "text-yellow-600",
    items: [
      "Temperatura 30°C",
      "Resultado sexo variable",
      "Punto de inflexión",
      "Mayor variabilidad",
    ],
  },
  {
    title: "Zona cálida",
    className: "text-red-500",
    items: [
      "Temperatura 31-32°C",
      "Resultado 100% hembras",
      "Incubación más rápida",
      "55 días de duración",
    ],
  },
];

const recommendations = [
  "Monitorear temperatura 3 veces diarias: 6 AM, 2 PM y 9 PM.",
  "Usar sombreado para controlar temperaturas excesivas.",
  "Documentar cambios extremos inmediatamente.",
  "Mantener rangos estables sin variaciones mayores a 1°C.",
  "Registrar temperatura desde el día 1 hasta la eclosión.",
  "Proteger los nidos contra fluctuaciones de temperatura.",
];

function SpeciesCard({ specie }) {
  return (
    <article className="rounded-2xl border border-[#CFE1DC] bg-[#DDF3EC] p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <img
        src={specie.image}
        alt={specie.name}
        className="h-28 w-full rounded-xl object-cover"
      />

      <div className="mt-3">
        <h3 className="text-2xl font-bold text-[#006C3A]">{specie.name}</h3>
        <p className="text-xs font-semibold text-[#263B37]">
          ({specie.scientificName})
        </p>

        <p className="mt-2 text-sm leading-6 text-[#344E49]">
          {specie.description}
        </p>
      </div>
    </article>
  );
}

function TemperaturePanel({
  type,
  icon: Icon,
  mainText,
  secondaryText,
  reverse = false,
}) {
  return (
    <article className="rounded-2xl bg-[#DDF3EC] p-8">
      <div
        className={`flex items-center justify-center gap-10 ${
          reverse ? "flex-row-reverse" : ""
        }`}
      >
        <div className="flex h-72 w-24 flex-col justify-between rounded-xl bg-gradient-to-t from-blue-400 via-yellow-300 to-red-400 px-4 py-8 text-sm font-bold text-[#263B37] shadow-md">
          <span>33°C</span>
          <span>32°C</span>
          <span>31°C</span>
          <span>30°C</span>
        </div>

        <div className="space-y-16 text-center">
          <div>
            <Icon size={24} className="mx-auto text-[#163832]" />
            <h3 className="mt-1 text-lg font-bold text-[#163832]">{type}</h3>
            <p className="font-semibold text-blue-500">{mainText}</p>
            <p className="text-xs text-gray-500">{secondaryText}</p>
          </div>

          <div>
            <Scale size={24} className="mx-auto text-[#163832]" />
            <h3 className="mt-1 text-lg font-bold text-[#163832]">
              Punto Crítico
            </h3>
            <p className="font-semibold text-orange-500">30°C</p>
            <p className="text-xs text-gray-500">Sexo indeterminado</p>
          </div>
        </div>
      </div>
    </article>
  );
}

function ZoneCard({ zone }) {
  return (
    <article className="rounded-2xl bg-[#DDF3EC] p-5">
      <h3 className={`text-sm font-bold ${zone.className}`}>{zone.title}</h3>

      <ul className="mt-3 space-y-2 text-sm text-gray-500">
        {zone.items.map((item) => (
          <li key={item}>• {item}</li>
        ))}
      </ul>
    </article>
  );
}

function NestStatCard({ type }) {
  if (type === "capacity") {
    return (
      <article className="rounded-2xl border border-[#CFE1DC] bg-white p-8 text-center shadow-sm">
        <h3 className="text-2xl font-bold uppercase text-[#006C3A]">
          Nidos Activos
        </h3>

        <div className="mx-auto mt-8 h-32 w-56 rounded-t-full border-[18px] border-b-0 border-[#006C3A] border-r-[#9EC5B7]" />

        <p className="-mt-4 text-6xl font-bold text-[#006C3A]">42</p>
        <p className="mt-1 text-sm text-gray-500">Nidos en incubación</p>

        <p className="mt-8 text-sm text-[#344E49]">
          Capacidad: 65% (Límite 64 nidos)
        </p>
      </article>
    );
  }

  return (
    <article className="rounded-2xl border border-[#CFE1DC] bg-white p-8 text-center shadow-sm">
      <h3 className="text-2xl font-bold uppercase text-[#006C3A]">
        Nidos Activos
      </h3>

      <div className="mx-auto mt-6 rounded-full bg-[#EAF6F1] px-6 py-2 text-xs font-semibold text-gray-500">
        Próximos 5 días
      </div>

      <div className="mx-auto mt-6 flex h-36 w-36 items-center justify-center rounded-full border-[12px] border-[#006C3A]">
        <div>
          <p className="text-4xl font-bold text-[#006C3A]">05</p>
          <p className="font-semibold text-[#006C3A]">Nidos</p>
        </div>
      </div>

      <p className="mt-8 text-sm uppercase text-gray-500">Eclosión estimada</p>
      <p className="mt-1 text-xs text-gray-500">Semana del 05 al 10 de Abril</p>
    </article>
  );
}

function GuiaIncubasePage() {
  return (
    <section className="space-y-10 pb-10">
      <div className="text-center">
        <h1 className="tracking-[0.35em] text-5xl font-bold text-[#006C3A] md:text-7xl">
          INCUBASE
        </h1>
        <p className="mt-3 text-sm text-gray-500">
          Guía informativa sobre especies, temperatura y monitoreo de nidos.
        </p>
      </div>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
        {species.map((specie) => (
          <SpeciesCard key={specie.name} specie={specie} />
        ))}
      </section>

      <section className="space-y-7">
        <div className="flex items-center justify-center gap-2">
          <Thermometer size={24} className="text-red-400" />
          <h2 className="text-3xl font-bold text-[#006C3A]">
            Influencia de Temperaturas en el Sexo
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
          <TemperaturePanel
            type="Machos"
            icon={Mars}
            mainText="Menor a 30°C"
            secondaryText="Predominan machos"
          />

          <TemperaturePanel
            type="Hembras"
            icon={Venus}
            mainText="Mayor a 30°C"
            secondaryText="Predominan hembras"
            reverse
          />
        </div>
      </section>

      <section className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {temperatureZones.map((zone) => (
          <ZoneCard key={zone.title} zone={zone} />
        ))}
      </section>

      <section className="rounded-2xl border border-[#99D1AA] bg-[#EEFBEF] p-5">
        <h3 className="mb-3 text-sm font-bold text-[#163832]">
          Recomendaciones para Manejo Óptimo
        </h3>

        <div className="grid grid-cols-1 gap-x-8 gap-y-2 md:grid-cols-2">
          {recommendations.map((recommendation) => (
            <div
              key={recommendation}
              className="flex items-start gap-2 text-sm text-[#344E49]"
            >
              <CheckCircle size={16} className="mt-0.5 text-[#006C3A]" />
              <span>{recommendation}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="grid grid-cols-1 gap-10 xl:grid-cols-2">
        <NestStatCard type="capacity" />
        <NestStatCard type="eclosion" />
      </section>
    </section>
  );
}

export default GuiaIncubasePage;
