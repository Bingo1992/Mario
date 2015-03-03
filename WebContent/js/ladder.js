function Ladder(){
	base(this,LSprite,[]);
	var self = this;
	self.child = null;
	self.setView();
}

//设定不同阶梯
Ladder.prototype.setView = function(){};

//阶梯1
function Ladder01(){
	base(this,Ladder,[]);
}

//将阶梯显示在canvas上
Ladder01.prototype.setView = function(){
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imgList["pillar"]));
	self.height = self.bitmap.getHeight();
	self.addChild(self.bitmap);
};

//添加阶梯
function addladder(){
	var aladder;
	aladder = new Ladder01();
	aladder.x = Math.random()*LGlobal.width+mario.x;
	aladder.y = 286;
	ladderLayer.addChild(aladder);
}

//消灭阶梯
function removeladder(){

}

//阶梯实例化
function ladderInit(){
	ladderLayer = new LSprite();
	backLayer.addChild(ladderLayer);
}

