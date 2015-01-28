"use strict";
/***************************
***** classe evenement ******
****************************/
var Evenement= Class.create({
	initialize:function(nom,periode,description,lieu){
			if (!this._id){
				this._id=Evenement.lastID;
				Evenement.lastID++;
			} 
			this._nom=nom;
			this._periode=periode;
			this._description=description;
			this._lieu=lieu;
			this._tabEv=[];
			this._nbCol;
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
	getNbCol : function(){
		return this._nbCol;
	},
	setNbCol : function(nbCol){
		this._nbCol = nbCol;
	},
	hauteur : function(){
		var posHaut=-19;
		posHaut+=(this.getPeriode().getEnMinDebut()/60-8)*50;
		return ""+posHaut+"px";
	},
	posEnPx:function(){
		var t=this.getPeriode(this).getIntervalle()*0.82;
		return (t+"px")
	},
	largeur : function() {
		return this.getNbCol()+"00%";
	}
})
/*statique*/
Evenement.lastID= 0;
Evenement.setLastID = function(id){
	Evenement.lastID=id;	
}
