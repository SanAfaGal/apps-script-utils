function renovacion() {
  // Obtener la hoja activa
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  // Obtener la celda activa
  var celda = hoja.getActiveCell();
  // Obtener la fila de la celda activa
  var fila = celda.getRow();
  
  // Obtener los valores necesarios de la hoja
  var cliente = hoja.getRange(COLS_VENTAS.CLIENTE + fila).getValue();
  var plataforma = hoja.getRange(COLS_VENTAS.PLATAFORMA + fila).getValue();
  var pantalla = hoja.getRange(COLS_VENTAS.PANTALLA + fila).getValue();
  
  // Extraer la primera palabra después del primer espacio en el valor de cliente
  var nombreCliente = cliente.split(' ')[0];
  
  // Crear el texto
  var texto = "Hola, " + nombreCliente + ". Buen día. Hoy empieza otro mes de *" + plataforma +"*: _" + pantalla + "_, ¿desea continuar?"
  
    // Mostrar un mensaje copiable
  DialogUtils.mostrarTextoCopiable(texto, "Renovar");
}
