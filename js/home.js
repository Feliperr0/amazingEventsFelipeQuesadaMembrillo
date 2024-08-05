import { pintarCheckbox, filtroTexto, filtroChecks, pintarTarjetas } from "../modulos/functions.js";

fetch('https://aulamindhub.github.io/amazing-api/events.json')
  .then(response => response.json())
  .then(data => {

    let events = data.events



    for (let i = 0; i < events.length; i++) {
      const event = events[i];

    }

    const categorias = data.events.map(evento => evento.category)
    let categoriasUnicas = [...new Set(categorias)]

    pintarCheckbox(categoriasUnicas)

    document.getElementById("inputTexto").addEventListener('keyup', e => {
      let arregloFiltradoTexto = filtroTexto(data.events)
      let arregloFiltradoChecked = filtroChecks(arregloFiltradoTexto)
   
      pintarTarjetas(arregloFiltradoChecked)

    })
    document.getElementById("checkboxContainer").addEventListener('change', e => {
      let arregloFiltradoChecked = filtroChecks(data.events)
      let arregloFiltradoTexto = filtroTexto(arregloFiltradoChecked)
    
      pintarTarjetas(arregloFiltradoTexto)
    })


    pintarTarjetas(data.events)

  })
  .catch(error => console.error('Error al obtener los eventos:', error));

















