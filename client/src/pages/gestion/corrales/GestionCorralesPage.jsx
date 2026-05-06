import ManagementPage from "../../../components/management/ManagementPage";
import { corralesConfig } from "../../../feature/corrales/corrales.config";

function CorralesPage() {
  return <ManagementPage config={corralesConfig} />;
  <ManagementTable
  columns={config.columns}
  data={data}
  onEdit={handleEdit}
 />
}

export default CorralesPage;