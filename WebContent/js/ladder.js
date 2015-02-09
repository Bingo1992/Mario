function Ladder(){
	base(this,LSprite,[]);
	var self = this;
	self.child = null;
	self.hx = 0;//控制游戏相对地板位置	
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
	self.bitmap02 = new LBitmap(new LBitmapData(imgList["pillar"]));
	self.addChild(self.bitmap02);
};

//添加阶梯
function addladder(){
	var aladder;
	aladder = new Ladder01();
	aladder.x = Math.random()*800;
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

//Ladder.prototype.onframe = function(){
//	var self = this;
//
//	if(background.moveType == "left"){
//		self.x += MOVE_STEP;
//		
//	}else if(background.moveType == "right"){
//		self.x -= MOVE_STEP;
//		
//	}
//};

