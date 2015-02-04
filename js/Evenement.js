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

	hauteur : function(){
		var posHaut=-19;
		posHaut+=(this._periode.getEnMinDebut()/60-8)*50;
		return ""+posHaut+"px";
	},
	posEnPx:function(){
		var t=this._periode.getIntervalle()*0.82;
		return (t+"px")
	},
	largeur : function() {
		
		return this._nbCol+"00%";
	}
})
/*statique*/
Evenement.lastID= 0;
Evenement.setLastID = function(id){
	Evenement.lastID=id;	
}
//getter setter
addGSet(Evenement,["id","periode",'nbCol']);
addGSet(Evenement,["visibility"],"get");

var EvenementClassique = Class.create(Evenement,{
	initialize:function($super,nom,description,periode,nbCol,categorie){
		$super(periode,nbCol,true);
		this._nom=nom;
		this._description=description;
		this._tabEvenementAutreCol = [];
		this._categorie=categorie;
	},
	
	ajoutEvenementSecondaire:function(evnmt){
		this._tabEvenementAutreCol.push(evnmt);
	},
	supprimerDernierEvenementSecondaire:function(){
		this._tabEvenementAutreCol.pop();
	}
})
addGSet(EvenementClassique,["nom","description",'tabEvenementAutreCol','categorie']);

var EvenementInvisible = Class.create(Evenement,{
	initialize: function($super,periode,nbCol){
		$super(periode,nbCol,false);
	}
})



