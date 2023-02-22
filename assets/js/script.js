// Container Elements
var containerStartEl = document.getElementById("starter-container");
var containerQuestionEl = document.getElementById("question-container");
var containerEndEl = document.getElementById("end-container");

// ID Elements
var containerScoreEl = document.getElementById("score-banner");
var formInitials = document.getElementById("initials-form");
var containerHighScoresEl = document.getElementById("high-score-container");
var viewHighScoreEl = document.getElementById("view-high-scores");
var listHighScoreEl = document.getElementById("high-score-list");
var correctEl = document.getElementById("correct");
var wrongEl = document.getElementById("wrong");

// Button Elements
var btnStartEl = document.querySelector("#start-game");
var btnGoBackEl = document.querySelector("#go-back");
var btnClearScoresEl = document.querySelector("#clear-high-scores");

// Question Elements
var questionEl = document.getElementById("question");
var answerButtonsEl = document.getElementById("answer-buttons");

// Timer/Score Elements
var timerEl = document.querySelector("#timer");
var score = 0;
var timeLeft;
var gameover;
timerEl.innerText = 0;
var highScores = [];

// Questions
var arrayShuffledQuestions;
var questionIndex = 0;

var questions = [
    { q: 'Commonly used data types DO NOT include:', 
        a: 'alerts', 
        choices: [{choice: 'strings'}, {choice: 'booleans'}, {choice: 'alerts'}, {choice: 'numbers'}]
    },
    { q: 'The condition in an if / else statement is enclosed within _____.', 
        a: 'curly brackets', 
        choices: [{choice: 'quotes'}, {choice: 'curly brackets'}, {choice: 'parentheses'}, {choice: 'square brackets'}]
    },
    { q: 'Arrays in JavaScript can be used to store _____.', 
        a: 'all of the above', 
        choices: [{choice: 'numbers and strings'}, {choice: 'other arrays'}, {choice: 'booleans'}, {choice: 'all of the above'}]
    },
    { q: 'String values must be enclosed within _____ when being assigned to variables.', 
        a: 'quotes', 
        choices: [{choice: 'commas'}, {choice: 'curly brackets'}, {choice: 'quotes'}, {choice: 'parentheses'}]
    },
    { q: 'A very useful tool used during development and debugging for printing content to the debugger is:', 
        a: 'console.log', 
        choices: [{choice: 'JavaScript'}, {choice: 'terminal / bash'}, {choice: 'for loops'}, {choice: 'console.log'}]
    },
];
      
// Starting Function
var renderStartPage = function() {
    containerHighScoresEl.classList.add("hide");
    containerHighScoresEl.classList.remove("show");
    containerStartEl.classList.remove("hide");
    containerStartEl.classList.add("show");
    containerScoreEl.removeChild(containerScoreEl.lastChild);
    questionIndex = 0;
    gameover = "";
    timerEl.textContent = 0;
    score = 0;

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide")
    };

    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    };
};

// Timer Function
var setTime = function() {
    timeLeft = 50;

    var timerCheck = setInterval(function() {
        timerEl.innerText = timeLeft;
        timeLeft--;

        if (gameover) {
            clearInterval(timerCheck);
        };
       
        if (timeLeft < 0) {
            showScore();
            timerEl.innerText = 0;
            clearInterval(timerCheck);
        };
    }, 1000);
};

// Start Quiz Function
var startGame = function() {
    containerStartEl.classList.add('hide');
    containerStartEl.classList.remove('show');
    containerQuestionEl.classList.remove('hide');
    containerQuestionEl.classList.add('show');
    arrayShuffledQuestions = questions.sort(() => Math.random() - 0.5);
    setTime();
    setQuestion();
};
    
// Next Question Function
var setQuestion = function() {
    resetAnswers();
    displayQuestion(arrayShuffledQuestions[questionIndex]);
};

// Clear Answers Function
var resetAnswers = function() {
    while (answerButtonsEl.firstChild) {
        answerButtonsEl.removeChild(answerButtonsEl.firstChild);
    };
};

// Display Question Function
var displayQuestion = function(index) {
    questionEl.innerText = index.q
    for (var i = 0; i < index.choices.length; i++) {
        var answerButton = document.createElement('button');
        answerButton.innerText = index.choices[i].choice;
        answerButton.classList.add('btn');
        answerButton.classList.add('answerbtn');
        answerButton.addEventListener("click", answerCheck);
        answerButtonsEl.appendChild(answerButton);
    };
};

// Display if Correct
var answerCorrect = function() {
    if (correctEl.className = "hide") {
        correctEl.classList.remove("hide");
        correctEl.classList.add("banner");
        wrongEl.classList.remove("banner");
        wrongEl.classList.add("hide");
    };
};

// Display if Wrong
var answerWrong = function() {
    if (wrongEl.className = "hide") {
        wrongEl.classList.remove("hide");
        wrongEl.classList.add("banner");
        correctEl.classList.remove("banner");
        correctEl.classList.add("hide");
    };
};

// Check if Answer is Correct or Wrong
var answerCheck = function(event) {
    var selectedAnswer = event.target;
    if (arrayShuffledQuestions[questionIndex].a === selectedAnswer.innerText){
        answerCorrect();
        timeLeft = timeLeft + 10;
    } else {
        answerWrong();
        timeLeft = timeLeft - 10;
    };

    // Check if There are More Questions
    questionIndex++;
    if  (arrayShuffledQuestions.length > questionIndex) {
        setQuestion();
    } else {
        gameover = "true";
        showScore();
    };
};

// Display Score Function
var showScore = function () {
    containerQuestionEl.classList.add("hide");
    containerEndEl.classList.remove("hide");
    containerEndEl.classList.add("show");
    score = timeLeft;
    var scoreDisplay = document.createElement("p");
    scoreDisplay.innerText = ("Your final score is " + score + "!");
    containerScoreEl.appendChild(scoreDisplay);
};

// Set High Score Function
var createHighScore = function(event) { 
    event.preventDefault();
    var initials = document.querySelector("#initials").value;
    if (!initials) {
        alert("Enter your intials!");
        return;
    };
    
    formInitials.reset();

    var highScore = {
        initials: initials,
        score: score
    };

    // Push and Sort High Scores
    highScores.push(highScore);
    highScores.sort((a, b) => {return b.score-a.score});

    // Clear High Score List
    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    };

    // Create List Element for High Scores
    for (var i = 0; i < highScores.length; i++) {
        var highScoreEl = document.createElement("li");
        highScoreEl.className = "high-score";
        highScoreEl.innerHTML = highScores[i].initials + " - " + highScores[i].score;
        listHighScoreEl.appendChild(highScoreEl);
    };

    saveHighScore();
    displayHighScores();
};

// Save High Score Function
var saveHighScore = function() {
    localStorage.setItem("HighScores", JSON.stringify(highScores));
};

// Load High Score List Function
var loadHighScore = function() {
    var loadedHighScores = localStorage.getItem("HighScores");
    if (!loadedHighScores) {
        return false;
    };

    loadedHighScores = JSON.parse(loadedHighScores);
    loadedHighScores.sort((a, b) => {return b.score-a.score});
 
    for (var i = 0; i < loadedHighScores.length; i++) {
        var highScoreEl = document.createElement("li");
        highScoreEl.className = "high-score";
        highScoreEl.innerText = loadedHighScores[i].initials + " - " + loadedHighScores[i].score;
        listHighScoreEl.appendChild(highScoreEl);
        highScores.push(loadedHighScores[i]);
    };
};

// Display High Scores Function
var displayHighScores = function() {
    containerHighScoresEl.classList.remove("hide");
    containerHighScoresEl.classList.add("show");
    gameover = "true";

    if (containerEndEl.className = "show") {
        containerEndEl.classList.remove("show");
        containerEndEl.classList.add("hide");
    };
    
    if (containerStartEl.className = "show") {
        containerStartEl.classList.remove("show");
        containerStartEl.classList.add("hide");
    };
            
    if (containerQuestionEl.className = "show") {
        containerQuestionEl.classList.remove("show");
        containerQuestionEl.classList.add("hide");
    };

    if (correctEl.className = "show") {
        correctEl.classList.remove("show");
        correctEl.classList.add("hide");
    };

    if (wrongEl.className = "show") {
        wrongEl.classList.remove("show");
        wrongEl.classList.add("hide");
    };
};

// Clear High Scores Function
var clearScores = function () {
    highScores = [];

    while (listHighScoreEl.firstChild) {
        listHighScoreEl.removeChild(listHighScoreEl.firstChild);
    };

    localStorage.clear(highScores);
};

loadHighScore();
        
// Start Button
btnStartEl.addEventListener("click", startGame);
// Submit Initials Button
formInitials.addEventListener("submit", createHighScore);
// View High Scores Button
viewHighScoreEl.addEventListener("click", displayHighScores);
// Go Back Button
btnGoBackEl.addEventListener("click", renderStartPage);
// Clear High Scores Button
btnClearScoresEl.addEventListener("click", clearScores);
