import Swal from "sweetalert2";
import { ACTIONS } from "../constants/actions";

/* =========================================================
   ESTILOS GENERALES DE SWEETALERT2
========================================================= */

const customClass = {
  popup: "rounded-[18px] shadow-[0_20px_60px_rgba(0,0,0,0.25)]",
  title: "text-[#163832] text-[20px] font-bold",
  htmlContainer: "text-[#4B5563] text-[14px]",
  actions: "gap-4",
  confirmButton:
    "bg-[#163832] text-white px-5 py-2 rounded-[10px] font-semibold hover:bg-[#0f2925] transition",
  cancelButton:
    "bg-gray-200 text-gray-700 px-5 py-2 rounded-[10px] font-semibold hover:bg-gray-300 transition",
};

/* =========================================================
   ALERTAS BASE
========================================================= */

export const showToast = ({
  icon = "success",
  title = "Acción realizada correctamente",
  timer = 2500,
} = {}) => {
  return Swal.fire({
    toast: true,
    position: "top-end",
    icon,
    title,
    showConfirmButton: false,
    timer,
    timerProgressBar: true,
  });
};

export const showSuccessAlert = ({
  title = "Operación exitosa",
  text = "La acción se realizó correctamente.",
  confirmButtonText = "Aceptar",
} = {}) => {
  return Swal.fire({
    icon: "success",
    title,
    text,
    confirmButtonText,
    buttonsStyling: false,
    customClass,
  });
};

export const showErrorAlert = ({
  title = "Ocurrió un error",
  text = "No se pudo completar la acción.",
  confirmButtonText = "Aceptar",
} = {}) => {
  return Swal.fire({
    icon: "error",
    title,
    text,
    confirmButtonText,
    buttonsStyling: false,
    customClass,
  });
};

export const showWarningAlert = ({
  title = "Advertencia",
  text = "Revisa la información antes de continuar.",
  confirmButtonText = "Aceptar",
} = {}) => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    confirmButtonText,
    buttonsStyling: false,
    customClass,
  });
};

export const showInfoAlert = ({
  title = "Información",
  text = "Aquí tienes más detalles.",
  confirmButtonText = "Aceptar",
} = {}) => {
  return Swal.fire({
    icon: "info",
    title,
    text,
    confirmButtonText,
    buttonsStyling: false,
    customClass,
  });
};

export const showConfirmAction = ({
  title = "¿Estás seguro?",
  text = "Esta acción requiere confirmación.",
  confirmButtonText = "Sí, continuar",
  cancelButtonText = "Cancelar",
  icon = "warning",
} = {}) => {
  return Swal.fire({
    icon,
    title,
    text,
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    buttonsStyling: false,
    customClass,
  });
};

/* =========================================================
   LOADING
========================================================= */

export const showLoadingAlert = ({
  title = "Procesando...",
  text = "Espera un momento.",
} = {}) => {
  return Swal.fire({
    title,
    text,
    allowOutsideClick: false,
    allowEscapeKey: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });
};

export const closeAlert = () => {
  Swal.close();
};

/* =========================================================
   ALERTAS DE SESIÓN
========================================================= */

export const showWelcomeAlert = ({ name = "" } = {}) => {
  return showToast({
    icon: "success",
    title: name ? `Bienvenido, ${name}` : "Bienvenido al sistema IncuBase",
  });
};

export const showLoginSuccess = () => {
  return showToast({
    icon: "success",
    title: "Inicio de sesión exitoso",
  });
};

export const showInvalidCredentials = () => {
  return showErrorAlert({
    title: "Credenciales incorrectas",
    text: "Verifica tu usuario y contraseña e inténtalo nuevamente.",
  });
};

export const showLogoutConfirm = () => {
  return showConfirmAction({
    title: "¿Cerrar sesión?",
    text: "Tu sesión actual finalizará.",
    confirmButtonText: "Sí, cerrar sesión",
    cancelButtonText: "Cancelar",
    icon: "question",
  });
};

export const showSessionExpired = () => {
  return showErrorAlert({
    title: "Sesión expirada",
    text: "Vuelve a iniciar sesión para continuar.",
  });
};

export const showUnauthorized = () => {
  return showErrorAlert({
    title: "Acceso no autorizado",
    text: "No tienes permisos para realizar esta acción.",
  });
};

/* =========================================================
   ALERTAS DE SERVIDOR / CONEXIÓN
========================================================= */

export const showServerConnectionError = () => {
  return showErrorAlert({
    title: "Error de conexión",
    text: "No se pudo conectar con el servidor. Verifica tu conexión e inténtalo nuevamente.",
  });
};

export const showServerUnavailable = () => {
  return showErrorAlert({
    title: "Servidor no disponible",
    text: "El sistema no pudo obtener respuesta del servidor.",
  });
};

export const showLoadDataError = ({ moduleName = "los datos" } = {}) => {
  return showErrorAlert({
    title: "Error al cargar datos",
    text: `No se pudieron cargar ${moduleName}. Intenta actualizar la página o vuelve a intentarlo más tarde.`,
  });
};

/* =========================================================
   ALERTAS CRUD / ACCIONES GENERALES
========================================================= */

const successMessages = {
  [ACTIONS.CREATE]: "se creó correctamente",
  [ACTIONS.UPDATE]: "se actualizó correctamente",
  [ACTIONS.REGISTER]: "se registró correctamente",
  [ACTIONS.SAVE]: "se guardó correctamente",
  [ACTIONS.RESOLVE]: "se resolvió correctamente",
  [ACTIONS.CANCEL]: "se canceló correctamente",
};

const errorMessages = {
  [ACTIONS.CREATE]: "crear",
  [ACTIONS.UPDATE]: "actualizar",
  [ACTIONS.REGISTER]: "registrar",
  [ACTIONS.SAVE]: "guardar",
  [ACTIONS.RESOLVE]: "resolver",
  [ACTIONS.CANCEL]: "cancelar",
};

export const showCrudSuccess = ({ module, action = ACTIONS.SAVE } = {}) => {
  const message = successMessages[action] || "se procesó correctamente";

  return showToast({
    icon: "success",
    title: `${module.article} ${module.label} ${message}.`,
  });
};

export const showCrudError = ({ module, action = ACTIONS.SAVE } = {}) => {
  const actionText = errorMessages[action] || "procesar";

  return showErrorAlert({
    title: `Error al ${actionText}`,
    text: `No se pudo ${actionText} ${module.article.toLowerCase()} ${module.label}.`,
  });
};

export const showRegisterSuccess = ({ module } = {}) => {
  return showCrudSuccess({
    module,
    action: ACTIONS.REGISTER,
  });
};

export const showUpdateSuccess = ({ module } = {}) => {
  return showCrudSuccess({
    module,
    action: ACTIONS.UPDATE,
  });
};

export const showStatusChangeSuccess = ({ module } = {}) => {
  return showToast({
    icon: "success",
    title: `Estado de ${module.article.toLowerCase()} ${module.label} actualizado correctamente.`,
  });
};

export const showCancelSuccess = ({ module } = {}) => {
  return showToast({
    icon: "success",
    title: `${module.article} ${module.label} se anuló correctamente.`,
  });
};

export const showRegisterError = ({ module } = {}) => {
  return showCrudError({
    module,
    action: ACTIONS.REGISTER,
  });
};

export const showUpdateError = ({ module } = {}) => {
  return showCrudError({
    module,
    action: ACTIONS.UPDATE,
  });
};

export const showStatusChangeError = ({ module } = {}) => {
  return showErrorAlert({
    title: "Error al cambiar estado",
    text: `No se pudo cambiar el estado de ${module.article.toLowerCase()} ${module.label}.`,
  });
};

export const showCancelError = ({ module } = {}) => {
  return showErrorAlert({
    title: "Error al anular",
    text: `No se pudo anular ${module.article.toLowerCase()} ${module.label}.`,
  });
};

/* =========================================================
   ALERTAS DE FORMULARIOS
========================================================= */

export const showRequiredFieldsAlert = () => {
  return showWarningAlert({
    title: "Campos obligatorios incompletos",
    text: "Completa todos los campos obligatorios antes de continuar.",
  });
};

export const showInvalidDataAlert = ({
  text = "Verifica la información ingresada.",
} = {}) => {
  return showWarningAlert({
    title: "Datos inválidos",
    text,
  });
};

export const showUnsavedChangesConfirm = () => {
  return showConfirmAction({
    title: "¿Descartar cambios?",
    text: "Tienes cambios sin guardar. Si continúas, se perderán.",
    confirmButtonText: "Descartar cambios",
    cancelButtonText: "Seguir editando",
    icon: "warning",
  });
};

/* =========================================================
   CONFIRMACIONES IMPORTANTES
========================================================= */

export const showStatusChangeConfirm = ({ module, newStatus = "" } = {}) => {
  return showConfirmAction({
    title: "¿Cambiar estado?",
    text: newStatus
      ? `${module.article} ${module.label} pasará al estado "${newStatus}".`
      : `Esta acción actualizará el estado de ${module.article.toLowerCase()} ${module.label}.`,
    confirmButtonText: "Sí, cambiar estado",
    cancelButtonText: "Cancelar",
    icon: "question",
  });
};

export const showCloseCorralConfirm = () => {
  return showConfirmAction({
    title: "¿Cerrar corral?",
    text: "El corral ya no estará disponible para nuevos nidos, pero su historial se conservará.",
    confirmButtonText: "Sí, cerrar corral",
    cancelButtonText: "Cancelar",
    icon: "warning",
  });
};

export const showDisableUserConfirm = () => {
  return showConfirmAction({
    title: "¿Desactivar usuario?",
    text: "El usuario no podrá iniciar sesión, pero sus registros se conservarán en el historial.",
    confirmButtonText: "Sí, desactivar",
    cancelButtonText: "Cancelar",
    icon: "warning",
  });
};

export const showCancelRecordConfirm = ({ module } = {}) => {
  return showConfirmAction({
    title: "¿Anular registro?",
    text: `El registro no será eliminado, pero ${module.article.toLowerCase()} ${module.label} quedará marcado en el historial.`,
    confirmButtonText: "Sí, anular",
    cancelButtonText: "Cancelar",
    icon: "warning",
  });
};

export const showResolveAlertConfirm = () => {
  return showConfirmAction({
    title: "¿Resolver alerta?",
    text: "La alerta será marcada como resuelta.",
    confirmButtonText: "Sí, resolver",
    cancelButtonText: "Cancelar",
    icon: "question",
  });
};

export const showAdminPasswordConfirm = ({
  title = "Confirmar permisos de administrador",
  text = "Ingresa tu contraseña para autorizar este cambio de rol.",
  confirmButtonText = "Confirmar cambio",
  cancelButtonText = "Cancelar",
} = {}) => {
  return Swal.fire({
    icon: "warning",
    title,
    text,
    input: "password",
    inputPlaceholder: "Contraseña del administrador",
    inputAttributes: {
      autocapitalize: "off",
      autocomplete: "current-password",
    },
    showCancelButton: true,
    confirmButtonText,
    cancelButtonText,
    reverseButtons: true,
    buttonsStyling: false,
    customClass,
    preConfirm: (password) => {
      if (!password) {
        Swal.showValidationMessage("Debes ingresar tu contraseña.");
        return false;
      }

      return password;
    },
  });
};

export const showRoleChangeConfirm = ({ newRole = "Administrador" } = {}) => {
  return showConfirmAction({
    title: "¿Cambiar rol de usuario?",
    text: `Este usuario pasará a tener el rol "${newRole}". Revisa bien antes de continuar.`,
    confirmButtonText: "Sí, cambiar rol",
    cancelButtonText: "Cancelar",
    icon: "warning",
  });
};

/* =========================================================
   ALERTAS DEL SISTEMA INCUBASE
========================================================= */

export const showTemperatureOutOfRangeAlert = ({
  sector = "",
  temperature = "",
} = {}) => {
  return showWarningAlert({
    title: "Temperatura fuera de rango",
    text:
      sector && temperature
        ? `Se registró una temperatura de ${temperature}°C en el sector ${sector}.`
        : "Se detectó una temperatura fuera del rango permitido.",
  });
};

export const showNestNearHatchingAlert = ({ nestCode = "" } = {}) => {
  return showInfoAlert({
    title: "Nido próximo a eclosión",
    text: nestCode
      ? `El nido ${nestCode} está próximo a eclosionar.`
      : "Hay un nido próximo a eclosionar.",
  });
};

export const showPredationEvidenceAlert = ({ nestCode = "" } = {}) => {
  return showWarningAlert({
    title: "Evidencia de depredación",
    text: nestCode
      ? `Se registró evidencia de depredación en el nido ${nestCode}.`
      : "Se registró evidencia de depredación.",
  });
};

export const showCorralFullAlert = ({ corralCode = "" } = {}) => {
  return showWarningAlert({
    title: "Corral con capacidad máxima",
    text: corralCode
      ? `El corral ${corralCode} alcanzó su capacidad máxima.`
      : "Un corral alcanzó su capacidad máxima.",
  });
};
