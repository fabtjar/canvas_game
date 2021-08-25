import { Keyboard } from "./keyboard.js";
import { GameScene } from "./scenes/gameScene.js";

var canvas, ctx, image;
var scene;

var prevTime = 0;

function init() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    image = new Image();
    image.addEventListener("load", loaded);
    image.src = "tiles.png";

    ctx.mainImage = image;
}
init();

function loaded() {
    const g = {
        width: canvas.width,
        height: canvas.height,
        keyboard: new Keyboard(),
    };
    scene = new GameScene(g);
    scene.start();

    window.requestAnimationFrame(tick);
}

function tick(time) {
    const deltaTime = (time - prevTime) / 1000;
    prevTime = time;

    update(deltaTime);
    draw();

    window.requestAnimationFrame(tick);
}

function update(deltaTime) {
    scene.update(deltaTime);
}

function draw() {
    // Background.
    for (var x = 0; x < canvas.width; x += 64)
        for (var y = 0; y < canvas.height; y += 64)
            ctx.drawImage(image, 0, 0, 64, 64, x, y, 64, 64);

    scene.draw(ctx);
}
