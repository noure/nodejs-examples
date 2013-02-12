window.onload = function() {  
    var paper = new Raphael(document.getElementById('swa-canvas-container'), 500, 500);
    paper.add([
        {
            type: "rect",
            x: 10,
            y: 10,
            width: 100,
            height: 50,
            fill: "#fc0",
            rx: 5,
            ry: 5
        },
        {
            type: "text",
            x: 10,
            y: 10,
            text: "Hello World"
        }
    ])
} 