/**
 * Clase utilitaria para mostrar diálogos modales personalizados en Google Sheets.
 * Incluye cuadros de texto copiable y enlaces clickeables.
 */
var DialogUtils = {

  /**
   * Muestra un cuadro de diálogo con un texto que se copia automáticamente al portapapeles.
   *
   * @param {string} mensaje - El texto a mostrar y copiar.
   * @param {string} titulo - Título del cuadro de diálogo.
   * @param {number} [ancho=400] - Ancho del cuadro de diálogo (en píxeles).
   * @param {number} [alto=180] - Altura del cuadro de diálogo (en píxeles).
   */
  mostrarTextoCopiable: function(mensaje, titulo, ancho = 400, alto = 180) {
  const htmlContent = `
    <div style="font-family:sans-serif; padding:10px; height:100%;">
      <textarea id="mensaje" 
        style="
          width:100%; 
          height:130px; 
          box-sizing: border-box; 
          resize: None;
          font-size:14px;
          padding:8px;
        ">${mensaje}</textarea>

      <script>
        window.onload = function() {
          const textarea = document.getElementById("mensaje");
          textarea.focus();
          textarea.select();
          document.execCommand("copy");

          window.addEventListener("keydown", function(event) {
            if (event.key === "Escape") {
              google.script.host.close();
            }
          });
        };
      </script>
    </div>
  `;

  const htmlOutput = HtmlService.createHtmlOutput(htmlContent)
    .setWidth(ancho)
    .setHeight(alto);

  SpreadsheetApp.getUi().showModalDialog(htmlOutput, titulo);
  },


  /**
   * Muestra un cuadro de diálogo con un enlace clickeable para descargar un archivo.
   *
   * @param {string} link - URL del archivo.
   * @param {string} nombreArchivo - Texto del enlace (nombre del archivo).
   * @param {string} [titulo="Archivo disponible"] - Título del diálogo.
   * @param {number} [ancho=400] - Ancho del cuadro de diálogo.
   * @param {number} [alto=100] - Altura del cuadro de diálogo.
   */
  mostrarEnlaceDescarga: function(link, nombreArchivo, titulo = "📁 Tu archivo está listo", ancho = 400, alto = 100) {
    const html = HtmlService.createHtmlOutput(`
      <div style="font-family:sans-serif">
        <p>Haz clic en el siguiente enlace para descargar:</p>
        <a href="${link}" target="_blank" style="font-size:14px;">📥 Descargar ${nombreArchivo}</a>
      </div>
    `).setWidth(ancho).setHeight(alto);

    SpreadsheetApp.getUi().showModalDialog(html, titulo);
  }

};
