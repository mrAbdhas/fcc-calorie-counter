const calorieCounter = document.getElementById("calorie-counter");
const budgetNumberInput = document.getElementById("budget");
const entryDropdown = document.getElementById("entry-dropdown");
const addEntryButton = document.getElementById("add-entry");
const clearButton = document.getElementById("clear");
const output = document.getElementById("output");

let isError = false;

//function that clean a string value and ensure we have a number
/* because: "Even though you set an input element to be a number,
 JavaScript receives a string value"*/

 function cleanInputString(str) {
    const strArray = str.split("");
    const cleanStrArray = [];
 }