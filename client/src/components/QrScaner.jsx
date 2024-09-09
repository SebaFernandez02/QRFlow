import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";
import ItemScannerModal from "./ItemScannerModal";

const VITE_URL_BACKEND =
  import.meta.env.VITE_URL_BACKEND || "http://localhost:5050";

export default function Scanner({ setEsVisibleLista }) {
  const [result, setResult] = useState("");
  const [scanner, setScanner] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [products, setProductos] = useState({});

  useEffect(() => {
    // Al desmontar el componente, limpiar el escáner si existe
    return () => {
      if (scanner) {
        scanner.clear().catch((error) => {
          console.error("Error clearing scanner: ", error);
        });
      }
    };
  }, [scanner]);

  const onScanSuccess = async (decodedText) => {
    console.log(`Code matched = ${decodedText}`);
    setResult(decodedText);

    // Realiza la solicitud a la API para obtener el registro correspondiente
    try {
      const response = await fetch(
        `${VITE_URL_BACKEND}/records/${decodedText}`,
        {
          method: "GET",
        }
      );

      if (response.ok) {
        const record = await response.json(); // Suponiendo que la respuesta es un objeto JSON

        // Aquí se actualiza el estado con el nombre obtenido
        if (record && record.nombre) {
          console.log(`Nombre encontrado: ${record.nombre}`);
          setResult(record.nombre); // Actualiza el estado con el nombre
          setProductos(record);
        } else {
          console.log("Registro no encontrado o sin nombre");
        }
      } else {
        console.error("Error al obtener el registro:", response.statusText);
      }
    } catch (error) {
      console.error("Error en la solicitud a la API:", error);
    }
    // Detener el escáner después de un escaneo exitoso
    if (scanner) {
      await scanner.clear(); // Esperar a que se limpie el escáner
      setIsScanning(false);
      setScanner(null); // Limpiar la referencia al escáner
    }

    setIsModalOpen(true);
    setEsVisibleLista(false);
  };

  const onScanFailure = (error) => {
    console.warn(`Code scan error = ${error}`);
  };

  const handleStartScanner = () => {
    if (!scanner) {
      // Inicialización del escáner
      const newScanner = new Html5QrcodeScanner(
        "scanner",
        { fps: 10, qrbox: { width: 250, height: 250 } },
        false
      );
      setScanner(newScanner);
      newScanner.render(onScanSuccess, onScanFailure);
    } else {
      // Si ya existe un escáner, volver a renderizarlo
      scanner.render(onScanSuccess, onScanFailure);
    }
    setIsScanning(true); // Marcar que el escáner está activo
  };

  const handleStopScanner = () => {
    if (scanner) {
      scanner
        .clear()
        .then(() => {
          setIsScanning(false); // Marcar que el escáner está detenido
        })
        .catch((error) => {
          console.error("Error stopping scanner: ", error);
        });
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false); // Cerrar el modal
    setResult(""); // Limpiar el resultado
    setEsVisibleLista(true);
  };

  return (
    <div>
      <div id="scanner" style={{ display: isScanning ? "block" : "none" }} />
      {!isScanning ? (
        <button
          className="w-full text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={handleStartScanner}
        >
          Iniciar escáner
        </button>
      ) : (
        <button
          className="w-full mt-4 text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
          onClick={handleStopScanner}
        >
          Detener escáner
        </button>
      )}
      <ItemScannerModal
        isModalOpen={isModalOpen}
        products={products}
        handleCloseModal={handleCloseModal}
      />
    </div>
  );
}
