// ManagementPage.jsx
import ManagementStats from "./ManagementStats";
import ManagementCard from "./ManagementCard";
import ManagementFilters from "./ManagementFilters";
import ManagementTable from "./ManagementTable";

function ManagementPage({ config }) {
  return (
    <div className="space-y-6">
      <ManagementStats stats={config.stats} />

      <ManagementCard
        title={config.cardTitle}
        description={config.cardDescription}
        buttonText={config.buttonText}
      >
        <ManagementFilters
          placeholder={config.searchPlaceholder}
          filters={config.filters}
        />

        <ManagementTable columns={config.columns} data={config.data} />
      </ManagementCard>
    </div>
  );
}

export default ManagementPage;
