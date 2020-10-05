(function() {
    var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
      window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    window.requestAnimationFrame = requestAnimationFrame;
})();

restart = document.getElementById("restart");
canvas = document.getElementById("canvas"); 
context = canvas.getContext('2d');

canvas.width = canvas.scrollWidth;
canvas.height = canvas.scrollHeight;

context.imageSmoothingEnabled = false;  

class Position {

    constructor(x,y) {
        this.x = x;
        this.y = y;
    }
}

class EnemyProjectile {
    constructor(x,y) {

        this.width = 10;
        this.height = 100;
        this.pos = new Position(x - this.width / 2, y - this.height);

        this.speed = -15;
    }

    update() {
        this.pos.y -= this.speed;

        //Remove projectile when out of canvas
        if(this.pos.y >= canvas.height) {          
            enemyBullets.splice(enemyBullets.indexOf(this), 1);
        }
    }
}

class Projectile {

    constructor(x,y) {

        this.width = 10;
        this.height = 100;
        this.pos = new Position(x - this.width / 2, y - this.height);

        this.speed = 30;
    }

    update() {
        this.pos.y -= this.speed;

        //Remove projectile when out of canvas
        if(this.pos.y + this.height <= 0) {
            bullets.splice(bullets.indexOf(this), 1);
        }
    }
}

class Player {

    constructor() {

        this.width = 150;
        this.height = 150;
        this.pos = new Position(canvas.width / 2 - this.width / 2, canvas.height - this.width * 2)

        this.speed = 10;
        this.health = 5;
        this.fireRate = 15;
        this.cooldown = 0;  

        this.image = new Image();
        this.image.src = '../resource/player.png';
    }

    moveHorizontal(dir) {

        this.newPos = this.pos.x + (this.speed * dir);
        if(this.newPos >= 0 && this.newPos <= canvas.width - this.width) {
            this.pos.x = this.newPos;
        }
    }

    shoot() {
        if(this.cooldown <= 0) {
            bullets.push(new Projectile(player.pos.x + player.width / 2, player.pos.y));
            this.cooldown = this.fireRate;
        }
    }

    update() {

        if(keyA) {
            this.moveHorizontal(-1);
        }
        if(keyD) {
            this.moveHorizontal(1);
        }
        if(keyW) {
            this.shoot();
        }
        if(this.cooldown >= 0) {
            this.cooldown -= deltaTime;
        }      
    }
}

class WaveManager {
    constructor() {
        this.enemyRow = 5;
        this.enemyCol = 6;      
        this.enemySpawnWidth = 100;
        this.enemySpawnHeight = 100;
    }

    spawn() {

        this.spawnX = canvas.width / (this.enemyCol + 1);
        this.spawnY = canvas.height / (this.enemyRow + 1);
        for (let i = 0; i < this.enemyCol; i++) { 
            for (let j = 0; j < this.enemyRow; j++) {
                enemys.push(new Enemy(this.enemySpawnWidth, this.enemySpawnHeight, (i + 1) * this.spawnX - this.enemySpawnWidth / 2, (j + 1) * this.spawnY - this.enemySpawnHeight / 2 - canvas.height));
            }
        }   
    }

    update() {
        if(enemys.length <= 0) {
            this.spawn();
        }
        else {
            this.deathCheck();
        }
    }

    deathCheck() {
        enemys.forEach(function(enemy) {
            if(enemy.pos.y >= canvas.height) {
                enemys.splice(enemys.indexOf(enemy), 1);
            }
            else if(hitBoxCheck(enemy, player)) {
                enemys.splice(enemys.indexOf(enemy), 1);
                player.health--;
                score++;
            }
            bullets.forEach(function(bullet) {
                if(hitBoxCheck(enemy, bullet)) {
                    enemys.splice(enemys.indexOf(enemy), 1);
                    bullets.splice(bullets.indexOf(bullet), 1);
                    score++;
                }    
            });    
        });
        enemyBullets.forEach(function(bullet) {
            if(hitBoxCheck(player, bullet)) {
                enemyBullets.splice(enemyBullets.indexOf(bullet), 1);
                player.health--;
            }    
            bullets.forEach(function(bullet2) {
                if(hitBoxCheck(bullet, bullet2)) {
                    enemyBullets.splice(enemyBullets.indexOf(bullet), 1);
                    bullets.splice(bullets.indexOf(bullet2), 1);
                }    
            }); 
        });
    }
}

class Enemy {
    constructor(width,height,x,y) {

        this.width = width;
        this.height = height;
        this.pos = new Position(x,y);

        this.speed = 2;

        this.image = new Image();
        this.image.src = '../resource/enemy.png';
    }

    update() {
        this.pos.y += this.speed;

        this.rand = Math.floor(Math.random() * 600);

        if(this.rand == 0) {
            this.shoot()
        }
    }

    shoot() {
        enemyBullets.push(new EnemyProjectile(this.pos.x + this.width / 2, this.pos.y + this.height));
    }
}

let gamma = 0;
let beta = 0;
let alpha = 0;

let player = new Player();
let waveManager = new WaveManager();
let enemys = [];
let bullets = [];
let enemyBullets = [];

let score = 0;

let keyA = false;
let keyD = false;
let keyW = false;

//Define deltatime with fps
const perfectFrameTime = 1000 / 60;
let deltaTime = 0;
let lastTimestamp = 0;

function hitBoxCheck(objA,objB) {
    return (objA.pos.x < objB.pos.x + objB.width &&
    objA.pos.x + objA.width > objB.pos.x &&
    objA.pos.y < objB.pos.y + objB.height &&
    objA.pos.y + objA.height > objB.pos.y);
}

function keyDown(e) {

    //console.log("pressed");
    if(e.keyCode == 65 || e.keyCode == 97) {
        keyA = true;
    }
    if(e.keyCode == 68 || e.keyCode == 100) {
        keyD = true;
    }
    if(e.keyCode == 87 || e.keyCode == 119) {
        keyW = true;
    }
}

function keyUp(e) {

    //console.log("released");
    if(e.keyCode == 65 || e.keyCode == 97) {
        keyA = false;
    }
    if(e.keyCode == 68 || e.keyCode == 100) {
        keyD = false;
    }
    if(e.keyCode == 87 || e.keyCode == 119) {
        keyW = false;
    }
}

//Draws game at every frame
function drawGame(timestamp) {

    deltaTime = (timestamp - lastTimestamp) / perfectFrameTime;
    lastTimestamp = timestamp;

    context.clearRect(0, 0, canvas.width, canvas.height);

    player.update();

    waveManager.update();

    //Draw player
    context.drawImage(player.image, player.pos.x, player.pos.y, player.width, player.height);

    //Draw wave
    enemys.forEach(function(enemy) {
        enemy.update();

        context.drawImage(enemy.image, enemy.pos.x, enemy.pos.y, enemy.width, enemy.height);
    });

    bullets.forEach(function(bullet) {      
        bullet.update();

        //Draw bullets
        context.fillStyle = "red";
        context.fillRect(bullet.pos.x, bullet.pos.y, bullet.width, bullet.height);
    });

    enemyBullets.forEach(function(bullet) {      
        bullet.update();

        //Draw bullets
        context.fillStyle = "yellow";
        context.fillRect(bullet.pos.x, bullet.pos.y, bullet.width, bullet.height);
    });

    //Draw remaining life
    var heart = new Image;
    heart.src = '../resource/heart.png';
    for(i = 0; i < player.health; i++) {     
        context.drawImage(heart,(i * 50) + 50,50,50,50);
    }

    context.font = "50px Arial";
    context.fillStyle = "white";
    //context.fillText("Alpha: " + alpha + "Beta: " + beta + "Gamma: " + gamma, 100, 500);

    context.fillText("Score: " + score, 50, 150);

    if(player.health <= 0) {
        restart.style.visibility = "visible";
    }
    else{
        window.requestAnimationFrame(drawGame);
    }
}

function restartGame() {
    player = new Player();
    waveManager = new WaveManager();
    enemys = [];
    bullets = [];
    enemyBullets = [];

    restart.style.visibility = "hidden";
    window.requestAnimationFrame(drawGame);
}

window.addEventListener("deviceorientation", function(event) {
    gamma = Math.round(event.gamma);
    beta = Math.round(event.beta);
    alpha = Math.round(event.alpha);
    
    if(gamma <= -10) {
        keyD = false;
        keyA = true;
    }
    else if (gamma >= 10) {
        keyA = false;
        keyD = true;
    }
    else {
        keyA = false;
        keyD = false;
    }
    if (gamma != 0 || beta != 0 || alpha != 0) {
        keyW = true;
    }
});

window.addEventListener("keydown", keyDown, false);
window.addEventListener("keyup", keyUp, false);
window.requestAnimationFrame(drawGame);
//document.oncontextmenu = function() { return false; }
