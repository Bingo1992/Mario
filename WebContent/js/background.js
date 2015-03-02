
//显示背景
function Background(){
	base(this,LSprite,[]);
	var self = this;
	self.moveType = null;
	//背景图片显示
	self.bitmapData = new LBitmapData(imgList["background"]);
    self.bitmap01 = new LBitmap(self.bitmapData);
    self.bitmap01.x = -self.bitmap01.getWidth();
	self.addChild(self.bitmap01);
	//循环背景
	self.bitmap02 = new LBitmap(self.bitmapData);
	self.addChild(self.bitmap02);
	self.bitmap03 = new LBitmap(self.bitmapData);
	self.bitmap03.x = self.bitmap01.getWidth();
	self.addChild(self.bitmap03);
	
}


Background.prototype.run = function(){
	var self = this;
	if(self.moveType == "right"){
		mario.isMove = true;
		mario.anime.setAction(0);
		self.bitmap01.x -= MOVE_STEP;
		self.bitmap02.x -= MOVE_STEP;
		self.bitmap03.x -= MOVE_STEP;
		times.text = score++;
		localStorage.setItem("distance",score);
		//移动阶梯
		for(key in ladderLayer.childList){
			var _child = ladderLayer.childList[key];
			_child.x -= MOVE_STEP;
			if(mario.x > _child.x+50){
				mario.y =  300;
			}
		}
		if(self.bitmap02.x < -self.bitmap01.getWidth()){
			self.bitmap01.x = self.bitmap02.x;
			self.bitmap02.x = self.bitmap01.x+self.bitmap01.getWidth();
			self.bitmap03.x = self.bitmap01.x+self.bitmap01.getWidth()*2;
		}
		
	}else if(self.moveType == "left"){
		mario.isMove = true;
		mario.anime.setAction(1);
		self.bitmap01.x += MOVE_STEP;
		self.bitmap02.x += MOVE_STEP;
		self.bitmap03.x += MOVE_STEP;
		times.text = score--;
		//离线存储当前数据
		localStorage.setItem("distance",score);
		for(key in ladderLayer.childList){
			var _child = ladderLayer.childList[key];
			_child.x += MOVE_STEP;
			if(mario.x+45 < _child.x){
				mario.y = 300;
			}
		}
		if(self.bitmap01.x > 0){
			self.bitmap01.x = -self.bitmap01.getWidth();
			self.bitmap02.x = self.bitmap01.x+self.bitmap01.getWidth();
			self.bitmap03.x = self.bitmap01.x+self.bitmap01.getWidth()*2;
		}
	}
};

/** 
*LEffect效果类 
*/  
function LEffect(){  
    var s = this;  
    base(s,LSprite,[]);  
    s.rainList = [];  
    s.snowList = [];  
    s.rainLayer = new LSprite();  
    s.addChild(s.rainLayer);  
    s.snowLayer = new LSprite();  
    s.addChild(s.snowLayer);  
}  
LEffect.prototype.raining = function(speed,size){  
    var s = this;  
    if(!speed)speed = 30;  
    if(!size)size = 5;  
    s.rainLayer.addEventListener(LEvent.ENTER_FRAME,function(){  
        s.onshow("rain",speed,size);  
    });  
};  
LEffect.prototype.snowing = function(speed,size){  
    var s = this;  
    if(!speed)speed = 10;  
    if(!size)size = 1;  
    s.snowLayer.addEventListener(LEvent.ENTER_FRAME,function(){  
        s.onshow("snow",speed,size);  
    });  
};  
LEffect.prototype.onshow = function(thing,speed,size){  
    var s = this;  
    if(thing == "rain"){  
        s.rainLayer.graphics.clear();  
        var rainX = Math.random()*(LStage.width-10-10)+10;  
        var n = s.rainList.length;  
        while(n--){  
            var o = s.rainList[n];  
            o.y += o.s;  
            s.rainLayer.graphics.drawRect(1,"white",[o.x,o.y,1,size],true,"#f3f3f3");  
        }  
        s.rainList.push({x:rainX,y:0,s:speed});  
    }else if(thing == "snow"){  
        s.snowLayer.graphics.clear();  
        var snowX = Math.random()*(LGlobal.width-10-10)+10;  
        var n = s.snowList.length;  
        while(n--){  
            var o = s.snowList[n];  
            o.y += o.s;  
            s.snowLayer.graphics.drawArc(2,"white",[o.x,o.y,size,0,2*Math.PI],true,"white");  
        }  
        s.snowList.push({x:snowX,y:0,s:speed});  
    }  
};  