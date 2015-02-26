/***************************
***** Classe colonne ******
****************************/

var Colonne = Class.create({
	initialize: function(titre,largeur){
		this._taches=[],
		this._titre=titre,
		this._largeur=178
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
	getLargeurPx: function(){
		return this._largeur+"px";
	},
  setLargeur: function(l){
    var max=this.getPage().getPlanning().getLargeurMax();
    if ( l > max ){
      l=max
    }
    this._largeur=l;
	}  
})

addGSet(Colonne,["taches","titre", "page"]);
addGSet(Colonne,['largeur'],"get");

