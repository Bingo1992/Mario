function GameLogo(){
	base(this,LSprite,[]);
	var self = this;
	
	var logolist = [[1,1,1,1],[1,2,4,1],[1,4,2,1],[1,1,1,1]];
	var bitmap,logoLayer;
	
//	logoLayer = new LSprite();
//	logoLayer.graphics.drawRect(6,"#FF7F50",[0,0,LGlobal.width,LGlobal.height],true,"#66B3FF");
//	self.addChild(logoLayer);
	self.bitmapData = new LBitmapData(imgList["bg"]);
    self.bitmap09 = new LBitmap(self.bitmapData);
    self.bitmap09.x = 0;
    self.addChild(self.bitmap09);
    
	logoLayer = new LSprite();
	logoLayer.x = 50;
	logoLayer.y = 50;
	for(var i=0;i<logolist.length;i++){
		for(var j=0;j<logolist.length;j++){
			bitmap = new LBitmap(bitmapDataList[logolist[i][j]]);
			bitmap.x = j*STEP;
			bitmap.y = i*STEP;
			logoLayer.addChild(bitmap);
		}
	}
	bitmap = new LBitmap(new LBitmapData(imgList["player"],0,0,50,60));
	bitmap.x = 260;
	bitmap.y = 120;
	logoLayer.addChild(bitmap);
	self.addChild(logoLayer);
	
	labelText = new LTextField();
	labelText.rotate = -20;
	labelText.color = "#4B0082";
	labelText.font = "HG行書体";
	labelText.size = 80;
	labelText.x = 100;
	labelText.y = 50;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "超";
	self.addChild(labelText);
	
	labelText = new LTextField();
	labelText.color = "#4B0082";
	labelText.font = "HG行書体";
	labelText.size = 80;
	labelText.x = 250;
	labelText.y = 60;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "级";
	self.addChild(labelText);
	
	labelText = new LTextField();
	labelText.rotate = 20;
	labelText.color = "#4B0082";
	labelText.font = "HG行書体";
	labelText.size = 80;
	labelText.x = 400;
	labelText.y = 60;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "玛";
	self.addChild(labelText);
	
	labelText = new LTextField();
	labelText.rotate = 40;
	labelText.color = "#4B0082";
	labelText.font = "HG行書体";
	labelText.size = 80;
	labelText.x = 550;
	labelText.y = 60;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "丽";
	self.addChild(labelText);
	
	labelText = new LTextField();
	labelText.color = "#B22222";
	labelText.font = "HG行書体";
	labelText.size = 40;
	labelText.x = 180;
	labelText.y = 250;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "点击进入游戏 !!";
	labelText.speed = 2;
	labelText.wind();//逐字打印
	self.addChild(labelText);
};