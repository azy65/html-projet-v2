"use strict";
/***************************
***** classe evenement ******
****************************/
var Evenement= Class.create({
	initialize:function(nom,periode,description,lieu){
			this._id=this._id || this.lastID++;
			this._nom=nom;
			this._periode=periode;
			this._description=description;
			this._lieu=lieu;
			this._tabEv=[];
	},
	getId : function(){
		return this._id;
	},
	setId : function(identifiant){
		this._id = identifiant;
	},
	getNom : function(){
		return this._nom;
	},
	setNom : function(titre){
		this._nom = titre;
	},
	getPeriode : function(){
		return this._periode;
	},
	setPeriode : function(per){
		this._periode = per;
	},
	getDescription : function(){
		return this._description;
	},
	setDescription : function(desc){
		this._description = desc;
	},
	getLieu : function(){
		return this._lieu;
	},
	setLieu : function(lieu){
		this._lieu = lieu;
	},
	hauteur : function(){
		var posHaut=-19;
		posHaut+=(this.getPeriode().getEnMinDebut()/60-8)*50;
		return ""+posHaut+"px";
	},
	posEnPx:function(){
		var t=this.getPeriode(this).getIntervalle()*0.82;
		return (t+"px")
	}
})
/*statique*/
Evenement.lastID= 0;
Evenement.setLastID = function(id){
	this.lastID=id;	
}
