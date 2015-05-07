var gameOverLayer,gameover;
function GameOver(){
	//消除事件
	base(this,LSprite,[]);
	var self = this;
	gameOverLayer = new LSprite();
	backLayer.addChild(gameOverLayer);
	gameOverLayer.graphics.drawRect(1,"#666",[0,0,800,400],true,"#fff");
	var list = LGlobal.divideCoordinate(864,64,9,1);
	var bitmapdata = new LBitmapData(imgList["over_bg"],0,0,96,64);
	self.x = 290;
	self.y = 150;
	labelText4 = new LTextField();
	labelText4.color = "#000";
	labelText4.font = "HG行書体";
	labelText4.size = 30;
	labelText4.x = 250;
	labelText4.y = 250;
	labelText4.text = "Game Over！";
	gameOverLayer.addChild(labelText4);

	self.anime = new LAnimation(self,bitmapdata,list);
	self.addEventListener(LEvent.ENTER_FRAME,onframe);
	//将游戏层移出屏幕
//	gameOverLayer.y = -1* gameOverLayer.getHeight();
//	//通过缓动将游戏层移到屏幕
//	LTweenLite.to(gameOverLayer,1.0,{
//		y:0,
//		ease:Quad.easeOut,
//		onComplete:function(){
////			backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,reStart);
//		}
//	});
}

GameOver.prototype.onframe = function(){
	var self = this;
	self.anime.onframe();//循环播放list图	
};
GameOver.prototype.over = function(){
	initOver();
	gameover = new GameOver();
	gameOverLayer.addChild(gameover);
	gameOverLayer.addChild(labelText4);
	
}
function restart(){
	backLayer.die();
	backLayer.removeAllChild();
	gameStart();
}

