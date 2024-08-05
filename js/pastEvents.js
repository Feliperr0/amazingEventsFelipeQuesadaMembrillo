import { pintarCheckbox, filtroTexto, filtroChecks, pintarTarjetas } from "../modulos/functions.js";

fetch('https://aulamindhub.github.io/amazing-api/events.json')
  .then(response => response.json())
  .then(data => {
    let events = data.events

    for (let i = 0; i < events.length; i++) {
      const event = events[i];

    }
    let pastEvents = []
    let upcomingEvents = []
    for (const event of data.events) {
      let eventDate = new Date(event.date)
      let currentDate = new Date(data.currentDate)

      if (eventDate < currentDate) {
        pastEvents.push(event)
      } else {
        upcomingEvents.push(event)
      }
    }

    console.log("Eventos pasados:", pastEvents)
    const categorias = data.events.map(evento => evento.category)
    let categoriasUnicas = [...new Set(categorias)]

    pintarCheckbox(categoriasUnicas)

    document.getElementById("inputTexto").addEventListener('keyup', e => {
      let arregloFiltradoTexto = filtroTexto(pastEvents)
      let arregloFiltradoChecked = filtroChecks(arregloFiltradoTexto) 

      pintarTarjetas(arregloFiltradoChecked,)
      

    })
    document.getElementById("checkboxContainer").addEventListener('change', e => {
      let arregloFiltradoChecked = filtroChecks(pastEvents) 
      let arregloFiltradoTexto = filtroTexto(arregloFiltradoChecked)
   
      pintarTarjetas(arregloFiltradoTexto)
    })

 
    pintarTarjetas(pastEvents)
   
  })
  .catch(error => console.error('Error al obtener los eventos:', error));

