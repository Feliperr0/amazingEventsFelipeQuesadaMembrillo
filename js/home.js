// Obtener los elementos del DOM
fetch('https://aulamindhub.github.io/amazing-api/events.json')
  .then(response => response.json())
  .then(data => {
    // Una vez tenemos los datos, llamamos a la función para generar las tarjetas
    generarTarjetas(data.events, document.getElementById('contenedorTarjetas'), document.getElementById('filter-search'), checkboxes);
  });

let filterTexto = document.getElementById("filter-search")
let categoryFilters = document.querySelectorAll(".category-filter")
let contenedorTarjetas = document.getElementById("contenedorTarjetas")
const inputFiltro = document.getElementById('filter-search');
const checkboxes = document.querySelectorAll('.category-checkbox');

// Función para generar las tarjetas
function generarTarjetas(datos, contenedor, inputFiltro, checkboxes) {
  contenedor.innerHTML = '';

  // Get selected categories
  const categoriasSeleccionadas = Array.from(checkboxes)
    .filter(checkbox => checkbox.checked)
    .map(checkbox => checkbox.value);

  // Filter data by category and text
  const datosFiltrados = datos.filter(evento => {
    const textoFiltro = inputFiltro.value.toLowerCase();
    return (
      categoriasSeleccionadas.length === 0 ||
      categoriasSeleccionadas.includes(evento.category)
    ) && (
      evento.name.toLowerCase().includes(textoFiltro) ||
      evento.description.toLowerCase().includes(textoFiltro)
    );
  });

  // Check for empty results and display a message if needed
  if (datosFiltrados.length === 0) {
    contenedor.innerHTML = '<p class="no-items-message">No items found.</p>';
    return; // Early exit to prevent unnecessary card creation
  }

  // Create cards for filtered data
  datosFiltrados.forEach(evento => {
    const tarjeta = document.createElement('div');
    tarjeta.classList.add('card');
    tarjeta.innerHTML = `
      <img src="${evento.image}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title text-center">${evento.name}</h5>
        <p class="card-text text-center">${evento.description}</p>
        <div class="container-fluid d-flex justify-content-center">
          <p class="card-text text-center m-2">Price: ${evento.price} </p>
          <a href="details.html?id=${evento._id}" class="btn btn-primary">Details</a>
        </div>
      </div>
    `;
    contenedor.appendChild(tarjeta);
  });
}

// Obtener los datos de la API
fetch('https://aulamindhub.github.io/amazing-api/events.json')
  .then(response => response.json())
  .then(data => {
    // Crear dinámicamente los checkboxes de categorías
    const categoriasUnicas = [...new Set(data.events.map(evento => evento.category))];
    categoriasUnicas.forEach(categoria => {
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.value = categoria;
      checkbox.classList.add('category-checkbox');
      checkbox.id = `category-${categoria}`;
      const label = document.createElement('label');
      label.htmlFor = `category-${categoria}`;
      label.textContent = categoria;
      function generarCheckboxes(categorias, contenedorId) {
  const contenedor = document.getElementById(contenedorId);

  categorias.forEach(categoria => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = categoria;
    checkbox.classList.add('category-checkbox');
    checkbox.id = `category-${categoria}`;

    const label = document.createElement('label');
    label.htmlFor = `category-${categoria}`;
    label.textContent = categoria;

    const li = document.createElement('li');
    li.appendChild(checkbox);
    li.appendChild(label);

    contenedor.appendChild(li);
  });
}

// Agregar los checkboxes a un contenedor (opcional)
      const checkboxes = document.getElementById("container")
    });
    generarCheckboxes(data, checkboxContainer);
    // Generar las tarjetas por primera vez
    generarTarjetas(data.events, contenedorTarjetas, inputFiltro, checkboxes);

    // Agregar event listener al input de búsqueda
    inputFiltro.addEventListener('keyup', () => {
      generarTarjetas(data.events, contenedorTarjetas, inputFiltro, checkboxes);
    });

    // Agregar event listeners a los checkboxes
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', () => {
        generarTarjetas(data.events, contenedorTarjetas, inputFiltro, checkboxes);
      });
    });
  });




// generar los inputs antes que las funciones (de lo contrario no funcionan)


//lógica para separar eventos por pasados y futuros:


/*
function pintarTarjetas(events) {
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
  */
// crear checkbox
function generarCheckboxes(data, container) {

  const categorias = new Set(data.events.map((event) => event.category))

  let checkboxesHTML = "";
  for (const category of categorias) {
    const checkbox = document.createElement('div')
    checkboxesHTML += `
      <div class="form-check form-check-inline">
            <label class="form-check-label" for="checkbox-${category.replace(" ", "-")}"> ${category}
            <input class="form-check-input category-filter" type="checkbox" value="${category}" id="checkbox-${category.replace(" ", "-")}"> 
        </label>
      </div>`
  }


  container.innerHTML = checkboxesHTML
}

// filtrar los eventos
/*
function filterEvents() {
  const buscarTexto = filterTexto.value.toLowerCase();
  const seleccionarCategorias = [...document.querySelectorAll('.category-filter:checked')].map((checkbox) => checkbox.value)

    const filtrarEventos = data.events.filter((event) => {
    const textoEncontrado = event.name.toLowerCase().includes(buscarTexto) || event.description.toLowerCase().includes(buscarTexto)
    const categoriaSeleccionada = seleccionarCategorias.length === 0 || seleccionarCategorias.includes(event.category)
    return textoEncontrado && categoriaSeleccionada
  });

  pintarTarjetas(filtrarEventos)
}
*/












