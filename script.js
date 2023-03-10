const cells = document.querySelectorAll('.map div'),
    mapLength = Math.sqrt(cells.length);

let score = 1,
    headSnakePos = (cells.length - 1) / 2,
    lastDirection = 1;

const snakePos = [headSnakePos];



setInterval(() => changePos(lastDirection), 750);

createRandomBreadcrumb();



function changePos(newPos) {
    try {
        cells[headSnakePos + newPos].classList.contains('snake') && document.location.reload(); 
    } catch {
        document.location.reload();
    }

    
    if (cells[headSnakePos + newPos].classList.contains('breadcrumb')) {
        document.querySelector('.score').textContent = score++;
        
        cells[headSnakePos + newPos].classList.remove('breadcrumb');
        
        createRandomBreadcrumb();
    } else {
        snakePos.shift();
    }
    
    snakePos.push(headSnakePos + newPos);
    
    cells.forEach((cell, i) => {
        snakePos.includes(i) ? cell.classList.add('snake') : cell.classList.remove('snake');
        cell === cells[headSnakePos + newPos] ? cell.classList.add('snake-head') : cell.classList.remove('snake-head');
    });
    
    headSnakePos += newPos;
}

function createRandomBreadcrumb() {
    const space = [...cells].map((cell, i) => cell.classList.contains('snake') || cell.classList.contains('breadcrumb') ? -1 : i).filter(a => a >= 0);
    
    cells[space[Math.floor(Math.random() * space.length)]]?.classList.add('breadcrumb');
}



document.addEventListener('keydown', e => {
    switch (e.code) {
        case 'KeyW':
        case 'ArrowUp':
            lastDirection = -mapLength;
            break;
            
        case 'KeyD':
        case 'ArrowRight':
            lastDirection = 1;
            break;

        case 'KeyS':
        case 'ArrowDown':
            lastDirection = mapLength;
            break;

        case 'KeyA':
        case 'ArrowLeft':
            lastDirection = -1;
            break;
            
        default:
            break;
    }
})