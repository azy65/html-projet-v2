'use scrict';
/***************************
***** Classe planning ******
****************************/

var Planning = Class.create({
	//constructeur
	initialize:function (mode){
		//attribut protected
		this._mode=mode,
		this._tabColonne=[]
	},
	//funtion publiques
	getMode:function getMode(){
		return this._mode;
	},
	setMode:function(mode){
		this._mode=mode;
	},
	ajoutColonne:function(col2){
		this._tabColonne.push(col2);
	},
	getColonnes:function(){
		return this._tabColonne;
	}
})

