/**
 * Servicio para manejar actualizaciones de deudas y abonos en la hoja "Deudores".
 */
const DeudaService = {
  /**
   * Agrega una deuda (positivo) a la hoja de deudores.
   * @param {SpreadsheetApp.Spreadsheet} ss
   * @param {string} mensaje
   * @param {number} valor
   */
  agregarDeuda: function(ss, mensaje, valor) {
    this._actualizarCelda(ss, mensaje, valor, CELDAS_DEUDORES.NOTA, CELDAS_DEUDORES.DEUDAS, "+");
  },

  /**
   * Agrega un abono (negativo) a la hoja de deudores.
   * @param {SpreadsheetApp.Spreadsheet} ss
   * @param {string} mensaje
   * @param {number} valor
   */
  agregarAbono: function(ss, mensaje, valor) {
    this._actualizarCelda(ss, mensaje, valor, CELDAS_DEUDORES.NOTA, CELDAS_DEUDORES.ABONOS, "-");
  },

  /**
   * Lógica común para actualizar notas y fórmulas.
   * @private
   */
  _actualizarCelda: function(ss, mensaje, valor, celdaNotaRef, celdaValorRef, operador) {
    const hoja = ss.getSheetByName(HOJAS.DEUDAS);
    const celdaNota = hoja.getRange(celdaNotaRef);
    const celdaValor = hoja.getRange(celdaValorRef);

    const notaExistente = celdaNota.getNote() || "";
    const nuevaNota = notaExistente ? notaExistente + "\n" + mensaje : mensaje;
    celdaNota.setNote(nuevaNota);

    let formulaActual = celdaValor.getFormula();
    if (!formulaActual) {
      formulaActual = "=" + celdaValor.getValue();
    }

    const nuevaFormula = `${formulaActual}${operador}${valor}`;
    celdaValor.setFormula(nuevaFormula);
  }
};
