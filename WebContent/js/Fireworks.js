function Fireworks(x,y,color){
	var self = this;
	base(self,LSprite,[]);
	
	self.fireworksX = x;
	self.fireworksY = y;
	
	self.angle = 20;
	self.count = 18;
	
	self.smearingColor = color;
	
	self._showFireworks();
}
Fireworks.prototype._showFireworks = function(){
	var self= this;
	var kaku;
	
	for(var i=0; i<self.count; i++){
		kaku = i*self.angle;
		var toX = 100*Math.sin(kaku * Math.PI / 180);
		var toY = 100*Math.cos(kaku * Math.PI / 180);
		
		var smearingLayer = new LGraphics();
		smearingLayer.drawArc(0,"",[0,0,5,0,2*Math.PI],true,self.smearingColor);
		
		var spreadingSmearing = new Smearing(smearingLayer);
		spreadingSmearing.x = self.fireworksX;
		spreadingSmearing.y = self.fireworksY;
		spreadingSmearing.to(1,{
			x: toX,
			y: toY,
			onComplete:function(){
				self.mode = "complete";
			}
		});
		self.addChild(spreadingSmearing);
	}
};