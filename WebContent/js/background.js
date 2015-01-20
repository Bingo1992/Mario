
//显示卷轴背景
function Background(){
	base(this,LSprite,[]);
	var self = this;
	//背景图片显示
    self.bitmap01 = new LBitmap(new LBitmapData(imgList["background"]));
	self.addChild(self.bitmap01);
}


Background.prototype.run = function(){
	var self = this;	
	if(self.moveType == "right"){
		hero.anime.setAction(2);
		self.bitmap01.x -= MOVE_STEP;
	}else if(self.moveType == "left"){
		hero.anime.setAction(1);
		self.bitmap01.x += MOVE_STEP;
	}
};