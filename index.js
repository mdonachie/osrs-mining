// import the robotjs library
var robot = require('robotjs');

function main() {
    console.log("Starting...");
    sleep(4000);

    while (true) {
        var node = findNode();

        if (node == false) {
            rotateCamera();
            continue;
        }
        robot.moveMouse(node.x, node.y);
        sleep(400);
        robot.mouseClick();
        sleep(9000);
        dropOre();
    }
}

function dropOre() {
    var inventory_x = 1880;
    var inventory_y = 792;

    robot.moveMouse(inventory_x, inventory_y);
    robot.mouseClick('right');
    robot.moveMouse(inventory_x, inventory_y + 38);
    robot.mouseClick();
    sleep(800);
}
    

function testScreenCapture() {
    var img = robot.screen.capture(0, 0, 1920, 1080);
    var pixel_color = img.colorAt(30, 18);
    console.log(pixel_color);
}

function findNode() {
    var x = 300, y = 300, width = 1300, height = 400;
    var img = robot.screen.capture(x, y, width, height);

    //array that contains colors of node
    var node_colors = ["736969", "857978", "232020", "7d5532", "462f1b"];

    // sample up to 500 random pixels inside our screenshot until we find one that matches
    for (var i = 0; i < 500; i++) {
        var random_x = getRandomInt(0, width-1);
        var random_y = getRandomInt(0, height-1);
        var sample_color = img.colorAt(random_x, random_y);

        if (node_colors.includes(sample_color)) {
            var screen_x = random_x + x;
            var screen_y = random_y + y;
            console.log("Node color includes sample color.")
            return {x: screen_x, y: screen_y};
            //robot.moveMouse(screen_x, screen_y);
        }
    }
    
    // did not find the color in our screenshot
    return false;
    console.log("node not found.")
}

function rotateCamera() {
    console.log("Rotating camera");
    robot.keyToggle('right', 'down');
    sleep(1000);
    robot.keyToggle('right', 'up');
}

//function confirmTree(screen_x, screen_y) {
    // first move the mouse to the given coordinates
   // robot.moveMouse(screen_x, screen_y);
    // wait a moment for the help text to appear
   // sleep(400);

    // now check the color of the action text
  //  var check_x = 104;
   // var check_y = 36;
   // var pixel_color = robot.getPixelColor(check_x, check_y);

   // console.log("Error, color found = " + pixel_color); //debug statement
   // robot.moveMouse(check_x, check_y); //debug statement
    // returns true if the pixel color is cyan
   // return pixel_color == "000000";
//}

// utility functions

function sleep(ms) {
    Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, ms);
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

main();