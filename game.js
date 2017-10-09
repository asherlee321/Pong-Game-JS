var canvas = document.getElementById("mainCanvas");
var ctx = canvas.getContext("2d");
var playerOneScore = {
	x:canvas.width/2+50,
	y:20,
	score:0
};
var playerTwoScore = {
	x:canvas.width/2-50,
	y:20,
	score:0
};	
function reset(){
	playerOne = new player(20,canvas.height/2-70,20,100);
	playerTwo = new player(760,canvas.height/2-70,20,100);
	ball = new ball(canvas.width/2-20,canvas.height/2,15,15);
	function update(){
		clear();
		playerOne.show();
		playerTwo.show();
		ball.show();
		ball.move();
		ctx.font = "16px Comic Sans MS, comic sans ms";
		ctx.fillText(playerOneScore.score,playerOneScore.x,playerOneScore.y);
		ctx.fillText(playerTwoScore.score,playerTwoScore.x,playerTwoScore.y);	
	
		window.requestAnimationFrame(update);
	}


	function player(x,y,w,h){
		this. x = x;
		this.y = y;
		this.w = w;
		this.h = h;

		this.show = function(){
			ctx.fillStyle = "white";
			ctx.fillRect(this.x,this.y,this.w,this.h);
			if(this.y < 0){
				this.y = 0;
			}
			else if(this.y > canvas.height - this.h){
				this.y = canvas.height - this.h;
			}
		}
	}
	function ball(x,y,w,h){
		this. x = x;
		this.y = y;
		this.w = w;
		this.h = h;
		this.speedX = -5;
		this.speedY = 0;
		var touchedOne = false;
		this.show = function(){
			ctx.fillStyle = "white";
			ctx.fillRect(this.x,this.y,this.w,this.h);
			this.random = Math.floor(Math.random() * 2);
		}

		this.move = function(){

			if(this.y < playerOne.y + 100 && this.y > playerOne.y && this.x > 0 ){
				if(this.x < playerOne.x + this.w && this.y < playerOne.y + 50){
					this.speedX = -this.speedX;
					this.speedY = -this.speedY;
					touchedOne = true;
				}
	
				else if(this.x < playerOne.x + this.w && this.y > playerOne.y - 50 ){
					this.speedX = -this.speedX;
					this.speedY = -this.speedY;
					touchedOne = true;
				}

			}
			if(this.y < playerTwo.y + 100 && this.y > playerTwo.y){
				if(this.x > playerTwo.x - this.w && this.y < playerTwo.y + 50){
					this.speedX = -5;
					this.speedY = -5;
					touchedOne = false;
				}
				else if(this.x > playerTwo.x - this.w && this.y > playerTwo.y - 50){
					this.speedX = -5;
					this.speedY = 5;
					touchedOne = false;
				}
			}	
			if(this.y < 0 && touchedOne){

				this.speedX = 5;
				this.speedY = 5;
			}
			else if(this.y < 0 && !touchedOne){
				this.speedX = -5;
				this.speedY = 5;
			}


			if(this.y > canvas.height - this.h && !touchedOne){
				this.speedX = -5;
				this.speedY = -5;
			}
			else if(this.y > canvas.height - this.h && touchedOne){
				this.speedX = 5;
				this.speedY = -5;			
			}

			if(this.x < playerOne.x){
				this.x = canvas.width/2;
				this.y = canvas.height/2;
				this.speedX = 5;
				this.speedY = 0;
				playerOneScore.score++;
			}
			if(this.x > playerTwo.x){
				this.x = canvas.width/2;
				this.y = canvas.height/2;
				this.speedX = -5;
				this.speedY = 0;
				playerOne.y = canvas.height/2-70;
				playerTwo.y = canvas.height/2-70
				playerTwoScore.score++;
			}

			this.x += this.speedX;
			this.y += this.speedY;
		}
	}
	update();
	}
	function clear(){
		ctx.clearRect(0,0,canvas.width,canvas.height)
	}
	window.addEventListener("keydown",function(event){
		if(event.keyCode == 87){
			playerOne.y -= 10;
		}
		if(event.keyCode == 83){
			playerOne.y += 10;
		}
		if(event.keyCode == 38){
			playerTwo.y -= 10;
		}
		if(event.keyCode == 40){
			playerTwo.y += 10;
		}
	});
window.onload = function(){
	reset();
}

