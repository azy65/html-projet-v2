/***************************
***** Classe colonne ******
****************************/

var ElementGraphique = Class.create({
	initialize: function(largeur){
		this._largeur=largeur;
	},
	setLargeurPx: function(largeur){
		largeur = 100*largeur / this.getPlanning().getLargeurMax();
	},
	getLargeurPrcnt: function(largeur){
		return this._largeur + "%";
	}
})
addGSet(ElementGraphique,['planning','largeur']);
