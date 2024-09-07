const URL_EMAIL = "http://localhost:5050/email";

export async function enviarOrdenDeCompra(producto, precioProveedor) {
  const destinatario = producto.proveedor;
  const asunto = `Orden de compra - ${producto.nombre}`;
  const cantidadComprar =
    parseInt(producto.cantidad) + parseInt(producto.stockMin);
  const contenido = `Proveedor: ${destinatario}
  Producto: ${producto.nombre}
  Cantidad: ${cantidadComprar}
  Total: $${(cantidadComprar * precioProveedor).toLocaleString("es-ES", {
    style: "currency",
    currency: "EUR",
  })}
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
