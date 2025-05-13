function confirmarPago() {
  // 1. Obtener la hoja activa
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // 2. Obtener todos los rangos seleccionados
  var rangos = hoja.getActiveRangeList().getRanges();

  // 3. Inicializar contador de filas modificadas
  var filasConfirmadas = 0;

  // 4. Recorrer cada rango seleccionado
  for (var r = 0; r < rangos.length; r++) {
    var rango = rangos[r];
    var numFilas = rango.getNumRows();
    var filaInicial = rango.getRow();

    // 5. Recorrer cada fila dentro del rango
    for (var i = 0; i < numFilas; i++) {
      var filaActual = filaInicial + i;

      // 6. Confirmar el pago en la columna correspondiente
      hoja.getRange(COLS_VENTAS.PAGO + filaActual).setValue(true);

      // 7. Aumentar el contador
      filasConfirmadas++;
    }
  }

  // 8. Mostrar alerta si se confirmaron más de una fila
  if (filasConfirmadas > 1) {
    var ui = SpreadsheetApp.getUi();
    ui.alert(`✅ Se confirmaron ${filasConfirmadas} filas como pagadas.`);
  }
}
