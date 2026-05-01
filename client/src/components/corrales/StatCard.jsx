function StatCard({ title, value, dot }) {
  return (
    <div className="h-[96px] bg-white border border-[#CFE0DC] rounded-2xl px-7 flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 mb-2">{title}</p>
        <h3 className="text-2xl font-bold text-[#10231F]">{value}</h3>
      </div>

      {dot ? (
        <span className={`h-3 w-3 rounded-full ${dot}`} />
      ) : (
        <div className="text-emerald-600 text-3xl">▥</div>
      )}
    </div>
  );
}

export default StatCard;