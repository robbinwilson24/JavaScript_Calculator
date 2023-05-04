const calculatorButton = document.querySelectorAll(".calculator-button");
const calculatorDisplay = document.querySelector(".display-div");
const deleteButton = document.querySelector(".delete-button");
const clearButton = document.querySelector(".clear-button");
const equalsButton = document.querySelector(".equals-button");

//Boolean to check if the equals has been clicked. 
let equalsClicked = false;

//variable to store value from previous answer
let answerValue = 0;

for (let button of calculatorButton) {
    button.addEventListener("click", () => {

        //if the previous answer value is greater than 0 and the user clicks an operator, then keep answer on the calculator screen and use it for the next calculation. 
        if (answerValue > 0 && equalsClicked && ["*", "+", "/", "-"].includes(button.value)) {
            calculatorDisplay.textContent = answerValue + button.value;
            equalsClicked = false;
        }

        //else if there is an answer and the user clicks a number, then start a new calculation. 
        else if (answerValue > 0 && equalsClicked && !["*", "+", "/", "-"].includes(button.value)) {
            calculatorDisplay.textContent = button.value;
            answerValue = 0;
            equalsClicked = false;
        }
        // else nested if 
        else {
            //if there is no previouos sum, then show the clicked button values on the calculator screen 
            if (equalsClicked === false) {
                calculatorDisplay.textContent += button.value
            }
            //else display user input 
            else {
                calculatorDisplay.textContent = "";
                equalsClicked = false;
                calculatorDisplay.textContent += button.value
            }
        }
    })
}

// Event listener to clear everything from the display. 
clearButton.addEventListener("click", () => {
    calculatorDisplay.textContent = "";
    answerValue = 0;

})

//Event listener to delete the last item input.  unless the equal button has been clicked, then it just clears the screen. 
deleteButton.addEventListener("click", () => {
    if (equalsClicked === false) {
        let displayContent = calculatorDisplay.textContent;
        let newDisplayContent = displayContent.slice(0, -1);
        calculatorDisplay.textContent = newDisplayContent;
    }
    else {
        calculatorDisplay.textContent = "";
    }
});

// event lisener on the equal button
equalsButton.addEventListener("click", () => {
    //if there is nothing on display and the button is clicked - do nothing.
    // to stop the screen from displayign undefined . 
    let totalInput = calculatorDisplay.textContent;
    if (!totalInput) {
        totalInput = "";
    } else {
        try {
            //evaluate the values displayed on the calculator screen and display on the calculator screen. 
            let answer = eval(totalInput);
            calculatorDisplay.textContent = answer.toFixed(2);
            answerValue = answer;
            console.log(answerValue);
        } catch (error) {
            //if there is an error catch it and display "error"
            calculatorDisplay.textContent = "Error";
        }
        //Change equalsClicked to true. 
        equalsClicked = true;

    }
});


