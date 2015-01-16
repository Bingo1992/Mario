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
	if(self.moveType == "left"){
		hero.x -= MOVE_STEP;
	}else if(self.moveType == "right"){
		hero.x += MOVE_STEP;
	}
	if(self.moveType == "up"){
		hero.y -= HEIGHT_STEP;
		setTimeout(function(){
			hero.y = 300;
		},200);	
	}
	self.anime.onframe();
};

//控制主角动作
Player.prototype.changeAction = function(){
	var self = this;
	if(self.moveType == "left"){
		hero.anime.setAction(1);
		hero.x -= MOVE_STEP;
	}else if(self.moveType == "right"){
		hero.anime.setAction(2);
		hero.x += MOVE_STEP;
	}
	if(self.moveType == "up"){
		hero.y -= HEIGHT_STEP;
		setTimeout(function(){
			hero.y = 300;
		},200);
	}	
};

