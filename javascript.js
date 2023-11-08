var playing = false;
var score;
var action;
var timeremaining;
var correctAnswer;
var chosenAnswer;
// clicking on start/reset button

document.getElementById("start-reset").onclick = function () {
// Are we already in a playing mode?
if (playing === true) {
    // Game page is reloaded
    location.reload();
} else {
    // not already in playing mode
    playing = true;
    
    // Change start button from Start Game to Reset Game
    document.getElementById("start-reset").innerHTML = "Reset Game";
    
    // Reset game score
    score = 0;
    document.getElementById("scorevalue").innerHTML = score;
    
    // Show the timer box
    showbox("timer");
    
    // Hide game over message
    hidebox("gameover");
    
    // Start the timer, show game over message with overall game score.
    // Hide the timer when game is over
    timeremaining = 60;
    startcountdown (); 
    generateQA();
}
    
}

// clicking the answer box

for (i = 1; i < 5; i++) {
    
    document.getElementById("opt"+i).onclick = function () {
    // Check if we are in playing mode
    if (playing == true) {
        // Check if chosen answer is equal to correct answer
        if (this.innerHTML == correctAnswer) {
            //increment score by 1
            score++;
            document.getElementById("scorevalue").innerHTML = score;
            // show correct box for 1 sec
            hidebox("wrong");
            showbox("correct");
            setTimeout(function(){
                hidebox("correct");
            }, 1000);
            generateQA(); 
        } else {
            // show try again box for 1 sec
            hidebox("correct");
            showbox("wrong");
            setTimeout(function(){
                hidebox("wrong");
            }, 1000);
        }
    }
} 
    
}

// Functions

function showbox(Id) {
    document.getElementById(Id).style.display = 'block';
}

function hidebox(Id) {
    document.getElementById(Id).style.display = 'none';
}

function startcountdown () {
    // start game timer
    action = setInterval(function() {
        timeremaining--;
        document.getElementById("timeremainingvalue").innerHTML = timeremaining;
        if (timeremaining == 0) {
            // No time remaining is zero
            stopcountdown ();
            // Show game over message
            showbox("gameover");
            document.getElementById("gameover").innerHTML ="<p>GAME OVER!</p><p>YOUR SCORE IS "+ score +".</p>";
            // Hide the timer when game is over
            hidebox("timer");
            //Reset game mode
            playing = false;
            // Change start button from Reset Game to Start Game. 
            document.getElementById("start-reset").innerHTML = "Start Game";
        }
    }, 1000);
}

function stopcountdown () {
    // Stop the game timer
    clearInterval(action);
}

function generateQA() {
    //Generate random numbers to multiply
    var x = 1 + Math.round(Math.random() * 11);
    var y = 1 + Math.round(Math.random() * 11);
    correctAnswer = x * y;
    // Display math problem
    document.getElementById("problem").innerHTML = x + 'x' + y;
    //generate a random position for the correct answer 
    var correctPosition = 1 + Math.round(Math.random() * 3);
    // Display the correct answer in the random position
    document.getElementById("opt"+correctPosition).innerHTML = correctAnswer;
    // Generate random wrong answers and populate the remaining 3 positions
    var answers = [correctAnswer];
    for (i=1; i < 5; i++) {
        // i should not interfere with correct position
        if (i != correctPosition) {
            // Generate wrong answers and display them, none of them should be equal to correct answer
            var wrongAnswer;
            do {
                wrongAnswer = (1 + Math.round(Math.random() * 11)) * (1 + Math.round(Math.random() * 11));   
            } while (answers.indexOf(wrongAnswer) > -1); //avoid duplicating wrongAnswer
            document.getElementById("opt"+i).innerHTML = wrongAnswer;
            answers.push(wrongAnswer);
        }
    }
}