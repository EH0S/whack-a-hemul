const container = document.getElementById('container');
const grid = [];

for (let r = 0; r < 4; r++) {
    const row = document.createElement('div');
    row.className = 'flex justify-center';
    container.appendChild(row);
    const gridRow = [];

    for (let c = 0; c < 4; c++) {
        const col = document.createElement('div');
        col.className = 'bg-red-900 w-40 h-40 border';
        row.appendChild(col);
        gridRow.push(col);
    }

    grid.push(gridRow);
}

const sp = grid[0][1];
sp.style.backgroundColor = 'blue';