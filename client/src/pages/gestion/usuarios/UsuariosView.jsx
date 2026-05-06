import ManagementPage from "../../../components/management/ManagementPage";
import { usuariosConfig } from "../../../feature/usuarios/usuarios.config";

export default function GestionUsuariosPage() {
  return <ManagementPage config={usuariosConfig} />;
}
