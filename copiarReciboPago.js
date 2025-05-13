function mostrarReciboPago() {
  // 1. Obtener la hoja activa
  var hoja = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // 2. Obtener todos los rangos seleccionados (incluso si no son consecutivos)
  var rangoList = hoja.getActiveRangeList().getRanges();

  // 3. Crear un diccionario para agrupar los registros por clave única
  var grupos = {};

  // 4. Inicializar el total general
  var total = 0;

  // 5. Array con nombres de los meses en español
  var meses = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"
  ];

  // 6. Recorrer cada rango seleccionado
  for (var r = 0; r < rangoList.length; r++) {
    var rango = rangoList[r];
    var filas = rango.getValues();

    // 7. Recorrer cada fila dentro del rango actual
    for (var i = 0; i < filas.length; i++) {
      var fila = rango.getRow() + i; // Número real de la fila en la hoja

      // 8. Obtener los valores necesarios desde columnas específicas (ajustar los índices si es necesario)
      var plataforma = hoja.getRange(COLS_VENTAS.PLATAFORMA + fila).getValue();
      var pantalla = hoja.getRange(COLS_VENTAS.PANTALLA + fila).getValue();
      var renovacionFecha = hoja.getRange(COLS_VENTAS.FECHA_RENOVACION + fila).getValue();
      var valor = hoja.getRange(COLS_VENTAS.VALOR + fila).getValue();
      var corte27 = hoja.getRange(COLS_VENTAS.CORTE27 + fila).getValue();

      // 9. Determinar los días de servicio según si tiene corte el día 27
      var diasServicio = corte27 ? 27 : 30;

      // 10. Crear clave única para agrupar por pantalla + fecha + días
      var clave = pantalla + "|" + new Date(renovacionFecha).toDateString() + "|" + diasServicio;

      // 11. Inicializar el grupo si no existe
      if (!grupos[clave]) {
        grupos[clave] = {
          plataformas: new Set(), // Evita plataformas duplicadas
          renovacion: new Date(renovacionFecha),
          dias: diasServicio,
          pantalla: pantalla,
          valor: 0
        };
      }

      // 12. Agregar plataforma y sumar el valor al grupo
      grupos[clave].plataformas.add(plataforma);
      grupos[clave].valor += valor;

      // 13. Sumar al total general
      total += valor;
    }
  }

  // 14. Crear partes del mensaje agrupadas por clave
  var partes = [];
  for (var clave in grupos) {
    var g = grupos[clave];
    var plataformas = Array.from(g.plataformas).join(", ");
    var dia = g.renovacion.getDate();
    var mes = meses[g.renovacion.getMonth()];

    partes.push(
      `✅ Recibí pago de *${plataformas}* _(${g.dias} días)_\n` +
      `_Renovación:_ ${dia} de ${mes}\n` +
      `_Usuario:_ *${g.pantalla}*`
    );
  }

  // 15. Formatear el valor total como moneda colombiana
  var mensaje = partes.join("\n\n");
  var valorFinal = total.toLocaleString("es-CO", {
    style: "currency",
    currency: "COP",
    maximumFractionDigits: 0
  });

  mensaje += `\n\n_Valor:_ ${valorFinal}\n🎉 Gracias`;

    // Mostrar un mensaje copiable
  DialogUtils.mostrarTextoCopiable(mensaje, "Recibo de pago");
}
