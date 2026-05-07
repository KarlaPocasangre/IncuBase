import ManagementPage from "../../../components/management/ManagementPage";
import { nacimientosConfig } from "../../../feature/nacimientos/nacimientos.config";

export default function GestionNacimientosPage() {
  return <ManagementPage config={nacimientosConfig} />;
}
