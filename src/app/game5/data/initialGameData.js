export const dataRequests = [
  {
    text: "¿Podría decirme su nombre completo, por favor?",
    canShare: false,
    feedback:
      "No deberías dar tu nombre completo por teléfono. Solo podrías confirmarlo si la otra persona te lo dice.",
  },
  {
    text: "¿Cuál es el número de su tarjeta de crédito para verificar su identidad?",
    canShare: false,
    feedback: "¡Nunca compartas tu número de tarjeta de crédito por teléfono!",
  },
  {
    text: "¿Me dice los últimos cuatro dígitos de su documento de identidad?",
    canShare: true,
    feedback:
      "A veces se usan los últimos dígitos para verificación parcial pero nunca deberías compartir todos los dígitos.",
  },
  {
    text: "¿Podría proporcionarme la contraseña de su cuenta bancaria?",
    canShare: false,
    feedback: "¡Jamás reveles tus contraseñas por teléfono!",
  },
  {
    text: "¿Es usted Isabella Martínez?",
    canShare: true,
    feedback:
      "Confirmar tu identidad es diferente a dar información sensible, procura no confirmar muchos datos sin antes confirmar la identidad de quien te llama.",
  },
  {
    text: "Necesitamos el código de seguridad CVV de su tarjeta.",
    canShare: false,
    feedback: "El CVV nunca debe compartirse por teléfono.",
  },
  {
    text: "¿Puede decirme su número de cuenta bancaria completo?",
    canShare: false,
    feedback: "Tu número de cuenta completo es información sensible.",
  },
];
