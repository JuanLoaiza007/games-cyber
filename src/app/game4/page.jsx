"use client";
import React, { useState, useEffect } from "react";
import { PhoneCall, PhoneOff, AlertTriangle, CheckCircle } from "lucide-react";
import { llamadasData } from "./data/initialGameData";

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
