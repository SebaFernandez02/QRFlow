import React from "react";

export default function ItemScannerModal({
  isModalOpen,
  result,
  products,
  updateRecord,
  handleCloseModal,
}) {
  if (!isModalOpen) return null; // No renderizar nada si el modal no está abierto

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg">
        <h2 className="text-lg font-bold mb-4">Datos del Producto</h2>
        <p>{result}</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-green-500 text-white px-4 py-2 rounded mr-2"
            type="button"
            onClick={() => updateRecord(products._id, 1)}
          >
            Agregar
          </button>
          <button
            className="bg-red-500 text-white px-4 py-2 rounded mr-2"
            type="button"
            onClick={() => updateRecord(products._id, -1)}
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
      </div>
    </div>
  );
}
