function TurtleSpeciesCard({
  name,
  scientificName,
  image,
  status,
  statusClassName,
  activeNests,
  eggs,
  description,
}) {
  return (
    <article className="overflow-hidden rounded-2xl border border-[#D6E1DE] bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md">
      <div className="relative h-36 overflow-hidden">
        <img
          src={image}
          alt={name}
          className="h-full w-full object-cover transition duration-300 hover:scale-105"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />

        <span
          className={`absolute right-3 top-3 rounded-full border px-3 py-1 text-xs font-semibold ${statusClassName}`}
        >
          {status}
        </span>

        <div className="absolute bottom-3 left-3">
          <h3 className="text-xl font-bold text-white">{name}</h3>
          <p className="text-xs italic text-white/85">{scientificName}</p>
        </div>
      </div>

      <div className="space-y-5 p-5">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-gray-500">Nidos activos</p>
            <p className="text-2xl font-bold text-[#006C3A]">{activeNests}</p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-500">Huevos</p>
            <p className="text-2xl font-bold text-[#0B1715]">{eggs}</p>
          </div>
        </div>

        <p className="line-clamp-3 text-sm leading-6 text-[#344E49]">
          {description}
        </p>
      </div>
    </article>
  );
}

export default TurtleSpeciesCard;
