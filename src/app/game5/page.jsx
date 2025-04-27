"use client";
import React, { useState, useEffect } from "react";
import { Lock, LockOpen } from "lucide-react";
import { dataRequests } from "./data/initialGameData";

const Game5 = () => {
  const [currentRequestIndex, setCurrentRequestIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState("");
  const [userAnswer, setUserAnswer] = useState(null);
  const [roundOver, setRoundOver] = useState(false);
  const nextRountTime = 5; // seconds
  const [nextRoundTimer, setNextRoundTimer] = useState(nextRountTime);

  const currentRequest = dataRequests[currentRequestIndex];
  const totalRequests = dataRequests.length;

  useEffect(() => {
    let timerId;
    if (roundOver) {
      timerId = setInterval(() => {
        setNextRoundTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      clearInterval(timerId);
      setNextRoundTimer(nextRountTime);
    }
    return () => clearInterval(timerId);
  }, [roundOver]);

  useEffect(() => {
    if (roundOver && nextRoundTimer === 0) {
      setRoundOver(false);
      setUserAnswer(null);
      setFeedback("");
      if (currentRequestIndex < totalRequests - 1) {
        setCurrentRequestIndex((prevIndex) => prevIndex + 1);
      } else {
        setFeedback("¡Juego Terminado!");
      }
    }
  }, [roundOver, nextRoundTimer, currentRequestIndex, totalRequests]);

  const handleAnswer = (share) => {
    if (!roundOver && currentRequest) {
      setUserAnswer(share);
      setRoundOver(true);
      if (share === currentRequest.canShare) {
        setScore((prevScore) => prevScore + 1);
        setFeedback(`Correcto. ${currentRequest.feedback}`);
      } else {
        setFeedback(`Incorrecto. ${currentRequest.feedback}`);
      }
    }
  };

  const resetGame = () => {
    setCurrentRequestIndex(0);
    setScore(0);
    setFeedback("");
    setUserAnswer(null);
    setRoundOver(false);
    setNextRoundTimer(nextRountTime);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-md shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">La Torre de Datos</h2>
        <div className="flex flex-row justify-between text-green-700 font-bold">
          <p className="text-sm mb-2 text-center">
            Ronda: {currentRequestIndex + 1} / {totalRequests}
          </p>
          <p className="text-sm mb-4 text-center">Puntuación: {score}</p>
        </div>
        {currentRequest ? (
          <div className="mb-6 p-4 rounded-md text-center bg-slate-200">
            <p className="text-lg text-blue-700 font-semibold">
              {currentRequest.text}
            </p>
          </div>
        ) : (
          <p className="text-center">Cargando...</p>
        )}

        <div className="flex justify-between mb-4 gap-4">
          <button
            onClick={() => handleAnswer(true)}
            disabled={roundOver || !currentRequest}
            className={`flex items-center bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400`}
          >
            <LockOpen className="mr-2" size={20} /> Compartir con precaución
          </button>
          <button
            onClick={() => handleAnswer(false)}
            disabled={roundOver || !currentRequest}
            className={`flex items-center bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded disabled:bg-gray-400`}
          >
            <Lock className="mr-2" size={20} /> No compartir jamás
          </button>
        </div>

        {feedback && (
          <div className="mt-4 p-3 rounded-md text-center ">
            <p className={`font-semibold bg-amber-400 p-2 rounded-md`}>
              {feedback}
            </p>
            {roundOver && currentRequestIndex < totalRequests - 1 && (
              <p className="text-sm text-gray-600 mt-2">
                Siguiente ronda en: {nextRoundTimer} segundos
              </p>
            )}
            {currentRequestIndex === totalRequests - 1 && (
              <button
                onClick={resetGame}
                className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Jugar de Nuevo
              </button>
            )}
          </div>
        )}
        {!currentRequest &&
          currentRequestIndex < totalRequests &&
          !feedback && (
            <p className="text-center">Cargando siguiente ronda...</p>
          )}
      </div>
    </div>
  );
};

export default Game5;
