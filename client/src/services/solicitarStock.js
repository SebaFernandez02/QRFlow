import { enviarOrdenDeCompra } from "./enviarOrdenDeCompra";

const VITE_URL_BACKEND =
  import.meta.env.VITE_URL_BACKEND || "http://localhost:5050";

const URL_PROVEEDOR = `${VITE_URL_BACKEND}/proveedor`;
const URL_BASE = `${VITE_URL_BACKEND}/records`;

export default async function solicitarStock(id) {
  const producto = await obtenerProducto(id);

  if (!producto) {
    throw new Error("Producto no encontrado");
  }

  const response = await fetch(`${URL_PROVEEDOR}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productoId: id,
      oferta: producto.precioMax,
    }),
  });

  if (!response.ok) {
    throw new Error("Error al solicitar stock");
  }

  const data = await response.json();

  const precioProveedor = data.precio;
  precioProveedor < producto.precioMax
    ? enviarOrdenDeCompra(producto, precioProveedor)
    : console.log("El precio del proveedor es malo: " + precioProveedor);
}

// Obtener el producto por ID desde el servidor
async function obtenerProducto(id) {
  const response = await fetch(`${URL_BASE}/${id}`, {
    method: "GET",
  });

  if (response.ok) {
    const producto = await response.json();
    return producto;
  } else {
    console.error("Error al obtener el producto");
    return null;
  }
}
