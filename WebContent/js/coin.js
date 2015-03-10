var coinY = [ladderY-30,240,70];
function Coin(){
	base(this,LSprite,[]);
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imgList["coin"]));
	self.width = self.bitmap.getWidth();
	self.height = self.bitmap.getHeight();
	self.addChild(self.bitmap);
}
Coin.prototype.onframe = function(){
	var self = this;
	if(girl.x + girl.width >= self.x && girl.x <= self.x + self.width && girl.y <= self.y+self.height){
		self.removeChild(self.bitmap);
		self.bitmap = null;
		scores.text = score++;
		localStorage.setItem("distance",score);
	}
};
function coinInit(){
	coinLayer = new LSprite();
	backLayer.addChild(coinLayer);
}
function addCoin(){	
	coinlen = Math.ceil(Math.random()*5)+1;//随机产生2-6个硬币
	var index = Math.ceil(Math.random()*2)+1;
	for (var j=0; j<coinlen; j++){
		coin[j] = new Coin();
	}
	//设定硬币的位置
	for(var i = 0; i < coinlen; i++){
		if(i==0){
			coin[i].x = Math.random()*LGlobal.width+girl.x;
		}else{
			coin[i].x = coin[i-1].x+30;
		}	
		coin[i].y = coinY[index];//三种高度
		coinLayer.addChild(coin[i]);
	}
}
