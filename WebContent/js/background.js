
//显示卷轴背景
function Background(){
	base(this,LSprite,[]);
	var self = this;
	self.moveType = null;
	//背景图片显示
	self.bitmapData = new LBitmapData(imgList["background"]);
    self.bitmap01 = new LBitmap(self.bitmapData);
	self.addChild(self.bitmap01);
	//右走循环背景
	self.bitmap02 = new LBitmap(self.bitmapData);
	self.bitmap02.x = self.bitmap01.getWidth();
	self.addChild(self.bitmap02);
	self.bitmap03 = new LBitmap(self.bitmapData);
	self.bitmap03.x = self.bitmap01.getWidth()*2;
	self.addChild(self.bitmap03);
	//	左走循环背景
	self.bitmap04 = new LBitmap(self.bitmapData);
	self.bitmap04.x = -self.bitmap01.getWidth();
	self.addChild(self.bitmap04);
	self.bitmap05 = new LBitmap(self.bitmapData);
	self.bitmap05.x = -self.bitmap01.getWidth()*2;
	self.addChild(self.bitmap05);
	
}


Background.prototype.run = function(){
	var self = this;

	if(self.moveType == "right"){
		mario.isJump = true;
		mario.anime.setAction(2);
		self.bitmap01.x -= MOVE_STEP;
		self.bitmap02.x -= MOVE_STEP;
		self.bitmap03.x -= MOVE_STEP;
		self.bitmap04.x -= MOVE_STEP;
		self.bitmap05.x -= MOVE_STEP;
		if(self.bitmap01.x < -self.bitmap01.getWidth()){
			self.bitmap01.x = self.bitmap02.x;
			self.bitmap02.x = self.bitmap01.x+self.bitmap01.getWidth();
			self.bitmap03.x = self.bitmap01.x+self.bitmap01.getWidth()*2;
		}
		
	}else if(self.moveType == "left"){
		mario.isJump = true;
		mario.anime.setAction(1);
		self.bitmap01.x += MOVE_STEP;
		self.bitmap02.x += MOVE_STEP;
		self.bitmap03.x += MOVE_STEP;
		self.bitmap04.x += MOVE_STEP;
		self.bitmap05.x += MOVE_STEP;
		if(self.bitmap01.x > 0){
			self.bitmap01.x = self.bitmap04.x;
			self.bitmap04.x = -(self.bitmap01.x+self.bitmap01.getWidth());
			self.bitmap05.x = -(self.bitmap01.x+self.bitmap01.getWidth()*2);
		}
	}
};