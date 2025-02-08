let drawnNumbersList = [];
let limitNumber = 10;
let secretNumber = generateRandomNumber();
let attempts = 1;

function generateRandomNumber() {
    let chosenNumber = parseInt(Math.random() * limitNumber) + 1;
    let listElementsCount = drawnNumbersList.length;

    if (listElementsCount == limitNumber) {
        drawnNumbersList = [];
    }

    if (drawnNumbersList.includes(chosenNumber)) {
        return generateRandomNumber();
    } else {
        drawnNumbersList.push(chosenNumber);
        return chosenNumber;
    }
}

function displayTextOnScreen(tag, text) {
    let field = document.querySelector(tag);
    field.innerHTML = text;
    responsiveVoice.speak(text, 'US English Female', { rate: 1.2 });
}

function displayInitialMessage() {
    displayTextOnScreen('h1', 'Secret Number Game');
    displayTextOnScreen('p', 'Choose a number between 1 and 10');
}

displayInitialMessage();

function checkGuess() {
    let guess = document.querySelector('input').value;
    if (guess == secretNumber) {
        displayTextOnScreen('h1', 'You got it!');
        let attemptWord = attempts > 1 ? 'attempts' : 'attempt';
        let attemptsMessage = `You found the secret number in ${attempts} ${attemptWord}!`;
        displayTextOnScreen('p', attemptsMessage);
        document.getElementById('restart').removeAttribute('disabled');
    } else {
        if (guess > secretNumber) {
            displayTextOnScreen('p', `The secret number is smaller!`);
        } else {
            displayTextOnScreen('p', `The secret number is bigger!`);
        }
        attempts++;
        clearField();
    }
}

function clearField() {
    let guess = document.querySelector('input');
    guess.value = '';
}

function restartGame() {
    secretNumber = generateRandomNumber();
    clearField();
    attempts = 1;
    displayInitialMessage();
    document.getElementById('restart').setAttribute('disabled', true);
}