function Player(){
	base(this,LSprite,[]);
	var self = this;
	var list = LGlobal.divideCoordinate(150, 120, 2, 3);
	var bitmapdata = new LBitmapData(imgList["player"],0,0,50,60);
	self.moveType = null;
	self.isJump = false;
	self.anime = new LAnimation(self,bitmapdata,list);
}

Player.prototype.changeAction = function(){
	var self = this;
	if(self.moveType == "left"){
		hero.anime.setAction(2);
	}else if(self.moveType == "right"){
		hero.anime.setAction(1);
	}
}