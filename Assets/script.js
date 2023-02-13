// const submitButton = document.getElementById("submit");
var startQuiz = document.querySelector("#start");
console.log(startQuiz);
var countdownEl = document.getElementById("countdown");
var quizEl = document.getElementById("quiz");
var questionEl = document.createElement("p");
var answersEl = document.createElement("p");
//var questionEl = document.createElement("p");
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

// var aBut = document.createElement("button");
// var bBut = document.createElement("button");
// var cBut = document.createElement("button");
// var dBut = document.createElement("button");
// aBut, bBut, cBut, dBut.setAttribute("class", "option");
// aBut, bBut, cBut, dBut.setAttribute("class", "option");

//preventDefault();
var aBut = document.querySelector("#A");
var bBut = document.querySelector("#B");
var cBut = document.querySelector("#C");
var dBut = document.querySelector("#D");

function runQuiz() {
  console.log(Questions[0].question);
  console.log(Questions[0].answers[(0, "a")]);

  for (i = 0; i < Questions.length; i++) {
    questionEl.textContent = Questions[i].question;
    aBut.textContent = "a. " + Questions[i].answers[(i, "a")];
    bBut.textContent = "b. " + Questions[i].answers[(i, "b")];
    cBut.textContent = "c. " + Questions[i].answers[(i, "c")];
    dBut.textContent = "d. " + Questions[i].answers[(i, "d")];
    quizEl.append(questionEl, aBut, bBut, cBut, dBut);
    function choose() {
      alert("You have selected an option");
    }
    aBut.addEventListener("click", choose);
    bBut.addEventListener("click", choose);
    cBut.addEventListener("click", choose);
    dBut.addEventListener("click", choose);

    //Grade Question
    // function grade()
    //Set correct answer
    var correctAns = Questions[i].correctAnswer;
    console.log(correctAns);

    console.log(aBut);
    console.log(bBut);
    console.log(cBut);
    console.log(dBut);
    // quizEl.appendChild(answersEl);
  }
}

function countdown() {
  document.getElementById("start").style.display = "none"; //disappear start button
  var timeRemaining = 75;

  var timeInterval = setInterval(function () {
    timeRemaining--;
    countdownEl.textContent = "Time: " + timeRemaining + " seconds";
    if (timeRemaining === 0) {
      clearInterval(timeInterval);
    }
  }, 1000);
  runQuiz();
}

startQuiz.addEventListener("click", countdown);
