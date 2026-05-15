import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ManagementStats from "./ManagementStats";
import ManagementCard from "./ManagementCard";
import ManagementFilters from "./ManagementFilters";
import ManagementTable from "./ManagementTable";

function getItemId(item) {
  return (
    item?.id || item?.codigo || item?.codigoNido || item?.nido || item?.email
  );
}

function normalizeText(value) {
  return String(value || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function getComparableValue(value, type) {
  if (type === "date") {
    const time = new Date(value).getTime();
    return Number.isNaN(time) ? 0 : time;
  }

  if (type === "number") {
    return Number(value) || 0;
  }

  return normalizeText(value);
}

function ManagementPage({ config }) {
  const navigate = useNavigate();

  const [addOpen, setAddOpen] = useState(false);
  const [editOpen, setEditOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);

  const [selectedItem, setSelectedItem] = useState(null);
  const [data, setData] = useState(config.data || []);

  const [searchValue, setSearchValue] = useState("");
  const [filterValues, setFilterValues] = useState({});
  const [sortConfig, setSortConfig] = useState(config.defaultSort || null);

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
        const itemId = getItemId(item);
        const updatedId = getItemId(updatedItem);

        return itemId === updatedId ? updatedItem : item;
      }),
    );

    setEditOpen(false);
    setSelectedItem(null);
  };

  const handleDelete = (item) => {
    if (config.onDelete) {
      config.onDelete(item);
      return;
    }

    console.log("Eliminar registro:", item);
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

  const handleFilterChange = (key, value) => {
    setFilterValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearFilters = () => {
    setSearchValue("");
    setFilterValues({});
  };

  const handleSort = (column) => {
    setSortConfig((prev) => {
      if (prev?.key === column.key) {
        return {
          key: column.key,
          direction: prev.direction === "asc" ? "desc" : "asc",
          type: column.sortType || "text",
        };
      }

      return {
        key: column.key,
        direction: column.defaultSortDirection || "asc",
        type: column.sortType || "text",
      };
    });
  };

  const handleAction = (actionKey, item) => {
    if (config.onAction) {
      config.onAction(actionKey, item);
      return;
    }

    if (actionKey === "edit") {
      handleEdit(item);
      return;
    }

    if (actionKey === "delete") {
      handleDelete(item);
      return;
    }

    if (actionKey === "detail") {
      handleDetail(item);
      return;
    }

    console.log(`Acción ${actionKey}:`, item);
  };

  const filteredData = useMemo(() => {
    const searchableKeys =
      config.searchKeys ||
      config.columns
        ?.filter((column) => column.key !== "acciones")
        .map((column) => column.key) ||
      [];

    const search = normalizeText(searchValue.trim());

    const filtered = data.filter((item) => {
      const matchesSearch =
        !search ||
        searchableKeys.some((key) => normalizeText(item[key]).includes(search));

      const matchesFilters = Object.entries(filterValues).every(
        ([key, value]) => {
          if (!value) return true;

          if (typeof value === "object") {
            const hasFrom = Boolean(value.from);
            const hasTo = Boolean(value.to);

            if (!hasFrom && !hasTo) return true;

            const itemDate = new Date(item[key]);
            if (Number.isNaN(itemDate.getTime())) return false;

            const fromDate = hasFrom
              ? new Date(`${value.from}T00:00:00`)
              : null;

            const toDate = hasTo ? new Date(`${value.to}T23:59:59`) : null;

            if (fromDate && itemDate < fromDate) return false;
            if (toDate && itemDate > toDate) return false;

            return true;
          }

          return normalizeText(item[key]).includes(normalizeText(value));
        },
      );

      return matchesSearch && matchesFilters;
    });

    if (!sortConfig?.key) return filtered;

    return [...filtered].sort((a, b) => {
      const aValue = getComparableValue(a[sortConfig.key], sortConfig.type);
      const bValue = getComparableValue(b[sortConfig.key], sortConfig.type);

      if (aValue < bValue) {
        return sortConfig.direction === "asc" ? -1 : 1;
      }

      if (aValue > bValue) {
        return sortConfig.direction === "asc" ? 1 : -1;
      }

      return 0;
    });
  }, [
    data,
    searchValue,
    filterValues,
    sortConfig,
    config.searchKeys,
    config.columns,
  ]);

  return (
    <div className="space-y-6">
      <ManagementStats stats={config.stats} />

      <ManagementCard
        title={config.cardTitle}
        description={config.cardDescription}
        buttonText={config.buttonText}
        buttonIcon={config.buttonIcon}
        cardIcon={config.cardIcon}
        cardIconColor={config.cardIconColor}
        onButtonClick={handleMainButtonClick}
      >
        <ManagementFilters
          placeholder={config.searchPlaceholder}
          filters={config.filters}
          searchValue={searchValue}
          filterValues={filterValues}
          onSearchChange={setSearchValue}
          onFilterChange={handleFilterChange}
          onClearFilters={handleClearFilters}
        />

        <ManagementTable
          columns={config.columns}
          data={filteredData}
          actions={config.actions}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onDetail={handleDetail}
          onAction={handleAction}
          onSort={handleSort}
          sortConfig={sortConfig}
          emptyTitle={config.emptyTitle}
          emptyDescription={config.emptyDescription}
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
          usuario={null}
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
          usuario={selectedItem}
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
          usuario={selectedItem}
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
