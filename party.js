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
  console.log(state.events)
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

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Delete Event"
    li.append(deleteButton);

    deleteButton.addEventListener("click", () => deleteEvent(event.id));

    const editButton = document.createElement('button');
    editButton.textContent = "Edit Event"
    li.append(editButton);
    
    editButton.addEventListener("click", () => updateEvent(event.id));

    return li;
});
  
  eventList.replaceChildren(...eventInfo);
}
  
async function addEvent(event) {
  event.preventDefault();

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addEventForm.name.value,
        date: addEventForm.date.value,
        time: addEventForm.time.value,
        location: addEventForm.location.value,
        description: addEventForm.description.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Sorry. Event not created.");
    }

    render();
  } catch (error) {
    console.error(error);
  }
}

async function deleteEvent(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "DELETE",
    })

    render()
  } catch (error) {
    console.error(error)
  }
}

async function updateEvent(id) {
  try {
    const response = await fetch(`${API_URL}/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: addEventForm.name.value,
        date: addEventForm.date.value,
        time: addEventForm.time.value,
        location: addEventForm.location.value,
        description: addEventForm.description.value,
      }),
    });

    if (!response.ok) {
      throw new Error("Sorry. Event not created.");
    }

    render();
  } catch (error) {
    console.error(error);
  }
}
