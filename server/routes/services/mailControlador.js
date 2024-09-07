import nodemailer from "nodemailer";

export default async function mailControlador(to, subject, text) {
  //Para configurar el mail y contraseña del remitente, crear cuenta en: https://ethereal.email/
  const EMAIL_USER = "odie.erdman@ethereal.email";
  const EMAIL_PASS = "fegDSA24qhpR3BCqwd";

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
