function exportarMensajes() {
  const ui = SpreadsheetApp.getUi();
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.MENSAJES);
  if (!hoja) return ui.alert("La hoja 'Mensajes' no existe.");

  // Obtener y formatear la fecha
  const fecha = hoja.getRange(CELDAS_MENSAJES.FECHA).getValue();
  if (!fecha) return ui.alert("La celda no contiene una fecha válida.");

  const formatoFecha = Utilities.formatDate(new Date(fecha), Session.getScriptTimeZone(), "yyyy-MM-dd");
  const nombreArchivo = `${formatoFecha}.json`;

  // Buscar o crear carpeta de destino
  const nombreCarpeta = "JSON_Exportados";
  let carpeta = DriveApp.getFoldersByName(nombreCarpeta);
  carpeta = carpeta.hasNext() ? carpeta.next() : DriveApp.createFolder(nombreCarpeta);

  // Leer datos
  const datos = hoja.getRange(RANGOS_MENSAJES.RENOVACION).getValues();
  if (datos.length < 2) return ui.alert("No hay suficientes datos para exportar.");

  const encabezados = datos[0];
  const filas = datos.slice(1).filter(fila => fila.some(celda => celda !== "" && celda !== null));
  if (filas.length === 0) return ui.alert("No hay registros válidos para exportar.");

  // Convertir a JSON
  const jsonArray = filas.map(fila => {
    const obj = {};
    fila.forEach((valor, i) => obj[encabezados[i]] = valor);
    return obj;
  });

  const contenidoJSON = JSON.stringify(jsonArray, null, 2);

  // Eliminar archivo anterior si ya existe
  const archivosExistentes = carpeta.getFilesByName(nombreArchivo);
  while (archivosExistentes.hasNext()) archivosExistentes.next().setTrashed(true);

  // Crear nuevo archivo
  const archivo = carpeta.createFile(nombreArchivo, contenidoJSON, MimeType.PLAIN_TEXT);
  const linkDescarga = `https://drive.google.com/uc?export=download&id=${archivo.getId()}`;

  // Mostrar un enlace de descarga
  DialogUtils.mostrarEnlaceDescarga(linkDescarga, nombreArchivo);
}