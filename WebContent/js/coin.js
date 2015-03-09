function Coin(){
	base(this,LSprite,[]);
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imgList["coin"]));
	self.addChild(self.bitmap);
}
function coinInit(){
	coinLayer = new LSprite();
	backLayer.addChild(coinLayer);
}
function addCoin(){	
	var coin = {};
	var count = Math.ceil(Math.random()*5);//随机产生1-5个硬币
	for (var j=0; j<count; j++){
		coin[j] = new Coin();
	}
	//设定硬币的位置
	for(var i = 0; i < count; i++){
		if(i==0){
			coin[i].x = Math.random()*LGlobal.width+mario.x;
		}else{
			coin[i].x = coin[i-1].x+26;
		}
		
		coin[i].y = 240;
		coinLayer.addChild(coin[i]);
	}
}