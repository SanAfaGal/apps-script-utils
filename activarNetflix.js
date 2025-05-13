function activarNetflix() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const fechaActual = new Date();
  const plataforma = 'Netflix';
  const precioCompra = 40000;
  const precioVenta = 42000;

  const hojaPines = ss.getSheetByName(HOJAS.PINES);
  const filaPines = hojaPines.getActiveCell().getRow();
  const correo = hojaPines.getRange(COLS_PINES.CORREO + filaPines).getValue();

  registrarPagoEnPines(hojaPines, filaPines);
  const filaCompras = buscarFilaPorCorreo(ss.getSheetByName(HOJAS.COMPRAS), correo);

  if (filaCompras === -1) {
    SpreadsheetApp.getUi().alert("Correo no encontrado en la hoja 'Compras'.");
    return;
  }

  actualizarCompra(ss.getSheetByName(HOJAS.COMPRAS), filaCompras, fechaActual, precioCompra, precioVenta);
  agregarNotaEnDeudas(ss.getSheetByName(HOJAS.DEUDAS), plataforma, correo, precioVenta);
}

function registrarPagoEnPines(hojaPines, fila) {
  hojaPines.getRange(COLS_PINES.USUARIO + fila).setValue(PROVEEDORES.SAG);
  hojaPines.getRange(COLS_PINES.PAGO + fila).setValue(true);
}

function buscarFilaPorCorreo(hojaCompras, correoBuscado) {
  const correos = hojaCompras.getRange(RANGOS_COMPRAS.CORREOS).getValues();
  for (let i = 0; i < correos.length; i++) {
    if (correos[i][0] === correoBuscado) {
      return i + 1;
    }
  }
  return -1;
}

function actualizarCompra(hojaCompras, fila, fecha, precioCompra, precioVenta) {
  const fechaFormateada = Utilities.formatDate(fecha, Session.getScriptTimeZone(), "dd/MM/yyyy");
  
  hojaCompras.getRange(CELDAS_COMPRAS.DISPONIBILIDAD).copyTo(
    hojaCompras.getRange(COLS_COMPRAS.DISPONIBILIDAD + fila),
    SpreadsheetApp.CopyPasteType.PASTE_NORMAL,
    false
  );
  
  hojaCompras.getRange(COLS_COMPRAS.VALOR_SAG + fila).setValue(precioCompra);
  hojaCompras.getRange(COLS_COMPRAS.VALOR_BGL + fila).setValue(precioVenta);
  hojaCompras.getRange(COLS_COMPRAS.FECHA_INICIO + fila).setValue(fechaFormateada);
}

function agregarNotaEnDeudas(hojaDeudores, plataforma, correo, precioVenta) {
  const celdaNota = hojaDeudores.getRange(CELDAS_DEUDORES.NOTA);
  const celdaFormula = hojaDeudores.getRange(CELDAS_DEUDORES.DEUDAS);

  const notaExistente = celdaNota.getNote() || "";
  const mensaje = `+ ${Math.floor(precioVenta / 1000)}k ${plataforma} ${correo}`;
  const mensajeYaExiste = notaExistente.toLowerCase().includes(mensaje.toLowerCase().trim());

  if (mensajeYaExiste) {
    SpreadsheetApp.getUi().alert("El mensaje ya existe. No se realizó ninguna modificación.");
    return;
  }

  const nuevaNota = notaExistente ? `${notaExistente}\n${mensaje}` : mensaje;
  celdaNota.setNote(nuevaNota);

  let formulaActual = celdaFormula.getFormula();
  if (!formulaActual) {
    formulaActual = "=" + celdaFormula.getValue();
  }
  celdaFormula.setFormula(`${formulaActual}+${precioVenta}`);
}
