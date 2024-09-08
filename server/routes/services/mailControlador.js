import nodemailer from "nodemailer";

export default async function mailControlador(to, subject, text) {
  //Para configurar el mail y contraseña del remitente, crear cuenta en: https://ethereal.email/
  const EMAIL_USER = "camren.okon43@ethereal.email";
  const EMAIL_PASS = "tMq3qSs3QbJWAWrzSy";

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: EMAIL_USER,
    to: to,
    subject: subject,
    text: text,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    return info;
  } catch (error) {
    console.error("Error enviando el email:", error);
  }
}
