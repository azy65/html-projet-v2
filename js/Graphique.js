
var Fenetre=Class.create({
	initialize:function(montrer){
		this._visible=montrer;
	},
	afficher:function (montrer){
		this._visible=montrer;
	},
	isAfficher:function (){
		return this._visible;
	}
})


var FenetreAvecTransition=Class.create({
	extend: Fenetre,
	getClasse:function(){
		return (this._visible) ? "optionVisible" : "optionInvisible";
	}
})

