import React, { useState } from "react";

// Componente para los botones iniciales de agregar y eliminar
function BotonesPrincipales({ setAccion, handleCloseModal }) {
  return (
    <div className="flex justify-end mt-4">
      <button
        className="bg-green-500 text-white px-4 py-2 rounded mr-2"
        type="button"
        onClick={() => setAccion("agregar")}
      >
        Agregar
      </button>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded mr-2"
        type="button"
        onClick={() => setAccion("eliminar")}
      >
        Eliminar
      </button>
      <button
        className="bg-gray-500 text-white px-4 py-2 rounded"
        onClick={handleCloseModal}
      >
        Cerrar
      </button>
    </div>
  );
}

// Componente para ingresar la cantidad y confirmar la operación
function IngresoDeCantidades({
  accion,
  cantidad,
  setCantidad,
  handleConfirm,
  setAccion,
}) {
  return (
    <div className="mt-4">
      <p className="mb-2">
        {accion === "agregar"
          ? "Ingrese la cantidad a agregar:"
          : "Ingrese la cantidad a eliminar:"}
      </p>
      <input
        type="number"
        value={cantidad}
        onChange={(e) => setCantidad(Number(e.target.value))}
        className="border border-gray-300 rounded px-2 py-1 w-full mb-4"
        min="1"
      />
      <div className="flex justify-end">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
          type="button"
          onClick={handleConfirm}
        >
          Confirmar
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          type="button"
          onClick={() => {
            setAccion("");
            setCantidad(1);
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
}

export default function ItemScannerModal({
  isModalOpen,
  products,
  updateRecord,
  handleCloseModal,
}) {
  const [cantidad, setCantidad] = useState(1); // Almacena la cantidad
  const [accion, setAccion] = useState(""); // Almacena la acción seleccionada (agregar o eliminar)

  // Manejar el botón de confirmación
  const handleConfirm = () => {
    if (accion === "agregar") {
      updateRecord(products._id, cantidad); // Agregar la cantidad
    } else if (accion === "eliminar") {
      updateRecord(products._id, -cantidad); // Eliminar la cantidad
    }
    setCantidad(1);
    setAccion("");
    handleCloseModal(); // Cerrar el modal después de confirmar
  };

  if (!isModalOpen) return null; // No renderizar nada si el modal no está abierto

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Datos del Producto</h2>
        <p>
          <strong>Nombre</strong>: {products.nombre}
        </p>
        <p>
          <strong>Categoria</strong>: {products.categoria}
        </p>
        <p>
          <strong>Precio</strong>: {products.precio}
        </p>

        {/* Mostrar opciones iniciales o la sección de confirmación */}
        {!accion ? (
          <BotonesPrincipales
            setAccion={setAccion}
            handleCloseModal={handleCloseModal}
          />
        ) : (
          <IngresoDeCantidades
            accion={accion}
            cantidad={cantidad}
            setCantidad={setCantidad}
            handleConfirm={handleConfirm}
            setAccion={setAccion}
          />
        )}
      </div>
    </div>
  );
}
