var startButton = document.getElementById("start-button");
var start = document.getElementById("gamestart"); 
var finish = document.getElementById("finish");
var timer = document.getElementById("countdown");
var score = document.getElementById("score");
var words;

// Get list of word from words.txt
fetch('words.txt')
  .then(response => response.text())
  .then(text => {
      words = text;
})

// wait for start button to be click
startButton.addEventListener("click", startGame);


// function after start button has been click
function startGame(){
    // hide start button
    startButton.style.visibility = "hidden";
    var wordlist = words.split(',')
    startCountdown();
    testWord = displayWord(wordlist)
    var w = document.getElementById("word").children;
    var i = 0;
    var currentScore = 0;
    
    // listen to user keyboard and compare with actual character
    document.addEventListener('keydown', function(event) {
        console.log(event.key)
        console.log(w[i].textContent)
        console.log("length: " + testWord.length)
        console.log("index: " + i)
        
        if(i + 1 != testWord.length){
            if(event.key.toUpperCase() == w[i].textContent){
                console.log("same");
                w[i].classList.add("red"); 
                i++;
            }
        }else if(i + 1 == testWord.length){
            w[i].classList.add("red");
            currentScore++
            score.textContent = currentScore;
            document.getElementById("word").innerHTML = '';
            testWord = displayWord(wordlist)
            i = 0;
        }
    });
}

// timer function
function startCountdown(){

    var current = timer.textContent
    start.play();
    var countdown = setInterval(function() {
        if (parseInt(timer.textContent) != 0){
        current--;
        timer.textContent = current;
        console.log("current count " + current )
        }else{
            clearInterval(countdown);
            finish.play();
            start.pause();
            alert("Game is over! and your score is " + score.textContent);
            resetGame();
        }
    }, 1000);
}

// append word 
function displayWord(array_word){

    // randomly select the word
    rand = Math.floor(Math.random() * array_word['length']);
    var randword = array_word[rand].toUpperCase()
    
    for(var i = 0; i < randword.length; i ++){
        var node = document.createElement("LI"); 
        var textnode = document.createTextNode(randword.charAt(i)); 
        node.appendChild(textnode);
        document.getElementById("word").appendChild(node);
    }
    return randword;
}

// reset game
function resetGame(){
    document.getElementById("countdown").textContent = 10
    document.getElementById("word").innerHTML = '';
    score.textContent = 0
    startButton.style.visibility = "visible";
    start.currentTime = 0;
    finish.currentTime = 0;
}


