import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import QrScaner from "./components/QrScaner";
import { useState } from "react";

const App = () => {
  const [esVisibleLista, setEsVisibleLista] = useState(true);

  return (
    <div className="w-full p-6">
      <Navbar />
      <div className="w-full p-50">
        <QrScaner setEsVisibleLista={setEsVisibleLista} />
      </div>
      {esVisibleLista && <Outlet />}
    </div>
  );
};

export default App;
