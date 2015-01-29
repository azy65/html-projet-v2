'use scrict';
/***************************
***** Classe planning ******
****************************/

var Planning = Class.create({
	//constructeur
	initialize:function (mode){
		//attribut protected
		this._mode=mode,
		this._tabColonne=[],
		this.categories=[];
	},
	//funtion publiques
	getMode:function getMode(){
		return this._mode;
	},
	setMode:function(mode){
		this._mode=mode;
	},
	ajoutColonne:function(col2){
		this._tabColonne.push(col2);
	},
	getColonnes:function(){
		return this._tabColonne;
	},
	supprimerColonne:function(col){
		this._tabColonne.splice(this._tabColonne.indexOf(col), 1);
	},
	getCategories:function(){
		return this.categories;
	},
	ajouterCategories:function(couleur,categorieNom){
		var cat =new Categorie(couleur,categorieNom);
		this.categories.push(cat);
		return cat;
	}
	reinitialiser:function(){
		if(this._mode=="journalier")
			this._tabColonne=[];
		else{	
			this._tabColonne.forEach(function(colonne){
				colonne.reinitialiserEvenement();
			})					
		}
	}
})

