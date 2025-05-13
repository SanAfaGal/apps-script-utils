/**
 * Registra una transacción como deuda o abono según corresponda.
 *
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} spreadsheet - Hoja de cálculo activa.
 * @param {string} mensaje - Descripción de la transacción.
 * @param {number} monto - Monto de la transacción.
 * @param {boolean} esAbono - Si es un abono (true) o una deuda (false).
 */
function registrarTransaccionDeuda(ss, mensaje, monto, esAbono) {
  const metodo = esAbono ? 'agregarAbono' : 'agregarDeuda';
  DeudaService[metodo](ss, mensaje, monto);
}

/**
 * Obtiene los datos necesarios desde rangos seleccionados en la hoja de ventas.
 *
 * @param {GoogleAppsScript.Spreadsheet.Sheet} hoja - Hoja activa.
 * @param {GoogleAppsScript.Spreadsheet.Range[]} rangos - Rangos seleccionados.
 * @returns {{ plataformas: Set<string>, clientes: string[], comisionistas: string[], total: number }}
 */
function obtenerDatosMovimientoCliente(hoja, rangos) {
  let plataformas = new Set();
  let clientes = [];
  let comisionistas = [];
  let total = 0;

  rangos.forEach(rango => {
    const filaInicio = rango.getRow();
    const numFilas = rango.getNumRows();

    for (let i = 0; i < numFilas; i++) {
      const fila = filaInicio + i;
      const plataforma = obtenerValor(hoja, COLS_VENTAS.PLATAFORMA, fila);
      const comisionista = obtenerValor(hoja, COLS_VENTAS.COMISIONISTA, fila);
      const cliente = obtenerValor(hoja, COLS_VENTAS.CLIENTE, fila);
      const valor = obtenerValor(hoja, COLS_VENTAS.VALOR, fila);

      comisionistas.push(comisionista);
      plataformas.add(plataforma);
      clientes.push(cliente);
      total += valor;
    }
  });

  return { plataformas, clientes, comisionistas, total };
}

/**
 * Registra un movimiento (deuda o abono) en la hoja de ventas para un cliente.
 *
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss - Spreadsheet activo.
 * @param {boolean} esAbono - true si es abono, false si es deuda.
 * @param {string} inicialComisionista - Inicial esperada del comisionista ('B' o 'S').
 */
function registrarMovimientoCliente(ss, esAbono, inicialComisionista) {
  const hoja = ss.getActiveSheet();
  const rangos = hoja.getActiveRangeList().getRanges();

  const { plataformas, clientes, comisionistas, total } = obtenerDatosMovimientoCliente(hoja, rangos);

  validarElementosIguales(clientes, 'clientes');
  validarElementosIguales(comisionistas, 'comisionistas', inicialComisionista);

  const cliente = clientes[0];
  const plataformaFinal = plataformas.size > 1 ? 'Combo' : [...plataformas][0];
  const mensaje = generarMensaje(total, plataformaFinal, cliente, esAbono);

  registrarTransaccionDeuda(ss, mensaje, total, esAbono);
}

/**
 * Registra un movimiento (deuda o abono) en la hoja de compras para un vendedor.
 *
 * @param {GoogleAppsScript.Spreadsheet.Spreadsheet} ss - Spreadsheet activo.
 * @param {boolean} esAbono - true si es abono, false si es deuda.
 * @param {number} celdaValor - Índice de columna que contiene el valor.
 */
function registrarMovimientoVendedor(ss, esAbono, celdaValor) {
  const hoja = ss.getActiveSheet();
  const celda = hoja.getActiveCell();
  const fila = celda.getRow();

  const plataforma = obtenerValor(hoja, COLS_COMPRAS.PLATAFORMA, fila);
  const valor = obtenerValor(hoja, celdaValor, fila);
  const correo = obtenerValor(hoja, COLS_COMPRAS.CORREO, fila);

  if (valor == null || isNaN(valor)) {
    throw new Error("El valor de la transacción no es válido.");
  }

  const mensaje = generarMensaje(valor, plataforma, correo, esAbono);

  registrarTransaccionDeuda(ss, mensaje, valor, esAbono);
}

/**
 * Actualiza el movimiento registrado según tipo y rol.
 *
 * @param {"deuda" | "abono"} tipo - Tipo de movimiento.
 * @param {"cliente" | "vendedor"} rol - Rol al que se aplica el movimiento.
 */
function actualizarMovimiento(tipo, rol) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const esAbono = tipo === 'abono';

  if (rol === 'cliente') {
    const inicial = esAbono ? 'B' : 'S';
    registrarMovimientoCliente(ss, esAbono, inicial);
  } else if (rol === 'vendedor') {
    const col = esAbono ? COLS_COMPRAS.VALOR_SAG : COLS_COMPRAS.VALOR_BGL;
    registrarMovimientoVendedor(ss, esAbono, col);
  }
}

/** Funciones concretas para menú o botones personalizados */
function actualizarDeudaCliente()   { actualizarMovimiento('deuda', 'cliente'); }
function actualizarAbonoCliente()   { actualizarMovimiento('abono', 'cliente'); }
function actualizarDeudaVendedor()  { actualizarMovimiento('deuda', 'vendedor'); }
function actualizarAbonoVendedor()  { actualizarMovimiento('abono', 'vendedor'); }
