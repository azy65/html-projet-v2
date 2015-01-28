"use strict";

/***************************
***** Classe colonne ******
****************************/

var Colonne = Class.create({
	initialize: function(titre,largeur){
		this._tabEvmt=[],
		this._titre=titre,
		this._largeur=largeur
	},
	ajouterEvenement:function(evmt){
		this._tabEvmt.push(evmt);
	},
	getTaches:function(){
		return this._tabEvmt;
	}
	,setTaches:function(tabEvmt){
		this._tabEvmt=tabEvmt;
	},
	getTitre:function(){
		return this._titre;
	},
	setTitre:function(titre){
		this._titre = titre;
	},
	getLargeur:function(){
		return this._largeur;
	},
	setLargeur:function(largeur){
		this._largeur = largeur;
	},
	supprimerEvenement:function(evmt){
		/*var id = evmt.getId();
		for(var i =0;i<this._tabEvmt.length;i++){
			if(id==this._tabEvmt[i].getId()){
				this._tabEvmt.splice(i, 1);
			}
		}*/
		this._tabEvmt.splice(this._tabEvmt.indexOf(evmt), 1);
	},
	reinitialiserEvenement:function(){
		this._tabEvmt=[];
	}
})