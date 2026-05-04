const styles = {
  Activo: "text-emerald-600",
  Cerrado: "text-red-600",
  "En mantenimiento": "text-orange-500",
};

function StatusBadge({ estado }) {
  return (
    <span className={`flex items-center gap-2 ${styles[estado]}`}>
      <span className="w-2 h-2 rounded-full bg-current"></span>
      {estado}
    </span>
  );
}

export default StatusBadge;