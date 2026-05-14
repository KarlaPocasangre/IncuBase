function ManagementStats({ stats = [] }) {
  if (!stats.length) return null;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, index) => {
        const Icon = item.icon;

        return (
          <article
            key={item.title || item.label || index}
            className="group flex min-h-[105px] items-center justify-between rounded-2xl border border-[#D8E5DF] bg-white px-7 py-5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-[#BFD8D2] hover:shadow-md"
          >
            <div>
              <p className="text-sm text-gray-500">
                {item.title || item.label}
              </p>

              <h2 className="mt-1 text-2xl font-bold text-[#0B2B26]">
                {item.value}
              </h2>

              {item.subtitle && (
                <p className="mt-1 text-xs font-medium text-gray-400">
                  {item.subtitle}
                </p>
              )}
            </div>

            {item.custom ? (
              item.custom
            ) : Icon ? (
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#F1F8F5] transition-colors duration-200 group-hover:bg-[#E6F3EE]">
                <Icon
                  className={`h-6 w-6 ${item.iconColor || "text-[#6FB39A]"}`}
                  strokeWidth={1.8}
                />
              </div>
            ) : item.dotColor ? (
              <span className={`h-4 w-4 rounded-full ${item.dotColor}`} />
            ) : null}
          </article>
        );
      })}
    </section>
  );
}

export default ManagementStats;
