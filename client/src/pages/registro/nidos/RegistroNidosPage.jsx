import RegistroNidoForm from "../../../components/nidos/RegistroNidoForm";
import SeleccionPosicionCard from "../../../components/nidos/SeleccionPosicionCard";
import ProtocoloCorral from "../../../components/nidos/ProtocoloCorral";

export default function RegistroNidosPage() {
  return (
    <section className="space-y-4">
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[1.35fr_1fr]">
        <RegistroNidoForm />
        <SeleccionPosicionCard />
      </div>

      <ProtocoloCorral />
    </section>
  );
}
