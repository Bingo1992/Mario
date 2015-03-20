var stonenum;
var stone;
function Stone(){
	base(this,LSprite,[]);
	var self = this;
	self.setView();
}

Stone.prototype.setView = function(){};
Stone.prototype.hitRun = function(){};
//stone
function Stone01(){
	base(this,Stone,[]);
}

//将石阶显示在canvas上
Stone01.prototype.setView = function(){
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imgList["stone"],0,0,Math.ceil(Math.random()*5)+150,30));
	self.height = self.bitmap.getHeight();
	self.width = self.bitmap.getWidth();
	self.addChild(self.bitmap);
};

//Stone01.prototype.hitPoint = function(x,y){
//	var self = this;
//	if(x>self.x && x<self.x+self.width && y>self.y && y<self.y+self.height){		
//		return true;
//	}	
//	return false;
//};
//阶梯1
function Stone02(){
	base(this,stone,[]);
	var self = this;
	self.ctrlIndex = 0;//控制地板状态
}
Stone02.prototype.setView = function(){
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imgList["floor1"],0,0,50,20));
	self.addChild(self.bitmap);
};
Stone02.prototype.hitRun = function(){
	var self = this;
	self.callParent("hitRun",arguments);
	self.ctrlIndex++;
	if(self.ctrlIndex >= 40){
		self.parent.removeChild(this);
	}else if(self.ctrlIndex == 20){
		self.bitmap.bitmapData.setCoordinate(50,0);
	}
};
//阶梯2
function Stone03(){
	base(this,Stone,[]);
	this.hit = false;
	this.hy = 10;
}
Stone03.prototype.setView = function(){
	var self = this;
	self.bitmap = new LBitmap(new LBitmapData(imgList["floor2"]));
	self.addChild(self.bitmap);
};
Stone03.prototype.hitRun = function (){
	var self = this;
	self.callParent("hitRun",arguments);
	if(self.hit)return;
	self.hit = true;
};

//阶梯实例化
function stoneInit(){
	stoneLayer = new LSprite();
	backLayer.addChild(stoneLayer);
}
//添加阶梯
function addstone(){
	var astone;
	var index = Math.random() * 6;
	LGlobal.setDebug(true);
	
//	if(index <= 2 || index >= 4){
		astone = new Stone01();
		astone.x = LGlobal.width;
//		astone.y = 30*8 + 30*(8*Math.random() >>> 0);	
		astone.y = LGlobal.height - 70 - astone.height - 30*(Math.random()*2);
		stonenum = parseInt(astone.width/50);
//		Coin.add(astone);
		Star.add(astone);
//	}
//	else if(index < 3){
//		astone = new floor1();
//		astone.y = 340;
//	}
//	else if(index < 4){
//		astone = new floor2();
//		astone.y = 340;
//	}
	astone.x = LGlobal.width;
	stoneLayer.addChild(astone); 
}

