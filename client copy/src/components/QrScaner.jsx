import React, { useEffect, useState } from "react";
import { Html5QrcodeScanner } from "html5-qrcode";

export default function Scanner() {
  const [result, setResult] = useState("");

  useEffect(() => {
    const onScanSuccess = (decodedText, decodedResult) => {
      // Manejo del resultado exitoso del escaneo
      setResult(decodedText);
      console.log(`Code matched = ${decodedText}`, decodedResult);
      scanner.clear(); // Limpiar el escáner después de obtener un resultado
    };

    const onScanFailure = (error) => {
      // Manejo de errores de escaneo
      console.warn(`Code scan error = ${error}`);
    };

    const scanner = new Html5QrcodeScanner(
      "scanner", 
      { fps: 10, qrbox: { width: 250, height: 250 } }, 
      false
    );

    scanner.render(onScanSuccess, onScanFailure);

    // Limpiar el escáner cuando el componente se desmonte
    return () => {
      scanner.clear().catch((error) => {
        console.error("Error clearing scanner: ", error);
      });
    };
  }, []);

  return (
    <div>
      <div id="scanner" />
      <div className="result">
        <h1>Result: {result}</h1>
      </div>
    </div>
  );
}
