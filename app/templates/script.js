// 创建棋盘
const chessboard = document.getElementById('chessboard');
const display_left = document.getElementById('display_left'); // 获取显示坐标的元素
const display_right = document.getElementById('display_right'); // 获取显示坐标的元素

let currentHexagon = null; // 当前被点击的格子

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
    [false, true , true , true , true , true , true , true , true , true , true , false , false],
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

let grid = [];

for (let row = 0; row < 13; row++) {
    grid[row] = [];
    for (let col = 0; col < 13; col++) {
        // 创建一个包含tag属性的对象，可以包含其他属性
        grid[row][col] = {
            tag: false, // 布尔值作为tag属性
            land: 'sea',
            card: null,
            boat: 0,
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



for (let row = 0; row < 13; row++) {
    for (let col = 0; col < 13; col++) {
        if (grid[row][col].tag) {
            const hexagon = document.createElement('div');
            hexagon.className = 'hexagon';
            hexagon.style.top = `${row * 51}px`;
            hexagon.style.left = `${col * 58 + (row % 2 === 0 ? 0 : 29)}px`;
            hexagon.style.backgroundColor = land_class[grid[row][col].land];

            const circleTopLeft = createCircle('top-left');
            circleTopLeft.style.backgroundColor = 'red';
            const circleTopLeftnum = document.createElement('div');
            circleTopLeftnum.className = 'number1';
            circleTopLeftnum.textContent = grid[row][col].player1;
            circleTopLeft.appendChild(circleTopLeftnum);

            const circleTopRight = createCircle('top-right');
            circleTopRight.style.backgroundColor = 'white';
            const circleTopRightnum = document.createElement('div');
            circleTopRightnum.className = 'number2';
            circleTopRightnum.textContent = grid[row][col].player2;
            circleTopRight.appendChild(circleTopRightnum);

            const circleBottomLeft = createCircle('bottom-left');
            circleBottomLeft.style.backgroundColor = 'pink';
            const circleBottomLeftnum = document.createElement('div');
            circleBottomLeftnum.className = 'number3';
            circleBottomLeftnum.textContent = grid[row][col].player3;
            circleBottomLeft.appendChild(circleBottomLeftnum);

            const circleBottomRight = createCircle('bottom-right');
            circleBottomRight.style.backgroundColor = 'purple';
            const circleBottomRightnum = document.createElement('div');
            circleBottomRightnum.className = 'number4';
            circleBottomRightnum.textContent = grid[row][col].player4;
            circleBottomRight.appendChild(circleBottomRightnum);

            showNumber(circleTopLeft, grid[row][col].player1);
            showNumber(circleTopRight, grid[row][col].player2);
            showNumber(circleBottomLeft, grid[row][col].player3);
            showNumber(circleBottomRight, grid[row][col].player4);

            // 将实心小圆添加到六边形中
            hexagon.appendChild(circleTopLeft);
            hexagon.appendChild(circleTopRight);
            hexagon.appendChild(circleBottomLeft);
            hexagon.appendChild(circleBottomRight);

            hexagon.addEventListener('click', () => {
                // 如果有之前点击过的格子，则移除其颜色效果
                if (currentHexagon) {
                    currentHexagon.classList.remove('clicked');
                }
                // 添加点击格子的颜色效果
                hexagon.classList.add('clicked');
                // 更新当前被点击的格子
                currentHexagon = hexagon;
                var Message = '<p>新的文本内容第一行<br>新的文本内容第二行<p>';
                // 更新坐标显示
                display_left.innerHTML = Message;
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
                                            玩家4: ${grid[row][col].player4}<br>
                                            地块: ${grid[row][col].ground}`;
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
