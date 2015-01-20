var datatable = null;
var db = openDatabase('MyData','','My Database',102400);
function init(){
	datatable = hero.x;
}
function showAllData(){
	db.transaction(function(tx){
//		tx.executeSql('CREATE TABLE IF NOT EXISTS MsgData(name TEXT, message TEXT, time INTEGER)')
	})
}