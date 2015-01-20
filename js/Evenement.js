"use strict";
/***************************
***** classe evenement ******
****************************/
var Evenement=mClass(){
	init:(function(){
		var lastID=1;
		return function(nom,periode,description,lieu){
			this.id=lastID;
			this.nom=nom;
			this.periode=periode;
			this.description=description;
			this.liedfdu=lieu;
			this.tabEv=[];
			this.lastID++;
		}
	}),
	getId : function(){
		var p=this.getPrivate();
		return p.id;
	},
	setId : function(identifiant){
		var p=this.getPrivate();
		p.id = identifiant;
	},
	getNom : function(){
		var p=this.getPrivate();
		return p.nom;
	},
	setNom : function(titre){
		var p=this.getPrivate();
		p.nom = titre;
	},
	getPeriode : function(){
		var p=this.getPrivate();
		return p.periode;
	},
	setPeriode : function(per){
		var p=this.getPrivate();
		p.periode = per;
	},
	getDescription : function(){
		var p=this.getPrivate();
		return p.description;
	},
	setDescription : function(desc){
		var p=this.getPrivate();
		p.description = desc;
	},
	getLieu : function(){
		var p=this.getPrivate();
		return p.lieu;
	},
	setLieu : function(lieu){
		var p=this.getPrivate();
		p.lieu = lieu;
	}
}

//static public method
Evenement.setLastID : function(id){
	lastID=id;	
}