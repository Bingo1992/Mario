function Ladder(){
	base(this,LSprite,[]);
	var self = this;
	self.child = null;
	self._charaOld = self.x;//上一次位置的横坐标
	self.setView();
}

//设定不同阶梯
Ladder.prototype.setView = function(){};
Ladder.prototype.hitRun = function (){};
//pillar
function Ladder01(){
	base(this,Ladder,[]);
}

//将阶梯显示在canvas上
Ladder01.prototype.setView = function(){
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imgList["pillar"]));
	self.height = self.bitmap.getHeight();
	self.width = self.bitmap.getWidth();
	self.addChild(self.bitmap);
};

//阶梯1
function floor1(){
	base(this,Ladder,[]);
	var self = this;
	self.ctrlIndex = 0;//控制地板状态
}
floor1.prototype.setView = function(){
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imgList["floor1"],0,0,50,20));
	self.addChild(self.bitmap);
};
floor1.prototype.hitRun = function(){
	var self = this;
	self.callParent("hitRun",arguments);
	self.ctrlIndex++;
	if(self.ctrlIndex >= 40){
		self.parent.removeChild(this);
	}else if(self.ctrlIndex == 20){
		self.bitmap.bitmapData.setCoordinate(50,20);
	}
};
//阶梯2
function floor2(){
	base(this,Ladder,[]);
	this.hit = false;
	this.hy = 10;
}
floor2.prototype.setView = function(){
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imgList["floor2"]));
	self.addChild(self.bitmap);
};
floor2.prototype.hitRun = function (){
	var self = this;
	self.callParent("hitRun",arguments);
	if(self.hit)return;
	self.hit = true;
};
//阶梯实例化
function ladderInit(){
	ladderLayer = new LSprite();
	backLayer.addChild(ladderLayer);
}
//添加阶梯
function addladder(){
	var aladder;
	var index = Math.random() * 3;
	if(index < 1){
		aladder = new Ladder01();
		aladder.y = 286;
	}
	else if(index < 2){
		aladder = new floor1();
		aladder.y = 340;
	}
	else if(index < 3){
		aladder = new floor2();
		aladder.y = 340;
	}
	aladder.x = Math.random()*LGlobal.width+girl.x;	
	ladderLayer.addChild(aladder);
}

