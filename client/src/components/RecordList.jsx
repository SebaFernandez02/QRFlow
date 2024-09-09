import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QRCodeModal from "./QRCodeModal";
import { Pencil, QrCode, Trash2 } from "lucide-react";

const VITE_URL_BACKEND =
  import.meta.env.VITE_URL_BACKEND || "http://localhost:5050";

const Record = (props) => {
  let esPar = props.index % 2 === 0;
  return (
    <>
      <tr
        className={
          esPar
            ? "bg-white border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
            : "bg-[#02061705] border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
        }
      >
        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
          {props.record.nombre}
        </td>
        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
          {props.record.categoria}
        </td>
        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
          {props.record.precio}
        </td>
        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
          {props.record.cantidad}
        </td>
        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
          {props.record.stockMin}
        </td>
        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
          {props.record.precioMax}
        </td>
        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
          {props.record.proveedor}
        </td>
        <td className="p-4 align-middle [&:has([role=checkbox])]:pr-0">
          <div className="flex gap-2">
            <Link
              className="text-indigo-600 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 h-9 rounded-md px-3"
              to={`/edit/${props.record._id}`}
            >
              <Pencil size={20} />
            </Link>
            <button
              className="text-red-600 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
              color="red"
              type="button"
              onClick={() => {
                props.deleteRecord(props.record._id);
              }}
            >
              <Trash2 size={20} />
            </button>
            <button
              className="text-green-600 inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-slate-100 hover:text-accent-foreground h-9 rounded-md px-3"
              type="button"
              onClick={() => {
                props.onShowQRModal(props.record._id);
              }}
            >
              <QrCode size={20} />
            </button>
          </div>
        </td>
      </tr>
    </>
  );
};

export default function RecordList() {
  const [records, setRecords] = useState([]);
  const [showQRModal, setShowQRModal] = useState(false); //estado para mostrar o cerrar el modal
  const [qrValue, setQRValue] = useState(""); //estado para el valor del codigo QR

  // This method fetches the records from the database.
  useEffect(() => {
    async function getRecords() {
      const response = await fetch(`${VITE_URL_BACKEND}/records/`);
      if (!response.ok) {
        const message = `An error occurred: ${response.statusText}`;
        console.error(message);
        return;
      }
      const records = await response.json();
      setRecords(records);
    }
    getRecords();
    return;
  }, [records.length]);

  // This method will delete a record
  async function deleteRecord(id) {
    await fetch(`${VITE_URL_BACKEND}/records/${id}`, {
      method: "DELETE",
    });
    const newRecords = records.filter((el) => el._id !== id);
    setRecords(newRecords);
  }

  //funcion para mostrar el modal de QR
  function handleShowQRModal(id) {
    setQRValue(id);
    setShowQRModal(true);
  }

  //funcion para cerrar el modal de QR
  function handleCloseQRModal() {
    setShowQRModal(false);
    setQRValue("");
  }

  // This method will map out the records on the table
  function recordList() {
    return records.map((record, index) => {
      return (
        <Record
          record={record}
          index={index}
          deleteRecord={() => deleteRecord(record._id)}
          onShowQRModal={handleShowQRModal}
          key={record._id}
        />
      );
    });
  }

  // This following section will display the table with the records of individuals.
  return (
    <>
      <h3 className="text-lg font-semibold p-4">Inventario</h3>
      <div className="border rounded-lg overflow-hidden">
        <div className="relative w-full overflow-auto">
          <table className="w-full caption-bottom text-sm">
            <thead className="[&_tr]:border-b">
              <tr className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted">
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Nombre
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Categoria
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Precio
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Cantidad
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Stock Minimo
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Precio Maximo
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Proveedor
                </th>
                <th className="h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="[&_tr:last-child]:border-0">{recordList()}</tbody>
          </table>
        </div>
      </div>
      <QRCodeModal value={qrValue} onClose={handleCloseQRModal} />
    </>
  );
}
