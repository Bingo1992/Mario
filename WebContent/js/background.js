
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
		girl.isMove = true;
		girl.anime.setAction(0);
		self.bitmap01.x -= MOVE_STEP;
		self.bitmap02.x -= MOVE_STEP;
		self.bitmap03.x -= MOVE_STEP;
		//移动硬币
//		for(var i=0;i<coinlen;i++){
//			coin[i].x -= MOVE_STEP;
//		}
		//移动阶梯		
		for(key in stoneLayer.childList){
			var _child = stoneLayer.childList[key];
			if(_child.x < -_child.getWidth()){
				stoneLayer.removeChild(_child);				
			}
			_child._charaOld = _child.x;//上一次位置的横坐标
			_child.x -= MOVE_STEP;
	
			if(girl.x > _child.x+_child.width-10){
				girl.y = LGlobal.height-70-girl.height;
			}
		}
		for(key2 in starLayer.childList){
			var starChild = starLayer.childList[key2];
			if(starChild.x < -starChild.getWidth()){
				starLayer.removeChild(starChild);				
			}
			starChild.x -= MOVE_STEP;
		}
		if(self.bitmap02.x < -self.bitmap01.getWidth()){
			self.bitmap01.x = self.bitmap02.x;
			self.bitmap02.x = self.bitmap01.x+self.bitmap01.getWidth();
			self.bitmap03.x = self.bitmap01.x+self.bitmap01.getWidth()*2;
		}
		
	}else if(self.moveType == "left"){
		girl.isMove = true;
		girl.anime.setAction(1);
		self.bitmap01.x += MOVE_STEP;
		self.bitmap02.x += MOVE_STEP;
		self.bitmap03.x += MOVE_STEP;
//		for(var i=0;i<coinlen;i++){
//			coin[i].x += MOVE_STEP;
//		}
		for(key in stoneLayer.childList){
			var _child = stoneLayer.childList[key];
			_child._charaOld = _child.x;
			_child.x += MOVE_STEP;
			if(girl.x+girl.width < _child.x){
				girl.y = LGlobal.height-70-girl.height;
			}
		}
		for(key2 in starLayer.childList){
			var starChild = starLayer.childList[key2];
			if(starChild.x < -starChild.getWidth()){
				starLayer.removeChild(starChild);				
			}
			starChild.x += MOVE_STEP;
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

//添加分数
function addScore(){
	labelText = new LTextField();
	labelText.color = "#ffffff";
	labelText.font = "HG行書体";
	labelText.size = 14;
	labelText.x = 10;
	labelText.y = 20;
	labelText.text = "score:";
	backLayer.addChild(labelText);
	
	scores = new LTextField();
	scores.color = "#fff";
	scores.font = "HG行書体";
	scores.size = 14;
	scores.x = 120;
	scores.y = 20;
	if(scores.text == null){
		scores.text = "0";
	}else{
		scores.text = localStorage.getItem("distance");
	}
	backLayer.addChild(scores);
	
	labelText2 = new LTextField();
	labelText2.color = "#ffffff";
	labelText2.font = "HG行書体";
	labelText2.size = 14;
	labelText2.x = 200;
	labelText2.y = 20;
	labelText2.text = "time:";
	backLayer.addChild(labelText2);
	
	times = new LTextField();
	times.color = "#fff";
	times.font = "HG行書体";
	times.size = 14;
	times.x = 260;
	times.y = 20;
	backLayer.addChild(times);
	
	
}