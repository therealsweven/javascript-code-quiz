var timeRemaining = 75; //countdown start value

//pointers to references in the HTML doc
var startQuiz = document.querySelector("#start");
console.log(startQuiz);
var countdownEl = document.getElementById("countdown");
var quizEl = document.getElementById("quiz");
var aBut = document.querySelector("#a");
var bBut = document.querySelector("#b");
var cBut = document.querySelector("#c");
var dBut = document.querySelector("#d");
var resultsEl = document.getElementById("results");
var tellScore = document.querySelector("#tellScore");
var HSContainer = document.querySelector("#high-scores");
var highScoresList = document.querySelector("#high-scores-list");

// Declaring variables as js created elements of a paragraph type
var questionEl = document.createElement("p");
var answersEl = document.createElement("p");
var scoreEl = document.createElement("p");

//Question Bank
var Questions = [
  {
    question: "Who invented JavaScript?",
    answers: [
      "Brendan Eich",
      "Douglas Crockford",
      "Maximus Java",
      "Davy Crockett",
    ],
    correctAnswer: "Brendan Eich",
  },
  {
    question: "Commonly used data types do NOT include:",
    answers: ["strings", "booleans", "alerts", "numbers"],
    correctAnswer: "alerts",
  },
  {
    question:
      "The condition in  an if/ else statement is enclosed with _________.",
    answers: ["quotes", "curly brackets", "parenthesis", "square brackets"],
    correctAnswer: "parenthesis",
  },
  {
    question: "Arrays in JavaScript can be used to store _______.",
    answers: [
      "numbers and strings",
      "other arrays",
      "booleans",
      "all of the above",
    ],
    correctAnswer: "all of the above",
  },
  {
    question:
      "String values must be enclosed within _____ when being assigned to variables.",
    answers: ["commas", "curly brackets", "quotes", "parenthesis"],
    correctAnswer: "quotes",
  },
  {
    question:
      "A very useful tool used during deployment and debugging for printing content to the debugger is _______.",
    answers: ["JavaScript", "Terminal/Bash", "for loops", "console"],

    correctAnswer: "console",
  },
];
console.log(Questions);

var numCorrect = 0; //number of questions correct
var numTotal = Questions.length; //total number of questions
var finalScore; //Will be numCorrect * timeRemaining
var userInitials = "";
var questions = Questions.map(({ question }) => question); //questions array
var answers = Questions.map(({ answers }) => answers); //answers array
var correctAnswers = Questions.map(({ correctAnswer }) => correctAnswer); //correct answers array
var theseAnswers = ["", "", "", ""]; //empty current question answers array

let i = 0;

function run() {
  //start countdown
  var timeInterval = setInterval(function () {
    timeRemaining--;
    countdownEl.textContent = "Time: " + timeRemaining + " seconds";
    //when countdown hits zero, clears the iteration so it doesn't go below zero and shows results
    if (timeRemaining === 0) {
      clearInterval(timeInterval);
      showResults();
    }
  }, 1000);

  startQuiz.style.display = "none"; //disappear start button
  quizEl.style.display = "flex"; //appear quiz element
  quizEl.style.width = "90%";
  quizEl.style.flexDirection = "column"; //change flex-direction
  if (i < questions.length) {
    runQuiz();
  } else {
    timeRemaining = 0;
  }
}
function displayQandA() {
  questionEl.textContent = questions[i];

  theseAnswers = answers[i];

  aBut.textContent = theseAnswers[0];
  bBut.textContent = theseAnswers[1];
  cBut.textContent = theseAnswers[2];
  dBut.textContent = theseAnswers[3];
  answersEl.append(questionEl, aBut, bBut, cBut, dBut);
  quizEl.append(questionEl, answersEl);
}

function runQuiz() {
  //Show question and answer
  displayQandA();
  //wait for user response
  answersEl.addEventListener("click", choose);
  function choose(event) {
    //make sure user clicks an answer button
    if (event.target.matches("button")) {
      function grade() {
        if (event.target.textContent === correctAnswers[i]) {
          numCorrect += 1; //add one to correct score
          console.log(numCorrect);
          // alert("You are corrrect");
        } else if (event.target.textContent !== correctAnswers[i]) {
          console.log(numCorrect);
          timeRemaining -= 10;
          // alert("Incorrrect!");
        }
      }
      //function to iterate through the questions
      function iterate() {
        if (i === questions.length - 1) {
          //calculate score and save to local storage
          finalScore = timeRemaining * numCorrect;
          if (finalScore < 0) {
            finalScore = 0;
          }
          //if i is at total number of questions move to showResults() and zero timer
          timeRemaining = 1;
        } else {
          i++;
          console.log(i);
          displayQandA();
        }
      }
      //Grade Question
      grade();
      //Iterate if not on last question
      iterate();
    }
  }
}

// function to show high scores page
function showHighScores() {
  resultsEl.style.display = "none";
  quizEl.style.display = "none";
  startQuiz.style.display = "none";
  HSContainer.style.display = "flex";
  HSContainer.style.flexDirection = "column";
  var highScoresStorage = [JSON.parse(localStorage.getItem("highScores"))];
  console.log(highScoresStorage);
  console.log(highScoresStorage[0].score);
  for (j = 0; j < highScoresStorage.length; j++) {
    HSListItem = document.createElement("li");
    HSListItem.textContent =
      j +
      1 +
      ".  " +
      highScoresStorage[j].initials +
      "          " +
      highScoresStorage[j].score;
    highScoresList.append(HSListItem);
  }
}
//function to show results and score
function showResults() {
  quizEl.style.display = "none";
  resultsEl.style.display = "flex";
  resultsEl.style.flexDirection = "column";
  tellScore.textContent =
    "You got " +
    numCorrect +
    "/" +
    numTotal +
    " questions correct.  You're final score is " +
    finalScore +
    "!";
  //function to grab user input for name and save the score to local storage in an object with the name
  function getUserInfo() {
    var formEl = document.querySelector("#userInput");
    var instructions = document.querySelector("#instructions");
    var userInput = document.querySelector("#input");
    var submitInitialsBtn = document.querySelector("#submitInitials");
    instructions.textContent = "Please enter your initials:  ";
    //event listener to listen for submit on the name input
    submitInitialsBtn.addEventListener("click", function (event) {
      event.preventDefault();
      userInitials = userInput.value;
      var highScoresString = localStorage.getItem("highScores");
      console.log(highScoresString);
      var userInfo = {
        initials: userInitials.trim(),
        score: finalScore,
      };
      if (highScoresString === null) {
        localStorage.setItem("highScores", JSON.stringify(userInfo));
      } else {
        var highScores = [JSON.parse(highScoresString)];
        console.log(highScores);

        var newHighScores = highScores.concat(userInfo);
        console.log(newHighScores);
        localStorage.setItem("highScores", JSON.stringify(newHighScores));
      }
      showHighScores();
    });
  }

  getUserInfo();
}

//listen for start
startQuiz.addEventListener("click", run);

//listen for high scores request
viewHS = document.querySelector("#viewHS");
viewHS.addEventListener("click", showHighScores);
