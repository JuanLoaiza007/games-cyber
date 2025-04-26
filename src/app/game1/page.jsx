"use client";
import React, { useState } from "react";
import { Lock, Globe, Info } from "lucide-react";

const items = [
  {
    id: 1,
    type: "message",
    content:
      "Quedé en encontrarme con mis amigos en el parque a las 3 PM. ¡Qué emoción!",
    isPrivate: true,
    explanation:
      "Esto debería ser privado, compartir planes específicos y tu ubicación puede ser riesgoso para tu seguridad.",
  },
  {
    id: 2,
    type: "photo",
    content: "Foto con mi dirección en el letrero de mi casa.",
    isPrivate: true,
    explanation:
      "Esto debería ser privado, tu dirección es información personal que podría ser utilizada para identificarte y ponerte en riesgo.",
  },
  {
    id: 3,
    type: "post",
    content: "Mi número de teléfono es 310XXXXXXX. ¡Llámenme!",
    isPrivate: true,
    explanation:
      "Esto debería ser privado, publicar tu número de teléfono te expone a llamadas no deseadas, spam y posibles fraudes.",
  },
  {
    id: 4,
    type: "message",
    content: "Estoy súper triste hoy...",
    isPrivate: false,
    explanation:
      "Esto podría ser público, compartir emociones puede ayudarte a conectar con otros, pero ten cuidado con quién puede verlo y cómo podrían usar esa información.",
  },
  {
    id: 5,
    type: "photo",
    content:
      "Selfie en mi habitación con detalles personales visibles (documentos, computador con información sensible).",
    isPrivate: true,
    explanation:
      "Esto debería ser privado, las fotos pueden revelar información sensible de tu entorno que no quieres que sea pública.",
  },
  {
    id: 6,
    type: "post",
    content: "¡Ya casi llego a mi casa! #MiBarrio",
    isPrivate: true,
    explanation:
      "Esto debería ser privado, compartir tu ubicación en tiempo real puede permitir que desconocidos sepan cuándo estás solo en casa.",
  },
  {
    id: 7,
    type: "message",
    content: "¿Alguien sabe cómo solucionar este error en mi código?",
    isPrivate: false,
    explanation:
      "Esto podría ser público, preguntar por ayuda en comunidades puede ser útil, pero evita compartir información sensible de tu proyecto.",
  },
  {
    id: 8,
    type: "photo",
    content: "Foto de mi pasaporte con mi información personal visible.",
    isPrivate: true,
    explanation:
      "Esto debería ser privado, la información de tu pasaporte es altamente sensible y puede ser utilizada para robo de identidad.",
  },
  {
    id: 9,
    type: "post",
    content: "Hoy no fui a trabajar porque me siento mal.",
    isPrivate: false,
    explanation:
      "Esto podría ser público, informar sobre tu estado puede ser común, pero considera quién tiene acceso a esta información y si es relevante para ellos.",
  },
  {
    id: 10,
    type: "message",
    content: "Le envié mis claves de acceso por mensaje privado.",
    isPrivate: true,
    explanation:
      "Esto debería ser privado, nunca compartas contraseñas o claves de acceso por mensajes directos, ya que no es un método seguro.",
  },
  {
    id: 11,
    type: "photo",
    content:
      "Foto de mi tarjeta de crédito (aunque los números estén parcialmente ocultos).",
    isPrivate: true,
    explanation:
      "Esto debería ser privado, incluso parcialmente visible, la información de tu tarjeta de crédito puede ser riesgosa si cae en las manos equivocadas.",
  },
  {
    id: 12,
    type: "post",
    content: "Opiniones sobre un tema político controversial.",
    isPrivate: false,
    explanation:
      "Esto podría ser público, expresar tus opiniones es válido, pero prepárate para posibles interacciones o debates, y considera tu configuración de privacidad.",
  },
  {
    id: 13,
    type: "message",
    content:
      "Estoy planeando mis vacaciones para [fecha] en [lugar específico].",
    isPrivate: true,
    explanation:
      "Esto debería ser privado, compartir tus planes de viaje con anticipación puede alertar sobre tu ausencia y hacerte vulnerable.",
  },
  {
    id: 14,
    type: "photo",
    content: "Foto de un documento legal con información personal.",
    isPrivate: true,
    explanation:
      "Esto debería ser privado, los documentos legales contienen información confidencial que nunca debe ser compartida públicamente.",
  },
  {
    id: 15,
    type: "post",
    content: "¡Qué gran día soleado!",
    isPrivate: false,
    explanation:
      "Esto podría ser público, compartir un estado general sobre el clima no suele representar un riesgo de privacidad.",
  },
];

const Game1Page = () => {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [showFeedback, setShowFeedback] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const currentItem = items[currentItemIndex];

  const handleDrop = (isPrivate) => {
    setShowFeedback(true);
    if (currentItem.isPrivate === isPrivate) {
      setScore((prevScore) => prevScore + 1);
      setFeedback("¡Correcto!");
    } else {
      setFeedback("Incorrecto.");
    }

    setTimeout(() => {
      setShowFeedback(false);
      if (currentItemIndex < items.length - 1) {
        setCurrentItemIndex((prevIndex) => prevIndex + 1);
      } else {
        setGameOver(true);
      }
    }, 8000);
  };

  const resetGame = () => {
    setCurrentItemIndex(0);
    setScore(0);
    setFeedback("");
    setShowFeedback(false);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">¡Juego Terminado!</h2>
        <p className="text-lg mb-2">
          Tu puntuación: {score} de {items.length}
        </p>
        <button
          onClick={resetGame}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Jugar de Nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Filtra o Expón</h1>

      <div className="relative bg-white rounded-lg shadow-md p-6 mb-8 w-full max-w-md flex flex-col items-center">
        {currentItem && (
          <>
            <p className="text-lg mb-4 text-center">
              {currentItem.type === "message" && (
                <>
                  <Info className="inline-block mr-2" size={20} />
                  Mensaje:
                </>
              )}
              {currentItem.type === "photo" && (
                <>
                  <Info className="inline-block mr-2" size={20} />
                  Foto:
                </>
              )}
              {currentItem.type === "post" && (
                <>
                  <Info className="inline-block mr-2" size={20} />
                  Publicación:
                </>
              )}
            </p>
            <div className="border rounded-md p-4 mb-4 w-full text-center">
              {currentItem.content}
            </div>
          </>
        )}

        {showFeedback && (
          <div
            className="absolute top-full mt-4 bg-yellow-200 border border-yellow-400 text-yellow-700 px-4 py-2 rounded"
            role="alert"
          >
            <p>
              {feedback} {currentItem?.explanation}
            </p>
          </div>
        )}
      </div>

      <div className="flex justify-around w-full max-w-md">
        <div
          className="bg-red-200 hover:bg-red-300 text-red-700 font-bold py-4 px-8 rounded cursor-pointer flex flex-col items-center justify-center"
          onClick={() => handleDrop(false)}
        >
          <Globe className="mb-2" size={32} />
          Público
        </div>
        <div
          className="bg-green-200 hover:bg-green-300 text-green-700 font-bold py-4 px-8 rounded cursor-pointer flex flex-col items-center justify-center"
          onClick={() => handleDrop(true)}
        >
          <Lock className="mb-2" size={32} />
          Privado
        </div>
      </div>

      <p className="mt-4 text-sm text-gray-500">
        Pregunta {currentItemIndex + 1} de {items.length}
      </p>
      <p className="text-lg font-semibold mt-2">Puntuación: {score}</p>
    </div>
  );
};

export default Game1Page;
