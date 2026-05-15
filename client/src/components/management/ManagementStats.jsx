function ManagementStats({ stats }) {
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <article
            key={item.title}
            className="flex items-center justify-between rounded-2xl border border-[#D8E5DF] bg-white px-7 py-5 shadow-sm"
          >
            <div>
              <p className="text-sm text-gray-500">{item.title}</p>
              <h2 className="mt-1 text-2xl font-bold text-[#0B2B26]">
                {item.value}
              </h2>
            </div>

            {item.custom ? (
              item.custom
            ) : Icon ? (
              <Icon
                className={`h-7 w-7 ${item.iconColor || "text-[#6FB39A]"}`}
                strokeWidth={1.8}
              />
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
