'use scrict';
/***************************
***** Classe planning ******
****************************/
var Planning=function(mode){
	var prive={
		 mode:mode,
		 tabColonne:[]
	}
	this.getPrivate=function(){
		return prive;
	};
}
//public
Planning.prototype.getMode=function getMode(){
	var p=this.getPrivate();
	return p.mode;
};

Planning.prototype.setMode=function(mode){
	var p=this.getPrivate();
	p.mode=mode;
}

Planning.prototype.ajoutColonne=function(col2){
	var p=this.getPrivate();
	p.tabColonne.push(col2);
}
Planning.prototype.getColonnes=function(){
	var p=this.getPrivate();
	return p.tabColonne;
}
