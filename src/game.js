/**
 * @author Jonas Sciangula Street <joni2back@gmail.com>
 */

Math.fromto = function (from, to) {
    return Math.floor(Math.random() * to) + from;
};

Image.create =  function(src) {
    var img = new Image();
    img.src = src;
    return img;
};

var Player = function(image, x, y, width, height) {
    this.image = Image.create(image);
    this.width = width || 128;
    this.height = height || 128;
    this.x = x || 0;
    this.y = y || 0;
    this.velocity = 5;
    this.alive = true;
    this.direction = 0;
};

Player.prototype.parseKeys = function(keyPressed) {
    if (keyPressed === 39) {
        this.x = this.x + this.velocity;
    }
    if (keyPressed === 37) {
        this.x = this.x -this.velocity;
    }
    if (keyPressed === 38) {
        this.y = this.y -this.velocity;
    }
    if (keyPressed === 40) {
        this.y = this.y + this.velocity;
    }
    if (keyPressed === 32) {
        this.y = this.y - (this.velocity * 2);
    }
};

var AbstractGame = function() {
    this.fps = 60;
    this.canvas = null;
    this.width = 0;
    this.height = 0;
    this.minVelocity = 60;
    this.maxVelocity = 150;
    this.intervalId = 0;
    this.background = '#000';
    this.audio = 'click.wav';
    this.player = null;
};

AbstractGame.prototype.parseKeys = function (keyPressed) {

};

AbstractGame.prototype.init = function (div) {
    var self = this;

    this.containerDiv = div;
    self.width = window.innerWidth;
    self.height = window.innerHeight;

    window.onresize = function (event) {
        self.width = window.innerWidth;
        self.height = window.innerHeight;
        self.canvas.width = self.width;
        self.canvas.height = self.height;
        self.draw();
    };

    //Create the canvas.
    var canvas = document.createElement('canvas');
    div.appendChild(canvas);
    this.canvas = canvas;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    canvas.addEventListener('mousemove', function (e) {
        xMouse = (typeof e.offsetX == 'undefined') ? e.layerX : e.offsetX;
        yMouse = (typeof e.offsetY == 'undefined') ? e.layerY : e.offsetY;
        self.player.x = xMouse;
        self.player.y = yMouse;
    }, false);

    document.addEventListener("contextmenu", function(e) {
        e.preventDefault();
    }, false);
    
    document.addEventListener("keydown", function (e) {
        var key = e.which || e.keyCode;
        self.player.parseKeys(key);
        console.log(key);
    }, true);
};

AbstractGame.prototype.start = function () {
    var xCenter = this.canvas.width / 2;
    var yCenter = this.canvas.height / 2;
    this.player = new Player('player.gif', xCenter, yCenter);
    this.run();
};

AbstractGame.prototype.pause = function () {
    clearInterval(this.intervalId);
};

AbstractGame.prototype.run = function () {
    var self = this;
    this.intervalId = setInterval(function () {
        self.draw();
    }, 1000 / this.fps);
};


AbstractGame.prototype.draw = function () {
    var ctx = this.canvas.getContext("2d");

    //Draw the background.
    ctx.fillStyle = this.background;
    ctx.fillRect(0, 0, this.width, this.height);

    var self = this;
    self.drawPlayer(self.player, ctx);
};

AbstractGame.prototype.drawPlayer = function (Player, ctx) {
    ctx.drawImage(Player.image, Player.x, Player.y, Player.width, Player.height);
    ctx.moveTo(Player.y, Player.x);
};


AbstractGame.prototype.touch = function (x, y) {
    var self = this;
};