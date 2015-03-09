function Enemy(x,y,shootX,shootY,bitmapdata,hp){
	base(this,LSprite,[]);
	var self = this;
//	self.bitmapData = new LBitmapData(imgList["enemy"]);
//	self.bitmap04 = new LBitmap(self.bitmapData);
//	self.addChild(self.bitmap04);
	
	var list = LGlobal.divideCoordinate(94, 30, 1, 3);
	var bitmapdata = new LBitmapData(imgList["enemy"],0,0,31,30);
	self.anime = new LAnimation(self,bitmapdata,list);
	self.x = 500;
	self.y = 332;
//	self.anime.setAction(2);
}
Enemy.prototype.run =  function(){
	var self = this;
//	if(self.islive){
		self.x -= EN_STEP;
		self.changeAction();
//	}
};
Enemy.prototype.changeAction = function(){
	LGlobal.setDebug(true);
	var self = this;
	if(!self.islive){
//			self.islive = false;
			setTimeout(function(){
				self.anime.setAction(0,1);
			},100);
			setTimeout(function(){
				self.anime.setAction(0,2);
			},100);
	}
};