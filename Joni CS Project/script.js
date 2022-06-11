let canvas;
let player;

//collision variables
let screenTiles;
let topOfTile;
let bottomOfTile;
let leftOfTile;
let rightOfTile;
let valueOfTile;

// Map JSON Files are loaded here for later use
function preload() {
    screenTiles = loadJSON('jsonFiles/worldMap.json')
}

function setup() {
    canvas = createCanvas(320, 200);
    canvas.position(windowWidth / 2 - 160, windowHeight / 2 - 160);
    // Centers the canvas for better playing experience
    player = new Player(50, 20);
}


function draw() {
    background(220);
    //draw tiles

    // I can understand why you would want to use JSON file for the maps,
    // but surely it would be easier to implement this using a 2D array
    let tilemap = screenTiles.screen1.map;

    // The second for loop syntax was much better,
    // most of the time looping backwards is not necessary

    for (let i = 0; i < tilemap.length; i++) {
        if (tilemap[i] > 0) {
            rect(((i % screenTiles.screen1.columns) * screenTiles.screen1.tileSize),
                (Math.floor(i / screenTiles.screen1.columns) * screenTiles.screen1.tileSize),
                screenTiles.screen1.tileSize, screenTiles.screen1.tileSize);
        }
    }

    player.draw();
    // The rmove, lmove, and jump variable should have been attributes of the player object.
    // The below functions 'keyIsDown()' return a boolean value.
    // See player.js functions for more details
    player.xAxisMove(keyIsDown(RIGHT_ARROW), keyIsDown(LEFT_ARROW));
    player.yAxisMove(keyIsDown(32));

    if (keyIsDown(17)) {
        player.getHeight();
    }

    // The following code seems really complicated and I can't be bothered to figure it out.
    // Seems to work though so have a :)

    //collision
    //checking bottom left
    bottomOfTile = Math.floor(player.getBottom() / screenTiles.screen1.tileSize);
    leftOfTile = Math.floor(player.getLeft() / screenTiles.screen1.tileSize);
    valueOfTile = tilemap[bottomOfTile * screenTiles.screen1.columns + leftOfTile];
    collision.collide(valueOfTile, player, leftOfTile * screenTiles.screen1.tileSize, bottomOfTile * screenTiles.screen1.tileSize, screenTiles.screen1.tileSize);

    //checking bottom right
    bottomOfTile = Math.floor(player.getBottom() / screenTiles.screen1.tileSize);
    rightOfTile = Math.floor(player.getRight() / screenTiles.screen1.tileSize);
    valueOfTile = tilemap[bottomOfTile * screenTiles.screen1.columns + rightOfTile];
    collision.collide(valueOfTile, player, rightOfTile * screenTiles.screen1.tileSize, bottomOfTile * screenTiles.screen1.tileSize, screenTiles.screen1.tileSize);

    //checking top left
    topOfTile = Math.floor(player.getTop() / screenTiles.screen1.tileSize);
    leftOfTile = Math.floor(player.getLeft() / screenTiles.screen1.tileSize);
    valueOfTile = tilemap[topOfTile * screenTiles.screen1.columns + leftOfTile];
    collision.collide(valueOfTile, player, leftOfTile * screenTiles.screen1.tileSize, topOfTile * screenTiles.screen1.tileSize, screenTiles.screen1.tileSize);
}

//collision objects
collision = {
    /**
     * 
     * @param {int} value 
     * @param {*} object 
     * @param {int} tileX 
     * @param {int} tileY 
     * @param {int} tileSize 
     * @returns 
     */
    // This is a doc comment, just a VS code thing.

    // The '=>' just means that its calling a function
    // just a more succinct syntax
    collide: (value, object, tileX, tileY, tileSize) => {
        // I ussually dislike switch case statments but it seems to work here.

        // Careful not to make your code overly complex, however. I had a struggle
        // figuring out what the code did without tinkering with it myself, might
        // make it dificult for examiners to figure out as well.
        switch (value) {
            case 1:
                // Top + Right
                if (collisionFunctions.collidePlatformTop(object, tileY)) return
                collisionFunctions.collidePlatformRight(object, tileX + tileSize);
                break;
            case 2:
                // Top + left
                if (collisionFunctions.collidePlatformTop(object, tileY)) return //2 - only top and left
                collisionFunctions.collidePlatformLeft(object, tileX);
                break;
            case 3:
                // Right
                collisionFunctions.collidePlatformRight(object, tileX + tileSize);
                break;
            case 4:
                // Top + Left + Right
                if (collisionFunctions.collidePlatformTop(object, tileY)) return;
                if (collisionFunctions.collidePlatformLeft(object, tileX)) return;
                collisionFunctions.collidePlatformRight(object, tileX + tileSize);
                break;
            case 5:
                // Top
                collisionFunctions.collidePlatformTop(object, tileY);
                break;
        }
    }
}

// Could these functions be put into a seperate file?
collisionFunctions = {
    //left collision  
    // ^^ This is one of the comments I left, it's not really necessary
    //    because the property below is well named.
    collidePlatformLeft: (object, tileLeft) => {

        if (object.getRight() > tileLeft) {

            object.setRight(tileLeft - 0.01);
            object.speedX = 0;
            return true;

        }
        return false;

    },

    collidePlatformRight: (object, tileRight) => {

        if (object.getLeft() <= tileRight) {

            object.setLeft(tileRight);
            object.speedX = 0;
            return true;

        }
        return false;

    },

    //top collision
    collidePlatformTop: (object, tileTop) => {

        if (object.getBottom() > tileTop) {

            object.setBottom(tileTop - 0.01);
            object.speedY = 0;
            object.ground = true;
            return true;

        }
        return false;

    }
}