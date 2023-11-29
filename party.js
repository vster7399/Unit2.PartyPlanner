const COHORT = "2310-ghp-et-web-ft-sf";
const API_URL = `https://fsa-crud-2aa9294fe819.herokuapp.com/api/${COHORT}/events`;

const state = {
    events: [],
};

const eventList = document.querySelector("#events");

const addEventForm = document.querySelector("#addEvent"); 
addEventForm.addEventListener("submit", addEvent);

async function render() {
    await getEvents();
    renderEvents();
}
render();

async function getEvents() {
    try {
      const response = await fetch(API_URL);
      const json = await response.json();
      state.events = json.data;
    } catch (error) {
      console.error(error);
    }
}

function renderEvents() {
      if (!eventList || eventList.length == 0) {
            eventList.innerHTML = "<li>No events found.</li>";
          return;
}
const eventInfo = state.events.map((event) => {
const li = document.createElement("li");
    li.innerHTML = `
      <h2>${event.name}</h2>
      <p>${event.date.slice(0, 10)}</p>
      <p>${event.date.slice(11, -8)}</p>
      <p>${event.location}</p>
      <p>${event.description}</p>
    `;
    return li;
});
  
  eventList.replaceChildren(...eventInfo);
  }
  

//review block 20 tomorrow (note to self)