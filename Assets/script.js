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

var numCorrect = 0; //number of questions correct
var numTotal = Questions.length; //total number of questions
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

  document.getElementById("start").style.display = "none"; //disappear start button
  document.getElementById("quiz").style.display = "flex"; //appear quiz element
  document.getElementById("quiz").style.flexDirection = "column"; //change flex-direction

  runQuiz();
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
    event.stopPropagation();

    if (event.target.matches("button")) {
      console.log(event.target.textContent);
      console.log(correctAnswers[i]);

      function grade() {
        event.stopPropagation();
        event.preventDefault();
        if (event.target.textContent === correctAnswers[i]) {
          numCorrect += 1; //add one to correct score
          console.log(numCorrect);
          // alert("You are corrrect");
        } else if (event.target.textContent !== correctAnswers[i]) {
          console.log(numCorrect);
          timeRemaining -= 5;
          // alert("Incorrrect!");
        }
      }
      //if not at last question, iterate
      function iterate() {
        if (i < Questions.length) {
          i++;
          displayQandA();
        } else {
          //if i is at total number of questions move to showResults() and zero timer
          timeRemaining = 1;
          return;
        }
      }
      //Grade Question
      grade();
      //Iterate if not on last question
      // iterate();
      if (i < questions.length) {
        i++;
        displayQandA();
      } else {
        //if i is at total number of questions move to showResults() and zero timer
        timeRemaining = 1;
        return;
      }
      // }
    }
  }
}

// }
function showResults() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("results").style.display = "block";
  document.getElementById("results").textContent =
    "You got " + numCorrect + "/" + numTotal + " questions correct.";
}

startQuiz.addEventListener("click", run);
