// const submitButton = document.getElementById("submit");
var startQuiz = document.querySelector("#start");
console.log(startQuiz);
var countdownEl = document.getElementById("countdown");
var quizEl = document.getElementById("quiz");
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

function countdown() {
  document.getElementById("start").style.display = "none"; //disappear start button
  document.getElementById("submit").style.display = "block"; //appear submit button
  var timeRemaining = 60;

  var timeInterval = setInterval(function () {
    timeRemaining--;
    countdownEl.textContent = timeRemaining + " seconds remaining";
    if (timeRemaining === 0) {
      clearInterval(timeInterval);
    }
  }, 1000);
}

function runQuiz() {
  // variable to store the HTML output
  const output = [];

  // for each question...
  Questions.forEach((currentQuestion, questionNumber) => {
    // variable to store the list of possible answers
    const answers = [];

    // and for each available answer...
    for (letter in currentQuestion.answers) {
      // ...add an HTML radio button
      answers.push(
        `<label>
              <input type="radio" name="question${questionNumber}" value="${letter}">
              ${letter} :
              ${currentQuestion.answers[letter]}
            </label>`
      );
    }

    // add this question and its answers to the output
    output.push(
      `<div class="question"> ${currentQuestion.question} </div>
          <div class="answers"> ${answers.join("")} </div>`
    );
  });

  // finally combine our output list into one string of HTML and put it on the page
  quizContainer.innerHTML = output.join("");
}
// function showResults() {}

// const quizContainer = document.getElementById("quiz");
// const resultsContainer = document.getElementById("results");
// const submitButton = document.getElementById("submit");

// runQuiz();
