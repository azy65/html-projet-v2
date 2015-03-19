"use strict";
/***************************
***** classe evenement ******
****************************/
var Evenement= Class.create({
	initialize:function(periode, visibility, nbCol){
			if (!this._id){
				this._id=Evenement.lastID;
				Evenement.lastID++;
			} 
			this._periode=periode;
			this._visibility = visibility;
	},
	//margin-top
	margeHaut : function(calc){
		var plan=this.getColonne().getPage().getPlanning()
		var nbCelluleAvant = (this._periode.getEnMinDebut() - plan.getHoraire().getEnMinDebut())/60 ;
		var res="("+plan.getHauteurCell() + " * " + nbCelluleAvant + " + " + plan.getHauteurLigne1() + "px)"
		if (calc){
			res="calc"+res;
		}
		return res;
	},
	//height
	hauteur:function(calc){
		var plan=this.getColonne().getPage().getPlanning();
		var nbcell = this.getPeriode().getIntervalle()/60
		var res = "("+plan.getHauteurCell() +" * " +nbcell+")"
		if (calc){
			res="calc"+res;
		}
		return res;
	},
	largeur : function() {
		return 0+"%";
	}
})

//getter setter
addGSet(Evenement,["id","periode",'colonne']);
addGSet(Evenement,["visibility"],"get");

var EvenementClassique = Class.create({
	extend: Evenement,
	initialize:function(nom,description,periode,categorie, nbCol){
		$super(periode,true);
		this._nom=nom;
		this._description=description;
		this._tabEvenementAutreCol = this._tabEvenementAutreCol || [];
		this._categorie=categorie;
		this._nbCol = nbCol;;
	},
	
	setNbEvenementSecondaire:function(nb){
		var colonnes = this.getColonne().getPage().getColonnes();
		var indiceMaCol = colonnes.indexOf(this.getColonne());
		var indMax = this._tabEvenementAutreCol.length ;
		//ajout si necessaire
		for( var i= 1 ; i < nb-indMax; i++){
		  var evnmt = new EvenementInvisible(this._periode);
		  evnmt.setEvenementClassique(this);
		  colonnes[indiceMaCol + i].ajouterEvenement(evnmt)
		}
		//suppression si necessaire
		while(nb  <= indMax ){
			indMax--;
			this._tabEvenementAutreCol[indMax].supprimer();
		}
	},

	largeur : function() {
		var largeur=0;
		for( var i=0; i < this._tabEvenementAutreCol.length; i++){
		  largeur += this._tabEvenementAutreCol[i].getColonne().getLargeur();
		}
		var maLarg = this.getColonne().getLargeur();
		return 100 * (maLarg + largeur)/maLarg + "%"
	}
})
addGSet(EvenementClassique,["nom","description",'tabEvenementAutreCol','categorie','colonne','nbCol']);

var EvenementInvisible = Class.create({
	extend: Evenement,
	initialize: function(periode){
		$super(periode,false);
	},  
  
	supprimer: function(){
        //supression dans colonne classique
        var tabTaches  =  this.getColonne().getTaches().suppElmt(this)     
        var tabTaches2 =  this.getEvenementClassique().getTabEvenementAutreCol().suppElmt(this);
	},
	setEvenementClassique: function(evenementClassique){
		this._evenementClassique = evenementClassique;
		this._evenementClassique.getTabEvenementAutreCol().push(this)
	}
  
})
addGSet(EvenementInvisible,["evenementClassique"],"get");




