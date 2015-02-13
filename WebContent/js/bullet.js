function Bullet(params){
	base(this,LSprite,[]);
	var self = this;
	self.x = params.x;
	self.y = params.y;
	self.xspeed = params.xspeed;
	self.belong = params.belong;
	self.iside = false;
	self.bitmap = new LBitmap(new LBitmapData(imgList["bullet"]));
	self.addChild(self.bitmap);
}

Bullet.prototype.onframe = function(){
	var self = this;
	//根据人物的动作判断向左还是向右
//	var action = mario.anime.getAction();
//	switch(action[0]){
//	case 0: break;
//	case 1: break;
//	case 2: self.x += self.xspeed; break;
//	case 3: break;
//	}
	 self.x += self.xspeed;
	if(self.x < 0 || self.x > LGlobal.width || self.y < 0 || self.y > LGlobal.height){
		bulletLayer.removeChild(self);
	}
};
