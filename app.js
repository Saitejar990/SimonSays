let gameSeq = [];
let userSeq = [];

let buttons = ["blue","green","yellow","red"];
let score = 0;
let max_score = 0;

let start = false;
let level = 0;

let h2 = document.querySelector("h2");

/*first step -> the game has to start when any key is pressed and 
and should level up.
level up in the sense some button has to flash and the user has to 
match that seq inorder to level up and gain score.
*/
document.addEventListener("keypress", function() {
    if(start == false)
    {
        console.log("game started");
        start = true;

        levelUp();
    }
});

function levelUp(){
    userSeq = [];
    level++;

    h2.innerHTML = `<b> Level ${level}</b>`;


    /*select rand button ->
    generate a number from 0 to 3 and match it with 
    index of buttons array.
    */

    let randIdx = Math.floor(Math.random() *3);
    let randColor = buttons[randIdx];
    
    let randBtn = document.querySelector(`.${randColor}`);
    gameSeq.push(randColor);
    console.log(gameSeq);
    gameFlash(randBtn);
}

function gameFlash(btn) {
    btn.classList.add("flash");

    setTimeout(() => {
        btn.classList.remove("flash");
    }, 250);
}

function userFlash(btn) {
    btn.classList.add("userFlash");

    setTimeout(() => {
        btn.classList.remove("userFlash");
    }, 250);


}

function checkSeq(idx){
    if(userSeq[idx] === gameSeq[idx])
    {
        score++;
        if(userSeq.length == gameSeq.length)
            setTimeout(levelUp,1000);
    }
    else
    {
        h2.innerHTML = `Your score is <b>${score}</b> <br> Game Over! Press any key to start.`;
        
        document.querySelector("body").style.backgroundColor = "red";
        
        setTimeout(() => {
            document.querySelector("body").style.backgroundColor = "white";    
        }, 150);

        if(max_score < score)
        {
            max_score = score;
            let h3 = document.querySelector("h3");
            h3.innerHTML = `High Score: ${max_score}`;
        }

        reset();
    }

}

function btnClick() {
    // console.log(this);

    userFlash(this);

    let userBtn = this.getAttribute("id");
    userSeq.push(userBtn);
    // console.log(userSeq);
    
    checkSeq(userSeq.length - 1);
}

let allBtns = document.querySelectorAll(".btn");

for(btn of allBtns){
    btn.addEventListener("click", btnClick);
}

function reset(){
    start = false;
    gameSeq = [];
    userSeq = [];
    level = 0;
    score = 0;
}

