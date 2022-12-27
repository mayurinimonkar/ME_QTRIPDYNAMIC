import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try{
    const response = await fetch(`${config.backendEndpoint}/reservations/`)
    const data = await response.json();

    return data;
  }catch(error){
    console.log(error)
    return null;
  }

  // Place holder for functionality to work in the Stubs
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  let reservationBanner = document.getElementById('no-reservation-banner')
  let reservationTableDiv = document.getElementById('reservation-table-parent')
  if(reservations.length>0){
    reservationBanner.style.display = "none"
    reservationTableDiv.style.display = "block"
  }else{
    reservationTableDiv.style.display = "none"
    reservationBanner.style.display = "block"
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 
 let reservationTable = document.getElementById('reservation-table');
 reservations.map((reservation)=>{
  
  const date = new Date(reservation.date);
  const fDate = date.toLocaleDateString('en-IN');
  
  const timestamp = new Date(reservation.time)
  
  const options = {
    dateStyle: 'long',
    hour12: 'false',
    timeStyle: 'medium'
  };

  const timeString = timestamp.toLocaleString("en-IN",options).split(' at')
  console.log(timeString)
  const tableRow = document.createElement("tr");
  tableRow.innerHTML=`<td scope="col">${reservation.id}</td>
  <td scope="col">${reservation.name}</td>
  <td scope="col">${reservation.adventureName}</td>
  <td scope="col">${reservation.person}</td>
  <td scope="col">${fDate}</td>
  <td scope="col">${reservation.price}</td>
  <td scope="col">${timeString.toString()}</td>
  <td id="${reservation.id}"scope="col"><a href="../detail/?adventure=${reservation.adventure}"><button class="reservation-visit-button">Visit adventure</button></a></td>`
  reservationTable.appendChild(tableRow)
 })
 

}

export { fetchReservations, addReservationToTable };
