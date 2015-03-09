function Coin(){
	base(this,LSprite,[]);
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imgList["coin"]));
	self.width = bitmap.getWidth();
	self.height = bitmap.getHeight();
	self.addChild(self.bitmap);
}
Coin.prototype.onframe = function(){
	var self = this;
	if(girl.x + girl.width >= self.x && girl.x <= self.x + self.width && girl.y <= self.y+self.height){
		self.removeChild(self.bitmap);
	}
};
function coinInit(){
	coinLayer = new LSprite();
	backLayer.addChild(coinLayer);
}
function addCoin(){	
	 coinlen = Math.ceil(Math.random()*5);//随机产生1-5个硬币
	for (var j=0; j<coinlen; j++){
		coin[j] = new Coin();
	}
	//设定硬币的位置
	for(var i = 0; i < coinlen; i++){
		if(i==0){
			coin[i].x = Math.random()*LGlobal.width+girl.x;
		}else{
			coin[i].x = coin[i-1].x+26;
		}	
		coin[i].y = 240;
		coinLayer.addChild(coin[i]);
	}
}
