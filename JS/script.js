const wordText = document.querySelector(".word"),
  hintText = document.querySelector(".hint span"),
  timeText = document.querySelector(".time b"),
  inputField = document.querySelector("input"),
  refreshBtn = document.querySelector(".refresh-word"),
  checkBtn = document.querySelector(".check-word");
  const scoreDisplay = document.createElement("div");
  var result = document.getElementById("result");
// scoreDisplay.classList.add("scoreboard");
// scoreDisplay.innerHTML = "Score: <span id='score'>0</span>";
document.body.appendChild(scoreDisplay);

let correctWord, timer, score = 0;

const updateScore = () => {
  const scoreElement = document.getElementById("score");

  scoreElement.innerHTML = score;
 
};

const initTimer = maxTime => {
  clearInterval(timer);
  timer = setInterval(() => {
    if (maxTime > 0) {
      maxTime--;
      timeText.innerText = maxTime;
    } else {
      
      result.innerHTML = `Time off! ${correctWord.toUpperCase()} was the correct word`;
      result.style.display = "block";
    setTimeout(function() {
      result.style.display = "none";
    }, 3000);
      initGame();
    }
  }, 1000);
};

const initGame = () => {
  initTimer(33);
  let randomObj = words[Math.floor(Math.random() * words.length)];
  let wordArray = randomObj.word.split("");
  for (let i = wordArray.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    [wordArray[i], wordArray[j]] = [wordArray[j], wordArray[i]];
  }
  wordText.innerText = wordArray.join("");
  hintText.innerText = randomObj.hint;
  correctWord = randomObj.word.toLowerCase();
  inputField.value = "";
  inputField.setAttribute("maxlength", correctWord.length);
};

const checkWord = () => {
  let userWord = inputField.value.toLowerCase();
  if (!userWord) result.innerHTML =`Please enter the word to check!`;
  if (userWord === correctWord) {
    score++; // Increase the score for correct answers
  } else {
    score--; // Decrement the score for incorrect answers
  }
  updateScore(); // Update and display the score

  if (userWord === correctWord) {
    
    result.innerHTML = `Congrats! ${correctWord.toUpperCase()} is the correct word`;
    result.style.display = "block";
    setTimeout(function() {
      result.style.display = "none";
    }, 3000);
  } else {
    result.innerHTML = `Oops! ${userWord} is not a correct word`;
    result.style.display = "block";
    setTimeout(function() {
      result.style.display = "none";
    }, 3000);
  }
  initGame();
};

refreshBtn.addEventListener("click", initGame);
checkBtn.addEventListener("click", checkWord);

updateScore(); // Initialize the score display
initGame();
