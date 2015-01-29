var Categorie=Class.create({
	initialize:function(couleur,nom){
		this._nom=nom;
		this._couleur=couleur;
	},
	setNom:function (nom){
		this._nom=nom;
	},
	setCouleur:function (couleur){
		this._couleur=couleur;
	},
	getNom:function (nom){
		return this._nom;
	},
	getCouleur:function (couleur){
		return this._couleur;
	}
})