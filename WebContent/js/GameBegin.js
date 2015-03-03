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
	bitmap = new LBitmap(new LBitmapData(imgList["mario"],0,0,56,56));
	bitmap.x = 260;
	bitmap.y = 120;
	logoLayer.addChild(bitmap);
	self.addChild(logoLayer);
	
	labelText = new LTextField();
	labelText.rotate = -20;
	labelText.color = "#FFD306";
	labelText.font = "HG行書体";
	labelText.size = 70;
	labelText.x = 20;
	labelText.y = 50;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "超";
	self.addChild(labelText);
	
	labelText = new LTextField();
	labelText.color = "#FFD306";
	labelText.font = "HG行書体";
	labelText.size = 70;
	labelText.x = 120;
	labelText.y = 60;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "级";
	self.addChild(labelText);
	
	labelText = new LTextField();
	labelText.rotate = 20;
	labelText.color = "#FFD306";
	labelText.font = "HG行書体";
	labelText.size = 70;
	labelText.x = 220;
	labelText.y = 60;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "玛";
	self.addChild(labelText);
	
	labelText = new LTextField();
	labelText.rotate = 35;
	labelText.color = "#FFD306";
	labelText.font = "HG行書体";
	labelText.size = 70;
	labelText.x = 320;
	labelText.y = 60;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "丽";
	self.addChild(labelText);
	
	labelText = new LTextField();
	labelText.color = "#B22222";
	labelText.font = "HG行書体";
	labelText.size = 30;
	labelText.x = 200;
	labelText.y = 250;
	labelText.stroke = true;
	labelText.lineWidth = 4;
	labelText.text = "点击进入游戏 !!";
	labelText.speed = 2;
	labelText.wind();//逐字打印
	self.addChild(labelText);
};