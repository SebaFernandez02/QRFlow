import { Outlet } from "react-router-dom";
import Navbar from "./components/Navbar";
import QrScaner from "./components/QrScaner";

const App = () => {
  return (
    <div className="w-full p-6">
      <Navbar />
      <div className="w-full p-50">
        <QrScaner />
      </div>
      <Outlet />
    </div>
  );
};

export default App;
