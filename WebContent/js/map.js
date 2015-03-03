var mapData = [    
	               [18,18,18,18,18,18,18,18,18,18,18,18,55,55,18],    
	               [18,18,18,17,17,17,17,17,17,17,17,17,55,55,18],    
	               [18,18,17,17,17,17,18,18,17,17,17,17,55,55,18],    
	               [18,17,17,17,18,18,18,18,18,17,17,55,55,17,18],    
	               [18,17,17,18,22,23,23,23,24,18,17,55,55,17,18],    
	               [18,17,17,18,25,28,26,79,27,18,55,55,17,17,18],    
	               [18,17,17,17,17,10,11,12,18,18,55,55,17,17,18],    
	               [18,18,17,17,10,16,16,16,11,55,55,17,17,17,18],    
	               [18,18,17,17,77,16,16,16,16,21,21,17,17,17,18],    
	               [18,18,18,18,18,18,18,18,18,55,55,18,18,18,18]  
               ]; 

function LTileMap(data,img,width,height){  
    var self = this;  
    base(self,LSprite,[]);  
    self.x = 0;  
    self.y = 0;  
    self.mapData = data;  
    self.imgData = img;  
    if(!width){  
        var wbitmap = new LBitmapData(self.imgData);  
        self.partWidth = wbitmap.image.width;  
    }else{  
        self.partWidth = width;  
    }  
    if(!height){  
        var hbitmap = new LBitmapData(self.imgData);  
        self.partHeight = hbitmap.image.height;  
    }else{  
        self.partHeight = height;  
    }  
    self.onshow();  
} 

LTileMap.prototype.onshow = function(){  
    var self = this;  
    var mapdata = self.mapData;  
    var partWidth = self.partWidth;  
    var partHeight = self.partHeight;  
      
    var i,j;  
    var index,indexY,indexX;  
    var bitmapdata,bitmap;  
  
    for(i=0;i<mapdata.length;i++){  
        for(j=0;j<mapdata[0].length;j++){  
            index = mapdata[i][j];  
            indexY = Math.floor(index/mapdata.length);  
            indexX = index - indexY*mapdata.length;  
   
            bitmapdata = new LBitmapData(self.imgData,indexX*partWidth,indexY*partHeight,partWidth,partHeight);  
            bitmap = new LBitmap(bitmapdata);  
            bitmap.x = j*partWidth + self.x;    
            bitmap.y = i*partHeight + self.y;  
            self.addChild(bitmap);  
            }  
    }  
};

