function Player(){
	base(this,LSprite,[]);
	var self = this;
	var list = LGlobal.divideCoordinate(256, 256, 4, 4);
	var bitmapdata = new LBitmapData(imgList["chara"],0,128,64,64);
	self.moveType = null;
	self.isJump = false;
	self.anime = new LAnimation(self,bitmapdata,list);
}

Player.prototype.onframe = function(){
	var self = this;
	
//	if(self.moveType == "left"){
////		mario.x -= MOVE_STEP;
//		background.bitmap01.x += MOVE_STEP;
//
//	}else if(self.moveType == "right"){
////		mario.x += MOVE_STEP;
//		background.bitmap01.x -= MOVE_STEP;
//	}
//	if(self.moveType == "up"){
//		mario.y -= HEIGHT_STEP;
//		
//		setTimeout(function(){
//			mario.y = 300;
//		},200);	
//	}
	self.anime.onframe();//循环播放list图
};

//控制主角动作
Player.prototype.changeAction = function(){
	var self = this;
//	if(self.moveType == "left"){
//		self.isJump = true;
//		mario.anime.setAction(1);
//		mario.x -= MOVE_STEP;
//	
//	}else if(self.moveType == "right"){
//		self.isJump = true;
//		mario.anime.setAction(2);
//		mario.x += MOVE_STEP;
//
//	}
	if(self.moveType == "up"){
		self.isJump = true;
		mario.y -= HEIGHT_STEP;
		setTimeout(function(){
			mario.y = 300;
		},200);
	}	
};

