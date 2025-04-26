// src/app/game3.2/_components/BrowserApp.jsx
"use client";
import { useState } from "react";
import { ArrowLeft } from "lucide-react";

const searchOptions = [
  { title: "Boogle", url: "boogle.com" },
  { title: "Banco Seguro Oficial", url: "bancoseguro.com/oficial" },
  { title: "Otro Resultado", url: "otro.com" },
];

const BrowserApp = ({ handleReport, handleContactBankOfficial }) => {
  const [currentUrl, setCurrentUrl] = useState("boogle.com");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [searchResults, setSearchResults] = useState(searchOptions);
  const [viewingPage, setViewingPage] = useState(null);
  const [history, setHistory] = useState(["boogle.com"]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const handleGoBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex((prevIndex) => prevIndex - 1);
      setCurrentUrl(history[historyIndex - 1]);
      updateViewingPage(history[historyIndex - 1]);
    }
  };

  const updateViewingPage = (url) => {
    console.log(`Has to render ${url}`);
    if (url === "boogle.com") {
      setViewingPage(null);
    } else if (url === "bancoseguro.com/oficial") {
      setViewingPage({
        name: "Banco Seguro",
        email: "servicioalcliente@bancoseguro.com",
        phone: "601 XXX XX XX",
      });
    } else {
      setViewingPage({
        title: "Página no interactiva",
        content:
          "Esta página no tiene funcionalidades interactivas en la simulación.",
      });
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    setIsSearching(true);
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
    const newUrl = "boogle.com/search?q=" + searchQuery;
    setCurrentUrl(newUrl);
    setHistory((prevHistory) => [
      ...prevHistory.slice(0, historyIndex + 1),
      newUrl,
    ]);
    setHistoryIndex((prevIndex) => prevIndex + 1);
    updateViewingPage(newUrl);
  };

  const handleResultClick = (url) => {
    setCurrentUrl(url);
    setIsSearching(false);
    setHistory((prevHistory) => [
      ...prevHistory.slice(0, historyIndex + 1),
      url,
    ]);
    setHistoryIndex((prevIndex) => prevIndex + 1);
    updateViewingPage(url);
  };

  const handleReportViaEmail = (email) => {
    handleReport(`Reported via email to: ${email}`);
    setViewingPage({
      reportSent:
        "Enviaste un correo al banco reportando el incidente, bien hecho!.",
    });
  };

  const handleContactViaPhone = (phone) => {
    handleContactBankOfficial();
    setViewingPage({
      contacted: "Llamaste al banco para recibir instrucciones, bien hecho!",
    });
  };

  return (
    <div className="bg-gray-100 rounded-md shadow-md w-full flex flex-col">
      {/* Barra del navegador */}
      <div className="bg-gray-200 p-2 flex items-center space-x-2 rounded-t-md">
        <button
          onClick={handleGoBack}
          disabled={historyIndex === 0}
          className="p-1 rounded hover:bg-gray-300"
        >
          <ArrowLeft className="w-5 h-5 text-gray-700" />
        </button>
        <div className="bg-white rounded-md flex-grow shadow-inner">
          <input
            type="text"
            className="w-full p-2 rounded-md text-sm text-gray-700 focus:outline-none"
            value={currentUrl}
            readOnly
          />
        </div>
      </div>

      {/* Contenido del navegador */}
      <div className="p-6">
        {currentUrl === "boogle.com" && !viewingPage && (
          <div className="flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-8">Boogle</h1>
            <form
              onSubmit={handleSearchSubmit}
              className="w-full max-w-md flex"
            >
              <input
                type="text"
                className="shadow-md border rounded-l-md p-3 text-lg w-full focus:outline-none"
                placeholder="Buscar en Boogle"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold p-3 rounded-r-md shadow-md"
                disabled={isSearching}
              >
                {isSearching ? "Buscando..." : "Buscar"}
              </button>
            </form>
            {searchResults.length > 0 && (
              <ul className="mt-4 w-full max-w-md">
                {searchResults.map((result) => (
                  <li key={result.url} className="py-2 border-b">
                    <button
                      onClick={() => handleResultClick(result.url)}
                      className="text-blue-600 hover:underline"
                    >
                      {result.title} ({result.url})
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {viewingPage?.name === "Banco Seguro" && (
          <div className="bg-white rounded-md p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{viewingPage.name}</h2>
            <p className="text-gray-700 mb-1">Correo: {viewingPage.email}</p>
            <p className="text-gray-700 mb-2">Teléfono: {viewingPage.phone}</p>
            <p className="text-sm text-gray-600 mb-2">
              Reporta tu caso contactándonos por correo o teléfono para recibir
              instrucciones.
            </p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleReportViaEmail(viewingPage.email)}
                className="bg-red-200 text-red-700 text-xs rounded-md p-2 hover:bg-red-300"
              >
                Reportar por Correo
              </button>
              <button
                onClick={() => handleContactViaPhone(viewingPage.phone)}
                className="bg-orange-200 text-orange-700 text-xs rounded-md p-2 hover:bg-orange-300"
              >
                Contactar por Teléfono
              </button>
            </div>
          </div>
        )}

        {viewingPage?.title === "Página no interactiva" && (
          <div className="bg-white rounded-md p-4 shadow-md">
            <h2 className="text-xl font-semibold mb-2">{viewingPage.title}</h2>
            <p className="text-gray-700">{viewingPage.content}</p>
          </div>
        )}

        {viewingPage?.reportSent && (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded">
            <p>{viewingPage.reportSent}</p>
          </div>
        )}

        {viewingPage?.contacted && (
          <div className="bg-blue-100 border-l-4 border-blue-500 text-blue-700 p-4 rounded">
            <p>{viewingPage.contacted}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BrowserApp;
