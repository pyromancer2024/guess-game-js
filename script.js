const form = document.querySelector("form");
const guessField = document.querySelector("#guessField");
const lastResult = document.querySelector(".lastResult");
const guesses= document.querySelector(".guesses");
const lowOrHi = document.querySelector(".lowOrHi");
const previousGuesses = new Array();
let randomNumber = GenerateRandomNumber();

form.addEventListener("submit", (e) => 
{
    e.preventDefault();
    console.log(`randomNumber ${randomNumber}`);
    let guessedInt = parseInt(guessField.value);
    if(IsValidNumber(guessedInt))
    {
        console.log(guessedInt)
        lowOrHi.textContent = "Invalid Number";
        lowOrHi.style.color = "red";
    }
    else if (parseInt(lastResult.textContent) <= 0)
    {
        lowOrHi.textContent = "Limit Exceeded";
        lowOrHi.style.color = "red";
    }
    else if(guessedInt === randomNumber)
    {
        lowOrHi.textContent = "Matched";
        lowOrHi.style.color = "Yellow";
        CreateResetButton();
    }
    else
    {
        lastResult.textContent = parseInt(lastResult.textContent) - 1;
        lowOrHi.textContent = CheckNumber(guessedInt);
        lowOrHi.style.color = "White";
        previousGuesses.push(guessedInt);
        guesses.textContent = previousGuesses;
    }
});

function CreateResetButton()
{
    let lineBreak = document.createElement("br");
    let resetBtn = document.createElement("button");

    resetBtn.style.backgroundColor = "Orange";
    resetBtn.style.color = "white";
    resetBtn.id = "reset";
    resetBtn.textContent = "Reset";

    lowOrHi.appendChild(lineBreak);
    lowOrHi.appendChild(resetBtn);

    resetBtn.addEventListener("click", (e) => {
        ResetGame();
    });
}

function GenerateRandomNumber()
{
    return Math.round(Math.random() * 100);
}

function IsValidNumber(number)
{
    return isNaN(number) || number <= 0 || number > 100 
}

function CheckNumber(number)
{
    return number > randomNumber ? "High" : "Low"
}

function ResetGame()
{
    lastResult.textContent = 10;
    randomNumber = GenerateRandomNumber();
    previousGuesses.length = 0;
    guesses.textContent = "";
    lowOrHi.textContent = "";
    guessField.value = "";
}