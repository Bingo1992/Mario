//Coin.prototype.onframe = function(){
//	var self = this;
//	if(girl.x + girl.width >= self.x && girl.x <= self.x + self.width && girl.y <= self.y+self.height){
//		self.removeChild(self.bitmap);
//		self.bitmap = null;
//		scores.text = score++;
//		localStorage.setItem("distance",score);
//	}
//};
function coinInit(){
	coinLayer = new LSprite();
	backLayer.addChild(coinLayer);
}
function Coin(){
	base(this,LSprite,[]);
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imgList["coin"]));
	self.width = self.bitmap.getWidth();
	self.height = self.bitmap.getHeight();
	self.addChild(self.bitmap);
}
Coin.add = function(aladder){
	coinlen = Math.ceil(Math.random()*5)+1;//随机产生2-6个硬币
	var sx = aladder.x +(aladder.width-stonenum*50)*0.6;
	if(coinlen>stonenum){
		coinlen = stonenum;
	}
	for (var j=0; j<coinlen; j++){
		coin[j] = new Coin();
	}
	//设定硬币的位置
	for(var i = 0; i < coinlen; i++){
		coin[i].x =sx + 30*i;
		coin[i].y = aladder.y-30;
		ladderLayer.addChild(coin[i]);
	}
};

