//  Functions general cards

export function pintarCheckbox(arregloCategorias) {
  for (let i = 0; i < arregloCategorias.length; i++) {
    const nuevoCheck = document.createElement("div")
    nuevoCheck.className = "col-12 col-sm-6 col-md-4 col-lg-2 d-flex align-items-center justify-content-center mb-2"
    nuevoCheck.innerHTML = `
  
          <input type="checkbox" class="me-2" category-filter" value="${arregloCategorias[i]}" id="${arregloCategorias[i]}"> 
      <label for="${arregloCategorias[i]}"> ${arregloCategorias[i]} </label>
    `
    document.getElementById("checkboxContainer").appendChild(nuevoCheck)

  }

}
export function filtroTexto(arregloEventos) {
  let texto = document.getElementById("inputTexto").value.toLowerCase()
  console.log(texto)
  let arregloFiltrado = arregloEventos
  if (texto != null || texto != undefined) {
    arregloFiltrado = arregloEventos.filter(evento => evento.name.toLowerCase().includes(texto)) || evento.description.toLowerCase().includes(texto)

  }
  return arregloFiltrado


}
export function filtroChecks(arregloEventos) {
  let checkboxChecked = [...document.querySelectorAll('input[type=checkbox]:checked')]
  checkboxChecked = checkboxChecked.map(e => e.value)

  let arregloFiltrado = arregloEventos
  if (checkboxChecked.length != 0) {
    arregloFiltrado = arregloEventos.filter(evento => checkboxChecked.includes(evento.category))
  }
  return arregloFiltrado


}
export function pintarTarjetas(arregloEventos) {

  let contenedorTarjetas = document.getElementById("contenedorTarjetas")
  contenedorTarjetas.innerHTML = ""
  if (arregloEventos.length === 0) {
    contenedorTarjetas.innerHTML = "<p>No items found.</p>"
    return
  }

  for (let i = 0; i < arregloEventos.length; i++) {
    const tarjeta = document.createElement("div")
    tarjeta.className = "card m-1"
    tarjeta.innerHTML = `
      <img src="${arregloEventos[i].image}" class="card-img-top">
      <div class="card-body">
        <h5 class="card-title text-center">${arregloEventos[i].name}</h5>
        <p class="card-text text-center">${arregloEventos[i].description}</p>
        <div class="container-fluid d-flex justify-content-center">
          <p class="card-text text-center m-2">Price: ${arregloEventos[i].price} </p>
          <a href="details.html?id=${arregloEventos[i]._id}" class="btn btn-primary">Details</a>
        </div>
      </div>
    `
    contenedorTarjetas.appendChild(tarjeta)

  }
}

// Functions Stats Page
export function createEventTable() {
  fetch('https://aulamindhub.github.io/amazing-api/events.json')
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      const tableHTML = generateTableHTML(data);

      const tableContainer = document.getElementById('tableContainer');
      tableContainer.innerHTML = tableHTML;
    })
    .catch(error => {
      console.error('Error al obtener los datos:', error);
      // Mostrar un mensaje de error al usuario
      const tableContainer = document.getElementById('tableContainer');
      tableContainer.innerHTML = '<p>No Data Found.</p>';
    });
}
export function generateTableHTML(data) {
  // Función para calcular el porcentaje de asistencia
  const calculateAssistancePercentage = (assistance, capacity) => {
    return ((assistance / capacity) * 100).toFixed(2);
  };

  // Encontrar eventos con mayor y menor asistencia, y mayor capacidad
  const highestAssistanceEvent = data.events.reduce((prev, current) => {
    const prevPercentage = calculateAssistancePercentage(prev.assistance || prev.estimate, prev.capacity);
    const currentPercentage = calculateAssistancePercentage(current.assistance || current.estimate, current.capacity);
    return prevPercentage > currentPercentage ? prev : current;
  });

  const lowestAssistanceEvent = data.events.reduce((prev, current) => {
    const prevPercentage = calculateAssistancePercentage(prev.assistance || prev.estimate, prev.capacity);
    const currentPercentage = calculateAssistancePercentage(current.assistance || prev.estimate, current.capacity);
    return prevPercentage < currentPercentage ? prev : current;
  });


  const largestCapacityEvent = data.events.reduce((prev, current) => {
    return prev.capacity > current.capacity ? prev : current;
  });

  // Generar el HTML de la tabla
  let tableHTML = `
      <table class="table table-dark table-hover table-bordered">
          <thead class="table-light">
              <tr>
                  <th colspan="3">Events Statistics</th>
              </tr>
          </thead>
          <tbody>
              <tr>
                  <th>Events with highest % of assistance</th>
                  <th>Events with lowest % of assistance</th>
                  <th>Events with large capacity</th>
              </tr>
              <tr>
                  <td>${highestAssistanceEvent.name} (${calculateAssistancePercentage(highestAssistanceEvent.assistance, highestAssistanceEvent.capacity)}%)</td>
                  <td>${lowestAssistanceEvent.name} (${calculateAssistancePercentage(lowestAssistanceEvent.assistance, lowestAssistanceEvent.capacity)}%)</td>
                  <td>${largestCapacityEvent.name} (${largestCapacityEvent.capacity})</td>
              </tr>
          </tbody>
          </table> 
                     
  `;

  return tableHTML;

}
export async function createTable() {
  // Obtener el contenedor de la tabla
  const tableContainer = document.getElementById('tableContainerTres');

  // Obtener los datos de la API
  const response = await fetch('https://aulamindhub.github.io/amazing-api/events.json');
  const data = await response.json();

  // Filtrar eventos futuros
  const futureEvents = data.events.filter(event => new Date(event.date) > new Date(data.currentDate));
  console.log(futureEvents)
  // Agrupar eventos por categoría y calcular totales
  const eventsByCategory = {};
  futureEvents.forEach(event => {
    if (!eventsByCategory[event.category]) {
      eventsByCategory[event.category] = {
        revenue: 0,
        totalAssistance: 0,
        capacity: 0
      };
    }
    eventsByCategory[event.category].revenue += event.price * (event.assistance || event.estimate);
    eventsByCategory[event.category].totalAssistance += event.assistance || event.estimate;
    eventsByCategory[event.category].capacity += event.capacity;
  });

  // Crear la estructura de la tabla
  let tableHTML = `
      <table class="table table-dark table-hover table-bordered">
          <thead class="table-light">
              <tr>
                  <th colspan="3">Upcoming events Statistics by category</th>
              </tr>
              <tr>
                  <th>Categories</th>
                  <th>Revenues</th>
                  <th>Porcentage of assistance</th>
              </tr>
          </thead> 

          <tbody>`;

  // Crear las filas de la tabla
  for (const category in eventsByCategory) {
    const { revenue, totalAssistance, capacity } = eventsByCategory[category];
    const percentage = ((totalAssistance / capacity) * 100).toFixed(2);
    tableHTML += `
          <tr>
              <td>${category}</td>
              <td>$${revenue}</td>
              <td>${percentage}%</td>
          </tr>`;
  }

  tableHTML += `
          </tbody>
      </table>`;

  // Agregar la tabla al contenedor
  tableContainer.innerHTML = tableHTML;
}
export async function createTableDos() {
  // Obtener el contenedor de la tabla
  const tableContainerDos = document.getElementById('tableContainerCuatro');

  // Obtener los datos de la API
  const response = await fetch('https://aulamindhub.github.io/amazing-api/events.json');
  const data = await response.json();

  // Filtrar eventos pasados
  const pastEvents = data.events.filter(event => new Date(event.date) < new Date(data.currentDate));

  // Agrupar eventos por categoría y calcular totales
  const eventsByCategory = {};
  pastEvents.forEach(event => {
    if (!eventsByCategory[event.category]) {
      eventsByCategory[event.category] = {
        revenue: 0,
        totalAssistance: 0,
        capacity: 0
      };
    }
    eventsByCategory[event.category].revenue += event.price * (event.assistance || event.estimate);
    eventsByCategory[event.category].totalAssistance += event.assistance || event.estimate;
    eventsByCategory[event.category].capacity += event.capacity;
  });

  // Crear la estructura de la tabla
  let tableHTML = `
    <table class="table table-dark table-hover table-bordered">
      <thead class="table-light">
        <tr>
          <th colspan="3">Past events Statistics by category</th>
        </tr>
        <tr>
          <th>Categories</th>
          <th>Revenues</th>
          <th>Porcentage of assistance</th>
        </tr>
      </thead> 

      <tbody>`;


  // Crear las filas de la tabla
  for (const category in eventsByCategory) {
    const { revenue, totalAssistance, capacity } = eventsByCategory[category];
    const percentage = ((totalAssistance / capacity) * 100).toFixed(2);
    tableHTML += `
      <tr>
        <td>${category}</td>
        <td>$${revenue}</td>
        <td>${percentage}%</td>
      </tr>`;
  }

  tableHTML += `
      </tbody>
    </table>`;

  // Agregar la tabla al contenedor
  tableContainerDos.innerHTML = tableHTML;
}










