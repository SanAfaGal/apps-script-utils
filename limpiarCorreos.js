function limpiarCorreos() {
  var hojaActiva = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var rangoSeleccionado = hojaActiva.getActiveRange();
  var valoresSeleccionados = rangoSeleccionado.getValues().flat(); // Convertir a un array plano

  var hojaVentas = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(HOJAS.VENTAS);
  if (!hojaVentas) {
    SpreadsheetApp.getUi().alert("No se encontró la hoja 'Ventas'");
    return;
  }

  var columnaCorreos = hojaVentas.getRange(RANGOS_VENTAS.CORREOS);
  var valoresColumna = columnaCorreos.getValues(); 

  var cambios = 0;
  for (var i = 0; i < valoresColumna.length; i++) {
    if (valoresSeleccionados.includes(valoresColumna[i][0])) {
      valoresColumna[i][0] = ""; // Vaciar la celda si coincide
      cambios++;
    }
  }

  columnaCorreos.setValues(valoresColumna); // Aplicar los cambios en la hoja
  SpreadsheetApp.getUi().alert(`Se han limpiado ${cambios} coincidencias.`);
}
