const Events_URI = "https://fsa-crud-2aa9294fe819.herokuapp.com/api/2308-ACC-PT-WEB-PT-A/events"

const state = {
  events: [],
};

const partiesList = document.querySelector(`#display-parties`);

//GET EVENTS
const getParties = async () => {
  try{
    const response = await fetch(Events_URI);
  const json = response.json();
  const parties = json.data;
  if(json.error){
    throw new Error(json.error);
        }
  state.events = parties;
init()
  }catch(error){
    console.error(error)
  }
  
};

const init = async () => {
  const parties = await getParties();
  console.log(parties);
};

//POST EVENT

const createParty = async (name, description, date, location) =>{
  try{
    const response = await fetch(Events_URI,{
      methos: "POST",
      headers: { "Content-Type":"application/json" },
      body: JSON.stringify({name, description, date, location}),
  
    });
    const json = await response.json();
    if(json.error){
throw new Error(json.error);
    }
  }catch(error){
    console.error(error)

  }
} 

//DELETE EVENT

const deleteParty = async (id) => {
  try{
    const response = await fetch(Events_URI+"/"+id, {method:"DELETE"});
  const json = response.json();
  const parties = json.data;
  if(json.error){
    throw new Error(json.error);
        }
  return parties;
  }catch(error){
    console.error(error)
  }
}

function renderEvents(){
  if(!state.events || !state.events.length){
    partiesElement = document.createElement('div')
   partiesElement.innerHTML = `<li> No events found</li>`;
   return;
  }
  const parttItem = state.events.map((party) => {
    const partyItem = document.createElement("li");
    partyItem.add("party");
    partyItem.innerHTML = 
    `
    <h2>${party.name}</h2>
    <p>${party.description}</p>
    <p>${party.date}</p>
    <p>${party.location}</p>
    <p>${party.id}</p>
    `;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete Party";
    partyItem.append(deleteButton);

    deleteButton.addEventListener("click",() => deleteParty(party.id))
    return partyItem;
  });

  partiesList.replaceChildren(...partyItems);
}

// const init = async () => {
//   const parties = await createParty{};
//   console.log(parties);
// }

const init = async () => {
await getParties();
renderEvents();
}


init();
