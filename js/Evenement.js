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
	//margin-top
	hauteurEnPrcnt : function(){
		var plan=this.getColonne().getPage().getPlanning()
		var nbCelluleAvant = (this._periode.getEnMinDebut() - plan.getHoraire().getEnMinDebut())/60 + 1;
		return 100 * (nbCelluleAvant / plan.getNbCelluleHauteur() );
	},
	//height
	posEnPx:function(){
		var plan=this.getColonne().getPage().getPlanning()
		return ( 100/60 * this.getPeriode().getIntervalle()/ plan.getNbCelluleHauteur()+"%")
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
addGSet(Evenement,["id","periode",'nbCol','colonne']);
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
addGSet(EvenementClassique,["nom","description",'tabEvenementAutreCol','categorie','colonne']);

var EvenementInvisible = Class.create(Evenement,{
	initialize: function($super,periode,nbCol){
		$super(periode,nbCol,false);
	}
})



