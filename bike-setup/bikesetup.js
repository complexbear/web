/*
 * User can place points on top of an image, which are then connected by straight lines.
 * The system calculates and displays the angles between the lines.
 * 
 * This is useful for optimising the setup geometry of a bike :)
 */

// Load the file and draw onto the  bottom layer of the canvas'
loadFile = function(file) {    
    var canvas = document.getElementById("img_canvas");
    if(canvas.getContext) {        
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        var img = new Image,
            reader = new FileReader;
            
        img.onload = function() {
            // Resize proportionally
            let ratio = Math.min(canvas.width / img.width, canvas.height / img.height),
                w = img.width * ratio,
                h = img.height * ratio;
            console.log({height: canvas.height, width: canvas.width});
            console.log({height: h, width: w});    
            ctx.drawImage(img, 0, 0, w, h);
        };

        reader.onload = function(fileLoadEvent) {
            img.src = fileLoadEvent.target.result;
        };
        reader.readAsDataURL(file);
    }
}

// Given 3 points, find the acute angle formed by the two lines
findAngle = function(first, center, last) {
    // Formula is: atan2(P2.y - P1.y, P2.x - P1.x) - atan2(P3.y - P1.y, P3.x - P1.x)
    let a1 = Math.atan2(first.y - center.y, first.x - center.x),
        a2 = Math.atan2(last.y - center.y, last.x - center.x),
        angle = (a1 - a2) * (180 / Math.PI);
    if(angle > 180) angle -= 180;
    return angle;
}

// Code that tracks the user drawn points, calculates angles
// and refreshes the top canvas layer
drawing = function(){

    // State
    var canvas = document.getElementById("draw_canvas"),
        ctx = canvas.getContext("2d"),
        points = [],
        currentPos = {},
        drawActive = false;

    init = function() {
        ctx.font = "bold 20px Arial";
        ctx.fillStyle = "red";
        ctx.strokeStyle= "red";
        
        // Set mouse event handlers
        canvas.onclick = this.drawLine;
        document.onkeydown = this.stopLine;
        canvas.onmousemove = this.mousePosition;
    }

    drawLine = function(event) {
        let p = {
            x: event.layerX,
            y: event.layerY
        };
        console.log(p);

        // If there are no points, this must be the 1st point!
        if(points.length == 0) {
            console.log('starting line');
            drawActive = true;
            points = [];
        }        
        // Calc angle between last point and the predecessor
        if(points.length > 1) {
            let last = p,
                center = points[points.length-1],
                first =  points[points.length-2],
                angle = findAngle(first, center, last);

            center.angle = angle;        
            console.log('angle: ' + angle);
        }
        
        points.push(p);        
    }

    stopLine = function(event) {
        // Turn off live point and y if ESC is pressed
        if(event.keyCode == 27) drawActive = false;
    }

    mousePosition = function(event) {
        currentPos = {x: event.layerX, y: event.layerY};
    }

    redraw = function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        if(points.length) {            
            ctx.beginPath();
            ctx.moveTo(points[0].x, points[0].y);

            // Draw set lines & points
            for(p of points) {
                ctx.lineTo(p.x, p.y);       
                if(p.angle !== undefined) {
                    ctx.fillText(Math.floor(p.angle) + '\u00B0', p.x + 20, p.y);
                }         
            }

            // Write angles

            // If actively drawing, then draw a line to the current mouse position
            if(drawActive) {            
                ctx.lineTo(currentPos.x, currentPos.y);  
                if(points.length > 1) {
                    let angle = findAngle(points[points.length-2], points[points.length-1], currentPos);
                    ctx.fillText(Math.floor(angle) + '\u00B0', p.x + 20, p.y);
                }              
            }
            ctx.stroke();
        }
    }

    init();
    setInterval(redraw, 50);
}



document.addEventListener("DOMContentLoaded", function(event) {
    // Add listener for file loader
    document.getElementById("fileInput").onchange = function() {
        if(this.files.length) {
            var file = this.files[0];
            console.log("file input: " + file.name);
            loadFile(file);
            drawing();
        }
    };
});

