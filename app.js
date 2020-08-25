let startButton = document.getElementById("start-button");
let start = document.getElementById("gamestart"); 
let finish = document.getElementById("finish");
let timer = document.getElementById("countdown");
let score = document.getElementById("score");
let wordCharParent = document.getElementById("word");
let words;

// Get list of word from words.txt
fetch('words.txt')
  .then(response => response.text())
  .then(text => {
      words = text;
}).catch(err => console.log(err))

// function after start button has been click
const startGame = () =>{
    // hide start button
    startButton.style.visibility = "hidden";
    let wordlist = words.split(',')
    startCountdown();
    testWord = displayWord(wordlist)
    let w = wordCharParent.children;
    let i = 0;
    let currentScore = 0;
    
    // listen to user keyboard and compare with actual character
    document.addEventListener('keydown', function(event) {
        if(i + 1 != testWord.length){
            if(event.key.toUpperCase() == testWord.charAt(i)){
                w[i].classList.add("red"); 
                i++;
            }
        }else if(i + 1 == testWord.length){
            currentScore++
            score.textContent = currentScore;
            wordCharParent.innerHTML = '';
            testWord = displayWord(wordlist)
            i = 0;
        }
    });
}

// wait for start button to be click
startButton.addEventListener("click", startGame);


// timer function
const startCountdown = () => {
    let current = timer.textContent
    start.play();
    let countdown = setInterval(function() {
        if (parseInt(timer.textContent) != 0){
        current--;
        timer.textContent = current;
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
const displayWord = (array_word) =>{
    // randomly select the word
    rand = Math.floor(Math.random() * array_word['length']);
    let randword = array_word[rand].toUpperCase()
    
    for(let i = 0; i < randword.length; i ++){
        let node = document.createElement("LI"); 
        let textnode = document.createTextNode(randword.charAt(i)); 
        node.appendChild(textnode);
        wordCharParent.appendChild(node);
    }
    return randword;
}

// reset game
const resetGame = () =>{
    timer.textContent = 20
    wordCharParent.innerHTML = '';
    score.textContent = 0
    startButton.style.visibility = "visible";
    start.currentTime = 0;
    finish.currentTime = 0;
}
