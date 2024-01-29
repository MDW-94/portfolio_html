function setup() {
    createCanvas(window.innerWidth+100, window.innerHeight+100);
    // +100 just for complete coverage for now - p5 needs updateable draw function
}

function draw() {
    background(229, 239, 239);
    windowResized();
}

// https://toolness.github.io/p5.js-widget/
// https://developer.mozilla.org/en-US/docs/Web/API/window/innerWidth

// https://p5js.org/get-started/#:~:text=The%20easiest%20way%20to%20start%20is%20by%20using%20the%20empty,the%20p5.js%20complete%20download.&text=If%20you%20look%20in%20index,to%20p5.min.js.