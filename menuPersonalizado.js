// Diccionario con la información de cada plataforma
const PLATAFORMAS = {
  'Netflix':     { emoji: '🍿', datos: { comisionista: 'B', plataforma: 'Netflix', pais: '🇨🇴', pin: '*', dispositivo: '*', valor: 15000 } },
  'Prime Video': { emoji: '📦', datos: { comisionista: 'S', plataforma: 'Prime', pais: '',    pin: '*', dispositivo: '¿?', valor: 7000  } },
  'Disney+':     { emoji: '🏰', datos: { comisionista: 'S', plataforma: 'Disney+', pais: '',  pin: '',  dispositivo: '¿?', valor: 10000 } },
  'YouTube':     { emoji: '▶️', datos: { comisionista: 'S', plataforma: 'Youtube', pais: '',  pin: '',  dispositivo: '*', valor: 13000 } },
  'Max':         { emoji: '🎭', datos: { comisionista: 'B', plataforma: 'Max', pais: '',      pin: '',  dispositivo: '*', valor: 10000 } },
  'Spotify':     { emoji: '🎧', datos: { comisionista: 'B', plataforma: 'Spotify', pais: '',  pin: '-', dispositivo: '-', valor: 10000 } },
  'Crunchyroll': { emoji: '🦊', datos: { comisionista: 'S', plataforma: 'Crunchyroll', pais:'',pin:'*', dispositivo:'*', valor: 10000 } },
  'Paramount+':  { emoji: '🌄', datos: { comisionista: 'S', plataforma: 'Paramount', pais:'', pin:'*', dispositivo:'*', valor: 10000 } },
  'IPTV':        { emoji: '📡', datos: { comisionista: 'B', plataforma: 'IPTV', pais:'',      pin:'*', dispositivo:'*', valor: 18000 } },
  'Vix':         { emoji: '📺', datos: { comisionista: 'B', plataforma: 'Vix', pais:'',       pin:'*', dispositivo:'*', valor: 10000 } },
  'Plex':        { emoji: '🗂️', datos: { comisionista: 'S', plataforma: 'Plex', pais:'',      pin:'-', dispositivo:'-', valor: 10000 } },
  'Canva':       { emoji: '🎨', datos: { comisionista: 'S', plataforma: 'Canva', pais:'',     pin:'-', dispositivo:'-', valor: 15000 } },
  'Apple':       { emoji: '🍎', datos: { comisionista: 'S', plataforma: 'Apple', pais:'',     pin:'*', dispositivo:'*', valor: 10000 } }
};

/**
 * Función principal al abrir la hoja: crea un menú dinámico con todas las plataformas.
 */
function onOpen() {
  const ui = SpreadsheetApp.getUi();
  const menu = ui.createMenu('🎬 Plataformas');

  const plataformasOrdenadas = Object.entries(PLATAFORMAS);

  plataformasOrdenadas.forEach(([nombre, config], index) => {
    if (index === 3 || index === 6) menu.addSeparator(); // separadores estratégicos
    menu.addItem(`${config.emoji} ${nombre}`, `insertar${formatearNombreFuncion(nombre)}`);
  });

  menu.addToUi();
}

/**
 * Inserta una plataforma tomando los datos desde el diccionario.
 * Esta función será llamada dinámicamente.
 */
function insertarPorNombre(nombre) {
  const datos = PLATAFORMAS[nombre]?.datos;
  if (datos) insertarPlataforma(datos);
  else SpreadsheetApp.getUi().alert(`No se encontraron datos para la plataforma: ${nombre}`);
}

/**
 * Genera dinámicamente una función por cada plataforma
 */
Object.keys(PLATAFORMAS).forEach(nombre => {
  this[`insertar${formatearNombreFuncion(nombre)}`] = () => insertarPorNombre(nombre);
});

/**
 * Convierte el nombre de una plataforma en un nombre válido para una función
 * Ej: "Prime Video" → "PrimeVideo"
 */
function formatearNombreFuncion(nombre) {
  return nombre.replace(/[^a-zA-Z0-9]/g, '');
}

/**
 * Inserta los valores de una plataforma en la hoja activa.
 */
function insertarPlataforma({comisionista, plataforma, pais, pin, dispositivo, valor}) {
  const hoja = SpreadsheetApp.getActive();
  hoja.getRange('3:3').activate();
  hoja.getActiveSheet().insertRowsAfter(3, 1);
  const nuevaFila = hoja.getRange('4:4');
  hoja.getRange('1:1').copyTo(nuevaFila, SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);

  hoja.getRange(CELDAS_VENTAS.COMISIONISTA).setValue(comisionista);
  hoja.getRange(CELDAS_VENTAS.PLATAFORMA).setValue(plataforma);
  hoja.getRange(CELDAS_VENTAS.PAIS).setValue(pais);
  hoja.getRange(CELDAS_VENTAS.PIN).setValue(pin);
  hoja.getRange(CELDAS_VENTAS.DISPOSITIVO).setValue(dispositivo);
  hoja.getRange(CELDAS_VENTAS.VALOR).setValue(valor);
}
