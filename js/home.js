
fetch('https://aulamindhub.github.io/amazing-api/events.json')
  .then(response => response.json())
  .then(data => {
    let events = data.events
    console.log(events);
    

    for (let i = 0; i < events.length; i++) {
      const event = events[i];

    }
    
    const categorias = data.events.map(evento => evento.category)
    let categoriasUnicas = [...new Set(categorias)]

    pintarCheckbox(categoriasUnicas)



    document.getElementById("inputTexto").addEventListener('keyup', e => {
      let arregloFiltradoTexto = filtroTexto(data.events)
      let arregloFiltradoChecked = filtroChecks(arregloFiltradoTexto) 
      console.log(arregloFiltradoTexto);
      pintarTarjetas(arregloFiltradoChecked)

    })
    document.getElementById("checkboxContainer").addEventListener('change', e => {
      let arregloFiltradoChecked = filtroChecks(data.events) 
      let arregloFiltradoTexto = filtroTexto(arregloFiltradoChecked)
      console.log(arregloFiltradoChecked)
      pintarTarjetas(arregloFiltradoTexto)
    })

 
    pintarTarjetas(data.events)
   
  })
  .catch(error => console.error('Error al obtener los eventos:', error));





function pintarCheckbox(arregloCategorias) {
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



function filtroTexto(arregloEventos) {
  let texto = document.getElementById("inputTexto").value.toLowerCase()
  console.log(texto)
  let arregloFiltrado = arregloEventos
  if (texto != null || texto != undefined) {
    arregloFiltrado = arregloEventos.filter(evento => evento.name.toLowerCase().includes(texto)) || evento.description.toLowerCase().includes(texto)

  }
  return arregloFiltrado

  
}

function filtroChecks(arregloEventos) {
  let checkboxChecked = [...document.querySelectorAll('input[type=checkbox]:checked')]
  checkboxChecked = checkboxChecked.map(e => e.value)

  let arregloFiltrado = arregloEventos
  if (checkboxChecked.length != 0) {
    arregloFiltrado = arregloEventos.filter(evento => checkboxChecked.includes(evento.category))
  } 
  return arregloFiltrado


}


function pintarTarjetas(arregloEventos) {

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













