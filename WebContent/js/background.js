
//显示背景
function Background(){
	base(this,LSprite,[]);
	var self = this;
	self.moveType = null;
	//背景图片显示
	self.bitmapData = new LBitmapData(imgList["background"]);
    self.bitmap01 = new LBitmap(self.bitmapData);
    self.bitmap01.x = -self.bitmap01.getWidth();
	self.addChild(self.bitmap01);
	//循环背景
	self.bitmap02 = new LBitmap(self.bitmapData);
	self.addChild(self.bitmap02);
	self.bitmap03 = new LBitmap(self.bitmapData);
	self.bitmap03.x = self.bitmap01.getWidth();
	self.addChild(self.bitmap03);
	
}


Background.prototype.run = function(){
	var self = this;
	if(self.moveType == "right"){
		mario.isMove = true;
		mario.anime.setAction(2);
		self.bitmap01.x -= MOVE_STEP;
		self.bitmap02.x -= MOVE_STEP;
		self.bitmap03.x -= MOVE_STEP;
		times.text = score++;
		localStorage.setItem("distance",score);
		//移动阶梯
		for(key in ladderLayer.childList){
			var _child = ladderLayer.childList[key];
			_child.x -= MOVE_STEP;
			if(mario.x > _child.x+50){
				mario.y =  300;
			}
		}
		if(self.bitmap02.x < -self.bitmap01.getWidth()){
			self.bitmap01.x = self.bitmap02.x;
			self.bitmap02.x = self.bitmap01.x+self.bitmap01.getWidth();
			self.bitmap03.x = self.bitmap01.x+self.bitmap01.getWidth()*2;
		}
		
	}else if(self.moveType == "left"){
		mario.isMove = true;
		mario.anime.setAction(1);
		self.bitmap01.x += MOVE_STEP;
		self.bitmap02.x += MOVE_STEP;
		self.bitmap03.x += MOVE_STEP;
		times.text = score--;
		//离线存储当前数据
		localStorage.setItem("distance",score);
		for(key in ladderLayer.childList){
			var _child = ladderLayer.childList[key];
			_child.x += MOVE_STEP;
			if(mario.x+45 < _child.x){
				mario.y = 300;
			}
		}
		if(self.bitmap01.x > 0){
			self.bitmap01.x = -self.bitmap01.getWidth();
			self.bitmap02.x = self.bitmap01.x+self.bitmap01.getWidth();
			self.bitmap03.x = self.bitmap01.x+self.bitmap01.getWidth()*2;
		}
	}
};

