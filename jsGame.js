window.onload = oppstart;

// Global variable`s:
var canvas,
	ctx,
	mouseX,
	mouseY,
	gameStart = false,
	test = true,
	tempX = 100,
	tempY = 100,
	gravity = 3,
	jumpTeller = 0,
	dudeSelected = true,
	snakeSelected = false,
	slideSpeed = 5;
const originalSlideSpeed = 5;
var	stillSliding = false,
	slidingStopped = true,
	isJumping = false,
	canRespawn = false,
	stop,
	gameIsRunning = false,
	line = {}, line01 = {}, line02 = {}, line04 = {}, line05 = {}, line06 = {},
	dude = {},
	map = {},
	house01 = {},
	keys = [],
	linesGenerated = false,
	randomNumb
	; // end

const gravMarg = 6;
var lookingReset = false;
// preloaded pictures
var dudeImg = new Image();
	dudeImg.src = "pictures/fixedRedDude.png";
var cobra = new Image();
	cobra.src = "pictures/snake.png";
var dudeChat = new Image();
	dudeChat.src = "pictures/fixedRedDude.png";

function oppstart() {
	canvas = document.getElementById("myCanvas");
	ctx = canvas.getContext("2d"); 
	canvas.width = 1080; // canvas size   
	canvas.height = 600;
	//ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	ctx.fillRect(0, 0, canvas.width, canvas.height) // black background.
	
	ctx.fillStyle = "#330000"; // play box.
	ctx.fillRect(50, 420, 200, 130);
	ctx.fillRect(150, 255, 75, 50);
	ctx.fillRect(280, 255, 85, 50);
	ctx.strokeStyle = "red";
	ctx.stroke();
	
	openingText();
	
	// event handlers.
	canvas.onmousedown = checkPlay; // checks mouse coordinates.
	canvas.onmousemove = flashyPlayThingy;
	canvas.onkeydown = keyDown;
}
function openingText() {
	ctx.font = "40px arial"; // intro page text here!
	ctx.fillStyle = "#2222ff"; // fill style = blue.
	ctx.fillText("this game was created by an invisible goat..", 30, 50);
	ctx.fillText("this game may include odd humor, pointlessness or", 30, 150);
	ctx.fillText("other stupid things.", 30, 200);
	ctx.fillText("Play", 100, 500);
	ctx.font = "30px comic-sans";
	ctx.fillText("such space", 600, 400);
	ctx.fillText("many text", 600, 440);
	ctx.fillText("wow", 600, 480);
	
	ctx.fillText("play as: ", 50, 290);
	ctx.fillText("dude", 160, 290);
	ctx.fillText("or", 240, 290);
	ctx.fillText("snake", 290, 290);
	if (dudeSelected === true) {
		ctx.fillText("dude is selected", 50, 350);
	} else if (snakeSelected === true) {
		ctx.fillText("snake is selected", 50, 350);
	}
}
function checkPlay(e) {
	if(gameStart === false) {
		mouseX = e.clientX;
		mouseY = e.clientY;
		if (mouseX <= 250 && mouseX >= 50 && mouseY <= 550 && mouseY >= 430) {
			gameRunOppstart(); // runs game. if you click on the play box.
		} else if(mouseX <= 960 && mouseX >= 760 && mouseY <= 590 && mouseY >= 390) {
			dogeEnd();
		} else if (mouseX <= 235 && mouseX >= 160 && mouseY <= 315 && mouseY >= 265) {
			snakeSelected = false;
			dudeSelected = true;
		} else if (mouseX <= 375 && mouseX >= 290 && mouseY <= 315 && mouseY >= 265) {
			dudeSelected = false;
			snakeSelected = true;
		}
		else {
			//alert("x: " + mouseX + " y: " + mouseY);
		}
	}
}
function flashyPlayThingy(e) {
	if(gameStart === false) {
		var tempMouseX = e.clientX; // new variable`s too make sure the global ones aren`t
		var tempMouseY = e.clientY; // messed up.
		
		if (tempMouseX <= 260 && tempMouseX >= 60 && tempMouseY <= 560 && tempMouseY >= 430) {
			ctx.fillStyle = "gold";
			ctx.font = "40px arial";
			ctx.fillRect(50, 420, 200, 130);
			
			ctx.fillStyle = "blue";
			ctx.fillText("Play", 100, 500);
		} else if (tempMouseX <= 960 && tempMouseX >= 760 && tempMouseY <= 590 && tempMouseY >= 390) { 
			var img = new Image();
			img.src = "doge.jpeg";
			ctx.drawImage(img, 750, 380, 200, 200);
			//alert("hest");
			
		} else if (tempMouseX <= 235 && tempMouseX >= 160 && tempMouseY <= 315 && tempMouseY >= 265) {
			ctx.fillStyle = "gold";
			ctx.fillRect(150, 255, 75, 50);
			
			ctx.fillStyle = "blue";
			ctx.fillText("dude", 160, 290);
		} else if (tempMouseX <= 375 && tempMouseX >= 290 && tempMouseY <= 315 && tempMouseY >= 265) {
			ctx.fillStyle = "gold";
			ctx.fillRect(280, 255, 85, 50);
			
			ctx.fillStyle = "blue";
			ctx.fillText("snake", 290, 290);
			
		} else {
			oppstart();
		}
		//tempMouseX <= 700 && tempMouseX >= 400 && tempMouseY <= 550 && tempMouseY >= 430
	} // ---gameStart if ends here!
}
function dogeEnd() {
	gameStart = true;
	var img = new Image();
	img.src = "pictures/doge.jpeg";
	ctx.drawImage(img, (Math.random() * canvas.width) - 50, (Math.random() * canvas.height) - 50, 200, 200);
	setTimeout(dogeEnd, 50);
}
 // -----------------------Game Start varible`s here!!!! ------------------------ //
 // ----------------------- /-.-/-------------/-.-/------------------------------ //
 
function gameRunOppstart() {
	gameStart = true;
	gameIsRunning = true;
	canRespawn = false;
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	
	canvas.removeEventListener("click", gameRunOppstart);
	// defining global variable`s
	dude = {x: 150, y: 100, xVel: 0, yVel: 0, 
		maxSpeed: 7,
		speed: 7,
		friction: 0.95,
		gravity: 3,
		isJumping: false,
		jumpingTimer: 0,
		isDead: false,
		width: 80,
		height: 108,
		lookingRight: true,
		lookingLeft: false,
		lookingUp: false,
	};
	map = {
		rightSlidingPoint: 650, // slidingPoint
		leftSlidingPoint: 100
	};
	house01 = {
		x: 3250,
		y: 100,
		width: 250,
		height: 200
	}
	line = { // y`s	start and end will be equal when the line is horisontal.
		line01: {xStart: -2, xEnd: 500, yStart: 300, yEnd: (300 + gravMarg), width: 6}, 
		line02: {xStart: 600, xEnd: 900, yStart: 400, yEnd: (400 + gravMarg), width: 6},
		line03: {xStart: 1000, xEnd: 1600, yStart: 300, yEnd: (300 + gravMarg), width: 6},
		line04: {xStart: 1700, xEnd: 1800, yStart: 300, yEnd: (300 + gravMarg)},
		line05: {xStart: 1900, xEnd: 2000, yStart: 200, yEnd: (200 + gravMarg)},
		line06: {xStart: 2300, xEnd: 2350, yStart: 400, yEnd: (400 + gravMarg)},
		line07: {xStart: 2540, xEnd: 2580, yStart: 300, yEnd: (300 + gravMarg)},
		line08: {xStart: 2700, xEnd: 2750, yStart: 250, yEnd: (250 + gravMarg)},
		line09: {xStart: 2900, xEnd: 2950, yStart: 400, yEnd: (400 + gravMarg)},
		line10: {xStart: 3000, xEnd: 3500, yStart: 300, yEnd: (300 + gravMarg)},
		line11: {xStart: 3600, xEnd: 3700, yStart: 400, yEnd: (400 + gravMarg)},
		line12: {xStart: 3100, xEnd: 3600, yStart: 450, yEnd: (450 + gravMarg)},
		line13: new lineConstuctor(0, 400, 400, 400, 6)
	}; // line`s need a minimum margin of (x + 1) since gravity is set to x.
	//console.log(line);
	// local variable`s // ---- might not be needed.
	var zombie = { x: 0, y: 0, xVel: 0, yVel: 0};
	
	// game related event listeners.
	document.body.onkeydown = keyDown;
	document.body.onkeyup = keyUp;
	gameRun(dude, zombie, line, house01);
}
function gameRun(dude, zombie, line, house01) {
	
	ctx.fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height); // canvas becomes dark.
	
	// Map
	mapSlide(line, dude);
	ctx.fillStyle = "#000000";
	drawing(line);
	borders(line, dude);
	things(line, dude, house01);
	
	//dude.y += 3;
	
	// controlls
	controlls(dude);
	
	// Animations
	dudeAnimation(dude, house01);
	
	
	// if tests that need to be in loop.
	areYouDead(dude);
	
	
	//'-'// _/¨-¨\_ \^-^/ |-.-| |¨o¨| 
	if(gameIsRunning == true) {
		setTimeout(gameRun, 15, dude, zombie, line, house01); //--- sets the game loop! always resend variable`s!! ---
	}
}
function controlls(dude) {
	if (keys[68] === true) { // 68 = d
		lookResetFunc();
		dude.x += dude.speed;
		dude.lookingRight = true;
	}
	if (keys[65] === true) { // 65 = a
		lookResetFunc();
		dude.x -= dude.speed;
		dude.lookingLeft = true;
	}
	if (keys[83] === true) { // 83 = s
		dude.y += dude.speed;
	}
	if (keys[87] === true) { // 87 = w
		lookResetFunc();
		dude.lookingUp = true;
	}
	if (keys[16] === true) {
		dude.speed = 3;
	} else {
		dude.speed = dude.maxSpeed;
	}
}
function dudeAnimation(dude, house01) {
	// canvas edge borders ------
	dudeCanvasBorders(dude);
	// reset picture src.
	//lookingFunc();
	// Gravity
	dude.y += 5;
	
	// draws dude or snake.
	var dudeImg = new Image();
	if(snakeSelected === true) {
		dudeImg.src = "pictures/snake.png";
	} else{
		if(dude.lookingRight === true) {
			dudeImg.src = "pictures/fixedRedDude.png";
		} else if(dude.lookingLeft === true) {
			dudeImg.src = "pictures/reversedFixedRedDude.png"; // name too long plz shorten.
		} else if(dude.lookingUp === true) {
			dudeImg.src = "pictures/redDudeLookUp.png";
		}
	}
	ctx.drawImage(dudeImg, dude.x, dude.y, 80, 100);
	
	//var invisibleGoat = new Image();
	//invisibleGoat.src = "pictures/goat.png";
	//ctx.drawImage(invisibleGoat, 300, 300, 100, 100);
	
	dudeEnterHouse(dude, house01);
}
function dudeCanvasBorders(dude) {
	if(dude.x < 0) {
		dude.x = 0;
	} else if (dude.x > (canvas.width - 80)) { // img start point is the top left corner
		dude.x = (canvas.width - 80); // so need to minus out the images width.
	}
	if(dude.y < 0) {
		dude.y = 0;
	} else if (dude.y > (canvas.height - 100)) {
		dude.y = (canvas.height - 100);
	}
}
function dudeEnterHouse(dude, house01) {
	if(dude.x > house01.x && dude.x < (house01.x + house01.width)
		&& dude.y > (house01.y + 50) && dude.y < house01.y + house01.height) {
			dudeIsInDaHouse(dude);
		}
}
function dudeIsInDaHouse(dude) {
	gameIsRunning = false;
	shop(dude);
}
function shop(dude) {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
	fillStyle = "#000000";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	
	// draws the preloaded image`s.
	ctx.drawImage(dudeChat, -150, 250, 500, 500);
	ctx.drawImage(cobra, 700, -100, 500, 500);
	
	ctx.rect(0, 450, canvas.width, 150);
	ctx.strokeStyle = "purple";
	ctx.lineWidth = 6;
	ctx.stroke();
	
	ctx.fillStyle = "blue";
	ctx.fillText("cobra: snake!", 600, 550);
	
}
function lookResetFunc() {
	dude.lookingRight = false;
	dude.lookingLeft = false;
	dude.lookingUp = false;
}
function generateLines(line) {
	var lineArr = [];
	if(linesGenerated === false){
		for (var i = 14; i <= 60; i++) {
			randomNumb = Math.random();
			lineArr[i] = "line" + i;
			line[lineArr[i]] = 
				new lineConstuctor(i * 230 + (randomNumb), (i * 230) + (randomNumb) + (Math.random() * 100), i + 100 + ((randomNumb * 100) + (randomNumb * 100)), i + 100 + ((randomNumb * 100) + (randomNumb * 100)) + gravMarg, 6);
			//lineDraw(line[lineArr[i]]);
			//console.log(line[lineArr[i]]);
		}
		linesGenerated = true;
	}
}
//  width is the line width if the lines are horisontal its height
function lineConstuctor(x0, x, y0, y, lineWidth) {
	this.xStart = x0;
	this.xEnd = x;
	this.yStart = y0;
	this.yEnd = (y + gravMarg);
	this.width = lineWidth;
}

function zombie01(zombie) {
	var zombieImg = new Image();
	zombieImg.src = "pictures/zombieRed.png";
	ctx.drawImage(zombieImg, zombie.x, zombie.y, 80, 100);
}
function things(line, dude) {
	house01Func(line, dude, house01);
}
function house01Func(line, dude, house01) {
	var house01Img = new Image();
	house01Img.src = "pictures/house.png";
	ctx.drawImage(house01Img, house01.x, house01.y, house01.width, house01.height);
}
function drawALine(X0, X, Y0, Y, width) {
	if(width === typeof "undefined") {width = 1;};
	ctx.beginPath();
	ctx.lineWidth = width;
	ctx.moveTo(X0,Y0);
	ctx.lineTo(X,Y);
	ctx.stroke();
}
function jump() {
	dude.y -= 13;
	jumpTeller++;
	if(jumpTeller >= 30) {
		clearInterval(stop);
		dude.isJumping = false;
	}
}
function drawing(line) { // draws the map.
	generateLines(line);
	for(var key in line) {
		lineDraw(line[key]);
	}
}
function lineDraw(Thisline) {
	drawALine(Thisline.xStart, Thisline.xEnd, Thisline.yStart, Thisline.yStart, Thisline.width); 
}
function borders(line, dude){ // places hitboxes on the drawn objects.
	for(var key in line) {
		if(line.hasOwnProperty(key)) { // will become false on all prototype objects.
			generalHitBoxFunc(line[key], dude);
		}
	}
	deathBorder(line, dude);
}
function generalHitBoxFunc(object, object2) { // object is line object2 is the player.
	if(object2.x > (object.xStart - object2.width) && object2.x < object.xEnd
		&& object2.y > (object.yStart - object2.height) && object2.y < (object.yEnd - object2.height))
		{
		object2.y = (object.yStart - object2.height);
	}
}
function mapSlide(line, dude) {
	if((dude.x - dude.width) > map.rightSlidingPoint) {
		slideRight(line, dude);
	}
	if(dude.x < map.leftSlidingPoint) {
		slidingLeft(line, dude);
	}
}
function slideRight(line, dude) {
	stillSliding = true, slidingStopped = false;
	slideSpeed = originalSlideSpeed;
	for(var key in line) {
		moveThemLines(line[key], slideSpeed);
	}
	moveThemThings(house01, slideSpeed);
	moveDude(dude, slideSpeed);
}
function slidingLeft(line, dude) {
	stillSliding = true, slidingStopped = false;
	slideSpeed = originalSlideSpeed;
	for (var key in line) {
		moveThemLines(line[key], (slideSpeed * -1));
	}
	moveThemThings(house01, (slideSpeed * -1));
	moveDude(dude, slideSpeed * -1);
}
function moveThemLines(object, slideSpeed) {
	object.xStart -= slideSpeed;
	object.xEnd -= slideSpeed;
}
function moveThemThings(obj, slideSpeed) {
	obj.x -= slideSpeed;
}
function moveDude(dude, slideSpeed) {
	dude.x -= slideSpeed;
}
function deathBorder(line, dude) {
	if(dude.y > 500) {
		dude.isDead = true;
	}
}
function areYouDead(dude) {
	if(dude.isDead === true) {
		youAreDead(dude);
		
	}
}
function youAreDead(dude) {
	gameIsRunning = false;
	
	ctx.font = "80px arial";
	ctx.fillStyle = "#990000";
	ctx.fillText("You Died.", 400, 310)
	ctx.font = "20px arial"
	ctx.fillText("you traveled " + dude.x + " pixels", 450, 340);
	ctx.font = "20px arial";
	ctx.fillText("click too respawn.", 450, 380);
	
	var clickRespawn = canvas.addEventListener("click", gameRunOppstart);
}
function keyDown(e) {
	//alert(e.keyCode);
	keys[e.keyCode] = true;
	if(e.keyCode === 32) {
		if(dude.isJumping === false) {
			dude.isJumping = true;
				jumpTeller = 0;
			stop = setInterval(jump, 15);
		}
	}
}
function keyUp(e) {
	keys[e.keyCode] = false;
}