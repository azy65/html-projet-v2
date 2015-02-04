'use scrict';
/***************************
***** Classe planning ******
****************************/

var Planning = Class.create({
	//constructeur
	initialize:function (mode){
		//attribut protected
		this._mode=mode,
		this._colonnes=[],
		this._categories=[];
	},
	//funtion publiques
	ajoutColonne:function(col2){
		this._colonnes.push(col2);
	},
	supprimerColonne:function(col){
		this._colonnes.splice(this._colonnes.indexOf(col), 1);
	},

	ajouterCategories:function(couleur,categorieNom){
		var cat =new Categorie(couleur,categorieNom);
		this._categories.push(cat);
		return cat;
	},
	reinitialiser:function(){
		if(this._mode=="journalier")
			this._colonnes=[];
		else{	
			this._colonnes.forEach(function(colonne){
				colonne.reinitialiserEvenement();
			})					
		}
	}
})
addGSet(Planning,["mode"])
addGSet(Planning,["categories","colonnes"],"get")
addGSet(Planning,["categories","colonnes"],"set")