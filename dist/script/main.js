const startbtn = document.getElementById('startbtn');
const startmenu = document.getElementById('startmenu');
const music = document.getElementById('music');
const gamecontainer = document.getElementById('gamecontainer');
const customCursor = document.getElementById('custom-cursor');
const continueButton = document.getElementById('continueButton');
const gameAreas = document.querySelectorAll('.gameArea');
const bodyElement = document.body;

let inMenu = true;
let inGame = false;
let pojoja = 0
let isDead = false;

var audio = new Audio('./sound/hit.wav'); // hemulClicked sound TODO
var death = new Audio('./sound/lose.wav');  // losegame sound TODO
var missedHemul = new Audio('./sound/missed.mp3'); // missedHemul TODO

let bestScore = localStorage.getItem('bestScore') || 0; 
const scoreElement = document.getElementById('score');
const bestScoreElement = document.getElementById('best-score');
const lifes = document.getElementById('life');

let lifeAmount = 3;
let hittedHemuls = 0;
let missedHemuls = 0;

var audioElement = new Audio('./sound/music.wav');


function changePlaybackSpeed(speed) {
    if (audioElement) {
        audioElement.playbackRate = speed;
    }
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

let currentPos = 0; //hemul spawn position

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

//small bug in enemy drawing, since they can be overlapped by other enemies
//this doesn't really affect the game so not gonna fix : - )
function drawEnemy(enemyAmount){
    let animationDelay = 50;
    const delay = ms => new Promise(res => setTimeout(res, ms));
    
for (let i = 1; i < enemyAmount; i++){
        
    let x = getRandomInt(4);
    let y = getRandomInt(4);

    //possibly best code ever written
    do {
        x = getRandomInt(4);
        y = getRandomInt(4);
    } while (x == currentPos[0] && y == currentPos[1]) //checks if enemy pos is in hemul's territory


    const canvas = grid[x][y];
    canvas.id = 'enemy';

    const ctx = canvas.getContext('2d');
    ctx.fillStyle = "#C5DCFF";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

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
}


function CanvasClicked(event) {

  if (!event) {
    console.error("Event is undefined");
    return;
  }

  const canvas = event.target;
  const ctx = canvas.getContext("2d");

  if (canvas.id === "hemul") {
    animateCanvasRemoval(canvas);
    canvas.id = '';
    pojoja = pojoja + 1;
    updateScore();
    console.log('score increased by one\nTotal:',pojoja);
    
    audio.play();
    hittedHemuls += 1;
    
  }
  else if (inGame && canvas.id != "hemul") {
    // if empty square clicked do this...
        lifeAmount = lifeAmount - 1;
        lifes.textContent = lifeAmount;
        if (lifeAmount < 1) {
            death.play();

    
            isDead = true;
            alert('game overaaa');
            audioElement.pause()
            window.location.reload();
            
    }
  }
  if (canvas.id === "enemy"){
    death.play();

    
    isDead = true;
    alert('game over');
    window.location.reload();
    audioElement.pause()
  }
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

function animateCanvasRemoval(canvas) {
    const ctx = canvas.getContext('2d');

    let cHeight = canvas.height;
    const cWidth = canvas.width;
    let frameCount = 0;


    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        cHeight -= 20;
        ctx.drawImage(image, 
            0,
            canvas.height - cHeight,
            cWidth,
            cHeight
            );

        if (cHeight > 0) {
            requestAnimationFrame(animate);
        }

        frameCount++;
    }

   
    animate();
}

async function gameLoop(){

    const delay = ms => new Promise(res => setTimeout(res, ms));
    const time = 10

 while (time > 0 && isDead === false && inGame) {
    
    
    const enemySpawnerChance = getRandomInt(5); //5
    const enemySpawnerAmount = getRandomInt(4);


    if (enemySpawnerChance === 2){
        switch (enemySpawnerAmount){
            case 1:
                console.log("drawn enemy amount 1")
                drawEnemy(1);
                break;
            case 2:
                console.log("drawn enemy amount 2")
                drawEnemy(2);
                break;
            case 3:
                console.log("drawn enemy amount 3")
                drawEnemy(3);
                break;
            case 4:
                console.log("drawn enemy amount 4")
                drawEnemy(4);
        }
    }
    drawPlayer();
    
    


   const checkScore = levels();
   const blinkingDelay = 500

   //checkScore = levels();
    await delay(checkScore); 
    missedHemuls += 1;

    if (hittedHemuls != missedHemuls && isDead == false){ //if hemul has been missed do this...
        lifeAmount = lifeAmount - 1;
        lifes.textContent = lifeAmount;
        missedHemul.play();
        hittedHemuls += 1;
        console.log(hittedHemuls);
        console.log(missedHemuls);
        if (lifeAmount < 1) {
            death.play();

    
            isDead = true;
            alert('game over');
            window.location.reload();
            audioElement.pause()
    }

    }

    fillCanvases();
 }


}


const hemul = {
    speedDefault: Math.floor((Math.random() * 2500) + 1000),
    speedLvl1: Math.floor((Math.random() * 2000) + 1000),
    speedLvl2: Math.floor((Math.random() * 1500) + 1000),
    speedLvl3: Math.floor((Math.random() * 1000) + 800),
    speedLvl4: Math.floor((Math.random() * 1000) + 600),
    speedLvl5: Math.floor((Math.random() * 900) + 500),
    speedLvl6: Math.floor((Math.random() * 800) + 500),
    speedLvl7: Math.floor((Math.random() * 600) + 450),
    speedLvl8: Math.floor((Math.random() * 600) + 350),
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
            cloud.speed = 0.01;
        }
        
        return checkScore;
    }
    if (pojoja >= 10 && pojoja < 15){
        console.log("Speed: Lvl2");
        checkScore = hemul.speedLvl2;
        changePlaybackSpeed(1.5)
        for (const cloud of clouds) {
            cloud.speed = 0.05;
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
    if (pojoja >= 35 && pojoja < 45){
        console.log("Speed: Lvl7");
        checkScore = hemul.speedLvl7;
        changePlaybackSpeed(2)
        for (const cloud of clouds) {
            cloud.speed = 2;
        }
        return checkScore;
    }
    if (pojoja >= 45){
        console.log("Speed: Lvl8");
        checkScore = hemul.speedLvl8;
        changePlaybackSpeed(3)
        for (const cloud of clouds) {
            cloud.speed = 2.5;
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
    audioElement.pause()
}





document.addEventListener('DOMContentLoaded', function() {

    const startButton = document.getElementById("start");
    const newGameButton = document.getElementById("newGame");

    inMenu = true;

    startButton.onclick = function() {
        if (inGame == false && inMenu == false) {
            pojoja = 0;
            updateScore();
            start();   
        }
    
        
    };

    newGameButton.onclick = function() {
        
        if (inGame && inMenu == false){
            pojoja = 0;
            updateScore();
            inGame = false;
            clear();
        }

    };

    continueButton.onclick = function() {
        startmenu.style.display = 'none';
        
        bodyElement.classList.toggle("no-blur");
        gameAreas.forEach(gameArea => {
            gameArea.style.filter = 'none';
          });
        inMenu = false;
        audioElement.play();
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
    
    gamecontainer.className = 'bg-default h-screen items-center pt-32 justify-center';
    document.body.style.backgroundImage = 'url("./img/bg.png")';
    //music.src = "";
    
});
document.addEventListener('mousemove', (e) => {
    const cursorSize = 132;
    const customCursor = document.getElementById('custom-cursor'); // Get the cursor element
    
    // Calculate the cursor position with constraints
    let x = e.clientX - cursorSize / 4;
    let y = e.clientY - cursorSize / 1.5;

    // Ensure the cursor stays within the viewport
    const maxX = window.innerWidth - cursorSize;
    const maxY = window.innerHeight - cursorSize;

    x = Math.min(maxX, Math.max(0, x));
    y = Math.min(maxY, Math.max(0, y));

    customCursor.style.left = `${x}px`;
    customCursor.style.top = `${y}px`;
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