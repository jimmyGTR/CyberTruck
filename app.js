const vitrina = document.getElementById("vitrina");

// 1. Generar las tarjetas dinámicamente
CATALOGO_VARIABLES.forEach(item => {
  const mensajeWa = encodeURIComponent(`Hola, me interesa el artículo ${item.titulo} (${item.id})`);
  const urlWa = `https://wa.me/${MI_MARCA.whatsapp}?text=${mensajeWa}`;

  const tarjeta = document.createElement("article");
  tarjeta.className = "tarjeta-ficha animar-entrada";
  tarjeta.style.borderLeftColor = item.colorAcento;

  tarjeta.innerHTML = `
    <div>
      <img src="${item.imagen}" alt="${item.titulo}" class="ficha-imagen" onerror="this.src='https://placeholder.com'">
      <div class="ficha-cuerpo">
        <span class="ficha-codigo">${item.id} • ${item.subtitulo}</span>
        <h2 class="ficha-titulo">${item.titulo}</h2>
        <div class="ficha-calificacion">${item.calificacion}</div>
        <p class="ficha-desc">${item.descripcion}</p>
        <div class="ficha-datos-tecnicos">
          <strong>⏳ Vida útil:</strong> ${item.vidaUtil}<br>
          <strong>✅ Facilidades:</strong> ${item.aliados.join(" • ")}
        </div>
      </div>
    </div>
    <div class="ficha-cuerpo" style="padding-top: 0;">
      <div class="ficha-acciones">
        <button class="btn btn-video" onclick="abrirVideo('${item.titulo}', '${item.video}')">▶ Ver Video</button>
        <a href="${urlWa}" target="_blank" class="btn btn-pedir">Pedir / Consultar</a>
      </div>
    </div>
  `;

  vitrina.appendChild(tarjeta);
});

// 2. Animación según dónde estés en la pantalla (Scroll Reveal)
const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (entrada.isIntersecting) {
      entrada.target.classList.add("visible");
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll(".animar-entrada").forEach(el => observador.observe(el));

// 3. Funciones para abrir y cerrar el modal de video
function abrirVideo(titulo, rutaVideo) {
  const modal = document.getElementById("modal-video");
  const reproductor = document.getElementById("reproductor-video");
  document.getElementById("modal-titulo").textContent = titulo;
  
  reproductor.src = rutaVideo;
  modal.style.display = "flex";
  reproductor.play();
}

function cerrarVideo(evento, forzar = false) {
  if (forzar || evento.target.id === "modal-video") {
    const modal = document.getElementById("modal-video");
    const reproductor = document.getElementById("reproductor-video");
    reproductor.pause();
    reproductor.src = "";
    modal.style.display = "none";
  }
}
