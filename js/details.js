
let data = fetch('https://aulamindhub.github.io/amazing-api/events.json')
  .then(response => response.json())
  .then(data => {
    const urlparams = new URLSearchParams(window.location.search);
    const eventoId = urlparams.get('id');
    const events = data.events;
    console.log(eventoId)
for (let i = eventoId; i < events; i++) {
  const event = events[i-1];
  console.log(event)
  const cardContainer = document.getElementById('card');

const cardContent = `
<div class="card">
  <div class="card-body">
    <img src="${event.image}" alt="">
    <h5 class="card-title">${event.name}</h5>
    <p class="card-text">Date: ${event.date} </p>
    <p class="card-text">Description: ${event.description}</p>
    <p class="card-text">Category: ${event.category}</p>
    <p class="card-text">Place: ${event.place}</p>
    <p class="card-text">Capacity: ${event.capacity}</p>
    <p class="card-text">Estimate: ${event.estimate}</p>
    <p class="card-text">Price: ${event.price}</p>
  </div>
</div>
`;

cardContainer.innerHTML = cardContent;
}

  })
  .catch(error => console.error('Error al obtener los eventos:', error));







