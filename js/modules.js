export function pintarTarjetas(events, contenedorTarjetas) {
    contenedorTarjetas.innerHTML = ""

    if (events.length === 0) {

      contenedorTarjetas.innerHTML = "<p>No items found.</p>"
      return
    }
  
    for (let i = 0; i < events.length; i++) {
      const tarjeta = document.createElement("div")
      tarjeta.className = "card m-1"
      tarjeta.innerHTML = `
          <img src="${events[i].image}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title text-center">${events[i].name}</h5>
            <p class="card-text text-center">${events[i].description}</p>
            <div class="container-fluid d-flex justify-content-center">
              <p class="card-text text-center m-2">Price: ${events[i].price} </p>
              <a  href="details.html?id=${events[i]._id}" class="btn btn-primary">Details</a>
            </div>
          </div>
        `
      contenedorTarjetas.appendChild(tarjeta)
    }
  }
  
  export function filterEvents(filtrarEventos, contenedorTarjetas) {
    const buscarTexto = filterTexto.value.toLowerCase();
    const seleccionarCategorias = [...document.querySelectorAll('.category-filter:checked')].map((checkbox) => checkbox.value)
  
      const filtrarEventos = data.events.filter((event) => {
      const textoEncontrado = event.name.toLowerCase().includes(buscarTexto) || event.description.toLowerCase().includes(buscarTexto)
      const categoriaSeleccionada = seleccionarCategorias.length === 0 || seleccionarCategorias.includes(event.category)
      return textoEncontrado && categoriaSeleccionada
    });
  
    pintarTarjetas(filtrarEventos, contenedorTarjetas)
  }