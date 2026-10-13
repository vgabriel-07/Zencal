// DATOS DE EJEMPLO
const proximasReservas = [
  {
    id: 1,
    titulo: "Masaje Relajante Descontracturante",
    ubicacion: "Centro Wellness — Miraflores, Lima",
    fecha: "Sábado, 24 de Octubre — 4:00 PM",
    estado: "Confirmada"
  },
  {
    id: 2,
    titulo: "Clase de Yoga Guiada",
    ubicacion: "Centro Wellness — Miraflores, Lima",
    fecha: "Jueves, 29 de Octubre — 10:00 AM",
    estado: "Confirmada"
  }
];

const historialReservas = [
  {
    id: 3,
    titulo: "Facial Hidratante Profundo",
    ubicacion: "Centro Wellness — San Isidro, Lima",
    fecha: "Viernes, 15 de Septiembre — 3:00 PM",
    estado: "Completada"
  }
];

// ELEMENTOS DEL DOM
const container = document.getElementById("reservas-container");
const tabProximas = document.getElementById("tab-proximas");
const tabHistorial = document.getElementById("tab-historial");
const modal = document.getElementById("modal-cancelar");
const btnCerrarModal = document.getElementById("btn-cerrar-modal");
const btnConfirmarCancelar = document.getElementById("btn-confirmar-cancelar");

let idReservaACancelar = null;

// FUNCIÓN PARA RENDERIZAR TARJETAS
function renderReservas(lista, esHistorial = false) {
  container.innerHTML = "";

  if (lista.length === 0) {
    container.innerHTML = "<p style='text-align:center; color:#777;'>No tienes reservas registradas en esta sección.</p>";
    return;
  }

  lista.forEach(item => {
    const card = document.createElement("div");
    card.className = "card";

    const badgeClass = item.estado.toLowerCase() === "confirmada" ? "confirmada" : "completada";

    card.innerHTML = `
      <div class="card-info">
        <h3>${item.titulo}</h3>
        <p><strong>Ubicación:</strong> ${item.ubicacion}</p>
        <p><strong>Fecha y Hora:</strong> ${item.fecha}</p>
        <span class="badge ${badgeClass}">${item.estado}</span>
      </div>
      <div class="card-actions">
        ${
          !esHistorial
            ? `<button class="btn-secondary">Ver Detalle</button>
               <button class="btn-danger" onclick="abrirModal(${item.id})">Cancelar Reserva</button>`
            : `<button class="btn-secondary">Volver a Reservar</button>
               <button style="background:#e0e0e0; color:#333;">Dejar Reseña</button>`
        }
      </div>
    `;

    container.appendChild(card);
  });
}

// CAMBIO DE PESTAÑAS (TABS)
tabProximas.addEventListener("click", () => {
  tabProximas.classList.add("active");
  tabHistorial.classList.remove("active");
  renderReservas(proximasReservas, false);
});

tabHistorial.addEventListener("click", () => {
  tabHistorial.classList.add("active");
  tabProximas.classList.remove("active");
  renderReservas(historialReservas, true);
});

// MODAL DE CANCELACIÓN
function abrirModal(id) {
  idReservaACancelar = id;
  modal.classList.remove("hidden");
}

btnCerrarModal.addEventListener("click", () => {
  modal.classList.add("hidden");
});

btnConfirmarCancelar.addEventListener("click", () => {
  if (idReservaACancelar) {
    const index = proximasReservas.findIndex(r => r.id === idReservaACancelar);
    if (index !== -1) {
      proximasReservas.splice(index, 1);
      renderReservas(proximasReservas, false);
    }
  }
  modal.classList.add("hidden");
});

// CARGA INICIAL
renderReservas(proximasReservas, false);
