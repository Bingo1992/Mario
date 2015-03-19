function GameOver(){
	//消除事件
	backLayer.die();
	var gameOverLayer = new LSprite();
	backLayer.addChild(gameOverLayer);
	var bitmap = new LBitmap(new LBitmapData(imgList["over_bg"]));
	gameOverLayer.addChild(bitmap);
	//将游戏层移出屏幕
	gameOverLayer.y = -1* gameOverLayer.getHeight();
	//通过缓动将游戏层移到屏幕
	LTweenLite.to(gameOverLayer,1.0,{
		y:0,
		ease:Quad.easeOut,
		onComplete:function(){
			backLayer.addEventListener(LMouseEvent.MOUSE_DOWN,reStart);
		}
	});
}
function restart(){
	backLayer.die();
	backLayer.removeAllChild();
	gameStart();
}