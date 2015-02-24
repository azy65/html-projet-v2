/***************************
***** Classe colonne ******
****************************/

var ElementGraphique = Class.create({
	initialize: function(largeur){
		this._largeur=largeur;
	},
  getLargeurPx: function(){
    return this._largeur+"px";
  }
})
addGSet(ElementGraphique,['largeur']);
