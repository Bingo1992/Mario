var starlen,star;
function Star(){
	base(this,LSprite,[]);
	var self = this;
	var starlen = 9*Math.random()>>>0;
	if(starlen>stonenum){
		starlen = stonenum;
	}
	self.bitmapdata = new LBitmapData(imgList["star"],0,0,32*starlen,32);	
	self.bitmap = new LBitmap(self.bitmapdata);
	self.addChild(self.bitmap);
}
function starInit(){
	starLayer = new LSprite();
	backLayer.addChild(starLayer);
}
Star.add =  function(astone){
	var rand = Math.random();
	if(rand > 0.8){
		return;
	}
	var sx = astone.x;
	star = new Star();
	star.x = sx + 32;
	star.y = astone.y - 30;
	starLayer.addChild(star);
};
