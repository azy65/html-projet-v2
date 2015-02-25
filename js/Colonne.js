/***************************
***** Classe colonne ******
****************************/

var Colonne = Class.create({
	initialize: function(titre,largeur){
		this._taches=[],
		this._titre=titre,
		this._largeur=16.66
	},
	ajouterEvenement:function(evmt){
		this._taches.push(evmt);
	},
	supprimerEvenement:function(evmt){
		this._taches.splice(this._taches.indexOf(evmt), 1);
	},
	reinitialiserEvenement:function(){
		this._taches=[];
	},
	setLargeurPx: function(largeurCol,largeurPlanning){
		var max=this.getPage().getPlanning().getLargeurMax();
		this._largeur = 100*largeurCol / largeurPlanning;
		if ( this._largeur > max ){
			this._largeur=max;
		}		
	},
	getLargeurPrcnt: function(largeur){
		return this._largeur + "%";
	},
	multLargeurPar:function(coef){
		this._largeur *= coef;
	}
})

addGSet(Colonne,["taches","titre", "page"]);
addGSet(Colonne,['largeur'],"get");

