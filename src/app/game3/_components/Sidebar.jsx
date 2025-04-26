import {
  Mail,
  CreditCard,
  Search,
  Shield,
  FileText,
  Pause,
  Clock,
} from "lucide-react";

const Sidebar = ({
  currentApp,
  handleOpenApp,
  handleCalm,
  currentTime,
  handleFinish,
}) => {
  return (
    <div className="w-48 bg-gray-200 p-4 flex flex-col items-center">
      <p className="font-bold mb-4">Acciones</p>
      <button
        onClick={() => handleOpenApp("mail")}
        className={`p-2 rounded-md hover:bg-gray-300 w-full flex items-center justify-center ${
          currentApp === "mail" ? "bg-blue-300" : ""
        }`}
      >
        <Mail className="mr-2" size={20} /> Correo
      </button>
      <button
        onClick={() => handleOpenApp("bank")}
        className={`p-2 rounded-md hover:bg-gray-300 w-full flex items-center justify-center ${
          currentApp === "bank" ? "bg-blue-300" : ""
        }`}
      >
        <CreditCard className="mr-2" size={20} /> Banco
      </button>
      <button
        onClick={() => handleOpenApp("browser")}
        className={`p-2 rounded-md hover:bg-gray-300 w-full flex items-center justify-center ${
          currentApp === "browser" ? "bg-blue-300" : ""
        }`}
      >
        <Search className="mr-2" size={20} /> Navegador
      </button>
      <button
        onClick={handleCalm}
        className="mt-auto p-2 rounded-md hover:bg-yellow-300 w-full flex items-center justify-center bg-yellow-200 text-yellow-800 font-bold"
      >
        <Pause className="mr-2" size={20} /> Calma
      </button>
      <div className="mt-2 flex items-center justify-center bg-red-200 text-red-800 font-bold p-2 rounded-md">
        <Clock className="mr-2" size={16} />
        <span>{currentTime}</span>
      </div>
      <div className="mt-2 flex items-center justify-center bg-red-200 text-red-800 font-bold p-2 rounded-md">
        <button onClick={handleFinish} className="mr-2">
          Terminar y Revisar
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
