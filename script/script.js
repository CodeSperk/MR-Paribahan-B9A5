let remainingSeats = 40;
let bookedSeat = 0;
let totalPrice = 0;
let discount = 0;
let grandTotal = 0;
const coupons = ["NEW15", "Couple 20"];

//to get elements by id
function getElById(elementId) {
  const element = document.getElementById(elementId);
  return element;
}

//to get element value by id
function getElValue(elementId) {
  const element = document.getElementById(elementId);
  const elValue = element.value;
  return elValue;
}

//to getElementsTextById
function getElementsText(elementId) {
  const element = document.getElementById(elementId);
  const elText = element.innerText;
  return elText;
}

//to set elementInnerTextById
function setElementsValue(elementId, value) {
  const element = document.getElementById(elementId);
  element.innerText = value;
}

const seats = document.querySelectorAll(".seat-style");
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

      //to get booked seat number
      const bookedSeatNumber = seat.innerText;

      //to set booked seat details in the cart section
      //--------------------------------------------
      const bookedSeatsContainer = getElById("booked-seat-container");
      const bookedSeatDiv = document.createElement("div");
      bookedSeatDiv.innerHTML = `
        <div class="flex justify-between">
        <span>${bookedSeatNumber}</span>
        <span>Economy</span>
        <span>550</span>
      </div>`;
      bookedSeatsContainer.appendChild(bookedSeatDiv);

      //to set total price;
      totalPrice += 550;
      const updatedPrice = "BDT" + " " + totalPrice.toFixed(2);
      setElementsValue("total-price", updatedPrice);

      //to set initial grand total
      const updatedGrandTotal = "BDT" + " " + totalPrice.toFixed(2);
      setElementsValue("grand-total", updatedPrice);

      //to enable input field & coupon apply button
      const applyBtnEl = getElById('apply-btn');
      const couponInputEl = getElById('coupon-input');
      if(bookedSeat === 4){
        applyBtnEl.removeAttribute('disabled');
        couponInputEl.removeAttribute('disabled');
      }

      //to apply coupon
      applyBtnEl.addEventListener('click', function(){
        const appliedCoupon = couponInputEl.value;
        const couponApplyContainer =  getElById('coupon-apply-container');
        if(appliedCoupon === coupons[0]){
          discount = totalPrice*0.15;
          couponApplyContainer.classList.add('hidden');
        }else if(appliedCoupon === coupons[1]){
          discount = totalPrice*0.2;
          couponApplyContainer.classList.add('hidden');
        }else{
          alert('Invalid Coupon');
        }

        if(discount>0){
          const discountContainer = getElById('discount-container');

          const discountEl = getElById('discount');
          discountEl.innerText = 'BDT'+' '+discount.toFixed(2);

          discountContainer.classList.remove('hidden');
          discountContainer.classList.add('flex');

          //set grand total
          grandTotal = totalPrice - discount;
          console.log(grandTotal);
          const newGrandTotal = "BDT" + " " + grandTotal.toFixed(2);
          setElementsValue("grand-total", newGrandTotal);
        }
      });


      //to enable next button 
      const inputElement = getElById("p-number");
      const nextBtnEl =  getElById('next-btn');
      inputElement.addEventListener('keyup', function(){
        if(bookedSeat>0 && inputElement != ''){
          nextBtnEl.removeAttribute('disabled');
        }
      });
     
    }
  });
}


//to reset when click on the modal button
const modalEl = getElById('modal-btn');
modalEl.addEventListener('click', function(){

  //to reset remaining seats
  getElById('remaining-seat').innerText = 40;

  //to reset available seats
  seats.forEach(function(element){
    element.classList.remove("bold-bg", "text-white");
  })
  
  // to clear booked number & details seat
  getElById('booked-seat').innerText=0;
  getElById('booked-seat-container').innerHTML= '';

  //to clear total price
  getElById('total-price').innerText = 'BDT'+' '+'0.00';

  //to disable coupon apply field (input & button)
  const inputFieldEl =  getElById('coupon-input');
  inputFieldEl.value = '';
  inputFieldEl.setAttribute('disabled', 'disabled');
  getElById('apply-btn').setAttribute('disabled', 'disabled');
  //to remove hidden class from the input field container
  getElById('coupon-apply-container').classList.remove('hidden');

  //to clear name, number & email field
  getElById('client-name').value='';
  getElById('p-number').value='';
  getElById('client-email').value='';

  //to hide obtained discount field
  getElById('discount-container').classList.add('hidden');

  //to clear grand total price
  getElById('grand-total').innerText = 'BDT'+' '+'0.00';
  
});





