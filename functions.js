document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.body.querySelector('.board'),
        ctx = canvas.getContext('2d'),
        width = parseInt(getComputedStyle(canvas).width),
        height = parseInt(getComputedStyle(canvas).height),
        linesNumber = 3,
        columnsNumber = 3,
        positions = [],
        mapPositions = [
            [false, false, false],
            [false, false, false],
            [false, false, false]
        ],
        player = 'circle';

    canvas.width = width;
    canvas.height = height;

    var draw = {
        lines: function() {
            ctx.lineWidth = 6;
            ctx.lineCap = "round";
            ctx.strokeStyle = "#5891E6"

            for (var i = 1; i < linesNumber; i++) {
                ctx.beginPath();
                ctx.moveTo(0, parseInt((height / 3) * i));
                ctx.lineTo(width, parseInt((height / 3) * i));
                ctx.stroke();
            }
            for (var i = 1; i < columnsNumber; i++) {
                ctx.beginPath();
                ctx.moveTo(parseInt((width / 3) * i), 0);
                ctx.lineTo(parseInt((width / 3) * i), height);
                ctx.stroke();
            }
        },
        circle: function(item) {
            var item = item,
                radius = ((item.right - item.left) * 0.7) / 2;

            ctx.lineWidth = 4;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#2AF230';
            ctx.beginPath();
            ctx.arc(item.right - ((item.right - item.left) / 2), item.bottom - ((item.bottom - item.top) / 2), radius, 0, 2 * Math.PI);
            ctx.stroke();
            item.selected = true;
        },
        symbolX: function(item) {
            var padding = 30,
                item = item;

            ctx.lineWidth = 8;
            ctx.lineCap = 'round';
            ctx.strokeStyle = '#E82C2C';
            ctx.beginPath();
            ctx.moveTo(item.left + padding, item.top + padding);
            ctx.lineTo(item.right - padding, item.bottom - padding);
            ctx.stroke();

            ctx.beginPath();
            ctx.moveTo(item.right - padding, item.top + padding);
            ctx.lineTo(item.left + padding, item.bottom - padding);
            ctx.stroke();
            item.selected = true;
        }
    }

    var createSquares = function() {
        var totalBlocks = linesNumber * columnsNumber,
            widthSquare = parseInt(width / columnsNumber),
            heightSquare = parseInt(height / linesNumber),
            line = 0;

        for (var i = 1; i <= totalBlocks; i++) {
            if (i % 3 === 0) {
                positions.push([]);

                for (var b = 0; b < linesNumber; b++) {
                    positions[line].push({
                        left: widthSquare * b,
                        right: (widthSquare * b) + widthSquare,
                        top: heightSquare * line,
                        bottom: (heightSquare * line) + heightSquare,
                        selected: false
                    })
                }
                line++
            }
        }
    }

    var clearCanvas = function(){
        positions = [];
        mapPositions = [
            [false, false, false],
            [false, false, false],
            [false, false, false]
        ];
        player = 'circle';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createSquares();
        draw.lines();
    }

    var verifyItem = function(x, y){
        for (var i = 0; i < positions.length; i++) {
            var currentLine = positions[i];

            for (var c = 0; c < currentLine.length; c++) {
                var item = currentLine[c];

                if ((x >= item.left && x <= item.right) && (y >= item.top && y <=item.bottom)) {
                    if (item.selected == false) {
                        if (player == 'circle') {
                            draw.circle(item);
                            item.type = player;
                            mapPositions[i][c] = player;
                            player = 'symbolX';
                        } else {
                            draw.symbolX(item);
                            item.type = player;
                            mapPositions[i][c] = player;
                            player = 'circle';
                        }
                    } else {
                        alert('já marcado');
                    }
                }
            }
        };
    }

    var win = function() {
        alert('ganhou');
    }

    var checkValues = function(array) {
        var removeFalse = array.filter(function(i) {
            return i !== false;
        });

        if (removeFalse.length < 3) {
            return false;
        }

        return array.filter(function(value, index, self) { 
            return self.indexOf(value) === index;
        }).length == 1;
    }

    var getRow = function(line) {
        if (checkValues(line)) {
            win();
        }
    }

    var getColumn = function(column) {
        var values = checkValues(column);
    }

    var getTransversal = function(i) {
    }

    var checkWin = function() {
        for (var i = 0; i < linesNumber; i++) {
            var column = [];
            getRow(mapPositions[i]);

            for (var c = 0; c < columnsNumber; c++) {
                column.push(mapPositions[c][i]);
            }
            getColumn(column);
        }
    }

    var fillGap = function(column, row, value) {
        // muda o posicionamento
        position[row][column] = value;

        if (checkWin()){
        //ganhou
        }
    }

   /* var lastPlayer = false;

    var = function getLastPlayer() {
        // retornar 0 ou X
    }*/

    /*EVENTS*/
    canvas.addEventListener('click', function(e){
        verifyItem(e.offsetX, e.offsetY);
        checkWin();
    })

    createSquares();
    draw.lines();
});