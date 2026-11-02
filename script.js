// Lógica interactiva en JavaScript (ES6) para ZenCal
document.addEventListener('DOMContentLoaded', () => {
  console.log("ZenCal JS cargado correctamente y sin errores.");

  const botonesReservar = document.querySelectorAll('.btn-reservar');
  botonesReservar.forEach(boton => {
    boton.addEventListener('click', (e) => {
      const nombreServicio = e.target.getAttribute('data-servicio');
      alert(`¡Excelente elección! Redirigiendo al flujo seguro para reservar: ${nombreServicio}`);
    });
  });
});
