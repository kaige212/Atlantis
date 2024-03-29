// 创建棋盘
const chessboard = document.getElementById('chessboard');
//const display_left = document.getElementById('display_left'); // 获取显示坐标的元素
const display_right = document.getElementById('display_right'); // 获取显示坐标的元素

let currentHexagon = null; // 当前被点击的格子
let currentNeighbors = [];
let currentPosition = []; // 当前被点击的格子

let mode = 'mode1';
let player = 'player1';
let movemod = false;

/*let booleanArray = [
    [false, false, false, true , true , true , true , true , true , true , false, false, false],
    [false, true , true , true , true , true , true , true , true , true , true , false, false],
    [false, true , true , true , true , true , true , true , true , true , true , true , false],
    [false, true , true , true , true , true , true , true , true , true , true , false, false],
    [false, true , true , true , true , true , true , true , true , true , true , true , false],
    [true , true , true , true , true , true , true , true , true , true , true , true , false],
    [true , true , true , true , true , true , true , true , true , true , true , true , true ],
    [true , true , true , true , true , true , true , true , true , true , true , true , false],
    [false, true , true , true , true , true , true , true , true , true , true , true , false],
    [false, true , true , true , true , true , true , true , true , true , true , false, false],
    [false, true , true , true , true , true , true , true , true , true , true , true , false],
    [false, true , true , true , true , true , true , true , true , true , true , false, false],
    [false, false, false, true , true , true , true , true , true , true , false, false, false],
];*/

var land_class = {
    "sea" : "blue",
    "sand" : "yellow",
    "forest" : "green",
    "rock" : "gray"
};

var player_color = {
    "player1" : "red",
    "player2" : "white",
    "player3" : "pink",
    "player4" : "purple"
};

let grid = [];

for (let row = 0; row < 13; row++) {
    grid[row] = [];
    for (let col = 0; col < 13; col++) {
        // 创建一个包含tag属性的对象，可以包含其他属性
        grid[row][col] = {
            tag: false, // 布尔值作为tag属性
            land: 'sea',
            card: null,
            haveboat: false,
            boat: ['none','none','none'],
            whale: 0,
            shark: 0,
            monster: 0,
            player1: 0,
            player2: 0,
            player3: 0,
            player4: 0,
        };
        if (((row === 0 || row === 12) && (col >= 3 && col <= 9)) ||
            ((row === 1 || row === 3 || row === 9 || row === 11) && (col >= 1 && col <= 10)) ||
            ((row === 2 || row === 4 || row === 8 || row === 10) && (col >= 1 && col <= 11)) ||
            ((row === 5 || row === 7) && (col >= 0 && col <= 11)) ||
            (row === 6)) {
                grid[row][col].tag = true;
        }
    }
}

const hexagons = [];
//for (let i = 0; i < 13; i++) {
//    hexagons.push(new Array(13).fill(null));
//}

grid[6][6].land = 'rock';
grid[4][7].land = 'rock';
grid[7][5].land = 'rock';
grid[7][7].land = 'rock';
grid[5][6].land = 'forest';
grid[5][5].land = 'forest';
grid[6][7].land = 'forest';
grid[7][4].land = 'forest';
grid[7][6].land = 'forest';
grid[5][4].land = 'sand';
grid[6][4].land = 'sand';
grid[6][5].land = 'sand';
grid[4][6].land = 'sand';
grid[5][7].land = 'sand';
grid[8][5].land = 'sand';
grid[8][6].land = 'sand';

grid[6][6].player1 = 1;
grid[6][6].player2 = 1;
grid[7][7].player2 = 2;

grid[5][9].player1 = 1;
grid[5][9].player2 = 1;
grid[5][9].player3 = 1;
grid[5][9].player4 = 1;
grid[5][9].whale = 1;

grid[6][9].player1 = 1;
grid[6][9].player2 = 1;
grid[6][9].player3 = 1;
grid[6][9].player4 = 1;
grid[6][9].haveboat = true;
grid[6][9].boat[0] = 'player1';
grid[6][9].boat[1] = 'player2';
grid[6][9].boat[2] = 'player3';

grid[6][10].shark = 1;
grid[6][10].haveboat = true;

grid[7][9].whale = 1;
grid[7][9].shark = 1;
grid[7][9].monster = 1;



for (let row = 0; row < 13; row++) {
    hexagons[row] = [];
    for (let col = 0; col < 13; col++) {
        if (grid[row][col].tag) {
            const hexagon = document.createElement('div');
            hexagon.className = 'hexagon';
            hexagon.style.top = `${row * 51}px`;
            hexagon.style.left = `${col * 58 + (row % 2 === 0 ? 0 : 29)}px`;
            hexagon.style.backgroundColor = land_class[grid[row][col].land];

            const circlePlayer1 = createCircle('player1');
            circlePlayer1.style.backgroundColor = player_color['player1'];
            const circlePlayer1num = document.createElement('div');
            circlePlayer1num.className = 'number player1num';
            circlePlayer1num.textContent = grid[row][col].player1;
            circlePlayer1.appendChild(circlePlayer1num);

            const circlePlayer2 = createCircle('player2');
            circlePlayer2.style.backgroundColor = player_color['player2'];
            const circlePlayer2num = document.createElement('div');
            circlePlayer2num.className = 'number player2num';
            circlePlayer2num.textContent = grid[row][col].player2;
            circlePlayer2.appendChild(circlePlayer2num);

            const circlePlayer3 = createCircle('player3');
            circlePlayer3.style.backgroundColor = player_color['player3'];
            const circlePlayer3num = document.createElement('div');
            circlePlayer3num.className = 'number player3num';
            circlePlayer3num.textContent = grid[row][col].player3;
            circlePlayer3.appendChild(circlePlayer3num);

            const circlePlayer4 = createCircle('player4');
            circlePlayer4.style.backgroundColor = player_color['player4'];
            const circlePlayer4num = document.createElement('div');
            circlePlayer4num.className = 'number player4num';
            circlePlayer4num.textContent = grid[row][col].player4;
            circlePlayer4.appendChild(circlePlayer4num);

            const rectangle= createRectangle();
            rectangle.style.backgroundColor = 'gray';
            const circleBoat1= createCircle('boat1');
            circleBoat1.style.backgroundColor = player_color[grid[row][col].boat[0]];
            const circleBoat2= createCircle('boat2');
            circleBoat2.style.backgroundColor = player_color[grid[row][col].boat[1]];
            const circleBoat3= createCircle('boat3');
            circleBoat3.style.backgroundColor = player_color[grid[row][col].boat[2]];
            rectangle.appendChild(circleBoat1);
            rectangle.appendChild(circleBoat2);
            rectangle.appendChild(circleBoat3);

            const circleWhale= createCircle('whale');
            circleWhale.style.backgroundColor = 'gray';
            const circleWhalenum = document.createElement('div');
            circleWhalenum.className = 'number whale';
            circleWhalenum.textContent = grid[row][col].whale;
            circleWhale.appendChild(circleWhalenum);

            const circleShark = createCircle('shark');
            circleShark.style.backgroundColor = 'gray';
            const circleSharknum = document.createElement('div');
            circleSharknum.className = 'number shark';
            circleSharknum.textContent = grid[row][col].shark;
            circleShark.appendChild(circleSharknum);

            const circleMonter = createCircle('monster');
            circleMonter.style.backgroundColor = 'gray';
            const circleMonternum = document.createElement('div');
            circleMonternum.className = 'number monster';
            circleMonternum.textContent = grid[row][col].monster;
            circleMonter.appendChild(circleMonternum);

            showNumber(circlePlayer1, grid[row][col].player1);
            showNumber(circlePlayer2, grid[row][col].player2);
            showNumber(circlePlayer3, grid[row][col].player3);
            showNumber(circlePlayer4, grid[row][col].player4);
            showBoat(rectangle, grid[row][col].haveboat);
            showNumber(circleWhale, grid[row][col].whale);
            showNumber(circleShark, grid[row][col].shark);
            showNumber(circleMonter, grid[row][col].monster);

            // 将实心小圆添加到六边形中
            hexagon.appendChild(circlePlayer1);
            hexagon.appendChild(circlePlayer2);
            hexagon.appendChild(circlePlayer3);
            hexagon.appendChild(circlePlayer4);
            hexagon.appendChild(rectangle);
            hexagon.appendChild(circleWhale);
            hexagon.appendChild(circleShark);
            hexagon.appendChild(circleMonter);

            hexagons[row][col] = hexagon;

            hexagon.addEventListener('click', () => {
                if (mode == 'mode1' && (grid[row][col].player1 > 0 || (currentNeighbors.indexOf(hexagon) != -1 && movemod == true))) {
                    // 如果有之前点击过的格子，则移除其颜色效果
                    if (currentHexagon == hexagon && movemod == true) {
                        currentHexagon.classList.remove('clicked');
                        if (currentNeighbors) {
                            currentNeighbors.forEach(neighbor => {
                                neighbor.style.filter = 'brightness(100%)';
                            });
                            currentNeighbors.length = 0;
                        }
                        currentHexagon = null;
                        movemod = false;
                        currentPosition.length = 0;
                    }

                    else if (currentHexagon != hexagon && movemod == true) {
                        console.log(currentNeighbors.indexOf(hexagon));
                        if (currentNeighbors.indexOf(hexagon)!=-1) {
                            grid[currentPosition[0]][currentPosition[1]].player1 --;
                            console.log(currentHexagon.querySelector('.player1'));
                            showNumber(currentHexagon.querySelector('.player1'), grid[currentPosition[0]][currentPosition[1]].player1);
                            currentHexagon.querySelector('.player1').querySelector('.player1num').textContent = grid[currentPosition[0]][currentPosition[1]].player1;
                            grid[row][col].player1 ++;
                            showNumber(hexagon.querySelector('.player1'), grid[row][col].player1);
                            hexagon.querySelector('.player1').querySelector('.player1num').textContent = grid[row][col].player1;
                        }
                        currentHexagon.classList.remove('clicked');
                        if (currentNeighbors) {
                            currentNeighbors.forEach(neighbor => {
                                neighbor.style.filter = 'brightness(100%)';
                            });
                            currentNeighbors.length = 0;
                        }
                        currentHexagon = null;
                        movemod = false;
                        currentPosition.length = 0;
                    }
                    
                    else if (currentHexagon != hexagon && movemod == false) {
                        movemod = true;
                        // 添加点击格子的颜色效果
                        hexagon.classList.add('clicked');
                        // 获取当前点击格子的相邻格子
                        const neighbors = getNeighbors(row, col);
                        //neighbor.style.filter = 'brightness(70%)';
                        //hexagons[row][col].style.filter = 'brightness(70%)'
                        //console.log(neighbors)

                        // 给相邻格子添加变暗效果
                        neighbors.forEach(neighbor => {
                            neighbor.style.filter = 'brightness(60%)';
                        });
                        // 更新当前被点击的格子
                        currentHexagon = hexagon;
                        currentNeighbors = neighbors;
                        currentPosition[0] = row;
                        currentPosition[1] = col;
                        var Message = '<p>新的文本内容第一行<br>新的文本内容第二行<p>';
                        // 更新坐标显示
                        //display_left.innerHTML = Message;
                        display_right.innerHTML =  `坐标: (${row}, ${col})<br>
                                                    地块: ${grid[row][col].land}<br>
                                                    卡片: ${grid[row][col].card}<br>
                                                    船只: ${grid[row][col].boat}<br>
                                                    鲸鱼: ${grid[row][col].whale}<br>
                                                    鲨鱼: ${grid[row][col].shark}<br>
                                                    海怪: ${grid[row][col].monster}<br>
                                                    玩家1: ${grid[row][col].player1}<br>
                                                    玩家2: ${grid[row][col].player2}<br>
                                                    玩家3: ${grid[row][col].player3}<br>
                                                    玩家4: ${grid[row][col].player4}`;
                    }
                }
                else if (mode == 'mode2') {
                    grid[row][col].land = "sea";
                    hexagon.style.backgroundColor = land_class[grid[row][col].land];
                }
            
                
            });

            chessboard.appendChild(hexagon);
        }
    }
}

function createCircle(className) {
    const circle = document.createElement('div');
    circle.className = 'circle ' + className;
    return circle;
}

function createRectangle() {
    const rectangle = document.createElement('div');
    rectangle.className = 'rectangle';
    return rectangle;
}

// 在实心小圆中心显示数字函数
function showNumber(circle, number) {
    // 移除之前的数字
    //const existingNumber = circle.querySelector('.number');
    //if (existingNumber) {
    //    existingNumber.remove();
    //}

    // 如果数字不为0，则在中心显示数字
    if (number !== 0) {
        circle.style.display = 'flex';
    }
    else {
        circle.style.display = 'none';
    }
}

function showBoat(rectangle, haveboat) {
    if (haveboat) {
        rectangle.style.display = 'flex';
    }
    else {
        rectangle.style.display = 'none';
    }
}

// 辅助函数：获取当前格子的相邻格子
function getNeighbors(row, col) {
    var neighbors = [];
    if (isValidIndex(hexagons, row, col+1)) {
        neighbors.push(hexagons[row][col+1]);
    }
    if (isValidIndex(hexagons, row, col-1)) {
        neighbors.push(hexagons[row][col-1]);
    }
    if (isValidIndex(hexagons, row-1, col)) {
        neighbors.push(hexagons[row-1][col]);
    }
    if (isValidIndex(hexagons, row+1, col)) {
        neighbors.push(hexagons[row+1][col]);
    }
    if (row % 2 == 0) {
        if (isValidIndex(hexagons, row-1, col-1)) {
            neighbors.push(hexagons[row-1][col-1]);
        }
        if (isValidIndex(hexagons, row+1, col-1)) {
            neighbors.push(hexagons[row+1][col-1]);
        }
    }
    else {
        if (isValidIndex(hexagons, row-1, col+1)) {
            neighbors.push(hexagons[row-1][col+1]);
        }
        if (isValidIndex(hexagons, row+1, col+1)) {
            neighbors.push(hexagons[row+1][col+1]);
        }
    }

    return neighbors;
}

function isValidIndex(matrix, row, col) {
    // 检查行索引是否在范围内
    if (row < 0 || row >= matrix.length) {
        return false;
    }
    
    // 检查列索引是否在范围内
    if (col < 0 || col >= matrix[row].length) {
        return false;
    }

    if (!grid[row][col].tag) {
        return false;
    }
    
    return true;
}
