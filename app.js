// Base URL for currency exchange rate API
const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

// Selecting DOM elements
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns with currency options from countryList
for (let select of dropdowns) {
  for (let currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currCode; // Set the text of the option to the currency code
    newOption.value = currCode; // Set the value of the option to the currency code
    if (select.name === "from" && currCode === "USD") {
      newOption.selected = "selected"; // Pre-select USD in "From" dropdown if it's the From dropdown
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected"; // Pre-select INR in "To" dropdown if it's the To dropdown
    }
    select.append(newOption); // Append the option to the dropdown
  }

  // Event listener to update flag image when dropdown option changes
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target); // Call updateFlag function with the changed dropdown
  });
}

// Function to update exchange rate based on selected currencies
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input"); // Select input field for amount
  let amtVal = amount.value; // Get the value entered in the amount input field
  if (amtVal === "" || amtVal < 1) {
    amtVal = 1; // Set default amount to 1 if input is empty or less than 1
    amount.value = "1"; // Update input field to show default amount
  }
  // Construct URL to fetch exchange rate data
  const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`;
  let response = await fetch(URL); // Fetch exchange rate data from API
  let data = await response.json(); // Convert API response to JSON format
  let rate = data[toCurr.value.toLowerCase()]; // Get the exchange rate for the selected currencies

  let finalAmount = amtVal * rate; // Calculate the converted amount
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`; // Update message with exchange rate details
};

// Function to update flag image based on selected currency
const updateFlag = (element) => {
  let currCode = element.value; // Get the currency code from the dropdown
  let countryCode = countryList[currCode]; // Get the corresponding country code from countryList
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`; // Construct URL for flag image
  let img = element.parentElement.querySelector("img"); // Select the flag image element
  img.src = newSrc; // Update flag image source
};

// Event listener for button click to update exchange rate
btn.addEventListener("click", (evt) => {
  evt.preventDefault(); // Prevent default form submission behavior
  updateExchangeRate(); // Call updateExchangeRate function to update exchange rate details
});

// Initial call to update exchange rate on page load
window.addEventListener("load", () => {
  updateExchangeRate(); // Call updateExchangeRate function on page load to show initial exchange rate
});
