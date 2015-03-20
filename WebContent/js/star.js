var starlen,star;
var score = 0;
function Star(){
	base(this,LSprite,[]);
	var self = this;
	self.bitmapdata = new LBitmapData(imgList["star"],0,0,32,32);	
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
	var starlen = 9*Math.random()>>>0;
	var sx = astone.x + Math.random()*50;
	if(starlen>stonenum){
		starlen = stonenum-1;
	}
	for(var i=0; i<starlen;i++){
		star = new Star();
		star.x = sx + 45*i;
		star.y = astone.y - 30;
		starLayer.addChild(star);
	}			
};
//Star.prototype.onframe = function(event){
//	var self = event.target;
//	self.checkHit();
//};

Star.prototype.checkHit = function(){
	var self = this;
	if(self.x < -100)return;
	for(var i=0; i<starlen;i++){
		scores.text = localStorage.setItem("distance",score++);
	}	
	if(girl.x+girl.width>self.x && girl.x < self.x+self.bitmap.getWidth() && girl.y < self.y){
		scores.text = localStorage.setItem("distance",score++);
		LTweenLite.to(self.bitmap,0.2,{y:-10,scaleX:0.1,alpha:0.75,ease:LEasing.None});
	    LTweenLite.to(self.bitmap,0.2,{y:-20,scaleX:1,alpha:0.5,ease:LEasing.None});
	    LTweenLite.to(self.bitmap,0.2,{y:-30,scaleX:0.1,alpha:0.25,ease:LEasing.None});
	    LTweenLite.to(self.bitmap,0.2,{y:-40,scaleX:0,alpha:0,ease:LEasing.None});
	    self.removeChild(self.bitmap);
	}
};