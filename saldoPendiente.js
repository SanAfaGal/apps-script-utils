function saldoPendiente() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hojaDeudores = ss.getSheetByName(HOJAS.DEUDAS);
  var celdaNota = hojaDeudores.getRange(CELDAS_DEUDORES.NOTA);
  
  var notaExistente = celdaNota.getNote() || "";
  var lineas = notaExistente.split("\n").map(linea => linea.trim());
  
  var saldoTotal = 0;
  var regex = /^([+-])\s?(\d+)k/i;
  
  lineas.forEach(linea => {
    var match = linea.match(regex);
    if (match) {
      var signo = match[1];
      var valor = parseInt(match[2]) * 1000;
      saldoTotal += signo === '+' ? valor : -valor;
    }
  });

  // Pedir al usuario que ingrese el saldo pendiente
  var ui = SpreadsheetApp.getUi();
  var respuesta = ui.prompt("Saldo agregado: $" + saldoTotal.toLocaleString(), "Ingresa el saldo pendiente adicional (opcional):", ui.ButtonSet.OK_CANCEL);
  
  if (respuesta.getSelectedButton() == ui.Button.OK) {
    var valorIngresado = parseFloat(respuesta.getResponseText().replace(/[^\d.-]/g, '')) || 0;
    var saldoFinal = saldoTotal + valorIngresado;

    ui.alert(
      `Resumen de saldo:\n\n` +
      `Saldo agregado: $${saldoTotal.toLocaleString()}\n` +
      `Saldo anterior: $${valorIngresado.toLocaleString()}\n\n` +
      `➡️ Total pendiente: $${saldoFinal.toLocaleString()}`
    );
  } else {
    ui.alert("Operación cancelada. Solo se mostró el saldo agregado.");
  }
}
