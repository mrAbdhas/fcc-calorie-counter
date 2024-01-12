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
   /*  const strArray = str.split("");
    const cleanStrArray = [];
    for (let i = 0; i < strArray.length; i++) {

      if(!["+", "-", " "].includes(strArray[i])) {
         cleanStrArray.push(strArray[i]);
      }   
   } */
   /*    While looping through the string works, creating 
   a new array is inefficient for memory and runtime performance.
   Instead, you can use Regular Expressions (referred to as "regex")
   to match specific characters. */
   ///-----////

   //declare a regex variable, assign a pattern you want to match
   const regex = /[+-\s]/g;
   return str.replace(regex, "");

 }
//

 /*In HTML, number inputs allow for exponential 
 notation (such as 1e10). You need to filter those out */
function isInvalidInput(str) {
   const regex = /\d+e\d+/i;
   return str.match(regex);
}
//

//function for adding entries to the calorie counter
function addEntry(){
   const targetInputContainer = document.querySelector(`#${entryDropdown.value} .input-container`);
}