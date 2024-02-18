let remainingSeats = 40;
let bookedSeat = 0;
let totalPrice = 0;

//to get elements by id
function getElById(elementId) {
  const element = document.getElementById(elementId);
  return element;
}

//to getElementsTextById
function getElementsText(elementId) {
  const element = document.getElementById(elementId);
  const elText =  element.innerText;
  return elText;
}

//to set elementInnerTextById
function setElementsValue(elementId, value) {
  const element = document.getElementById(elementId);
  element.innerText = value;
}

const seats = document.querySelectorAll(".seat-style");
// hello
for (let seat of seats) {
  seat.addEventListener("click", function () {
    if (seat.getAttribute("class").includes("bold-bg")) {
      alert("This seat booked. Try for another one.");
    } else if (bookedSeat >= 4) {
      alert("Your can't buy more than 4 tickets");
    } else {
      seat.classList.add("bold-bg", "text-white");

      // remaining seat
      remainingSeats -= 1;
      setElementsValue("remaining-seat", remainingSeats);

      //Number of seat selected
      bookedSeat += 1;
      setElementsValue("booked-seat", bookedSeat);

      //get booked seat number
      const bookedSeatNumber = seat.innerText;

      //set booked seat details in the cart section
      //--------------------------------------------
      const bookedSeatsContainer = getElById("booked-seat-container");
      const bookedSeatDiv = document.createElement('div');
      bookedSeatDiv.innerHTML = `
        <div class="flex justify-between">
        <span>${bookedSeatNumber}</span>
        <span>Economy</span>
        <span>550</span>
      </div>`;
      bookedSeatsContainer.appendChild(bookedSeatDiv);

      //set total price;
      totalPrice+=550;
      const updatedPrice = 'BDT'+' '+totalPrice.toFixed(2);
      setElementsValue('total-price', updatedPrice);
      
    }
  });
}
