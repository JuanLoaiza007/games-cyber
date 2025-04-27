"use client";
import React, { useState, useEffect } from "react";
import { PhoneCall, PhoneOff, AlertTriangle, CheckCircle } from "lucide-react";

const llamadasData = [
  {
    esVishing: true,
    partes: [
      {
        emisor: "Hola, ¿hablo con Isabella?",
        receptor: "Sí, con ella.",
        retroalimentacion:
          "¿Cómo adivinaste? Este era un intento de estafa pero también podría haber sido una llamada legítima.",
      },
      {
        emisor:
          "Le llamamos de su entidad bancaria. Necesitamos confirmar una transacción sospechosa de $500.000.",
        receptor: "¿Yo no he hecho esa transacción?",
        retroalimentacion:
          "¿Cómo adivinaste? Este era un intento de estafa. Intentan generar alarma.",
      },
      {
        emisor:
          "Para cancelar la transacción, necesitamos que nos proporcione el código de seguridad de su tarjeta.",
        receptor: "",
        retroalimentacion: "¡Era vishing! Nunca des esa información.",
      },
    ],
  },
  {
    esVishing: false,
    partes: [
      {
        emisor:
          "Buenos días, Isabella. Soy de su operador de telefonía, llamando para informarle sobre un aumento en la velocidad de su internet sin costo adicional.",
        receptor: "Buenos días, gracias.",
        retroalimentacion:
          "Colgaste y perdiste una posible mejora de tu servicio.",
      },
      {
        emisor: "Para activarlo, solo necesito confirmar su número de cédula.",
        receptor: "Claro, es...",
        retroalimentacion: "Colgaste y perdiste la oportunidad de una mejora.",
      },
      {
        emisor: "Perfecto. Su servicio será actualizado en las próximas horas.",
        receptor: "",
        retroalimentacion: "Era una llamada informativa de tu operador.",
      },
    ],
  },
  {
    esVishing: true,
    partes: [
      {
        emisor:
          "Buenas tardes, Isabella. Hablo de la DIAN. Tenemos un problema con su información tributaria.",
        receptor: "¿Qué tipo de problema?",
        retroalimentacion:
          "Tuviste suerte. Esta era una llamada de vishing pero también podría haber sido legítima.",
      },
      {
        emisor:
          "Para evitar una sanción, necesitamos que actualice su información en nuestro sistema a través de un enlace seguro que le enviaremos por WhatsApp.",
        receptor: "Envíenme el enlace por correo.",
        retroalimentacion:
          "Colgaste a tiempo. Ninguna empresa o entidad gubernamental usará medios no oficiales o redes sociales para solucionar sitauciones importantes.",
      },
      {
        emisor:
          "Es urgente, debe hacerlo ahora mismo por teléfono. Le guiaré paso a paso.",
        receptor: "",
        retroalimentacion:
          "¡Era vishing! Ninguna empresa o entidad gubernamental usará medios no oficiales o redes sociales para solucionar sitauciones importantes.",
      },
    ],
  },
  {
    esVishing: false,
    partes: [
      {
        emisor: "Buen día, ¿hablo con Isabella?",
        receptor: "Buen día, sí, con ella.",
        retroalimentacion: "Colgaste y perdiste un recordatorio importante.",
      },
      {
        emisor:
          "Te llamo de tu proveedor de salud para recordarte tu cita médica mañana a las 9:00 AM. ¿Me confirmas tu asistencia?",
        receptor: "Sí, confirmada.",
        retroalimentacion: "Colgaste y no confirmaste tu cita.",
      },
      {
        emisor: "Gracias. Te esperamos mañana.",
        receptor: "Gracias, hasta luego.",
        retroalimentacion:
          "Era un recordatorio legítimo de tu proveedor de salud.",
      },
    ],
  },
  {
    esVishing: true,
    partes: [
      {
        emisor:
          "Buenas noches, Isabella. Le llamamos de su proveedor de servicios de hogar. Su factura presenta un sobrecargo.",
        receptor: "Voy a revisar mi factura.",
        retroalimentacion: "Tuviste suerte. Esta era una llamada de vishing.",
      },
      {
        emisor:
          "Para solucionar el problema y evitar un corte de servicio, necesitamos verificar su método de pago.",
        receptor: "¿Qué necesitan?",
        retroalimentacion:
          "Colgaste a tiempo. No deberían pedir eso por teléfono.",
      },
      {
        emisor:
          "Necesitamos los números de su tarjeta de crédito para verificar.",
        receptor: "Claro!,el número de mi tarjeta es...",
        retroalimentacion: "¡Era vishing! Nunca compartas esos datos.",
      },
    ],
  },
  {
    esVishing: true,
    partes: [
      {
        emisor: "---",
        receptor: "Aló?",
        retroalimentacion:
          "Tuviste suerte. Las llamadas donde no te hablan son una trampa donde los estafadores comprueban si eres un potencial objetivo o para clonar tu voz.",
      },
      {
        emisor: "---",
        receptor: "Holaaa, ¿con quien hablo?",
        retroalimentacion:
          "Colgaste a tiempo. Las llamadas donde no te hablan son una trampa donde los estafadores comprueban si eres un potencial objetivo o para clonar tu voz.",
      },
      {
        emisor: "---",
        receptor: "Holaaa",
        retroalimentacion:
          "Colgaste algo tarde. Las llamadas donde no te hablan son una trampa donde los estafadores comprueban si eres un potencial objetivo o para clonar tu voz.",
      },
    ],
  },
];

const Game4 = () => {
  const [currentRound, setCurrentRound] = useState(0);
  const [conversationHistory, setConversationHistory] = useState([]);
  const [gameOver, setGameOver] = useState(false);
  const [gameResult, setGameResult] = useState("");
  const [score, setScore] = useState(0);
  const currentCall = llamadasData[currentRound];
  const currentPart = currentCall?.partes?.[conversationHistory.length];
  const totalRounds = llamadasData.length;
  const [nextRoundCountdown, setNextRoundCountdown] = useState(null);
  const nextRoundTime = 7; // seconds

  useEffect(() => {
    if (gameOver && currentRound < totalRounds - 1) {
      setNextRoundCountdown(nextRoundTime);
    }
  }, [gameOver, currentRound, totalRounds]);

  useEffect(() => {
    if (nextRoundCountdown > 0) {
      const timer = setTimeout(() => {
        setNextRoundCountdown((prev) => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (nextRoundCountdown === 0) {
      nextRound();
      setNextRoundCountdown(null);
    }
  }, [nextRoundCountdown]);

  const handleConfiar = () => {
    let newReceptorText = currentPart?.receptor || "";
    if (!gameOver && currentCall && currentPart) {
      setConversationHistory([
        ...conversationHistory,
        { emisor: currentPart.emisor, receptor: newReceptorText },
      ]);
      if (conversationHistory.length < currentCall.partes.length - 1) {
        // Continuar a la siguiente parte de la conversación
      } else {
        setGameOver(true);
        setGameResult(currentPart.retroalimentacion);
        if (!currentCall.esVishing) {
          // Si la llamada no era vishing, premiar al jugador
          setScore((prevScore) => prevScore + 1);
        }
      }
    }
  };

  const handleColgar = () => {
    if (!gameOver && currentCall && currentPart) {
      setGameOver(true);
      setGameResult(currentPart.retroalimentacion);
      if (currentCall.esVishing) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const nextRound = () => {
    if (currentRound < totalRounds - 1) {
      setCurrentRound((prevRound) => prevRound + 1);
      setConversationHistory([]);
      setGameOver(false);
      setGameResult("");
    } else {
      setGameOver(true);
      setGameResult("¡Juego Terminado!");
    }
  };

  const resetGame = () => {
    setCurrentRound(0);
    setConversationHistory([]);
    setGameOver(false);
    setGameResult("");
    setScore(0);
    setNextRoundCountdown(null);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-lg font-semibold mb-1">¿Confío o Cuelgo?</h2>
        <div className="flex flex-row justify-between">
          <p className="text-sm text-green-700 mb-4 font-bold">
            Ronda: {currentRound + 1} / {totalRounds}
          </p>
          <p className="text-sm text-green-700 mb-2 font-bold">
            Puntuación: {score} / {totalRounds}
          </p>
        </div>
        <div className="mb-4 p-4 bg-slate-200 rounded-md">
          <h3 className="font-semibold mb-2">Conversación:</h3>
          {conversationHistory.map((msg, index) => (
            <div key={`msg-${index}`} className="mb-2">
              <p className="text-sm text-gray-700">
                <PhoneCall className="inline mr-1" size={16} /> {msg.emisor}
              </p>
              {msg.receptor && (
                <p className="text-sm italic text-gray-600 ml-4">
                  <PhoneOff className="inline mr-1" size={16} /> Tú:{" "}
                  {msg.receptor}
                </p>
              )}
            </div>
          ))}
          {currentCall && currentPart && (
            <>
              <p className="text-sm text-blue-700 font-semibold">
                <PhoneCall className="inline mr-1" size={16} />
                {currentPart.emisor}
              </p>
              {currentPart.receptor && (
                <p className="text-sm italic text-gray-600 ml-4">
                  <PhoneOff className="inline mr-1" size={16} /> Tú:{" "}
                  {currentPart.receptor}
                </p>
              )}
            </>
          )}
        </div>
        <div className="flex justify-around">
          <button
            onClick={handleConfiar}
            disabled={
              gameOver ||
              !currentCall ||
              conversationHistory.length === currentCall.partes.length
            }
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
          >
            <CheckCircle className="inline mr-1" size={16} /> Confío (Responde)
          </button>
          <button
            onClick={handleColgar}
            disabled={gameOver || !currentCall}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400"
          >
            <AlertTriangle className="inline mr-1" size={16} /> Cuelgo
          </button>
        </div>
        {gameOver && (
          <div className="mt-4 text-center">
            <p className="bg-amber-100 p-2 rounded-md">{gameResult}</p>
            {nextRoundCountdown !== null && currentRound < totalRounds - 1 && (
              <p className="text-sm text-gray-600">
                Siguiente ronda en: {nextRoundCountdown} segundos
              </p>
            )}
            {currentRound === totalRounds - 1 && (
              <button
                onClick={resetGame}
                className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Jugar de Nuevo
              </button>
            )}
          </div>
        )}
        {!currentCall && !gameOver && <p>Cargando ronda...</p>}
      </div>
    </div>
  );
};

export default Game4;
