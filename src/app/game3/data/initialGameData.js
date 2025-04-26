// data/initialGameData.js
export const initialEmails = [
  {
    id: 1,
    sender: "BancoSeguro <alertas@bancoseguro.com>",
    subject: "Movimientos inusuales en su cuenta",
    body: "Hemos detectado algunas transacciones que podrían no ser suyas...",
    isPhishing: false,
  },
  {
    id: 2,
    sender: "Urgente Banco <ayuda@bancoseguro-online.net>",
    subject: "¡Acción requerida! Su cuenta ha sido bloqueada",
    body: "Para reactivar su cuenta y evitar la pérdida de fondos, haga clic aquí...",
    isPhishing: true,
    link: "formulario-falso.com",
  },
  {
    id: 3,
    sender: "BancoSeguro <noreply@bancoseguro.com>",
    subject: "Notificación de transacción",
    body: "Se realizó un pago de...",
    isPhishing: false,
  },
  {
    id: 4,
    sender: "Centro de Ayuda <soporte@banco-online.info>",
    subject: "Verificación de seguridad urgente",
    body: "Por su seguridad, le pedimos que llame al siguiente número...",
    isPhishing: true,
    phone: "3001234567",
  },
];

export const initialTransactions = [
  {
    id: 1,
    description: "Compra en Supermercado",
    amount: -50,
    isSuspicious: false,
    isReported: false,
  },
  {
    id: 2,
    description: 'Pago a "Servicios En Línea"',
    amount: -120,
    isSuspicious: true,
    isReported: false,
  },
  {
    id: 3,
    description: "Suscripción de Software",
    amount: -15,
    isSuspicious: false,
    isReported: false,
  },
  {
    id: 4,
    description: 'Transferencia a "Cuenta Desconocida"',
    amount: -200,
    isSuspicious: true,
    isReported: false,
  },
];
