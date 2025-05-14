/**
 * Genera un resumen estructurado de los pagos de suscripciones activas
 * y muestra un mensaje listo para copiar y enviar por WhatsApp.
 * 
 * Recorre las celdas seleccionadas en la hoja activa, obtiene los datos clave,
 * calcula el total pagado y construye un mensaje con formato amigable.
 */
function generarMensajeResumenPagos() {
  const hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const rangos = hoja.getActiveRangeList().getRanges();

  // Lista de meses en español para formatear fechas legibles
  const meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  let total = 0;       // Acumulador del valor total
  const partes = [];   // Array con fragmentos individuales del mensaje

  rangos.forEach(rango => {
    const filas = rango.getValues(); 
    const filaInicio = rango.getRow();

    filas.forEach((_, i) => {
      const fila = filaInicio + i;

      // Extraer información relevante desde la hoja, usando columnas definidas
      const nombrePlataforma = obtenerValor(hoja, COLS_COMPRAS.PLATAFORMA, fila);
      const plan = obtenerValor(hoja, COLS_COMPRAS.PLAN, fila);
      const pais = obtenerValor(hoja, COLS_COMPRAS.PAIS, fila);
      const correo = obtenerValor(hoja, COLS_COMPRAS.CORREO, fila);
      const valor = obtenerValor(hoja, COLS_COMPRAS.VALOR_SAG, fila);
      const inicio = obtenerValor(hoja, COLS_COMPRAS.FECHA_INICIO, fila);
      const fin = obtenerValor(hoja, COLS_COMPRAS.FECHA_FIN, fila);

      total += valor;  // Sumar al total general

      // Formatear las fechas en estilo "13 abril – 13 mayo"
      const fechaInicio = `${inicio.getDate()} ${meses[inicio.getMonth()]}`;
      const fechaFin = `${fin.getDate()} ${meses[fin.getMonth()]}`;

      // Obtener el emoji asociado a la plataforma o uno por defecto
      const emoji = PLATAFORMAS[nombrePlataforma]?.emoji || '❓';

      // Condicionar el uso del plan
      const textoPlan = (plan && plan !== '-') ? ` ${plan}` : '';

      // Condicionar el uso del país
      const textoPais = pais ? `${pais} ` : '';

      // Construir una sección del mensaje para este registro
      partes.push(
        `${emoji} *${nombrePlataforma}${textoPlan}* – \$${valor.toLocaleString("es-CO")}\n` +
        `${textoPais}${correo}\n📆 ${fechaInicio} – ${fechaFin}`
      );
    });
  });

  // Armar el mensaje completo con título, total y cada sección
  const mensaje =
    `📅 *Pago de suscripciones activas:*\n` +
    `💰 *Valor total:* \$${total.toLocaleString("es-CO")}\n\n` +
    partes.join("\n\n");

  // Mostrar el mensaje en un cuadro listo para copiar
  DialogUtils.mostrarTextoCopiable(mensaje, "Resumen de pagos");
}
