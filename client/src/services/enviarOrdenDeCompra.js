const VITE_URL_BACKEND =
  import.meta.env.VITE_URL_BACKEND || "http://localhost:5050";

const URL_EMAIL = `${VITE_URL_BACKEND}/email`;

export async function enviarOrdenDeCompra(producto, precioProveedor) {
  const destinatario = producto.proveedor;
  const asunto = `Orden de compra - ${producto.nombre}`;
  const cantidadComprar =
    parseInt(producto.cantidad) + parseInt(producto.stockMin);
  const contenido = `Proveedor: ${destinatario}
  Producto: ${producto.nombre}
  Cantidad: ${cantidadComprar}
  Total: $ ${(cantidadComprar * precioProveedor).toLocaleString("es-ES")}
  Fecha: ${new Date().toLocaleDateString()}`;

  const response = await fetch(`${URL_EMAIL}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      to: destinatario,
      subject: asunto,
      text: contenido,
    }),
  });

  if (!response.ok) {
    throw new Error("Error al enviar orden de compra");
  }
}
