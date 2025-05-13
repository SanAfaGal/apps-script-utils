function copiarCorreo() {
  // Obtiene la hoja activa y la fila activa (la fila en la que está el cursor).
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getActiveSheet();
  const fila = hoja.getActiveCell().getRow();
  
  // Obtener los valores necesarios de la hoja activa.
  var plataforma = hoja.getRange(COLS_VENTAS.PLATAFORMA + fila).getValue();
  var pais = hoja.getRange(COLS_VENTAS.PAIS + fila).getValue();
  var pantalla = hoja.getRange(COLS_VENTAS.PANTALLA + fila).getValue();
  var correo = hoja.getRange(COLS_VENTAS.CORREO + fila).getValue()
  var pin = hoja.getRange(COLS_VENTAS.PIN + fila).getValue();
  
  // Inicializa la variable que almacenará la contraseña, inicialmente vacía.
  let clave = "";
  
  // Verifica que tanto el correo como la plataforma tengan valores antes de proceder con la búsqueda de la contraseña.
  if (correo && plataforma) {

    // Accede a la hoja de "Compras" donde se almacenan las contraseñas.
    const hojaCompras = ss.getSheetByName(HOJAS.COMPRAS);
    
    // Verifica si la hoja "Compras" existe.
    if (hojaCompras) {

      // Carga los valores de las columnas de correos y plataformas de la hoja "Compras".
      const datosCorreos = hojaCompras.getRange(RANGOS_COMPRAS.CORREOS).getValues();
      const datosPlataformas = hojaCompras.getRange(RANGOS_COMPRAS.PLATAFORMAS).getValues();
      
      // Busca una coincidencia en los datos de la hoja "Compras" para el correo y la plataforma.
      for (let i = 0; i < datosCorreos.length; i++) {
        const correoCoincide = correo && datosCorreos[i][0] === correo;
        const plataformaCoincide = plataforma && datosPlataformas[i][0] === plataforma;
        
        // Si se encuentra la coincidencia, se asigna la contraseña correspondiente.
        if (correoCoincide && plataformaCoincide) {
          clave = hojaCompras.getRange(COLS_COMPRAS.CONTRASEÑA + (i + 1)).getValue();
          break;
        }
      }
    }
  }
  
  // Generación del texto que se mostrará en el cuadro de diálogo.
  var texto = "*" + plataforma.toUpperCase() + "*" + // Formato en negrita para la plataforma.
              (pais ? "\nPaís: " + pais : "") + // Muestra el país si está disponible.
              (pantalla === "*" || pantalla === "" ? "" : (pantalla === "-" ? "\n_Cuenta completa_" : "\nUsuario: " + pantalla)) + // Muestra el usuario, excepto si está marcado con "*" o "-".
              "\nCorreo: " + correo + // Muestra el correo.
              "\nContraseña: " + clave + // Muestra la contraseña obtenida.
              (pin === "" || pin === "*" || pin === "-" ? "" : "\nPin: " + pin); // Muestra el pin si no está vacío ni marcado con "*" o "-".
  
  // Mostrar un mensaje copiable
  DialogUtils.mostrarTextoCopiable(texto, "Correo");
}
