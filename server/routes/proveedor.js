import express from "express";

const router = express.Router();
// Simular respuesta de API de proveedor con costos aleatorios
router.post("/", (req, res) => {
  const { productoId, oferta } = req.body;

  if (!productoId || !oferta) {
    return res
      .status(400)
      .json({ error: "Producto ID y oferta son requeridos" });
  }

  // Generar un costo aleatorio que puede ser +1 o -1 respecto a la oferta
  const precioNuevo =
    Math.random() < 0.5 ? parseFloat(oferta) - 1 : parseFloat(oferta) + 1;

  // Simular una respuesta JSON
  res.json({
    precio: precioNuevo,
  });
});

export default router;
