const container = document.getElementById('container');
const image = document.getElementById('source');
const cursor = document.getElementById('.cursor');
const grid = [];


for (let r = 0; r < 4; r++) {
    const row = document.createElement('div');
    row.className = 'flex justify-center';
    container.appendChild(row);
    const gridRow = [];

    for (let c = 0; c < 4; c++) {
        const canv = document.createElement('canvas');
        canv.className = 'bg-green-900 w-40 h-40 border'; //grid layout
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
            
            ctx.fillStyle = 'red'; 
            //ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
}


const hemuli = {
    speed: 1
    
};

function start() {
    fillCanvases();  
    gameLoop();
}

function drawPlayer(){
    const canvas = grid[getRandomInt(4)][getRandomInt(4)]; 
    const ctx = canvas.getContext('2d'); 
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
}


function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

async function gameLoop(){
const delay = ms => new Promise(res => setTimeout(res, ms));
 let time = 10
 while (time > 0){
    drawPlayer();
    await delay(hemuli.speed * 1000);
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