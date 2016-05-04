document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.body.querySelector('.board'),
        ctx = canvas.getContext('2d'),
        width = parseInt(getComputedStyle(canvas).width),
        height = parseInt(getComputedStyle(canvas).height),
        linesNumber = 3,
        columnsNumber = 3,
        positions = [],
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
                for (var b = 0; b < linesNumber; b++) {
                    positions.push({
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
        positions = [],
        player = 'circle';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        createSquares();
        draw.lines();
    }

    var verifyItem = function(x, y){
        for (var i = 0; i < positions.length; i++) {
                var item = positions[i];

                if ((x >= item.left && x <= item.right) && (y >= item.top && y <=item.bottom)) {
                    if (item.selected == false) {
                        if (player == 'circle') {
                            draw.circle(item);
                            item.type = player;
                            player = 'symbolX';
                        } else {
                            draw.symbolX(item);
                            item.type = player;
                            player = 'circle';
                        }
                    } else {
                    alert('já marcado');
                }
            }
        };
    }


    /*GAME LOGIC*/
    var verifyWin = function() {
        if (positions[0].selected && positions[1].selected && positions[2].selected) {
            if (positions[0].type == 'circle' && positions[1].type == 'circle' && positions[2].type == 'circle') {
                alert('GANHOU');
                clearCanvas();
            } else if (positions[0].type == 'symbolX' && positions[1].type == 'symbolX' && positions[2].type == 'symbolX') {
                alert('GANHOU');
                clearCanvas();
            }
        } 
        if (positions[3].selected && positions[4].selected && positions[5].selected) {
            if (positions[3].type == 'circle' && positions[4].type == 'circle' && positions[5].type == 'circle') {
                alert('GANHOU');
                clearCanvas();
            } else if (positions[3].type == 'symbolX' && positions[4].type == 'symbolX' && positions[5].type == 'symbolX') {
                alert('GANHOU');
                clearCanvas();
            }
        }
        if (positions[6].selected && positions[7].selected && positions[8].selected) {
            if (positions[6].type == 'circle' && positions[7].type == 'circle' && positions[8].type == 'circle') {
                alert('GANHOU');
                clearCanvas();
            } else if (positions[6].type == 'symbolX' && positions[7].type == 'symbolX' && positions[8].type == 'symbolX') {
                alert('GANHOU');
                clearCanvas();
            }
        }
        if (positions[0].selected && positions[3].selected && positions[6].selected) {
            if (positions[0].type == 'circle' && positions[3].type == 'circle' && positions[6].type == 'circle') {
                alert('GANHOU');
                clearCanvas();
            } else if (positions[0].type == 'symbolX' && positions[3].type == 'symbolX' && positions[6].type == 'symbolX') {
                alert('GANHOU');
                clearCanvas();
            }
        }
        if (positions[1].selected && positions[4].selected && positions[7].selected) {
            if (positions[1].type == 'circle' && positions[4].type == 'circle' && positions[7].type == 'circle') {
                alert('GANHOU');
                clearCanvas();
            } else if (positions[1].type == 'symbolX' && positions[4].type == 'symbolX' && positions[7].type == 'symbolX') {
                alert('GANHOU');
                clearCanvas();
            }
        }
        if (positions[2].selected && positions[5].selected && positions[8].selected) {
            if (positions[2].type == 'circle' && positions[5].type == 'circle' && positions[8].type == 'circle') {
                alert('GANHOU');
                clearCanvas();
            } else if (positions[2].type == 'symbolX' && positions[5].type == 'symbolX' && positions[8].type == 'symbolX') {
                alert('GANHOU');
                clearCanvas();
            }
        }
        if (positions[0].selected && positions[4].selected && positions[8].selected) {
            if (positions[0].type == 'circle' && positions[4].type == 'circle' && positions[8].type == 'circle') {
                alert('GANHOU');
                clearCanvas();
            } else if (positions[0].type == 'symbolX' && positions[4].type == 'symbolX' && positions[8].type == 'symbolX') {
                alert('GANHOU');
                clearCanvas();
            }
        }
        if (positions[2].selected && positions[4].selected && positions[6].selected) {
            if (positions[2].type == 'circle' && positions[4].type == 'circle' && positions[6].type == 'circle') {
                alert('GANHOU');
                clearCanvas();
            } else if (positions[2].type == 'symbolX' && positions[4].type == 'symbolX' && positions[6].type == 'symbolX') {
                alert('GANHOU');
                clearCanvas();
            }
        }
    }

    /*EVENTS*/
    canvas.addEventListener('click', function(e){
        verifyItem(e.offsetX, e.offsetY);
        verifyWin();
    })

    createSquares();
    draw.lines();
});