import React, { useRef } from "react";
import QRCode from "react-qr-code";
import { toPng } from "html-to-image";

//Componente que muestra el modal con un codigo QR y un boton para cerrarlo
const QRCodeModal = ({ value, onClose }) => {
  const qrReferencia = useRef(); //referencia al QR

  // Función para manejar la descarga de la imagen
  function handleDownload() {
    toPng(qrReferencia.current) // Convierte el elemento a una imagen PNG
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = "qr-code.png";
        link.click();
      })
      .catch((err) => {
        console.error("Error al generar la imagen:", err);
      });
  }

  //Si no hay un valor de QR, no se muestra el modal/ventanita
  if (!value) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-md shadow-lg">
        <div ref={qrReferencia}>
          <QRCode value={value} />
        </div>
        <button
          className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          onClick={handleDownload}
        >
          Descargar
        </button>
        <button
          className="mt-4 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
          onClick={onClose}
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default QRCodeModal;
