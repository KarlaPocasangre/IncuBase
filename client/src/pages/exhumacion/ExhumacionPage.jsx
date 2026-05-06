import { useState } from "react";
import {
  Search,
  Egg,
  Skull,
  Bug,
  Circle,
  FilePenLine,
  Save,
  RotateCcw,
} from "lucide-react";

import "./ExhumacionPage.css";

function ExhumacionPage() {
  const [nido, setNido] = useState("");
  const [depredacion, setDepredacion] = useState(null);
  const [depredador, setDepredador] = useState("");

  const hayResumen = nido !== "";

  const limpiarFormulario = () => {
    setNido("");
    setDepredacion(null);
    setDepredador("");
  };

  return (
    <section className="exhumacion-page">
      <div className="ex-card ex-form-card">
        <div className="ex-section-title">
          <Search size={18} />
          <span>Registro de Exhumación</span>
        </div>

        <p className="ex-subtitle">
          Datos científicos post-eclosión
        </p>

        <div className="ex-grid">
          <div className="ex-field">
            <label>Nido</label>

            <select
              className="ex-input"
              value={nido}
              onChange={(e) => setNido(e.target.value)}
            >
              <option value="">A - 01</option>

              <option value="A-01">
                A-01 - Golfina (Eclosion: 2026-01-10)
              </option>
            </select>
          </div>

          <div className="ex-field">
            <label>Fecha y Hora de Exhumación</label>

            <input
              className="ex-input"
              type="datetime-local"
            />
          </div>

          <div className="ex-group">
            <div className="ex-group-header">
              <Egg size={16} className="ex-orange" />

              <span className="ex-group-title">
                Huevos No Eclosionados
              </span>
            </div>

            <div className="ex-grid">
              <div className="ex-field">
                <label>Total sin Eclosionar</label>

                <input
                  className="ex-input"
                  placeholder="0"
                />
              </div>

              <div className="ex-field">
                <label>Cascaras Vacías</label>

                <input
                  className="ex-input"
                  placeholder="0"
                />

                <span className="ex-helper">
                  Eclosiones exitosas confirmadas
                </span>
              </div>
            </div>
          </div>

          <div className="ex-group">
            <div className="ex-group-header">
              <Skull size={16} className="ex-red" />

              <span className="ex-group-title">
                Embriones Muertos por Etapa de Desarrollo
              </span>
            </div>

            <div className="ex-stage-grid">
              <div className="ex-field ex-stage">
                <label>Huevos sin Embrión</label>

                <input
                  className="ex-input"
                  placeholder="0"
                />

                <span>0-25%</span>
              </div>

              <div className="ex-field ex-stage">
                <label>Embriones Muertos</label>

                <input
                  className="ex-input"
                  placeholder="0"
                />

                <span>25-50%</span>
              </div>

              <div className="ex-field ex-stage">
                <label>Huevos no Eclosionados</label>

                <input
                  className="ex-input"
                  placeholder="0"
                />

                <span>50-75%</span>
              </div>

              <div className="ex-field ex-stage">
                <label>Neonatos muertos en Nido</label>

                <input
                  className="ex-input"
                  placeholder="0"
                />

                <span>75-100%</span>
              </div>
            </div>
          </div>

          <div className="ex-group">
            <div className="ex-group-header">
              <Bug size={16} className="ex-orange" />

              <span className="ex-group-title">
                Evidencia de Depredación
              </span>

              <div className="ex-radio-row">
                <button
                  type="button"
                  className={`ex-check-button ${
                    depredacion === true ? "active" : ""
                  }`}
                  onClick={() => setDepredacion(true)}
                >
                  Sí
                </button>

                <button
                  type="button"
                  className={`ex-check-button ${
                    depredacion === false ? "active" : ""
                  }`}
                  onClick={() => {
                    setDepredacion(false);
                    setDepredador("");
                  }}
                >
                  No
                </button>
              </div>
            </div>

            <select
              className="ex-select ex-input-small"
              disabled={depredacion !== true}
              value={depredador}
              onChange={(e) =>
                setDepredador(e.target.value)
              }
            >
              <option value="">
                Tipo depredador
              </option>

              <option value="Hormigas">
                Hormigas
              </option>

              <option value="Cangrejos">
                Cangrejos
              </option>

              <option value="Perros">
                Perros
              </option>
            </select>
          </div>

          <div className="ex-group">
            <div className="ex-group-header">
              <Circle size={15} className="ex-orange" />

              <span className="ex-group-title">
                Cascarones Eclosionados
              </span>
            </div>

            <div className="ex-field">
              <label>Total de Eclosiones</label>

              <input
                className="ex-input ex-input-small"
                placeholder="0"
              />
            </div>
          </div>

          <div className="ex-field ex-full">
            <div className="ex-group-header">
              <FilePenLine
                size={16}
                className="ex-blue"
              />

              <span className="ex-group-title">
                Observaciones Adicionales
              </span>
            </div>

            <textarea
              className="ex-textarea"
              placeholder="Notas sobre condiciones del nido, posibles causas de mortalidad, recomendaciones, etc."
            />
          </div>
        </div>
      </div>

      <aside className="ex-side">
        <div className="ex-card ex-summary">
          <h3 className="ex-summary-title">
            Resumen de Exhumación
          </h3>

          {!hayResumen ? (
            <>
              <div className="ex-magnifier" />

              <p className="ex-summary-text">
                Selecciona un nido para ver el resumen
              </p>
            </>
          ) : (
            <div className="ex-summary-list">
              <div className="ex-summary-box white">
                <span>Huevos Iniciales</span>
                <strong>98</strong>
              </div>

              <div className="ex-summary-box green">
                <span>Liberados Vivos</span>
                <strong>82</strong>
              </div>

              <div className="ex-summary-box yellow">
                <span>Sin Eclosionar</span>
                <strong>16</strong>
              </div>

              <div className="ex-summary-box red">
                <span>Embriones Muertos</span>
                <strong>16</strong>
              </div>
            </div>
          )}
        </div>

        <button
          className="ex-button ex-button-primary"
          type="button"
        >
          <Save size={14} />
          Guardar Exhumación.
        </button>

        <button
          className="ex-button ex-button-secondary"
          type="button"
          onClick={limpiarFormulario}
        >
          <RotateCcw size={14} />
          Limpiar Formulario
        </button>
      </aside>
    </section>
  );
}

export default ExhumacionPage;