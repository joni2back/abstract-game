(function(window, Date) {

    var AbstractGame = function() {
        this.canvas = null;
        this.ctx = null;

        this.drawing = {
            intervalId: 0,
            fps: 60,
            now: undefined,
            then: Date.now(),
            delta: undefined
        };

        this.keys = [];
        this.ball = new Ball;
    }

    AbstractGame.prototype.init = function(div) {
        var setSizes = function () {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }.bind(this);

        this.canvas = document.createElement('canvas');
        setSizes.apply(this);
        div.appendChild(this.canvas);

        window.onresize = setSizes.bind(this);

        window.document.body.addEventListener("keydown", function (e) {
            this.keys[e.keyCode] = true;
        }.bind(this));

        window.document.body.addEventListener("keyup", function (e) {
            this.keys[e.keyCode] = false;
        }.bind(this));

        window.document.addEventListener('contextmenu', function(e) {
            e.preventDefault();
        }, false);
    };

    AbstractGame.prototype.start = function() {
        this.draw();
    };

    AbstractGame.prototype.pause = function() {
        window.cancelAnimationFrame(this.drawing.intervalId);
    };

    AbstractGame.prototype.parseKeys = function(event) {
        var left = 37, right = 39, up = 38, down = 40;
        var increase = 5;

        if (this.keys[left]) {
            this.ball.x -= increase;
        }
        if (this.keys[right]) {
            this.ball.x += increase;
        }
        if (this.keys[up]) {
            this.ball.y -= increase;
        }
        if (this.keys[down]) {
            this.ball.y += increase;
        }
    };

    AbstractGame.prototype.draw = function() {
        var drw = this.drawing;
        var interval = 1000 / drw.fps;

        drw.intervalId = window.requestAnimationFrame(this.draw.bind(this));
        drw.now = Date.now();
        drw.delta = drw.now - drw.then;
        if (drw.delta > interval) {
            drw.then = drw.now - (drw.delta % interval);
            this.update();
        }
    };

    AbstractGame.prototype.clearCanvas = function() {
        var ctx = this.canvas.getContext("2d");

        ctx.fillStyle = '#fff';
        ctx.fillRect(0, 0, this.width, this.height);
    };

    AbstractGame.prototype.update = function() {
        var ctx = this.canvas.getContext("2d");

        this.parseKeys();
        this.clearCanvas();
        this.ball.draw(ctx);

        (function(ctx) {
            return;
            var speed = 0.003;
            var time = new Date().getTime() * speed;
            var x = Math.sin(time) * 192 + 256;
            var y = Math.cos(time * 0.9) * 192 + 256;
            
            ctx.fillStyle = '#444';
            ctx.beginPath();
            ctx.arc(x, y, 5, 0, Math.PI * 2, true);
            ctx.closePath();
            ctx.fill();
        })(ctx);
    };


    var Ball = function(x, y) {
        this.radius = 15;
        this.x = x || 0;
        this.y = y || 0;
    }

    Ball.prototype.draw = function(ctx) {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.arc(
            this.x,
            this.y,
            this.radius,
            0,
            Math.PI*2,
            false
        );
 
        ctx.closePath();
        ctx.fill();
    };

    window.AbstractGame = AbstractGame;

})(window, Date);