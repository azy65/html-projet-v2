"use strict";
/***************************
***** classe evenement ******
****************************/
var Evenement= Class.create({
	initialize:function(periode,nbCol, visibility){
			if (!this._id){
				this._id=Evenement.lastID;
				Evenement.lastID++;
			} 
			this._periode=periode;
			this._nbCol=nbCol;
			this._visibility = visibility;
	},
	getId : function(){
		return this._id;
	},
	setId : function(identifiant){
		this._id = identifiant;
	},
	getPeriode : function(){
		return this._periode;
	},
	setPeriode : function(per){
		this._periode = per;
	},
	getNbCol : function(){
		return this._nbCol;
	},
	setNbCol : function(nbCol){
		this._nbCol = nbCol;
	},
	getVisibility : function(){
		return this._visibility;
	},
	setVisibility : function(visibility){
		this._visibility = visibility;
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

var EvenementClassique = Class.create(Evenement,{
	initialize:function($super,nom,description,periode,nbCol,categorie){
		$super(periode,nbCol,true);
		this._nom=nom;
		this._description=description;
		this._tabEv=[];
		this._tabEvenementAutreCol = [];
		this._categorie=categorie;
	},
	getNom : function(){
		return this._nom;
	},
	setNom : function(titre){
		this._nom = titre;
	},
	getDescription : function(){
		return this._description;
	},
	setDescription : function(desc){
		this._description = desc;
	},
	getCategorie : function(){
		return this._categorie;
	},
	getTabEvenementAutreCol:function(){
		return this._tabEvenementAutreCol;
	}
	,setTabEvenementAutreCol:function(tabEvenementAutreCol){
		this._tabEvenementAutreCol=tabEvenementAutreCol;
	},
	ajoutEvenementSecondaire:function(evnmt){
		this._tabEvenementAutreCol.push(evnmt);
	}
})

var EvenementInvisible = Class.create(Evenement,{
	initialize:function($super,periode,nbCol){
		$super(periode,nbCol,false);
	}
})


/*statique*/
Evenement.lastID= 0;
Evenement.setLastID = function(id){
	Evenement.lastID=id;	
}
