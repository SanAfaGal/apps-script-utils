# 📊 Apps Script Utils

Una colección de funciones y utilidades desarrolladas en Google Apps Script para gestionar suscripciones, automatizar procesos financieros y facilitar la comunicación con clientes desde Google Sheets.

---

## 🚀 Funcionalidades Principales

- **Gestión de Suscripciones**: Activación y administración de servicios como Netflix.
- **Seguimiento Financiero**: Registro de compras, ventas, deudas y pagos.
- **Comunicación con Clientes**: Generación de mensajes personalizados y recibos de pago.
- **Automatización de Procesos**: Menús personalizados y atajos de teclado para agilizar tareas.

---

## 🧱 Estructura del Proyecto

El proyecto se organiza en tres componentes principales:

1. **Lógica de Negocio**: Funciones que manejan la activación de plataformas, registro de transacciones y procesamiento de pagos.
2. **Interfaz de Usuario**: Diálogos personalizados, menús en la hoja de cálculo y funciones de copia/exportación.
3. **Gestión de Datos**: Acceso y manipulación de datos en hojas de cálculo, utilizando constantes definidas para referencias consistentes.

---

## 📂 Hojas de Cálculo Utilizadas

- `Compras`: Registro de compras realizadas.
- `Ventas`: Historial de ventas.
- `Pines`: Gestión de códigos PIN.
- `Deudores`: Seguimiento de deudas y pagos.
- `Filtro`: Aplicación de filtros personalizados.
- `Mensajes`: Plantillas de mensajes para clientes.

---

## ⌨️ Atajos de Teclado

| Función                | Atajo de Teclado         | Descripción                          |
|------------------------|--------------------------|--------------------------------------|
| `copiarCorreo()`       | Ctrl + Alt + Shift + 1   | Copiar datos de correo electrónico   |
| `nuevaCompra()`        | Ctrl + Alt + Shift + 1   | Registrar una nueva compra           |
| `mostrarReciboPago()`  | Ctrl + Alt + Shift + 3   | Mostrar recibo de pago               |
| `nuevoRegistro()`      | Ctrl + Alt + Shift + 0   | Crear un nuevo registro              |
| `InsertarNetflix()`    | Ctrl + Alt + Shift + 9   | Insertar datos de Netflix            |
| `confirmarPago()`      | Ctrl + Alt + Shift + 7   | Confirmar un pago                    |
| `actualizarDeudores()` | Ctrl + Alt + Shift + 2   | Actualizar lista de deudores         |
| `actualizarAbono()`    | Ctrl + Alt + Shift + 4   | Actualizar información de abonos     |

---

## 🛠️ Configuración y Uso

1. **Clonar el Repositorio**:  
   ```bash
   git clone https://github.com/SanAfaGal/apps-script-utils.git
   ```
   
2. **Instalar Clasp** (si aún no lo tienes):

   ```bash
   npm install -g @google/clasp
   ```

3. **Iniciar Sesión en Clasp**:

   ```bash
   clasp login
   ```

4. **Vincular el Proyecto**:

   ```bash
   clasp create --title "apps-script-utils" --type sheets
   ```

5. **Subir Archivos al Proyecto**:

   ```bash
   clasp push
   ```

6. **Abrir el Proyecto en el Editor de Apps Script**:

   ```bash
   clasp open
   ```

