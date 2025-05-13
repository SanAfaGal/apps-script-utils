function actualizarHora() {
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Bolt"); // Cambia "NombreDeTuHoja"
  var celda = hoja.getRange("H2"); // Cambia "A1" si quieres otra celda
  
  var ahora = new Date();
  ahora.setSeconds(0);
  ahora.setMilliseconds(0);
  
  celda.setValue(ahora);
}
