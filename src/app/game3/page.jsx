// src/app/game3.2/page.jsx
"use client";
import React, { useState, useEffect } from "react";
import Sidebar from "./_components/Sidebar";
import EmailApp from "./_components/EmailApp";
import BankApp from "./_components/BankApp";
import BrowserApp from "./_components/BrowserApp";
import GameOverApp from "./_components/GameOver";
import GameInfo from "./_components/GameInfo";
import { initialEmails, initialTransactions } from "./data/initialGameData";

const Game3Page = () => {
  const [currentTime, setCurrentTime] = useState(120);
  const [isCalm, setIsCalm] = useState(false);
  const [currentApp, setCurrentApp] = useState(null);
  const [emails, setEmails] = useState(initialEmails);
  const [transactions, setTransactions] = useState(initialTransactions);
  const [cardsBlocked, setCardsBlocked] = useState(false);
  const [passwordsChanged, setPasswordsChanged] = useState(false);
  const [contactedOfficial, setContactedOfficial] = useState(null);
  const [reported, setReported] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [gameOver, setGameOver] = useState(false);
  const [gameSuccess, setGameSuccess] = useState(false);
  const [performedActions, setPerformedActions] = useState([]);
  const [currentSituation, setCurrentSituation] = useState(
    "Te has enterado de que a tu tarjeta le falta dinero."
  );
  const [viewedLink, setViewedLink] = useState(null);
  const [calledNumber, setCalledNumber] = useState(null);

  useEffect(() => {
    let timer;
    if (currentTime > 0 && !gameOver) {
      timer = setTimeout(
        () => setCurrentTime((prevTime) => prevTime - 1),
        1000
      );
    } else if (currentTime === 0 && !gameOver) {
      setGameOver(true);
      setFeedback("¡Tiempo agotado! No reaccionaste a tiempo.");
      setCurrentApp("gameover"); // Muestra la app de Game Over
    }
    return () => clearTimeout(timer);
  }, [currentTime, gameOver]);

  const handleCalm = () => {
    setIsCalm(true);
    setFeedback("Te tomas un momento para pensar con claridad.");
    setCurrentTime((prevTime) => prevTime + 3);
    setTimeout(() => setIsCalm(false), 3000);
  };

  const handleOpenApp = (app) => {
    setCurrentApp(app);
    setFeedback("");
    setViewedLink(null);
    setCalledNumber(null);
  };

  const handleReportTransaction = (id) => {
    setTransactions(
      transactions.map((tx) =>
        tx.id === id ? { ...tx, isReported: true } : tx
      )
    );
    setPerformedActions((prev) => [
      ...prev,
      `Reportaste la transacción: ${
        transactions.find((t) => t.id === id)?.description
      }`,
    ]);
  };

  const handleBlockCards = () => {
    setCardsBlocked(true);
    setPerformedActions((prev) => [...prev, "Bloqueaste tus tarjetas."]);
    setFeedback("Has bloqueado tus tarjetas.");
  };

  const handleChangePasswords = () => {
    setPasswordsChanged(true);
    setPerformedActions((prev) => [...prev, "Cambiaste tus contraseñas."]);
    setFeedback("Has cambiado tus contraseñas.");
  };

  const handleContactBankOfficial = () => {
    setContactedOfficial(true);
    setPerformedActions((prev) => [
      ...prev,
      "Contactaste al banco para recibir instrucciones.",
    ]);
    setFeedback("Contactaste al banco para recibir instrucciones.");
  };

  const handleReport = (reportDetails) => {
    setReported(true);
    setPerformedActions((prev) => [
      ...prev,
      `Reportaste el incidente: ${reportDetails}`,
    ]);
    setFeedback(`Reportaste el incidente: ${reportDetails}`);
  };

  const handleViewLink = (link) => {
    setViewedLink(link);
    setFeedback(`Previsualizando formulario: ${link}`);
    setPerformedActions((prev) => [
      ...prev,
      `Viste un formulario sospechoso: ${link}`,
    ]);
  };

  const handleCallNumber = (number) => {
    setCalledNumber(number);
    setFeedback(`Intentando llamar al número: ${number}`);
    setPerformedActions((prev) => [
      ...prev,
      `Intentaste llamar a un número sospechoso: ${number}`,
    ]);
  };

  const handleSearchOfficialBank = () => {
    setFeedback("Buscando la página oficial del banco...");
    setCurrentApp("browser");
  };

  const handleFinish = () => {
    const suspiciousIdentified =
      transactions.filter((c) => c.isSuspicious && c.isReported).length ===
      transactions.filter((c) => c.isSuspicious).length;
    const cardsProtected = cardsBlocked;
    const accountsProtected = passwordsChanged;
    const correctlyContactedOfficial = contactedOfficial;
    const incidentReported = reported;
    const interactedPhishing =
      viewedLink?.includes("Filled:") || calledNumber?.includes("Called:");

    let success =
      suspiciousIdentified &&
      cardsProtected &&
      accountsProtected &&
      correctlyContactedOfficial &&
      incidentReported &&
      !interactedPhishing;

    let situationFeedback =
      "Has terminado. Revisemos tus acciones y lo que faltó.\n";
    let actionFeedback = "";
    let missingActions = [];

    if (!suspiciousIdentified) {
      missingActions.push("Identificar todas las transacciones sospechosas");
    }
    if (!cardsProtected) {
      missingActions.push("Bloquear tus tarjetas");
    }
    if (!accountsProtected) {
      missingActions.push("Cambiar tus contraseñas");
    }
    if (!correctlyContactedOfficial) {
      missingActions.push("Contactar al banco para recibir instrucciones.");
    }
    if (!incidentReported) {
      missingActions.push("Reportar el incidente al banco.");
    }
    if (interactedPhishing) {
      actionFeedback +=
        " ¡Cuidado! Interactuaste con un intento de phishing.\n";
    }

    if (missingActions.length > 0) {
      actionFeedback += " Te faltó realizar las siguientes acciones:\n";
      missingActions.forEach((action, index) => {
        actionFeedback += `${index + 1}. ${action}\n`;
      });
    } else if (success) {
      actionFeedback =
        "¡Felicidades! Has reaccionado correctamente ante el fraude.";
    }

    setGameSuccess(success);
    setGameOver(true);
    setFeedback(situationFeedback); // Aquí mantenemos el feedback general para el GameInfo si lo usas
    setFinalFeedback(actionFeedback); // Nueva variable para el feedback detallado
    setCurrentApp("gameover");
  };

  const [finalFeedback, setFinalFeedback] = useState(""); // Nuevo estado para el feedback detallado

  const resetGame = () => {
    setCurrentTime(120);
    setIsCalm(false);
    setCurrentApp(null);
    setEmails(initialEmails);
    setTransactions(initialTransactions);
    setCardsBlocked(false);
    setPasswordsChanged(false);
    setContactedOfficial(null);
    setReported(false);
    setFeedback("");
    setGameOver(false);
    setGameSuccess(false);
    setPerformedActions([]);
    setCurrentSituation("Te has enterado de que a tu tarjeta le falta dinero.");
    setViewedLink(null);
    setCalledNumber(null);
    setFinalFeedback(""); // Resetear el feedback detallado
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar
        currentApp={currentApp}
        handleOpenApp={handleOpenApp}
        handleCalm={handleCalm}
        currentTime={currentTime}
        handleFinish={handleFinish}
      />
      <div className="flex-1 p-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-4">Fraude bajo Ataque</h1>
        <GameInfo
          currentSituation={currentSituation}
          feedback={feedback}
        />{" "}
        {/* Aquí se sigue usando el feedback general */}
        {!currentApp && !gameOver && (
          <p className="text-center">
            Selecciona una acción de la barra lateral.
          </p>
        )}
        {currentApp === "mail" && (
          <EmailApp
            emails={emails}
            handleViewLink={handleViewLink}
            handleCallNumber={handleCallNumber}
          />
        )}
        {currentApp === "bank" && (
          <BankApp
            transactions={transactions}
            handleReportTransaction={handleReportTransaction}
            handleBlockCards={handleBlockCards}
            cardsBlocked={cardsBlocked}
            handleChangePasswords={handleChangePasswords}
            passwordsChanged={passwordsChanged}
          />
        )}
        {currentApp === "browser" && (
          <BrowserApp
            handleSearchOfficialBank={handleSearchOfficialBank}
            contactedOfficial={contactedOfficial}
            handleReport={handleReport}
            reported={reported}
            handleContactBankOfficial={handleContactBankOfficial}
          />
        )}
        {currentApp === "gameover" && (
          <GameOverApp
            gameOver={gameOver}
            gameSuccess={gameSuccess}
            feedback={finalFeedback}
            performedActions={performedActions}
            resetGame={resetGame}
          />
        )}
      </div>
    </div>
  );
};

export default Game3Page;
