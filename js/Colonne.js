"use strict";
/***************************
***** Classe colonne ******
****************************/
var Colonne=mClass(){
	init : function(id,titre,largeur){
		//attributs protected
		this.lastId=id,
		this.tabEvmt=[],
		this.titre=titre,
		this.largeur=largeur
	},
	//fonction publiques
	ajouterEvenement : function(evmt){
		this.tabEvmt.push(evmt);
		this.lastId++;
	},
	getTaches:function(){
		return this.tabEvmt;
	},
	setTaches:function(tabEvmt){
		this.tabEvmt=tabEvmt;
	},getId:function(){
		return this.lastId;
	},
	getTitre:function(){
		return this.titre;
	},
	setTitre:function(titre){
		this.titre = titre;
	},
	getLargeur:function(){
		return this.largeur;
	},
	setLargeur:function(largeur){
		this.largeur = largeur;
	},
	supprimerEvenement:function(evmt){
		var id = evmt.getId();
		for(var i =0;i<this.tabEvmt.length;i++){
			if(id==this.tabEvmt[i].getId()){
				this.tabEvmt.splice(i, 1);
			}
		}
	}
}