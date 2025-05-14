// Diccionario con la información de cada plataforma
const PLATAFORMAS = {
  'Netflix':     { emoji: '🍿', datos: { comisionista: 'B', plataforma: 'Netflix', pais: '🇨🇴', pin: '*', dispositivo: '*', valor: 15000 } },
  'Prime':       { emoji: '📦', datos: { comisionista: 'S', plataforma: 'Prime', pais: '',    pin: '*', dispositivo: '¿?', valor: 7000  } },
  'Disney+':     { emoji: '🏰', datos: { comisionista: 'S', plataforma: 'Disney+', pais: '',  pin: '',  dispositivo: '¿?', valor: 10000 } },
  'YouTube':     { emoji: '▶️', datos: { comisionista: 'S', plataforma: 'Youtube', pais: '',  pin: '',  dispositivo: '*', valor: 13000 } },
  'Max':         { emoji: '🎭', datos: { comisionista: 'B', plataforma: 'Max', pais: '',      pin: '',  dispositivo: '*', valor: 10000 } },
  'Spotify':     { emoji: '🎧', datos: { comisionista: 'B', plataforma: 'Spotify', pais: '',  pin: '-', dispositivo: '-', valor: 10000 } },
  'Crunchyroll': { emoji: '🦊', datos: { comisionista: 'S', plataforma: 'Crunchyroll', pais:'',pin:'*', dispositivo:'*', valor: 10000 } },
  'Paramount':   { emoji: '🌄', datos: { comisionista: 'S', plataforma: 'Paramount', pais:'', pin:'*', dispositivo:'*', valor: 10000 } },
  'IPTV':        { emoji: '📡', datos: { comisionista: 'B', plataforma: 'IPTV', pais:'',      pin:'*', dispositivo:'*', valor: 18000 } },
  'Vix':         { emoji: '📺', datos: { comisionista: 'B', plataforma: 'Vix', pais:'',       pin:'*', dispositivo:'*', valor: 10000 } },
  'Plex':        { emoji: '🗂️', datos: { comisionista: 'S', plataforma: 'Plex', pais:'',      pin:'-', dispositivo:'-', valor: 10000 } },
  'Canva':       { emoji: '🎨', datos: { comisionista: 'S', plataforma: 'Canva', pais:'',     pin:'-', dispositivo:'-', valor: 15000 } },
  'Apple':       { emoji: '🍎', datos: { comisionista: 'S', plataforma: 'Apple', pais:'',     pin:'*', dispositivo:'*', valor: 10000 } }
};

const COLS_COMPRAS = {
  PROVEEDOR: "B",
  PLATAFORMA: "E",
  PLAN: "G",
  PAIS: "H",
  CORREO: "I",
  DISPONIBILIDAD: "K",
  CONTRASEÑA: "L",
  VALOR_SAG: "N",
  VALOR_BGL: "O",
  FECHA_INICIO: "P",
  FECHA_FIN: "Q"
};

const COLS_VENTAS = {
  COMISIONISTA: "B",
  PLATAFORMA: "D",
  PAIS: "F",
  CLIENTE: "G",
  PANTALLA: "H",
  PIN: "K",
  CORREO: "M",
  VALOR: "N",
  PAGO: "O",
  FECHA_RENOVACION: "Q",
  CORTE27: "R"
};

const COLS_PINES = {
  USUARIO: "C",
  CORREO: "E",
  PAGO: "I"
};

const RANGOS_MENSAJES = {
  RENOVACION: "B4:D",
};

const RANGOS_COMPRAS = {
  PLATAFORMAS: "E:E",
  CORREOS: "I:I",
};

const RANGOS_VENTAS = {
  PLATAFORMAS: "D:D",
  PAISES: "F:F",
  CLIENTES: "G:G",
  PANTALLAS: "H:H",
  PINES: "K:K",
  CORREOS: "M:M",
  VALORES: "N:N",
  PAGOS: "O",
  FECHAS_RENOVACION: "Q:Q",
  CORTE27: "R:R"
};

const CELDAS_VENTAS = {
  COMISIONISTA: "B4",
  PLATAFORMA: "D4",
  PAIS: "F4",
  INDICATIVO: "I4",
  PIN: "K4",
  DISPOSITIVO: "L4",
  VALOR: "N4",
}

const CELDAS_MENSAJES = {
  FECHA: "C2"
}

const CELDAS_COMPRAS = {
  DISPONIBILIDAD: "K1"
}

const CELDAS_DEUDORES = {
  DEUDAS: "P3",
  ABONOS: "P4",
  NOTA: "P5"
}

const CELDAS_FILTRO = {
  CORREO: "C2",
  PLATAFORMA: "C3",
}

const PROVEEDORES = {
  SAG: "Santiago Afanador",
}

const HOJAS = {
  COMPRAS: "Compras",
  DEUDAS: "Deudores",
  PINES: "Pines",
  VENTAS: "Ventas",
  FILTRO: "Filtro",
  MENSAJES: "Mensajes"
}
