export const llamadasData = [
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
