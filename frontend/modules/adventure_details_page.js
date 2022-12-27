import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  const urlParams = new URLSearchParams(search);
  const myParam = urlParams.get('adventure');
  return myParam;


  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    const response = await fetch(config.backendEndpoint +  `/adventures/detail?adventure=${adventureId}`);
    const data = await response.json();
    return data;
  }catch(e){
    console.log("e", e);
    return null;
  }
  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let dataH1 = document.querySelector('#adventure-name')
  dataH1.textContent = adventure.name;
  let dataP = document.querySelector('#adventure-subtitle')
  dataP.textContent = adventure.subtitle;
  let images = adventure.images;
  images.map((image)=>{

    let dataImgDiv = document.querySelector('#photo-gallery')
    let imgDiv = document.createElement('div')
    
    imgDiv.innerHTML = `<img src= ${image} class="activity-card-image"/>`
    dataImgDiv.appendChild(imgDiv)
  })

  let advCont = document.getElementById('adventure-content');
  let pTag = document.createElement('p');
  pTag.innerText = adventure.content;
  advCont.append(pTag);

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let dataImgDiv = document.querySelector('#photo-gallery')
  dataImgDiv.innerHTML = `<div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
`
  let carousel = document.querySelector('.carousel-inner')
  images.map((image,index)=>{
    let carouselItem =  document.createElement('div');
    if(index == 0){
      carouselItem.setAttribute("class", "carousel-item active")
    }else{
      carouselItem.setAttribute("class", "carousel-item")
    }
  carouselItem.innerHTML = `<img src="${image}" class="d-block w-100" alt="...">`
  carousel.appendChild(carouselItem)
  })
}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  let panelSoldOut = document.querySelector('#reservation-panel-sold-out');
  let panelAvailable = document.querySelector('#reservation-panel-available');
  if(adventure.available){
    panelAvailable.style.display = "block";
    panelSoldOut.style.display = "none";

    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }else{
    panelSoldOut.style.display = "block";
    panelAvailable.style.display = "none";
  }
  

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  let total = adventure.costPerHead * persons;
  document.getElementById("reservation-cost").innerHTML = total;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  let form = document.getElementById('myForm')
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const {name, date, person} = event.target.elements;
    const payload = {
      name : name.value,
      date : date.value,
      person: person.value,
      adventure: adventure.id
    }
    
    const res = callPost(payload);
    
});

async function callPost(payload){
 const response = await fetch(`${config.backendEndpoint}/reservations/new`,
  {
    method :"POST",
    headers: {
			"Content-Type": "application/json",
			Accept: "application/json",
		},
    body: JSON.stringify(payload)
  })
  const data = await response.json();
  if(data.success){
    alert("Success!")
  }else{
    alert("Failed!")
  }
  return data;
}
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  let reservedDiv = document.getElementById('reserved-banner')

  if(adventure.reserved){
    reservedDiv.style.display ="block"
  }else{
    reservedDiv.style.display ="none"
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
