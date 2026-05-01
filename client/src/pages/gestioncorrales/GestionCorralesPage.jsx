import { useState } from "react";
import StatCard from "../../components/corrales/StatCard";
import CorralesToolbar from "../../components/corrales/CorralesToolbar";
import CorralesFilters from "../../components/corrales/CorralesFilters";
import CorralesTable from "../../components/corrales/CorralesTable";
import EditCorralModal from "../../components/corrales/EditCorralModal";
import DetailCorralModal from "../../components/corrales/DetailCorralModal";
import AddCorralModal from "../../components/corrales/AddCorralModal";

function GestionCorralesPage() {
  const [selectedCorral, setSelectedCorral] = useState(null);
  const [editOpen, setEditOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);

  const [corrales, setCorrales] = useState([
    {
      codigo: "C2HJJ-09",
      ubicacion: "Zona Norte",
      tipo: "Corral Abierto",
      estado: "Activo",
      fecha: "2023-10-02 15:04",
      creadoPor: "Juan Perez",
      fechaCreacion: "2026-10-10 18:09",
      observaciones: "Corral en buen estado.",
    },
    {
      codigo: "C2HJJ-10",
      ubicacion: "Zona Sur",
      tipo: "Corral Cerrado",
      estado: "Cerrado",
      fecha: "2023-10-02 15:04",
      creadoPor: "Juan Perez",
      fechaCreacion: "2026-10-10 18:09",
      observaciones: "Corral cerrado temporalmente.",
    },
  ]);

  const handleEdit = (corral) => {
    setSelectedCorral(corral);
    setEditOpen(true);
  };

  const handleDetail = (corral) => {
    setSelectedCorral(corral);
    setDetailOpen(true);
  };

  const handleAdd = (newCorral) => {
    setCorrales((prev) => [newCorral, ...prev]);
    setAddOpen(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-[#10231F]">Corrales</h1>
        <p className="text-sm text-slate-500">Gestión de Corrales</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <StatCard title="Total de Corrales" value={corrales.length} />
        <StatCard title="Cerrados" value="2" dot="bg-red-600" />
        <StatCard title="En mantenimiento" value="6" dot="bg-orange-400" />
        <StatCard title="Activos" value="6" dot="bg-emerald-500" />
      </div>

      <section className="bg-white border border-[#CFE0DC] rounded-2xl shadow-sm p-6">
        <CorralesToolbar onAdd={() => setAddOpen(true)} />
        <CorralesFilters />

        <CorralesTable
          corrales={corrales}
          onEdit={handleEdit}
          onDetail={handleDetail}
        />
      </section>

      <AddCorralModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSave={handleAdd}
      />

      <EditCorralModal
        open={editOpen}
        corral={selectedCorral}
        onClose={() => setEditOpen(false)}
        onSave={() => setEditOpen(false)}
      />

      <DetailCorralModal
        open={detailOpen}
        corral={selectedCorral}
        onClose={() => setDetailOpen(false)}
      />
    </div>
  );
}

export default GestionCorralesPage;