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

   const entryNumber = targetInputContainer.querySelectorAll('input[type="text"]').length + 1;
   
   const HTMLString = `
   <label for="${entryDropdown.value}-${entryNumber}-name">Entry ${entryNumber} Name</label>
   <input id="${entryDropdown.value}-${entryNumber}-name" type="text" placeholder="Name"/>
   <label for="${entryDropdown.value}-${entryNumber}-calories">Entry ${entryNumber} Calories</label>
   <input id="${entryDropdown.value}-${entryNumber}-calories" type="number" min="0" placeholder="Calories"/>`;

   targetInputContainer.insertAdjacentHTML("beforeend", HTMLString);
}



/* This function will be another event listener, 
so the first argument passed will be the 
browser event – e is a common name for this parameter */
function calculateCalories(e) {
   e.preventDefault();
   isError = false;
   const breakfastNumberInputs = document.querySelectorAll("#breakfast input[type=number]");
   const lunchNumberInputs = document.querySelectorAll('#lunch input[type=number]');
   const dinnerNumberInputs = document.querySelectorAll('#dinner input[type=number]');
   const snacksNumberInputs = document.querySelectorAll('#snacks input[type=number]');
   const exerciseNumberInputs = document.querySelectorAll('#exercise input[type=number]');
   
   /* Now that you have your lists of elements, 
   you can pass them to your getCaloriesFromInputs 
   function to extract the calorie total.*/
   const breakfastCalories = getCaloriesFromInputs(breakfastNumberInputs);
   const lunchCalories = getCaloriesFromInputs(lunchNumberInputs);
   const dinnerCalories = getCaloriesFromInputs(dinnerNumberInputs);
   const snacksCalories = getCaloriesFromInputs(snacksNumberInputs);
   const exerciseCalories = getCaloriesFromInputs(exerciseNumberInputs);
   const budgetCalories = getCaloriesFromInputs([budgetNumberInput]);
   //
   
   if (isError){
      return
   }

   // caculations
   const consumedCalories = breakfastCalories + lunchCalories + dinnerCalories +snacksCalories;
   const remainingCalories = (budgetCalories - consumedCalories) + exerciseCalories;
   const surplusOrDeficit = remainingCalories >= 0 ? "Surplus" : "Deficit";
   //
   
   output.innerHTML = `
   <span class="${surplusOrDeficit.toLowerCase()}">
   ${Math.abs(remainingCalories)} Calorie ${surplusOrDeficit}
   </span>
   <hr>
   <p>${budgetCalories} Calories Budgeted</p>
   <p>${consumedCalories} Calories Consumed</p>
   <p>${exerciseCalories} Calories Burned</p>
   `;
   
   /* you need to make the #output element visible so the user can see your text.
   Your output variable is an Element, which has a classList property. 
   This property has a .remove() method, which accepts a string representing 
   the class to remove from the element. */
   output.classList.remove("hide");
}

function getCaloriesFromInputs(list) {
   let calories = 0;
   
   for (let i=0; i < list.length; i++){
      const currVal = cleanInputString(list[i].value);
      const invalidInputMatch = isInvalidInput(currVal);
      
      /* if statement that checks if invalidInputMatch is truthy. */
      if (invalidInputMatch){
         alert(`Invalid Input: ${invalidInputMatch[0]}`);
         isError = true;
         return null;
      }
      calories += Number(currVal);
   }
   return calories;
   
}

function clearForm() {
   /* get all of the input containers */
   /* Remember that document.querySelectorAll returns a NodeList,
   which is array-like but is not an array. However, the Array 
   object has a .from() method that accepts an array-like 
   and returns an array. */
   const inputContainers = Array.from(document.querySelectorAll(".input-container"));

   /* for loop to iterate through the inputContainers array */
   /*    Remember the structure of a for loop:
   for ([initialization]; [condition]; [final-expression]) statement

   The [initialization] part is executed only once (the first time).
   The [condition] is checked on every iteration.
   The [final-expression] is executed along the statement if [condition] resolves to true. */
   for (let i = 0; i < inputContainers.length; i++) {
      inputContainers[i].innerHTML = "";

   }
   
   /* After your loop completes you need to clear the budgetNumberInput. 
   Set the value property of budgetNumberInput to an empty string. */
   budgetNumberInput.value = "";
   /*  also need to clear the output element's text. */
   output.innerText = "";

   /* you need to restore the hide class to the output element. */
   output.classList.add("hide");
}

/* event listener, with event type "", and callback function */
addEntryButton.addEventListener("click", addEntry);

calorieCounter.addEventListener("submit", calculateCalories);

clearButton.addEventListener("click", clearForm);
