onclick="window.location.href = 'details.html?id=' + ${events[i]._id}"
console.log(onclick)

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const eventId = urlParams.get('id');

