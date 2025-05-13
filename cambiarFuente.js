function cambiarFuente() {
  var fuente = "Varela Round";  // Cambia esto por la fuente que desees
  var hojas = SpreadsheetApp.getActiveSpreadsheet().getSheets();
  var tamano = 8;

  hojas.forEach(function(hoja) {
    var rango = hoja.getDataRange();
    rango.setFontFamily(fuente);
    rango.setFontSize(tamano);
  });
}
