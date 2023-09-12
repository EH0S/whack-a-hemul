const startbtn = document.getElementById('startbtn');
const startmenu = document.getElementById('startmenu');
const music = document.getElementById('music');
const gamecontainer = document.getElementById('gamecontainer');

startbtn.addEventListener('click', () => {
    startmenu.className = 'hidden';
    gamecontainer.className = 'bg-default h-screen items-center pt-32 justify-center';
    document.body.style.backgroundImage = 'url("./img/bg.png")';
    music.src = "";
    
});

const container = document.getElementById('container');
const image = document.getElementById('source');
const cursor = document.getElementById('.cursor');
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
        canv.className = 'bg-[#0A1C4D] opacity-80 w-40 h-40 border-2'; //grid layout
        row.appendChild(canv); 
        gridRow.push(canv); 
    }

    grid.push(gridRow);
    
}



const canvas = grid[getRandomInt(4)][getRandomInt(4)]; 
function fillCanvases() {
    for (let r = 0; r < 4; r++) {
        for (let c = 0; c < 4; c++) {
            const canvas = grid[r][c]; 
            const ctx = canvas.getContext('2d'); 
            //ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            ctx.fillStyle = "#05080D";

            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
}


function start() {
    fillCanvases();  
    gameLoop();
}

function drawPlayer(){
    const x = getRandomInt(4);
    const y = getRandomInt(4);

    const canvas = grid[x][y]; 
    //canvas.id = "yes";
    const ctx = canvas.getContext('2d'); 

    ctx.fillStyle = "#0A1C4D";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    currentPos = [x, y];
}

function CanvasClicked(event) {
  // Check if 'event' is defined
  if (!event) {
    console.error("Event is undefined");
    return;
  }

  const ctx = event.target.getContext("2d");
  if (ctx.fillStyle === "#0a1c4d") {
  console.log('omgmg');
  }
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}



async function gameLoop(){
const delay = ms => new Promise(res => setTimeout(res, ms));
 let time = 10
 while (time > 0){
    drawPlayer();
   // checkForClicks();
    await delay(500);
    fillCanvases();
    await delay(500); //blinking delay - can be removed if annoying

    //infinite game loop so continue here with countdown timer...
 }
 // end game

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


// Call the fillCanvases function when the page loads
//window.addEventListener('load', fillCanvases);

document.addEventListener('DOMContentLoaded', function() {
    const startButton = document.getElementById("start");
    const newGameButton = document.getElementById("newGame");

    startButton.onclick = function() {
        start();
    };

    newGameButton.onclick = function() {
        clear();
    };
    
});