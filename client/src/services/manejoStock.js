import solicitarStock from "./solicitarStock";

const VITE_URL_BACKEND =
  import.meta.env.VITE_URL_BACKEND || "http://localhost:5050";

const URL_BASE = `${VITE_URL_BACKEND}/records`;

export async function agregarStock(id, cantidadNueva) {
  const response = await fetch(`${URL_BASE}/add-stock/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cantidad: cantidadNueva }),
  });

  if (!response.ok) {
    throw new Error("Error al agregar stock");
  }

  return await response.json();
}

export async function quitarStock(id, cantidadNueva) {
  const response = await fetch(`${URL_BASE}/remove-stock/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ cantidad: cantidadNueva }),
  });

  if (!response.ok) {
    throw new Error("Error al quitar stock");
  }

  response.json().then(({ stock, puntoReorden }) => {
    stock <= puntoReorden ? solicitarStock(id) : console.log(false);
  });
}
