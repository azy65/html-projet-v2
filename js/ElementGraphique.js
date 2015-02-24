/***************************
***** Classe colonne ******
****************************/

var ElementGraphique = Class.create({
	initialize: function(largeur){
		this._largeur=largeur;
	},
  getLargeur: function(){
    return this._largeur+"px";
  }
})
addGSet(ElementGraphique,['largeur'],"set");
