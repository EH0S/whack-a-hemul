const startbtn = document.getElementById('startbtn');
const startmenu = document.getElementById('startmenu');
const music = document.getElementById('music');
const gamecontainer = document.getElementById('gamecontainer');
const customCursor = document.getElementById('custom-cursor');
let inGame = false;
let pojoja = 0
let isDead = false;
var audio = new Audio('./sound/gnome.mp3');
var death = new Audio('./sound/death.mp3');
let playerPosition = { x: -1, y: -1 }; 
let enemyPosition = { x: -1, y: -1 }; 

let bestScore = localStorage.getItem('bestScore') || 0; 
const scoreElement = document.getElementById('score');
const bestScoreElement = document.getElementById('best-score');
const lifes = document.getElementById('life');
let lifeAmount = 3;
let hittedHemuls = 0;
let missedHemuls = 0;

const audioElement = document.getElementById('myAudio');

function changePlaybackSpeed(speed) {
    if (audioElement) {
        audioElement.playbackRate = speed;
    }
}


function chooseMusic(e){ // PLAY RANDOM SONG WHEN GAME START AND KEEP PLAYING THE LIST
    const gameMusic = [
        ".mp3",
        ".mp3",
        ".mp3",
        ".mp3"
    ];
    var gameSong = new Audio('./sound/'+gameMusic[getRandomInt(4)]);
    console.log("Chose song: ",gameSong);
    gameSong.play();
    gameSong.addEventListener('ended', function() {
        chooseMusic();
        //console.log("song ended", gameSong.currentSrc)
    });
}

function updateBestScoreElement() {
    bestScoreElement.textContent = bestScore;
}

function updateScore() {
    scoreElement.textContent = pojoja; 
    if (pojoja > bestScore) {
        bestScore = pojoja; 
        updateBestScoreElement(); 
        localStorage.setItem('bestScore', bestScore); 
    }
}
function saveBestScore() {
    localStorage.setItem('bestScore', bestScore);
}







const container = document.getElementById('container');
const image = document.getElementById('source');
const enemy = document.getElementById('enemy');
const grid = [];

let currentPos = 0;

for (let r = 0; r < 4; r++) {
    const row = document.createElement('div');
    row.className = 'flex justify-center';
    container.appendChild(row);
    const gridRow = [];

    for (let c = 0; c < 4; c++) {
        const canv = document.createElement('canvas');
        canv.addEventListener('click', CanvasClicked, false);
        canv.className = 'bg-[#C5DCFF] opacity-80 w-40 h-40 mt-3 ml-3 border-2 rounded-xl shadow-lg'; //grid layout
        row.appendChild(canv); 
        gridRow.push(canv); 
    }

    grid.push(gridRow);
    
}



const canvas = grid[getRandomInt(4)][getRandomInt(4)]; 
function fillCanvases() {
    const fillColor = "#C5DCFF";
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            
            const canvas = grid[r][c]; 
            canvas.id = '';

            const ctx = canvas.getContext('2d'); 
            ctx.fillStyle = fillColor;

            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
}


function start() {
    inGame = true;
    fillCanvases();  
    gameLoop();
    audioElement.play();
    //chooseMusic();
    
    //drawPlayer();
    //drawEnemy();
}

function drawPlayer() {
    let animationDelay = 50;
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const x = getRandomInt(4);
    const y = getRandomInt(4);

    const canvas = grid[x][y];
    const ctx = canvas.getContext('2d');
    playerPosition = { x, y };
    ctx.fillStyle = "#C5DCFF";
    canvas.id = 'hemul';
    //ctx.fillRect(0, 0, canvas.width, canvas.height);
    //console.log(canvas.width, canvas.height);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    currentPos = [x, y];

    


   // requestAnimationFrame(animate);
    
    async function animate(){
        ctx.drawImage(image, 21, 145, canvas.width, canvas.height);
        await delay(animationDelay);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 21, 90, canvas.width, canvas.height);
        await delay(animationDelay);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 21, 60, canvas.width, canvas.height);
        await delay(animationDelay);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(image, 21, 20, canvas.width, canvas.height);
    }
    requestAnimationFrame(animate);
}

function drawEnemy(){
    let animationDelay = 50;
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const x = getRandomInt(4);
    const y = getRandomInt(4);
    const canvas = grid[x][y];
    const ctx = canvas.getContext('2d');
    enemyPosition = { x, y };
    canvas.id = 'enemy';
    ctx.fillStyle = "#C5DCFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    //ctx.drawImage(enemy, 0, 0, canvas.width, canvas.height);

    currentPos = [x, y];
    async function animate(){
        ctx.drawImage(enemy, 21, 145, canvas.width, canvas.height);
        await delay(animationDelay);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(enemy, 21, 90, canvas.width, canvas.height);
        await delay(animationDelay);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(enemy, 21, 60, canvas.width, canvas.height);
        await delay(animationDelay);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(enemy, 21, 20, canvas.width, canvas.height);
    }
    requestAnimationFrame(animate);
}


function CanvasClicked(event) {
  // Check if 'event' is defined
  
  if (!event) {
    console.error("Event is undefined");
    return;
  }

  const canvas = event.target;
  const ctx = canvas.getContext("2d");

  if (canvas.id === "hemul") {
    canvas.id = '';
    pojoja = pojoja + 1;
    updateScore();
    console.log('score increased by one\nTotal:',pojoja);
    
    audio.play();
    hittedHemuls += 1;
    animateCanvasRemoval(canvas);
    
  }
  else if (inGame && canvas.id != "hemul") {
    console.log('l bozo'); // if empty square clicked do this...
        lifeAmount = lifeAmount - 1;
        lifes.textContent = lifeAmount;
        if (lifeAmount < 1) {
            death.play();

    
            isDead = true;
            alert('game over');
            window.location.reload();
    }
  }
  if (canvas.id === "enemy"){
    death.play();

    
    isDead = true;
    alert('game over');
    window.location.reload();
  }
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function animateCanvasRemoval(canvas) {
    const ctx = canvas.getContext('2d');



    function animate(currentTime) {


        ctx.clearRect(0, 0, canvas.width, canvas.height);
       // ctx.clearRect(0, 0, canvas.width, canvas.height);
      //  ctx.fillStyle = "#05080D";
      //  ctx.fillRect(0, 0, canvas.width, canvas.height);
        
    }

   
    requestAnimationFrame(animate);
}


async function gameLoop(){

const delay = ms => new Promise(res => setTimeout(res, ms));
 const time = 10
 while (time > 0 && isDead === false && inGame) {
    drawPlayer();
    
    const enemySpawnerChance = getRandomInt(5);
    const enemySpawnerAmount = getRandomInt(4);
    if (enemySpawnerChance === 2){
        switch (enemySpawnerAmount){
            case 1:
                console.log("drawn enemy amount 1")
                drawEnemy();
                break;
            case 2:
                console.log("drawn enemy amount 2")
                drawEnemy();
                drawEnemy();
                break;
            case 3:
                console.log("drawn enemy amount 3")
                drawEnemy();
                drawEnemy();
                drawEnemy();
                break;
            case 4:
                console.log("drawn enemy amount 4")
                drawEnemy();
                drawEnemy();
                drawEnemy();
                drawEnemy();
        }
        
    }
   // checkForClicks();
   const checkScore = levels();
   const blinkingDelay = 500

   //checkScore = levels();
    await delay(checkScore); 
    missedHemuls += 1;

    if (hittedHemuls != missedHemuls){
        death.play();

    
        isDead = true;
        alert('game over');
        window.location.reload();
    }

    fillCanvases();
    //await delay(blinkingDelay); //blinking delay - can be removed if annoying

    //infinite game loop so continue here with countdown timer or score system...
 }
 // end game

}


const hemul = {
    speedDefault: Math.floor((Math.random() * 2500) + 1000),
    speedLvl1: Math.floor((Math.random() * 2000) + 1000),
    speedLvl2: Math.floor((Math.random() * 1500) + 1000),
    speedLvl3: Math.floor((Math.random() * 1000) + 800),
    speedLvl4: Math.floor((Math.random() * 1000) + 500),
    speedLvl5: Math.floor((Math.random() * 900) + 500),
    speedLvl6: Math.floor((Math.random() * 800) + 500),
    speedLvl7: Math.floor((Math.random() * 600) + 350),
};
function changePlaybackSpeed(speed) {
    audioElement.playbackRate = speed;
  }
function levels(){


    if (pojoja >= 5 && pojoja < 10){
        console.log("Speed: Lvl1");
        checkScore = hemul.speedLvl1;
        changePlaybackSpeed(1.2)
        for (const cloud of clouds) {
            cloud.speed = 0.1;
        }
        
        return checkScore;
    }
    if (pojoja >= 10 && pojoja < 15){
        console.log("Speed: Lvl2");
        checkScore = hemul.speedLvl2;
        changePlaybackSpeed(1.5)
        for (const cloud of clouds) {
            cloud.speed = 0.2;
        }
        return checkScore;
    }
    if (pojoja >= 15 & pojoja < 20){
        console.log("Speed: Lvl3");
        checkScore = hemul.speedLvl3;
        changePlaybackSpeed(2)
        for (const cloud of clouds) {
            cloud.speed = 0.3;
        }
        return checkScore;
    }
    if (pojoja >= 20 & pojoja < 25){
        console.log("Speed: Lvl4");
        checkScore = hemul.speedLvl4;
        changePlaybackSpeed(2.1)
        for (const cloud of clouds) {
            cloud.speed = 0.4;
        }
        return checkScore;
    }
    if (pojoja >= 25 & pojoja < 30){
        console.log("Speed: Lvl5");
        checkScore = hemul.speedLvl5;
        changePlaybackSpeed(2.3)
        for (const cloud of clouds) {
            cloud.speed = 1;
        }
        return checkScore;
    }
    if (pojoja >= 30 & pojoja < 35){
        console.log("Speed: Lvl6");
        checkScore = hemul.speedLvl6;
        changePlaybackSpeed(2.5)
        for (const cloud of clouds) {
            cloud.speed = 1.5;
        }
        return checkScore;
    }
    if (pojoja >= 35){
        console.log("Speed: Lvl7");
        checkScore = hemul.speedLvl7;
        changePlaybackSpeed(2.7)
        for (const cloud of clouds) {
            cloud.speed = 2;
        }
        return checkScore;
    }
    if (pojoja < 5) {
        console.log("Speed: Default");
        checkScore = hemul.speedDefault;
        return checkScore;
    }
    
}

function clear() {
    const ctx = canvas.getContext('2d'); 
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const canvas = grid[r][c]; 
            const ctx = canvas.getContext('2d'); 
            
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
        }
    }
    console.log("new game called");
    window.location.reload();
}





document.addEventListener('DOMContentLoaded', function() {
    

    const startButton = document.getElementById("start");
    const newGameButton = document.getElementById("newGame");

    startButton.onclick = function() {

        if (inGame == false) {
            pojoja = 0;
            updateScore();
            start();   
        }
        
        
    };

    newGameButton.onclick = function() {
        
        if (inGame){
            pojoja = 0;
            updateScore();
            inGame = false;
            clear();
        }

    };
});



document.addEventListener('click', (e) => {
    
    customCursor.style.animation = 'swing 0.2s ease-in';

    // Reset the animation after it finishes
    customCursor.addEventListener('animationend', () => {
        customCursor.style.animation = '';
    });

    // Set the cursor's position to the click event coordinates
    customCursor.style.left = `${e.clientX - customCursor.clientWidth / 4}px`;
    customCursor.style.top = `${e.clientY - customCursor.clientHeight / 1.5}px`;
});

startbtn.addEventListener('click', () => {
    startmenu.className = 'hidden';
    gamecontainer.className = 'bg-default h-screen items-center pt-32 justify-center';
    document.body.style.backgroundImage = 'url("./img/bg.png")';
    music.src = "";
    
});
document.addEventListener('mousemove', (e) => {
    
    const cursorSize = 132; 
    customCursor.style.left = `${e.clientX - cursorSize / 4}px`; 
    customCursor.style.top = `${e.clientY - cursorSize / 1.5}px`;
});
updateBestScoreElement();



//cloud animation
//could be improved making scalable but too lazy
//edit: made it scalable but doesn't look right
const cloudCanvas = document.getElementById('canvascloud');
const c = cloudCanvas.getContext('2d');

// Define an array to hold cloud objects
const clouds = [
  { image: document.getElementById('cloud1'), x: 0, y: 50, speed: 0.02 },
 
  { image: document.getElementById('cloud2'), x: 40, y: 30, speed: 0.01 },
  { image: document.getElementById('cloud1'), x: 50, y: 60, speed: 0.02 },

  { image: document.getElementById('cloud2'), x: 85, y: 40, speed: 0.02 },
  { image: document.getElementById('cloud1'), x: 0, y: 90, speed: 0.01 },
  

  { image: document.getElementById('cloud1'), x: 200, y: 50, speed: 0.01 },
  
  { image: document.getElementById('cloud2'), x: 240, y: 30, speed: 0.02 },
  { image: document.getElementById('cloud1'), x: 250, y: 60, speed: 0.01 },

  { image: document.getElementById('cloud2'), x: 285, y: 40, speed: 0.01 },
  { image: document.getElementById('cloud1'), x: 200, y: 90, speed: 0.02 },



  //(scalable!!)
];

function cloudsAnimation() {
  c.clearRect(0, 0, cloudCanvas.width, cloudCanvas.height);

  // Loop through the cloud objects and update their positions
  for (const cloud of clouds) {
    c.drawImage(cloud.image, cloud.x, cloud.y, 20, 10);
    cloud.x += cloud.speed;

    // If a cloud goes off the canvas, reset its position
    if (cloud.x > cloudCanvas.width) {
      cloud.x = -20; // Place it just outside the canvas
    }
  }

  window.requestAnimationFrame(cloudsAnimation);
}

window.requestAnimationFrame(cloudsAnimation);