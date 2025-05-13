function filtrarCorreo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hojaVentas = ss.getActiveSheet();
  const fila = hojaVentas.getActiveCell().getRow();

  // Obtener valores de la fila activa
  const correo = hojaVentas.getRange(`${COLS_VENTAS.CORREO}${fila}`).getValue();
  const plataforma = hojaVentas.getRange(`${COLS_VENTAS.PLATAFORMA}${fila}`).getValue();

  // Hoja de destino
  const hojaFiltro = ss.getSheetByName(HOJAS.FILTRO);

  // Insertar correo normalmente
  hojaFiltro.getRange(CELDAS_FILTRO.CORREO).setValue(correo);

  // Desactivar validación momentáneamente para C3
  const celdaPlataforma = hojaFiltro.getRange(CELDAS_FILTRO.PLATAFORMA);
  const reglaAnterior = celdaPlataforma.getDataValidation(); // Guardar regla actual
  celdaPlataforma.clearDataValidations(); // Quitar la validación
  celdaPlataforma.setValue(plataforma);   // Insertar valor

  // Restaurar la validación original
  if (reglaAnterior) {
    celdaPlataforma.setDataValidation(reglaAnterior);
  }
}
