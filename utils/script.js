/**
 * Obtiene un valor de una hoja dada una columna tipo letra y una fila numérica.
 * @param {GoogleAppsScript.Spreadsheet.Sheet} hoja 
 * @param {string} columna Letra de columna (ej. "C")
 * @param {number} fila Número de fila
 * @return {any} Valor de la celda
 */
function obtenerValor(hoja, columna, fila) {
  return hoja.getRange(columna + fila).getValue();
}

/**
 * Valida que todos los elementos de una lista sean iguales.
 * Si se proporciona un `valorEsperado`, verifica que todos los elementos coincidan con él.
 * Si no se proporciona, verifica que todos los elementos de la lista sean iguales entre sí.
 *
 * @param {Array} lista - Lista de elementos a validar.
 * @param {string} nombreCampo - Nombre descriptivo del campo, usado en mensajes de error.
 * @param {*} [valorEsperado] - Valor opcional para comparar. Si no se especifica, se usa el primer elemento de la lista como referencia.
 * @throws {Error} Si la lista está vacía, no es un array, o sus elementos no cumplen la condición de igualdad.
 */
function validarElementosIguales(lista, nombreCampo, valorEsperado) {
  // Verifica que el parámetro recibido sea un arreglo válido.
  if (!Array.isArray(lista)) {
    throw new Error(`Se esperaba una lista para el campo "${nombreCampo}".`);
  }

  // Verifica que la lista contenga al menos un elemento.
  if (lista.length === 0) {
    throw new Error(`La lista para el campo "${nombreCampo}" está vacía.`);
  }

  // Determina el valor de referencia: puede ser el valor esperado o el primer elemento de la lista.
  const referencia = valorEsperado !== undefined ? valorEsperado : lista[0];

  // Filtra los elementos que no coinciden con el valor de referencia.
  const diferentes = lista.filter(el => el !== referencia);

  // Si hay elementos distintos, lanza un error explicativo.
  if (diferentes.length > 0) {
    // Mensaje adicional detallado, dependiendo de si hay valorEsperado o no.
    const detalle = valorEsperado !== undefined
      ? `Se esperaba "${valorEsperado}", pero se encontraron valores diferentes: ${[...new Set(lista)].join(', ')}.`
      : `Se encontraron valores distintos: ${[...new Set(lista)].join(', ')}.`;

    // Error principal con nombre del campo y detalle.
    throw new Error(`Todos los valores del campo "${nombreCampo}" deben ser iguales. ${detalle}`);
  }
}

/**
 * Genera un mensaje de deuda o abono.
 * Ej: "+ 40k Netflix Juan" o "- 15k Combo María"
 * @param {number} valor Valor en pesos
 * @param {string} plataforma Nombre de la plataforma
 * @param {string} descripcion Nombre del cliente o correo de la cuenta
 * @param {boolean} esAbono Indica si es abono (true) o deuda (false)
 * @returns {string} Mensaje generado
 */
function generarMensaje(valor, plataforma, descripcion, esAbono = false) {
  const signo = esAbono ? "-" : "+";
  const valorMiles = Math.floor(valor / 1000) + "k";
  return `${signo} ${valorMiles} ${plataforma} ${descripcion}`;
}
