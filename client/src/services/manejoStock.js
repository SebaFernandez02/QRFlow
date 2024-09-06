const URL_BASE = "http://localhost:5050/records";

export async function agregarStock(id, cantidadNueva) {
  const response = await fetch(`${URL_BASE}/add-stock/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ precio: cantidadNueva }),
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
    body: JSON.stringify({ precio: cantidadNueva }),
  });

  if (!response.ok) {
    throw new Error("Error al quitar stock");
  }

  return await response.json();
}
