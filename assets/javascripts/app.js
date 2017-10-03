document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.body.querySelector('.board'),
        ctx = canvas.getContext('2d'),
        message = document.body.querySelector('.message'),
        width = parseInt(getComputedStyle(canvas).width),
        height = parseInt(getComputedStyle(canvas).height),
        linesNumber = 3,
        columnsNumber = 3,
        positions = [],
        winner,
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
            ctx.lineCap = 'round1';
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
        winner = '',
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

        message
            .classList
            .remove('active');

        setTimeout(function() {
            message
                .querySelector('span')
                .classList
                .remove('active');
        }, 1000);
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

    var showMessage = function() {
        message.classList.add('active');
    }

    var result = {
        win: function() {
            var win = message.querySelector('.win'),
                tied = message.querySelector('.tied');

            
                tied
                    .classList
                    .remove('active');

            if (winner == 'circle') {
                win
                    .classList
                    .remove('symbolX', 'active');

                win
                    .classList
                    .add('circle', 'active');

            } else {
                win
                    .classList
                    .remove('circle', 'active');

                win
                    .classList
                    .add('symbolX', 'active');

            }
        },
        tied: function() {
            message.querySelector('.win')
                .classList
                .remove('symbolX', 'active', 'circle');

            message.querySelector('.tied')
                .classList
                .add('active');
        }
    }

    var checkValues = function(array) {
        var removeFalse = array.filter(function(i) {
            return i !== false;
        });

        console.log(removeFalse.length);

        if (removeFalse.length < 3) {
            return false;
        } else if (removeFalse.length == 9) {
            return 'tied';
        }

        return array.filter(function(value, index, self) {
            winner = value;
            return self.indexOf(value) === index;
        }).length == 1;
    }

    var check = {
        win: function() {
            var transversal = [];

            for (var i = 0; i < linesNumber; i++) {
                var column = [];

                for (var c = 0; c < columnsNumber; c++) {
                    column.push(mapPositions[c][i]);

                    if ((i == 0 && c == 0) || (i == 1 && c == 1) || (i == 2 && c == 2)) {
                        transversal.push(mapPositions[i][c]);
                    }
                }

                if (checkValues(mapPositions[i])) {
                    showMessage();
                    result.win();
                } else if (checkValues(column)) {
                    showMessage();
                    result.win();
                } else if (checkValues(transversal)) {
                    showMessage();
                    result.win();
                }
            }
        },
        tied: function() {
            var all = [];

            for (var i = 0; i < linesNumber; i++) {
                for (var c = 0; c < columnsNumber; c++) {
                    all.push(mapPositions[i][c]);
                }
            }

            if (checkValues(all) == 'tied') {
                showMessage();
                result.tied();
            }
        }
    }

    /*EVENTS*/
    canvas.addEventListener('click', function(e){
        verifyItem(e.offsetX, e.offsetY);
        check.win();
        check.tied();
    })
    message.querySelector('button').addEventListener('click', function(e){
        clearCanvas();
    })

    createSquares();
    draw.lines();
});