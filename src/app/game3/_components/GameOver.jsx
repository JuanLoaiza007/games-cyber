import { CheckCircle, XCircle } from "lucide-react";

const GameOverApp = ({
  gameOver,
  gameSuccess,
  feedback,
  performedActions,
  resetGame,
}) => {
  if (!gameOver) {
    return null;
  }

  const feedbackLines = feedback
    .split("\n")
    .filter((line) => line.trim() !== "");

  return (
    <div className="bg-white rounded-md shadow-md p-6 w-full max-w-md">
      <h2 className="font-semibold mb-2">Fin del Juego</h2>
      {gameSuccess ? (
        <>
          <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
          <p>{feedbackLines.join("")}</p>{" "}
          {/* Si es éxito, todo en un párrafo */}
        </>
      ) : (
        <>
          <XCircle className="mx-auto text-red-500 mb-4" size={48} />
          {feedbackLines.map((line, index) => (
            <p key={index}>{line}</p>
          ))}
          <h3 className="font-semibold mt-4">Tus Acciones:</h3>
          {performedActions.length > 0 ? (
            <ul className="list-disc list-inside text-sm">
              {performedActions.map((action, index) => (
                <li key={index}>{action}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm italic">
              No realizaste ninguna acción específica.
            </p>
          )}
          {/* Aquí podrías añadir lógica para mostrar acciones faltantes y sus consecuencias */}
        </>
      )}
      <button
        onClick={resetGame}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Jugar de Nuevo
      </button>
    </div>
  );
};

export default GameOverApp;
