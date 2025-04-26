import { UserX, KeyRound } from "lucide-react";

const BankApp = ({
  transactions,
  handleReportTransaction,
  handleBlockCards,
  cardsBlocked,
  handleChangePasswords,
  passwordsChanged,
}) => {
  return (
    <div className="bg-white rounded-md shadow-md p-6 w-full">
      <h2 className="font-semibold mb-2">Banco</h2>
      <div className="flex flex-1 flex-row justify-between">
        <div className="flex flex-col w-2/3 p-4">
          <h3 className="text-md font-semibold mt-2 mb-1">Transacciones</h3>
          {transactions.map((tx) => (
            <div
              key={tx.id}
              className={`border rounded-md p-3 mb-2 flex justify-between items-center ${
                tx.isSuspicious ? "border-red-400" : "border-green-400"
              }`}
            >
              <div>
                <p className="text-sm">{tx.description}</p>
                <p className="text-xs text-gray-600">Monto: {tx.amount}</p>
              </div>
              <button
                onClick={() => handleReportTransaction(tx.id)}
                disabled={tx.isReported}
                className={`bg-blue-200 text-blue-700 text-xs rounded-md p-1 ${
                  tx.isReported
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-blue-300"
                }`}
              >
                Reportar
              </button>
            </div>
          ))}
        </div>
        <div className="flex flex-col w-1/3 p-4">
          <h3 className="text-md font-semibold mt-2 mb-1">Seguridad</h3>
          <button
            onClick={handleBlockCards}
            className={`flex items-center bg-red-100 text-red-500 rounded-md p-2 mb-2 hover:bg-red-200 ${
              cardsBlocked ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={cardsBlocked}
          >
            <UserX className="mr-2" size={16} /> Bloquear Tarjetas
          </button>
          <button
            onClick={handleChangePasswords}
            className={`flex items-center bg-orange-100 text-orange-500 rounded-md p-2 hover:bg-orange-200 ${
              passwordsChanged ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={passwordsChanged}
          >
            <KeyRound className="mr-2" size={16} /> Cambiar Contraseña
          </button>
        </div>
      </div>
    </div>
  );
};

export default BankApp;
