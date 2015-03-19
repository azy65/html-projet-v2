var newSubTab = function (Class){
	Class.prototype = Class.prototype || {};
	var f = [];
	f.__proto__ = Class.prototype;
	f.__proto__.__proto__=[]; 
	return f;
}

var TabSousClass = function(){
	var instance=newSubTab(f)
	//un exemple d'initialisation
	instance.push(8,9)
	instance[50]=0; //instance.length == 51 comme pour un tableau
	//fin exemple
	return instance;
}

//exemple de fonction rajouté que au instance de TabSousClass
TabSousClass.prototype.getTheFIrst=function(){
	return this[0];
}



