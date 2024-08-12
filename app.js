const BASE_URL =
  "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const dropdowns = document.querySelectorAll(".dropDowns select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");



for (let select of dropdowns) {
  for (currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode;
    newOption.value = currCode;
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateFlag(evt.target, select.name);
  });
}



const updateExchnageRate = async () =>{
    let amount = document.querySelector(".amount input");
  let amtVal = amount.value;
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }

  const URL = `https://currency-conversion-and-exchange-rates.p.rapidapi.com/convert?from=${fromCurr.value}&to=${toCurr.value}&amount=${amtVal}&rapidapi-key=26d5fc3babmsh6fbafc65a3aa93ap1932c1jsn4e14b7f1b1ff`;

  let response = await fetch(URL);
  let data = await response.json();
  const finalAmt = data.result

  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`
}





const updateFlag = (element, value) => {
  let img = document.querySelectorAll(".flagImg");
  let currCode = element.value;
  let countryCode = countryList[currCode];
  console.log(countryCode, value);
  if (value == "from") {
    img[0].src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  } else {
    img[1].src = `https://flagsapi.com/${countryCode}/flat/64.png`;
  }
};


  

btn.addEventListener("click",  (evt) => {
  evt.preventDefault();
  updateExchnageRate();

});

window.addEventListener("load", () =>{
    updateExchnageRate();
})




