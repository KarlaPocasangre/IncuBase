import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ManagementStats from "./ManagementStats";
import ManagementCard from "./ManagementCard";
import ManagementFilters from "./ManagementFilters";
import ManagementTable from "./ManagementTable";

function ManagementPage({ config }) {
  const navigate = useNavigate();

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState(config.data);

  const FormModal = config.FormModal;
  const DetailModal = config.DetailModal;

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
      prev.map((item) => {
        const itemId = item.id || item.codigo || item.codigoNido || item.nido;
        const updatedId =
          updatedItem.id ||
          updatedItem.codigo ||
          updatedItem.codigoNido ||
          updatedItem.nido;

        return itemId === updatedId ? updatedItem : item;
      }),
    );

    setEditOpen(false);
    setSelectedItem(null);
  };

  const handleDetail = (item) => {
    setSelectedItem(item);
    setDetailOpen(true);
  };

  const handleMainButtonClick = () => {
    if (config.buttonRedirectTo) {
      navigate(config.buttonRedirectTo);
      return;
    }

    setAddOpen(true);
  };

  return (
    <div className="space-y-6">
      <ManagementStats stats={config.stats} />

      <ManagementCard
        title={config.cardTitle}
        description={config.cardDescription}
        buttonText={config.buttonText}
        buttonIcon={config.buttonIcon}
        onButtonClick={handleMainButtonClick}
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

      {FormModal && (
        <FormModal
          open={addOpen}
          mode="add"
          item={null}
          corral={null}
          nido={null}
          exhumacion={null}
          nacimiento={null}
          onClose={() => setAddOpen(false)}
          onSave={handleAdd}
        />
      )}

      {FormModal && (
        <FormModal
          open={editOpen}
          mode="edit"
          item={selectedItem}
          corral={selectedItem}
          nido={selectedItem}
          exhumacion={selectedItem}
          nacimiento={selectedItem}
          onClose={() => {
            setEditOpen(false);
            setSelectedItem(null);
          }}
          onSave={handleEditSave}
        />
      )}

      {DetailModal && (
        <DetailModal
          open={detailOpen}
          item={selectedItem}
          corral={selectedItem}
          nido={selectedItem}
          exhumacion={selectedItem}
          nacimiento={selectedItem}
          onClose={() => {
            setDetailOpen(false);
            setSelectedItem(null);
          }}
        />
      )}
    </div>
  );
}

export default ManagementPage;
