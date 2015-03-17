var starlen,star;
function Star(){
	base(this,LSprite,[]);
	var self = this;
	var starlen = 9*Math.random()>>>0;
	self.bitmapdata = new LBitmapData(imgList["star"],0,0,32*starlen,32);	
	self.bitmap = new LBitmap(self.bitmapdata);
	self.addChild(self.bitmap);
}
function starInit(){
	starLayer = new LSprite();
	backLayer.addChild(starLayer);
}
Star.prototype.add =  function(){
	var self = this;
	self.x = LGlobal.width;
	self.y = LGlobal.height -70 - (Math.random()*32);
};
Star.prototype.move_right = function(){
	var self = this;
	self.x -= MOVE_STEP;
};
Star.prototype.move_left = function(){
	var self = this;
	self.x += MOVE_STEP;
};