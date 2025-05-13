function nuevoRegistro() {
  var spreadsheet = SpreadsheetApp.getActive();
  /* Agregar fila encima */
  spreadsheet.getRange('4:4').activate();
  spreadsheet.getActiveSheet().insertRowsBefore(spreadsheet.getActiveRange().getRow(), 1);
  spreadsheet.getActiveRange().offset(0, 0, 1, spreadsheet.getActiveRange().getNumColumns()).activate();
  /*Copiar fila*/
  spreadsheet.getRange('1:1').copyTo(spreadsheet.getActiveRange(), SpreadsheetApp.CopyPasteType.PASTE_NORMAL, false);
}