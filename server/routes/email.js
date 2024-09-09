import express from "express";
import mailControlador from "./services/mailControlador.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { to, subject, text } = req.body;

  try {
    await mailControlador(to, subject, text);
    res.send("Email enviado").status(200);
  } catch (err) {
    res.send("Error mandando el email").status(500);
  }
});

export default router;
