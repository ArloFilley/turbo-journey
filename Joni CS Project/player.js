class Player {
    // Box Collider Attributes
    height = 30;
    width = 30;

    // Movement Attributes
    friction = 2; // Now an integer. Makes the calculations a lot easier
    speedX = 0;
    speedY = 1;
    gravity = 3;
    maxSpeed = 2; // Now only applicable to the x-axis

    // Position Attributes
    y = 0;
    x = 0;
    ground = true;

    // I got rid of oldX, oldY, and the getters and setters that used them

    //constructor
    /**
     * 
     * @param {int} playerX 
     * @param {int} playerY 
     */
    // these are called doc comments and are used in VS code, don't worry too much about them
    constructor(playerX, playerY) {
        this.x = playerX;
        this.y = playerY;
    }

    // changed the name of this function
    // btw with your comments try to explain how and why, rather than what
    draw() {
        rect(this.x, this.y, this.width, this.height);
    }

    decreaseHeight() {
        this.height -= 10;
    }

    /**
     * 
     * @param {Boolean} moveRight 
     * @param {Boolean} moveLeft 
     */
    xAxisMove(right, left) {
        // These if statments are much easier to read, I think.
        if (right === left) {
            // ^^ This is an easier way of writing !right && !left || right && left
            //    Because in both cases you want the values of right and left to be
            //    the same.

            this.speedX /= this.friction;
        } else if (right) {
            this.speedX++;
        } else {
            this.speedX--;
        }

        // Corrects the speed value if it is too high
        // or too low
        if (this.speedX > this.maxSpeed) {
            this.speedX = this.maxSpeed;
        } else if (this.speedX < -this.maxSpeed) {
            this.speedX = -this.maxSpeed;
        }

        //width boundaries
        if (this.x < 0) {
            this.x = 0
        } else if (this.x + this.width > windowWidth) {
            this.x = windowWidth - this.width;
        }
        this.x += this.speedX;
    }

    /**
     * 
     * @param {Boolean} jumping 
     */
    yAxisMove(jumping) {
        // checks that the user is grounded and pressing the space bar
        if (jumping && this.ground) {
            this.speedY -= 30;
            this.ground = false;
        } else {
            // this could be outside of this statement, doesn't make a massive difference
            this.speedY += this.gravity;
        }

        this.y += this.speedY / this.friction;
    }

    // Getters + Setters
    getHeight() { return this.y };

    getBottom() { return this.y + this.height };
    setBottom(y) { this.y = y - this.height };

    getLeft() { return this.x; };
    setBottom(y) { this.y = y - this.height };

    getRight() { return this.x + this.width };
    setRight(x) { this.x = x - this.width };

    getTop() { return this.y };
}