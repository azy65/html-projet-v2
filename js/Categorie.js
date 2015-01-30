var Categorie=Class.create({
	initialize:function(couleur,nom){
		this._nom=nom;
		this._couleur=couleur;
	}
})
addGSet(Categorie,["nom","couleur",'nbCol']);