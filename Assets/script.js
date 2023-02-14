// const submitButton = document.getElementById("submit");
var timeRemaining = 75;
var startQuiz = document.querySelector("#start");
console.log(startQuiz);
var countdownEl = document.getElementById("countdown");
var quizEl = document.getElementById("quiz");
var questionEl = document.createElement("p");
var answersEl = document.createElement("p");
var Questions = [
  {
    question: "Who invented JavaScript?",
    answers: {
      a: "Brendan Eich",
      b: "Douglas Crockford",
      c: "Maximus Java",
      d: "Davy Crockett",
    },
    correctAnswer: "a",
  },
  {
    question: "Commonly used data types do NOT include:",
    answers: {
      a: "strings",
      b: "booleans",
      c: "alerts",
      d: "numbers",
    },
    correctAnswer: "c",
  },
  {
    question:
      "The condition in  an if/ else statement is enclosed with _________.",
    answers: {
      a: "quotes",
      b: "curly brackets",
      c: "parenthesis",
      d: "square brackets",
    },
    correctAnswer: "c",
  },
  {
    question: "Arrays in JavaScript can be used to store _______.",
    answers: {
      a: "numbers and strings",
      b: "other arrays",
      c: "booleans",
      d: "all of the above",
    },
    correctAnswer: "d",
  },
  {
    question:
      "String values must be enclosed within _____ when being assigned to variables.",
    answers: {
      a: "commas",
      b: "curly brackets",
      c: "quotes",
      d: "parenthesis",
    },
    correctAnswer: "c",
  },
  {
    question:
      "A very useful tool used during deployment and debugging for printing content to the debugger is _______.",
    answers: {
      a: "JavaScript",
      b: "Terminal/Bash",
      c: "for loops",
      d: "console",
    },
    correctAnswer: "d",
  },
]; //Question Bank
var numCorrect = 0;
var numTotal = Questions.length;
var questions = Questions.map(({ question }) => question);
var answers = Questions.map(({ answers }) => answers);
var correctAnswers = Questions.map(({ correctAnswer }) => correctAnswer);
var resultsEl = document.getElementById("results");
var scoreEl = document.createElement("p");
// console.log(questions);
// console.log(answers);
// console.log(correctAnswers);

//preventDefault();
var aBut = document.querySelector("#a");
var bBut = document.querySelector("#b");
var cBut = document.querySelector("#c");
var dBut = document.querySelector("#d");
let i = 0;

function runQuiz() {
  // for (i = 0; i < Questions.length; ) {
  // console.log(answers);
  // console.log(Questions);
  questionEl.textContent = questions[i];
  console.log(questions[i]);

  var theseAnswers = [answers[i].a, answers[i].b, answers[i].c, answers[i].d];
  console.log(theseAnswers);
  aBut.textContent = theseAnswers[0];
  bBut.textContent = theseAnswers[1];
  cBut.textContent = theseAnswers[2];
  dBut.textContent = theseAnswers[3];
  answersEl.append(questionEl, aBut, bBut, cBut, dBut);
  quizEl.append(questionEl, answersEl);
  function choose(event) {
    event.stopPropagation();
    // event.preventDefault();
    var element = event.target;
    if (element.matches("button")) {
      // alert("You have selected an option");
      console.log(event.target.id);
      console.log(correctAnswers[i]);

      //Grade Question
      function grade() {
        event.stopPropagation();
        // event.preventDefault();
        if (event.target.id === correctAnswers[i]) {
          numCorrect += 1;
          console.log(numCorrect);
        } else if (event.target.id !== correctAnswers[i]) {
          numCorrect = numCorrect;
          console.log(numCorrect);
          timeRemaining -= 5;
        }
      }
      grade();

      if (i < Questions.length) {
        theseAnswers = ["", "", "", ""];
        i = i + 1;
        console.log(i);
        runQuiz();
      } else {
        //if i is at number of questions move to showResults() and zero timer
        timeRemaining = 1;
      }
    }
  }
  answersEl.addEventListener("click", choose);
}
// }
function showResults() {
  document.getElementById("quiz").style.display = "none";
  document.getElementById("results").style.display = "block";
  document.getElementById("results").textContent =
    "You got " + numCorrect + "/" + numTotal + " questions correct.";
}

// console.log(correctAns);

// console.log(aBut);
// console.log(bBut);
// console.log(cBut);
// console.log(dBut);

function countdown() {
  document.getElementById("start").style.display = "none"; //disappear start button
  document.getElementById("quiz").style.display = "flex"; //appear quiz element
  document.getElementById("quiz").style.flexDirection = "column"; //change flex-direction

  var timeInterval = setInterval(function () {
    timeRemaining--;
    countdownEl.textContent = "Time: " + timeRemaining + " seconds";
    if (timeRemaining === 0) {
      clearInterval(timeInterval);
      showResults();
    }
  }, 1000);
  runQuiz();
}

startQuiz.addEventListener("click", countdown);
