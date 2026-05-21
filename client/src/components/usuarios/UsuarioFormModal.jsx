import { useEffect, useMemo, useState } from "react";
import { CheckCircle2, Eye, EyeOff, Info, XCircle } from "lucide-react";

import BaseModal from "../common/BaseModal";
import ModalActions from "../common/ModalActions";
import ModalButton from "../common/ModalButton";

const initialForm = {
  nombres: "",
  apellidos: "",
  email: "",
  telefono: "",
  password: "",
  confirmPassword: "",
  rol: "Tecnico",
  estado: "Activo",
  acceptedTerms: false,
};

const roleIdMap = {
  Administrador: 1,
  Tecnico: 2,
  Técnico: 2,
};

const estadoIdMap = {
  Activo: 1,
  Inactivo: 2,
};

const inputClass =
  "h-[43px] w-full rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 text-[13px] text-slate-600 outline-none shadow-sm transition placeholder:text-slate-400 focus:border-[#2F9A78] focus:ring-2 focus:ring-[#2F9A78]/20";

const passwordInputClass =
  "h-[43px] w-full rounded-lg border border-[#D7E4E1] bg-[#F8FCFA] px-4 pr-11 text-[13px] text-slate-600 outline-none shadow-sm transition placeholder:text-slate-400 focus:border-[#2F9A78] focus:ring-2 focus:ring-[#2F9A78]/20";

function splitName(nombreCompleto = "") {
  const parts = nombreCompleto.trim().split(" ");

  if (parts.length <= 1) {
    return {
      nombres: nombreCompleto,
      apellidos: "",
    };
  }

  return {
    nombres: parts.slice(0, 2).join(" "),
    apellidos: parts.slice(2).join(" "),
  };
}

function validatePassword(password) {
  return {
    minLength: password.length >= 8,
    uppercase: /[A-ZÁÉÍÓÚÑ]/.test(password),
    lowercase: /[a-záéíóúñ]/.test(password),
    number: /\d/.test(password),
    symbol: /[^A-Za-zÁÉÍÓÚáéíóúÑñ0-9]/.test(password),
  };
}

function isPasswordValid(rules) {
  return Object.values(rules).every(Boolean);
}

function UsuarioFormModal({
  open,
  mode = "add",
  usuario,
  item,
  loading = false,
  onClose,
  onSave,
}) {
  const currentUsuario = usuario || item;
  const isEdit = mode === "edit";

  const [form, setForm] = useState(initialForm);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formError, setFormError] = useState("");

  const passwordRules = useMemo(
    () => validatePassword(form.password),
    [form.password],
  );

  useEffect(() => {
    if (open && currentUsuario && isEdit) {
      const nombresSeparados = splitName(currentUsuario.nombreCompleto);

      setForm({
        nombres: currentUsuario.nombres || nombresSeparados.nombres || "",
        apellidos: currentUsuario.apellidos || nombresSeparados.apellidos || "",
        email: currentUsuario.email || "",
        telefono:
          currentUsuario.telefono === "Sin teléfono"
            ? ""
            : currentUsuario.telefono || "",
        password: "",
        confirmPassword: "",
        rol: currentUsuario.rol || "Tecnico",
        estado: currentUsuario.estado || "Activo",
        acceptedTerms: true,
      });
    }

    if (open && !isEdit) {
      setForm(initialForm);
    }

    if (open) {
      setFormError("");
      setShowPassword(false);
      setShowConfirmPassword(false);
    }
  }, [open, currentUsuario, isEdit]);

  const handleChange = (event) => {
    const { name, value, checked, type } = event.target;

    setFormError("");

    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!form.nombres.trim()) {
      setFormError("Debes ingresar los nombres del usuario.");
      return;
    }

    if (!form.apellidos.trim()) {
      setFormError("Debes ingresar los apellidos del usuario.");
      return;
    }

    if (!form.email.trim()) {
      setFormError("Debes ingresar el correo del usuario.");
      return;
    }

    if (!isEdit && !isPasswordValid(passwordRules)) {
      setFormError("La contraseña aún no cumple con todos los requisitos.");
      return;
    }

    if (!isEdit && form.password !== form.confirmPassword) {
      setFormError("Las contraseñas no coinciden.");
      return;
    }

    if (!isEdit && !form.acceptedTerms) {
      setFormError(
        "Debes aceptar los términos, condiciones y la política de privacidad.",
      );
      return;
    }

    const nombreCompleto = `${form.nombres} ${form.apellidos}`.trim();

    const payload = {
      ...currentUsuario,
      id: currentUsuario?.id || Date.now(),
      nombres: form.nombres.trim(),
      apellidos: form.apellidos.trim(),
      nombreCompleto,
      email: form.email.trim(),
      telefono: form.telefono.trim(),
      rol: form.rol,
      estado: form.estado,
      id_rol: roleIdMap[form.rol],
      id_estado_usuario: estadoIdMap[form.estado],
      fechaCreacion:
        currentUsuario?.fechaCreacion ||
        new Date().toISOString().slice(0, 16).replace("T", " "),
    };

    if (!isEdit) {
      payload.password = form.password;
      payload.estado = "Activo";
      payload.id_estado_usuario = 1;
    }

    await onSave(payload);
  };

  return (
    <BaseModal
      open={open}
      onClose={onClose}
      title={isEdit ? "Editar información de usuario" : "Agregar Nuevo Usuario"}
      subtitle={
        isEdit
          ? "Modifica los datos del usuario seleccionado"
          : "Ingresa los datos del nuevo usuario del sistema"
      }
      maxWidth={isEdit ? "max-w-[520px]" : "max-w-[560px]"}
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <Field label="Nombres">
          <input
            name="nombres"
            value={form.nombres}
            onChange={handleChange}
            placeholder="Nombres del usuario"
            className={inputClass}
            required
          />
        </Field>

        <Field label="Apellidos">
          <input
            name="apellidos"
            value={form.apellidos}
            onChange={handleChange}
            placeholder="Apellidos del usuario"
            className={inputClass}
            required
          />
        </Field>

        <Field label="Correo">
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            placeholder="correo@ejemplo.com"
            className={inputClass}
            required
          />

          {!isEdit && (
            <div className="mt-2 flex items-start gap-2 rounded-xl border border-[#DDEBE7] bg-[#F8FCFA] px-3 py-2 text-[12px] leading-relaxed text-slate-500">
              <Info className="mt-[1px] h-4 w-4 shrink-0 text-[#79B49E]" />
              <p>
                Ingresa un correo real y activo, ya que ahí se enviarán códigos
                de recuperación de contraseña.
              </p>
            </div>
          )}
        </Field>

        <Field label="Teléfono">
          <input
            type="tel"
            name="telefono"
            value={form.telefono}
            onChange={handleChange}
            placeholder="Teléfono del usuario"
            className={inputClass}
          />
        </Field>

        {!isEdit && (
          <>
            <Field label="Contraseña">
              <PasswordInput
                name="password"
                value={form.password}
                placeholder="Ingresa una contraseña"
                show={showPassword}
                onToggle={() => setShowPassword((prev) => !prev)}
                onChange={handleChange}
              />

              <PasswordRules rules={passwordRules} />
            </Field>

            <Field label="Confirmar Contraseña">
              <PasswordInput
                name="confirmPassword"
                value={form.confirmPassword}
                placeholder="Confirma la contraseña"
                show={showConfirmPassword}
                onToggle={() => setShowConfirmPassword((prev) => !prev)}
                onChange={handleChange}
              />

              {form.confirmPassword && (
                <div className="mt-2">
                  <RuleItem
                    valid={form.password === form.confirmPassword}
                    text={
                      form.password === form.confirmPassword
                        ? "Las contraseñas coinciden"
                        : "Las contraseñas deben coincidir"
                    }
                  />
                </div>
              )}
            </Field>
          </>
        )}

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Rol">
            <select
              name="rol"
              value={form.rol}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="Tecnico">Tecnico</option>
              <option value="Administrador">Administrador</option>
            </select>
          </Field>

          {isEdit && (
            <Field label="Estado">
              <select
                name="estado"
                value={form.estado}
                onChange={handleChange}
                className={inputClass}
                required
              >
                <option value="Activo">Activo</option>
                <option value="Inactivo">Inactivo</option>
              </select>
            </Field>
          )}
        </div>

        {!isEdit && (
          <label className="flex items-start gap-3 rounded-xl border border-[#DDEBE7] bg-[#F8FCFA] px-4 py-3">
            <input
              type="checkbox"
              name="acceptedTerms"
              checked={form.acceptedTerms}
              onChange={handleChange}
              className="mt-[3px] h-4 w-4 shrink-0 accent-[#0F6B3D]"
              required
            />

            <span className="text-[12px] leading-relaxed text-slate-500">
              Acepto los{" "}
              <span className="font-semibold text-[#0F6B3D]">
                Términos y Condiciones
              </span>{" "}
              y la{" "}
              <span className="font-semibold text-[#0F6B3D]">
                Política de Privacidad
              </span>{" "}
              del sistema IncuBase.
            </span>
          </label>
        )}

        {formError && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-2 text-[12px] font-semibold text-red-500">
            {formError}
          </div>
        )}

        <ModalActions className="pt-3">
          <ModalButton
            variant="cancel"
            size="sm"
            type="button"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </ModalButton>

          <ModalButton
            variant={isEdit ? "update" : "add"}
            size="sm"
            type="submit"
            disabled={loading}
          >
            {loading
              ? "Guardando..."
              : isEdit
                ? "Modificar Usuario"
                : "Agregar Usuario"}
          </ModalButton>
        </ModalActions>
      </form>
    </BaseModal>
  );
}

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-[13px] font-semibold text-[#10231F]">
        {label}
      </span>

      {children}
    </label>
  );
}

function PasswordInput({ name, value, placeholder, show, onToggle, onChange }) {
  const Icon = show ? EyeOff : Eye;

  return (
    <div className="relative">
      <input
        type={show ? "text" : "password"}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={passwordInputClass}
        required
      />

      <button
        type="button"
        onClick={onToggle}
        className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md p-1 text-slate-500 transition hover:bg-slate-100 hover:text-[#0F6B3D]"
      >
        <Icon className="h-4 w-4" />
      </button>
    </div>
  );
}

function PasswordRules({ rules }) {
  return (
    <div className="mt-3 rounded-xl border border-[#DDEBE7] bg-[#F8FCFA] px-4 py-3">
      <p className="mb-2 text-[12px] font-bold text-[#10231F]">
        La contraseña debe contener:
      </p>

      <div className="space-y-1.5">
        <RuleItem valid={rules.minLength} text="Al menos 8 caracteres" />
        <RuleItem valid={rules.uppercase} text="Al menos una letra mayúscula" />
        <RuleItem valid={rules.lowercase} text="Al menos una letra minúscula" />
        <RuleItem valid={rules.number} text="Al menos un número" />
        <RuleItem valid={rules.symbol} text="Al menos un signo o símbolo" />
      </div>
    </div>
  );
}

function RuleItem({ valid, text }) {
  const Icon = valid ? CheckCircle2 : XCircle;

  return (
    <div
      className={`flex items-center gap-2 text-[12px] font-medium transition ${
        valid ? "text-emerald-600" : "text-slate-400"
      }`}
    >
      <Icon
        className={`h-4 w-4 shrink-0 ${
          valid ? "text-emerald-500" : "text-slate-300"
        }`}
      />
      <span>{text}</span>
    </div>
  );
}

export default UsuarioFormModal;
