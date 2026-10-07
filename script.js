// Contador de escaneos (opcional).
// Si pegás acá la URL /exec de tu Apps Script, cada visita anota la tienda en tu Sheet.
// Si lo dejás vacío, la página funciona igual y no cuenta nada.
const LOG_URL = '';

(function () {
  if (!LOG_URL) return;

  // Tienda que viene en el link del QR: ?t=sm o ?t=cs
  const t = (new URLSearchParams(location.search).get('t') || '').toLowerCase();

  // No contar dos veces si la persona recarga la página
  const clave = 'escaneo_' + t;
  try {
    if (sessionStorage.getItem(clave)) return;
    sessionStorage.setItem(clave, '1');
  } catch (e) {}

  fetch(LOG_URL + '?log=1&t=' + encodeURIComponent(t), { mode: 'no-cors', keepalive: true })
    .catch(function () {});
})();
