// src/app/game3.2/_components/EmailApp.jsx
import React, { useState } from "react";

const EmailApp = ({ emails, handleViewLink, handleCallNumber }) => {
  const [viewingForm, setViewingForm] = useState(null);
  const [callingNumber, setCallingNumber] = useState(null);

  const handleViewFormClick = (link, emailId) => {
    setViewingForm({ link, emailId });
  };

  const handleCallNumberClick = (number, emailId) => {
    setCallingNumber({ number, emailId });
  };

  const handleCloseView = () => {
    setViewingForm(null);
    setCallingNumber(null);
  };

  const handleFillForm = (emailId) => {
    // Acción incorrecta: llenar el formulario de phishing
    handleViewLink(`Filled: ${viewingForm?.link}`);
    setViewingForm(null);
  };

  const handleMakeCall = (number, emailId) => {
    // Acción incorrecta: llamar al número de phishing
    handleCallNumber(`Called: ${callingNumber?.number}`);
    setCallingNumber(null);
  };

  return (
    <div className="flex-1 bg-white rounded-md shadow-md p-6 w-full flex">
      <div className="w-1/2 pr-4">
        <h2 className="font-semibold mb-2">Correo</h2>
        {emails.map((email) => (
          <div
            key={email.id}
            className={`border rounded-md p-3 mb-2 cursor-pointer ${
              email.isPhishing ? "border-red-400" : "border-green-400"
            }`}
          >
            <p className="text-sm font-semibold">{email.subject}</p>
            <p className="text-xs text-gray-600">De: {email.sender}</p>
            <p className="text-xs text-gray-700">
              {email.body.substring(0, 50)}...
            </p>
            {email.isPhishing && email.link && (
              <button
                onClick={() => handleViewFormClick(email.link, email.id)}
                className="bg-red-200 text-red-700 text-xs rounded-md p-1 mt-1"
              >
                Ver Formulario
              </button>
            )}
            {email.isPhishing && email.phone && (
              <button
                onClick={() => handleCallNumberClick(email.phone, email.id)}
                className="bg-orange-200 text-orange-700 text-xs rounded-md p-1 mt-1 ml-1"
              >
                Llamar
              </button>
            )}
          </div>
        ))}
      </div>
      {viewingForm && (
        <div className="w-1/2 pl-4 border-l">
          <h3 className="font-semibold mb-2">Formulario Sospechoso</h3>
          <div className="bg-gray-100 rounded-md p-3 text-sm">
            <p className="mb-1">Simulación de formulario...</p>
            <div className="border rounded-md p-2 mb-1">Campo 1</div>
            <div className="border rounded-md p-2 mb-1">Campo 2</div>
            <div className="border rounded-md p-2 mb-1">Campo 3</div>
            <button
              onClick={() => handleFillForm(viewingForm.emailId)}
              className="bg-red-300 text-red-800 text-xs rounded-md p-1 mt-2 mr-2"
            >
              Llenar
            </button>
            <button
              onClick={handleCloseView}
              className="bg-gray-300 text-gray-800 text-xs rounded-md p-1 mt-2"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
      {callingNumber && (
        <div className="w-1/2 pl-4 border-l">
          <h3 className="font-semibold mb-2">Llamada Sospechosa</h3>
          <div className="bg-gray-100 rounded-md p-3 text-sm">
            <div className="bg-gray-300 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8"
              >
                <path
                  fillRule="evenodd"
                  d="M1.5 4.5a3 3 0 013-3h13.5a3 3 0 013 3v15a3 3 0 01-3 3H4.5a3 3 0 01-3-3v-15zm15 0a1.5 1.5 0 011.5 1.5v12a1.5 1.5 0 01-1.5 1.5H4.5a1.5 1.5 0 01-1.5-1.5v-12a1.5 1.5 0 011.5-1.5h12zM8 10a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5zm4 0a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5zm4 0a.75.75 0 01-.75.75h-1.5a.75.75 0 01-.75-.75v-1.5a.75.75 0 01.75-.75h1.5a.75.75 0 01.75.75v1.5z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <p className="text-center mb-2">
              Llamando a: {callingNumber.number}
            </p>
            <div className="flex justify-around">
              <button
                onClick={() =>
                  handleMakeCall(callingNumber.number, callingNumber.emailId)
                }
                className="bg-green-300 text-green-800 text-xs rounded-md p-1"
              >
                Llamar
              </button>
              <button
                onClick={handleCloseView}
                className="bg-gray-300 text-gray-800 text-xs rounded-md p-1"
              >
                Cerrar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmailApp;
