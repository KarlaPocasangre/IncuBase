const nodemailer = require('nodemailer')

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
})

const enviarCorreo = async (destinatario, codigo, nombre) => {
  await transporter.sendMail({
    from: `"Incubase" <${process.env.EMAIL_USER}>`,
    to: destinatario,
    subject: 'Recuperación de contraseña - Incubase',
    html: `
      <div style="margin:0; padding:0; background-color:#f4f6f8; font-family:Arial, Helvetica, sans-serif;">
        <div style="max-width:600px; margin:40px auto; background-color:#ffffff; border-radius:12px; overflow:hidden; box-shadow:0 4px 12px rgba(0,0,0,0.08);">
          
          <div style="background-color:#0f172a; padding:24px; text-align:center;">
            <h1 style="margin:0; color:#ffffff; font-size:28px;">Incubase</h1>
            <p style="margin:8px 0 0; color:#cbd5e1; font-size:14px;">
              Recuperación de contraseña
            </p>
          </div>

          <div style="padding:32px 28px;">
            <p style="margin:0 0 16px; color:#1e293b; font-size:16px;">
              Hola ${nombre || 'usuario'},
            </p>

            <p style="margin:0 0 20px; color:#334155; font-size:15px; line-height:1.6;">
              Recibimos una solicitud para restablecer tu contraseña. 
              Usa el siguiente código de verificación para continuar con el proceso:
            </p>

            <div style="text-align:center; margin:28px 0;">
              <div style="display:inline-block; background-color:#e2e8f0; color:#0f172a; font-size:32px; font-weight:bold; letter-spacing:6px; padding:18px 28px; border-radius:10px;">
                ${codigo}
              </div>
            </div>

            <p style="margin:0 0 14px; color:#334155; font-size:15px; line-height:1.6;">
              Este código expirará en <strong>10 minutos</strong>.
            </p>

            <p style="margin:0 0 14px; color:#334155; font-size:15px; line-height:1.6;">
              Si no solicitaste este cambio, puedes ignorar este correo.
            </p>

            <hr style="border:none; border-top:1px solid #e2e8f0; margin:24px 0;">

            <p style="margin:0; color:#64748b; font-size:13px; line-height:1.5;">
              Este es un mensaje automático de Incubase. Por favor, no respondas a este correo.
            </p>
          </div>

          <div style="background-color:#f8fafc; padding:18px; text-align:center; color:#94a3b8; font-size:12px;">
            © 2026 Incubase.
          </div>
        </div>
      </div>
    `
  })
}

module.exports = enviarCorreo