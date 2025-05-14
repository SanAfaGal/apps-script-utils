/**
 * Calcula el saldo pendiente total basado en las anotaciones de una celda
 * y permite al usuario ingresar un valor adicional para obtener el saldo final.
 * 
 * Este proceso consiste en:
 * 1. Leer una nota con líneas tipo "+ 5k" o "- 2k" en la hoja de deudas.
 * 2. Sumar y restar esos valores para calcular un saldo agregado.
 * 3. Pedir al usuario un saldo adicional opcional.
 * 4. Mostrar un resumen con el total pendiente.
 */
function saldoPendiente() {
  // Obtener la hoja activa y la celda de nota que contiene los registros de deudas
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var hojaDeudores = ss.getSheetByName(HOJAS.DEUDAS);
  var celdaNota = hojaDeudores.getRange(CELDAS_DEUDORES.NOTA);
  
  // Leer el contenido de la nota y dividirlo por líneas
  var notaExistente = celdaNota.getNote() || "";
  var lineas = notaExistente.split("\n").map(linea => linea.trim());

  // Inicializar el saldo total
  var saldoTotal = 0;

  // Expresión regular para detectar líneas tipo "+ 10k" o "-5k"
  var regex = /^([+-])\s?(\d+)k/i;

  // Procesar cada línea y acumular el valor correspondiente
  lineas.forEach(linea => {
    var match = linea.match(regex);
    if (match) {
      var signo = match[1];                      // "+" o "-"
      var valor = parseInt(match[2]) * 1000;     // Convertir "5" en 5000
      saldoTotal += signo === '+' ? valor : -valor;
    }
  });

  // Solicitar al usuario que ingrese un saldo adicional (opcional)
  var ui = SpreadsheetApp.getUi();
  var respuesta = ui.prompt(
    "Saldo agregado: $" + saldoTotal.toLocaleString(),
    "Ingresa el saldo pendiente adicional (opcional):",
    ui.ButtonSet.OK_CANCEL
  );
  
  // Si el usuario acepta, procesar el valor adicional y mostrar el resumen
  if (respuesta.getSelectedButton() == ui.Button.OK) {
    var valorIngresado = parseFloat(
      respuesta.getResponseText().replace(/[^\d.-]/g, '')
    ) || 0;

    var saldoFinal = saldoTotal + valorIngresado;

    ui.alert(
      `Resumen de saldo:\n\n` +
      `Saldo agregado: $${saldoTotal.toLocaleString()}\n` +
      `Saldo anterior: $${valorIngresado.toLocaleString()}\n\n` +
      `➡️ Total pendiente: $${saldoFinal.toLocaleString()}`
    );
  } else {
    // Si cancela, se muestra solo el saldo actual
    ui.alert("Operación cancelada. Solo se mostró el saldo agregado.");
  }
}
