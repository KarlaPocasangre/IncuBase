import { useState } from "react";
import ManagementStats from "./ManagementStats";
import ManagementCard from "./ManagementCard";
import ManagementFilters from "./ManagementFilters";
import ManagementTable from "./ManagementTable";
import CorralFormModal from "../modals/CorralFormModal";
import CorralDetailModal from "../modals/CorralDetailModal";

function ManagementPage({ config }) {
  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState(config.data);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleAdd = (newItem) => {
    setData((prev) => [newItem, ...prev]);
    setAddOpen(false);
  };

  const handleEdit = (item) => {
    setSelectedItem(item);
    setEditOpen(true);
  };

  const handleEditSave = (updatedItem) => {
    setData((prev) =>
      prev.map((item) =>
        item.codigo === updatedItem.codigo ? updatedItem : item
      )
    );
    setEditOpen(false);
  };

  const handleDetail = (item) => {
  setSelectedItem(item);
  setDetailOpen(true);
};

  return (
    <div className="space-y-6">
      <ManagementStats stats={config.stats} />

      <ManagementCard
        title={config.cardTitle}
        description={config.cardDescription}
        buttonText={config.buttonText}
        onButtonClick={() => setAddOpen(true)}
      >
        <ManagementFilters
          placeholder={config.searchPlaceholder}
          filters={config.filters}
        />

        <ManagementTable
          columns={config.columns}
          data={data}
          onEdit={handleEdit}
          onDetail={handleDetail}
        />
      </ManagementCard>

      <CorralFormModal
        open={addOpen}
        mode="add"
        onClose={() => setAddOpen(false)}
        onSave={handleAdd}
      />

      <CorralFormModal
        open={editOpen}
        mode="edit"
        corral={selectedItem}
        onClose={() => setEditOpen(false)}
        onSave={handleEditSave}
      />

      <CorralDetailModal
        open={detailOpen}
        corral={selectedItem}
        onClose={() => setDetailOpen(false)}
      />

    </div>
  );
}

export default ManagementPage;