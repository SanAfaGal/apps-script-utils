/**
 * Devuelve una lista de índices de fila a partir de uno o varios rangos seleccionados.
 *
 * Esta función permite obtener todas las filas individuales involucradas en un 
 * `RangeList`, incluso si los rangos no son contiguos. 
 * Útil para procesar múltiples selecciones hechas manualmente por el usuario.
 * 
 * @param {GoogleAppsScript.Spreadsheet.RangeList} rangeList - Lista de rangos seleccionados en la hoja.
 * 
 * @returns {number[]} Arreglo de números de fila (base 1), uno por cada fila incluida
 * en todos los rangos seleccionados.
 *
 * @example
 * const rangeList = hoja.getActiveRangeList();
 * const filas = obtenerFilasDeRangos(rangeList);
 * // Resultado posible: [3, 4, 5, 10, 11] si se seleccionaron dos bloques
 */
function obtenerFilasDeRangos(rangeList) {
  return rangeList.getRanges().flatMap(rango => {
    const inicio = rango.getRow();
    return Array.from({ length: rango.getNumRows() }, (_, i) => inicio + i);
  });
}


/**
 * Lee múltiples campos (valores) desde una fila específica de una hoja de cálculo.
 * 
 * Esta función permite extraer varios datos de una misma fila especificando 
 * las columnas que contienen dichos datos. Es especialmente útil para trabajar 
 * con estructuras tipo diccionario, facilitando la lectura limpia de registros.
 * 
 * @param {GoogleAppsScript.Spreadsheet.Sheet} hoja - Hoja desde donde se desea leer.
 * @param {number} fila - Número de fila desde la cual se leerán los valores (base 1).
 * @param {Object} columnas - Objeto con pares clave-valor donde:
 *   - La **clave** representa el nombre lógico del campo (por ejemplo: "correo", "plataforma").
 *   - El **valor** representa la letra o etiqueta de columna (por ejemplo: "C", "E", etc.).
 * 
 * @returns {Object} Un objeto con los valores leídos, usando las claves definidas.
 * 
 * @example
 * const datos = leerValoresDeFila(hoja, 5, {
 *   correo: "C",
 *   plataforma: "E",
 *   pais: "F"
 * });
 * // Resultado: { correo: 'ejemplo@gmail.com', plataforma: 'Netflix', pais: 'Chile' }
 */
function leerValoresDeFila(hoja, fila, columnas) {
  const valores = {};
  for (const [clave, col] of Object.entries(columnas)) {
    valores[clave] = hoja.getRange(col + fila).getValue();
  }
  return valores;
}


/**
 * Busca un valor asociado a una combinación de dos claves (valor1 y valor2) dentro de dos columnas.
 * 
 * Esta función permite obtener un valor relacionado desde una hoja de cálculo 
 * cuando se cuenta con dos valores de referencia (por ejemplo, correo y plataforma).
 * Es útil en casos donde un dato (como una contraseña) depende de la coincidencia exacta 
 * de ambas claves en una misma fila.
 * 
 * @param {string} valor1 - Primer valor de búsqueda (ej. correo electrónico).
 * @param {string} valor2 - Segundo valor de búsqueda (ej. nombre de la plataforma).
 * @param {Array[]} columna1 - Columna que contiene todos los posibles valores del primer campo (como matriz vertical).
 * @param {Array[]} columna2 - Columna que contiene todos los posibles valores del segundo campo (como matriz vertical).
 * @param {GoogleAppsScript.Spreadsheet.Sheet} hoja - Hoja donde se encuentra el valor a devolver.
 * @param {string} columnaResultado - Letra o referencia de columna desde la cual se extraerá el valor deseado (ej. "E").
 * 
 * @returns {string} El valor asociado si se encuentra una fila donde ambos valores coincidan. Si no se encuentra, devuelve una cadena vacía.
 * 
 * @example
 * const clave = buscarValorRelacionado("correo@ejemplo.com", "Netflix", colCorreos, colPlataformas, hoja, "E");
 */
function buscarValorRelacionado(valor1, valor2, columna1, columna2, hoja, columnaResultado) {
  for (let i = 0; i < columna1.length; i++) {
    const coincideValor1 = columna1[i][0] === valor1;
    const coincideValor2 = columna2[i][0] === valor2;
    
    if (coincideValor1 && coincideValor2) {
      return hoja.getRange(columnaResultado + (i + 1)).getValue();
    }
  }
  return "";
}

/**
 * Construye un mensaje formateado para compartir credenciales de una suscripción,
 * usando una plantilla específica para cuentas con pantalla (usuario individual).
 * 
 * El mensaje resultante incluye plataforma, país (si existe), nombre de pantalla 
 * (si aplica), correo, contraseña y pin (si corresponde), todo en formato amigable 
 * para enviar por WhatsApp u otras plataformas.
 * 
 * @param {Object} datos - Objeto con los campos requeridos para el mensaje.
 * @param {string} datos.plataforma - Nombre de la plataforma (ej. "Netflix").
 * @param {string} [datos.pais] - País asociado a la suscripción (opcional).
 * @param {string} [datos.pantalla] - Nombre del usuario/pantalla (puede ser "*" o "-").
 * @param {string} datos.correo - Correo electrónico asociado.
 * @param {string} datos.clave - Contraseña correspondiente.
 * @param {string} [datos.pin] - PIN adicional (opcional).
 * @param {string} emoji - Emoji representativo de la plataforma.
 * 
 * @returns {string} Mensaje formateado listo para copiar o enviar.
 * 
 * @example
 * const mensaje = formatearMensajePantalla({
 *   plataforma: "Netflix",
 *   pais: "🇨🇴",
 *   pantalla: "Santi",
 *   correo: "ejemplo@mail.com",
 *   clave: "123456",
 *   pin: "0000"
 * }, "🍿");
 */
function formatearMensajePantalla(datos, emoji) {
  const partes = [
    `${emoji} *${datos.plataforma?.toUpperCase()}*`,                                      // Plataforma en negrita con emoji
    datos.pais ? `_País:_ ${datos.pais}` : null,                                          // País si existe
    datos.pantalla === '-' || !datos.pantalla ? null : `_Usuario:_ *${datos.pantalla}*`,  // Mostrar pantalla si no es '-' ni vacío
    `_Correo:_ ${datos.correo}`,                                                          // Correo
    `_Contraseña:_ ${datos.clave}`,                                                       // Contraseña
    datos.pin && !['', '*', '-'].includes(datos.pin) ? `Pin: ${datos.pin}` : null         // Pin si aplica
  ];

  return partes.filter(Boolean).join("\n"); // Elimina elementos nulos y une con saltos de línea
}


/**
 * Copia los datos de acceso de múltiples suscripciones seleccionadas en la hoja actual.
 * 
 * Esta función obtiene las filas seleccionadas, lee los campos clave (plataforma, correo, etc.),
 * busca la contraseña correspondiente en la hoja de compras, formatea el mensaje para cada fila
 * usando una plantilla predefinida y finalmente muestra el resultado en un cuadro de diálogo
 * con texto copiable, ideal para compartir por WhatsApp u otros medios.
 * 
 * Requiere:
 * - Que las constantes `HOJAS`, `RANGOS_COMPRAS`, `COLS_VENTAS`, `COLS_COMPRAS`, y `PLATAFORMAS` estén definidas.
 * - Que las funciones auxiliares `obtenerFilasDeRangos`, `leerValoresDeFila`, `buscarValorRelacionado`, y `formatearMensajePantalla` estén disponibles.
 */
function copiarCorreo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoja = ss.getActiveSheet();
  const hojaCompras = ss.getSheetByName(HOJAS.COMPRAS);

  // Verifica la existencia de la hoja de compras
  if (!hojaCompras) {
    SpreadsheetApp.getUi().alert("Falta la hoja de compras");
    return;
  }

  // Obtiene todas las filas de los rangos seleccionados (pueden ser múltiples, no contiguas)
  const filas = obtenerFilasDeRangos(hoja.getActiveRangeList());

  // Carga los datos necesarios desde la hoja de compras para realizar la búsqueda de claves
  const datosCorreos = hojaCompras.getRange(RANGOS_COMPRAS.CORREOS).getValues();
  const datosPlataformas = hojaCompras.getRange(RANGOS_COMPRAS.PLATAFORMAS).getValues();

  // Construye el mensaje por cada fila válida
  const mensajes = filas.map(fila => {

    // Lee todos los campos relevantes de una fila de la hoja actual
    const datos = leerValoresDeFila(hoja, fila, {
      plataforma: COLS_VENTAS.PLATAFORMA,
      pais: COLS_VENTAS.PAIS,
      pantalla: COLS_VENTAS.PANTALLA,
      correo: COLS_VENTAS.CORREO,
      pin: COLS_VENTAS.PIN
    });

    // Omite si faltan datos clave
    if (!datos.correo || !datos.plataforma) return null;

    // Busca la contraseña asociada al correo y plataforma en la hoja de compras
    datos.clave = buscarValorRelacionado(
      datos.correo,
      datos.plataforma,
      datosCorreos,
      datosPlataformas,
      hojaCompras,
      COLS_COMPRAS.CONTRASEÑA
    );

    // Obtiene el emoji de la plataforma o usa uno por defecto
    const emoji = PLATAFORMAS[datos.plataforma]?.emoji || '❓';

    // Genera el mensaje formateado
    return formatearMensajePantalla(datos, emoji);
    
  }).filter(Boolean); // Elimina nulos

  // Une todos los mensajes con doble salto de línea y muestra el texto final en un cuadro copiable
  const textoFinal = mensajes.join("\n\n");
  DialogUtils.mostrarTextoCopiable(textoFinal, "Datos de acceso");
}

