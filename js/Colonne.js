/***************************
***** Classe colonne ******
****************************/

var Colonne = Class.create({
	initialize: function(titre,largeur){
		this._taches=[],
		this._titre=titre,
		this._largeur=150
	},
	ajouterEvenement:function(evmt){
		this._taches.push(evmt);
	},
	supprimerEvenement:function(evmt){
		this._taches.splice(this._taches.indexOf(evmt), 1);
	},
	reinitialiserEvenement:function(){
		this._taches=[];
	}
})

addGSet(Colonne,["taches","titre",'largeur']);
