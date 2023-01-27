const numInput = document.getElementById('guess-input');
const form = document.getElementById('guess');
const submitBtn = document.getElementById('guess-value');
const message = document.querySelector('.message');

let guessCount;
let randInt;
let gameOver;

resetGame();

form.addEventListener('submit', clickEvent);


function getRandInt(max){
  const randInt = Math.floor(Math.random() * max + 1);
  return randInt;
}


function clickEvent(e){

  if (gameOver){
    resetGame();
  } else {

    const userGuess = Number(numInput.value);
  
    if (userGuess==randInt){
      message.textContent = `Correct: ${userGuess}`;
      message.style.color = 'green';
      numInput.style.borderColor = 'green';
      gameOver = true;
      submitBtn.value = 'Play Again';

    } else {
      guessCount--;
      message.textContent = `Incorrect, remaining attempts: ${guessCount}`;
      message.style.color = 'red';
      numInput.style.borderColor = 'red';
    }
  
    if (guessCount==0){
      gameOver = true;
      submitBtn.value = 'Play Again';
    }
  
  }

  e.preventDefault();
}

function resetGame(){
  numInput.value = '';
  guessCount = 3;
  randInt = getRandInt(10);
  console.log(`Randint: ${randInt}`);
  gameOver = false;
  message.textContent = '';
  numInput.style.borderColor = '#D1D1D1';
}