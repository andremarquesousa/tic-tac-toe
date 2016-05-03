document.addEventListener('DOMContentLoaded', function () {
    var canvas = document.body.querySelector('.board'),
        ctx = canvas.getContext('2d'),
        width = parseInt(getComputedStyle(canvas).width),
        height = parseInt(getComputedStyle(canvas).height),
        linesNumber = 3,
        columnsNumber = 3,
        positions = [],
        player1 = true;

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
        simbolX: function(item) {
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

    var verifyItem = function(x, y){
        for (var i = 0; i < positions.length; i++) {
                var item = positions[i];

                if ((x >= item.left && x <= item.right) && (y >= item.top && y <=item.bottom)) {
                    if (item.selected == false) {
                        if (player1) {
                            draw.circle(item);
                            player1 = false;
                        } else {
                            draw.simbolX(item);
                            player1 = true;
                        }
                    } else {
                    alert('já marcado');
                }
            }
        };
    }

    /*EVENTS*/
    canvas.addEventListener('click', function(e){
        verifyItem(e.offsetX, e.offsetY);
    })

    createSquares();
    draw.lines();
});