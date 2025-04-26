"use client";
import React, { useState } from "react";
import {
  User,
  AlertTriangle,
  MessageSquare,
  UserPlus,
  CheckCircle,
  XCircle,
  Lightbulb,
  Heart,
  MessageSquare as MessageIcon,
} from "lucide-react";

const initialProfiles = [
  {
    id: 1,
    isFake: false,
    name: "Ana Pérez",
    username: "ana_viajera",
    profilePic: "https://via.placeholder.com/40/f0f0f0/ccc?Text=AP",
    posts: [
      {
        id: 101,
        imageUrl: "https://via.placeholder.com/300/e0e0e0/999?Text=Roma",
        caption: "Disfrutando de un café en Roma.",
        likes: 15,
        comments: 2,
      },
      {
        id: 102,
        imageUrl: "https://via.placeholder.com/300/d0d0d0/888?Text=Playa",
        caption: "Atardecer en la playa.",
        likes: 28,
        comments: 5,
      },
    ],
    followers: 345,
    advice: "Quizás observes la coherencia en sus publicaciones.",
  },
  {
    id: 2,
    isFake: true,
    name: "Carlos López",
    username: "inversiones_faciles",
    profilePic: "https://via.placeholder.com/40/e0e0e0/999?Text=CL",
    posts: [
      {
        id: 201,
        caption:
          "Necesito ayuda urgente con una inversión, contáctenme por privado.",
        likes: 5,
        comments: 0,
      },
      {
        id: 202,
        caption: "Ganancias increíbles en criptomonedas. ¡DM para más info!",
        likes: 8,
        comments: 1,
      },
    ],
    followers: 52,
    advice: "Fíjate si sus publicaciones son inusuales o sospechosas.",
  },
  {
    id: 3,
    isFake: false,
    name: "Sofía Gómez",
    username: "sofiadiseña",
    profilePic: "https://via.placeholder.com/40/c0c0c0/777?Text=SG",
    posts: [
      {
        id: 301,
        imageUrl: "https://via.placeholder.com/300/b0b0b0/666?Text=Diseño",
        caption: "Nuevo proyecto en proceso.",
        likes: 45,
        comments: 10,
      },
      { id: 302, caption: "Inspiración del día.", likes: 32, comments: 7 },
    ],
    followers: 210,
    advice: "Considera la cantidad de interacción que tiene.",
  },
];

const reasons = [
  "Poca interacción con otros usuarios.",
  "Solicitudes extrañas en las publicaciones.",
  "Información inconsistente en la biografía.",
  "Número inusualmente bajo de seguidores.",
];

const Game2Page = () => {
  const [profiles, setProfiles] = useState(initialProfiles);
  const [currentFakeProfileId, setCurrentFakeProfileId] = useState(2); // Establecemos el ID del perfil falso actual
  const [reportedId, setReportedId] = useState(null);
  const [reportReasons, setReportReasons] = useState([]);
  const [feedback, setFeedback] = useState(null);
  const [adviceGiven, setAdviceGiven] = useState({});

  const handleGetAdvice = (profileId) => {
    const profile = profiles.find((p) => p.id === profileId);
    if (profile && !adviceGiven[profileId]) {
      setAdviceGiven((prev) => ({ ...prev, [profileId]: true }));
      alert(`Consejo para ${profile.name}: ${profile.advice}`);
    } else if (adviceGiven[profileId]) {
      alert("Ya pediste un consejo para este perfil.");
    } else {
      alert("No se pudo obtener el consejo.");
    }
  };

  const handleReport = (profileId) => {
    setReportedId(profileId);
  };

  const handleReasonChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setReportReasons((prev) => [...prev, value]);
    } else {
      setReportReasons((prev) => prev.filter((reason) => reason !== value));
    }
  };

  const handleSubmitReport = () => {
    if (reportedId) {
      if (reportedId === currentFakeProfileId) {
        setFeedback({
          success: true,
          message: "¡Correcto! Has identificado el perfil falso.",
        });
      } else {
        const fakeProfile = profiles.find((p) => p.id === currentFakeProfileId);
        setFeedback({
          success: false,
          message: `Incorrecto. El perfil falso era ${fakeProfile.name} (@${fakeProfile.username}). Presta atención a sus publicaciones sospechosas y la falta de interacción real.`,
        });
      }
      // Simulación de pasar a la siguiente ronda
      setTimeout(() => {
        setProfiles([
          {
            id: 4,
            isFake: false,
            name: "Luis Vargas",
            username: "luis_musica",
            profilePic: "https://via.placeholder.com/40/808080/eee?Text=LV",
            posts: [
              {
                id: 401,
                caption: "Nueva canción en camino.",
                likes: 76,
                comments: 12,
              },
            ],
            followers: 150,
            advice: "Presta atención a la información en su biografía.",
          },
          {
            id: 5,
            isFake: true,
            name: "Elena Castro",
            username: "ganancias_rapidas",
            profilePic: "https://via.placeholder.com/40/a0a0a0/ddd?Text=EC",
            posts: [
              {
                id: 501,
                caption:
                  "Invierta ahora y gane el doble en una semana. ¡Pregúntame cómo!",
                likes: 10,
                comments: 3,
              },
            ],
            followers: 25,
            advice: "Fíjate en la naturaleza de sus publicaciones recientes.",
          },
          {
            id: 6,
            isFake: false,
            name: "Javier Ruiz",
            username: "javier_lector",
            profilePic: "https://via.placeholder.com/40/606060/fff?Text=JR",
            posts: [
              {
                id: 601,
                caption: "Recomendación de la semana: [Título del libro].",
                likes: 35,
                comments: 8,
              },
              {
                id: 602,
                imageUrl:
                  "https://via.placeholder.com/300/999999/555?Text=Cine",
                caption: "Crítica de la última película que vi.",
                likes: 62,
                comments: 15,
              },
            ],
            followers: 280,
            advice: "Observa la interacción en sus publicaciones.",
          },
        ]);
        setCurrentFakeProfileId(5);
        setReportedId(null);
        setReportReasons([]);
        setFeedback(null);
        setAdviceGiven({});
      }, 3000);
    } else {
      alert("Debes seleccionar un perfil para reportar.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-3xl font-bold mb-6">Caza Suplantadores</h1>
      <p className="mb-4 text-center">
        Analiza los perfiles y reporta el que creas que es falso.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {profiles.map((profile) => (
          <div key={profile.id} className="bg-white rounded-lg shadow-md p-4">
            <div className="flex items-center mb-2">
              <img
                src={profile.profilePic}
                alt={profile.name}
                className="w-8 h-8 rounded-full mr-2"
              />
              <div>
                <h2 className="text-sm font-semibold">{profile.name}</h2>
                <p className="text-xs text-gray-600">@{profile.username}</p>
              </div>
            </div>
            <p className="text-sm text-gray-700 mb-2">{profile.bio}</p>
            <div>
              <p className="text-gray-700 font-medium text-sm mb-1">
                Publicaciones:
              </p>
              {profile.posts.map((post) => (
                <div key={post.id} className="mb-2 border rounded-md p-2">
                  {post.imageUrl && (
                    <img
                      src={post.imageUrl}
                      alt="Post"
                      className="w-full h-auto rounded-md mb-1"
                    />
                  )}
                  <p className="text-xs">{post.caption}</p>
                  <div className="flex items-center text-gray-500 text-xs mt-1">
                    <Heart className="mr-1" size={14} /> {post.likes || 0}
                    <MessageIcon className="ml-2 mr-1" size={14} />{" "}
                    {post.comments || 0}
                  </div>
                </div>
              ))}
              {profile.posts.length === 0 && (
                <p className="text-xs text-gray-500">No hay publicaciones.</p>
              )}
            </div>
            <p className="text-gray-700 text-xs">
              Seguidores: {profile.followers}
            </p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleGetAdvice(profile.id)}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-3 rounded text-xs"
                disabled={adviceGiven[profile.id]}
              >
                <Lightbulb className="inline-block mr-1" size={14} /> Consejo
              </button>
              <button
                onClick={() => handleReport(profile.id)}
                className={`bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-3 rounded text-xs ${
                  reportedId === profile.id
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
                disabled={reportedId !== null && reportedId !== profile.id}
              >
                <AlertTriangle className="inline-block mr-1" size={14} />{" "}
                Reportar
              </button>
            </div>
          </div>
        ))}
      </div>

      {reportedId && (
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded mb-4">
          <p>Selecciona las razones para reportar el perfil:</p>
          {reasons.map((reason) => (
            <div key={reason} className="flex items-center">
              <input
                type="checkbox"
                value={reason}
                onChange={handleReasonChange}
                className="mr-2"
              />
              <label className="text-sm">{reason}</label>
            </div>
          ))}
          <button
            onClick={handleSubmitReport}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-2 text-sm"
          >
            Confirmar Reporte
          </button>
        </div>
      )}

      {feedback && (
        <div
          className={`bg-${
            feedback.success ? "green" : "red"
          }-100 border border-${feedback.success ? "green" : "red"}-400 text-${
            feedback.success ? "green" : "red"
          }-700 px-4 py-3 rounded`}
        >
          <p className="text-sm">{feedback.message}</p>
        </div>
      )}
    </div>
  );
};

export default Game2Page;
