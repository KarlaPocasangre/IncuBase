function ReportSummaryCards({ summary }) {
  return (
    <section className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {summary.map((item) => {
        const Icon = item.icon;

        return (
          <article
            key={item.title}
            className="rounded-2xl border border-[#D8E5DF] bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {item.title}
                </p>

                <h3 className="mt-2 text-3xl font-bold text-[#163832]">
                  {item.value}
                </h3>
              </div>

              <div
                className={`flex h-12 w-12 items-center justify-center rounded-xl ${item.bgColor}`}
              >
                <Icon className={`h-6 w-6 ${item.iconColor}`} />
              </div>
            </div>

            <p className="mt-3 text-xs text-gray-500">{item.description}</p>
          </article>
        );
      })}
    </section>
  );
}

export default ReportSummaryCards;
