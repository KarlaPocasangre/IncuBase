import ManagementPage from "../../../components/management/ManagementPage";
import { nidosConfig } from "../../../feature/nidos/nidos.config";

function GestionNidosPage() {
  return <ManagementPage config={nidosConfig} />;
}

export default GestionNidosPage;
