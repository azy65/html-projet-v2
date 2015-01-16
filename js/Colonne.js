"use strict";

/***************************
***** Classe colonne ******
****************************/
var Colonne=function(id,titre,largeur){
	
	var prive={
		lastId:id,
		tabEvmt:[],
		titre:titre,
		largeur:largeur
	}
	this.getPrivate=function(){
		return prive;
	};
}
//public
Colonne.prototype.ajouterEvenement=function(evmt){
		var p=this.getPrivate();
		p.tabEvmt.push(evmt);
		p.lastId++;
	}
Colonne.prototype.getTaches=function(){
	var p=this.getPrivate();
	return p.tabEvmt;
}
Colonne.prototype.setTaches=function(tabEvmt){
	var p=this.getPrivate();
	p.tabEvmt=tabEvmt;
}
Colonne.prototype.getId=function(){
	var p=this.getPrivate();
	return p.lastId;
}
Colonne.prototype.getTitre=function(){
	var p=this.getPrivate();
	return p.titre;
}
Colonne.prototype.setTitre=function(titre){
	var p=this.getPrivate();
	p.titre = titre;
}
Colonne.prototype.getLargeur=function(){
	var p=this.getPrivate();
	return p.largeur;
}
Colonne.prototype.setLargeur=function(largeur){
	var p=this.getPrivate();
	p.largeur = largeur;
}
Colonne.prototype.supprimerEvenement=function(evmt){
	var p=this.getPrivate();
	var id = evmt.getId();
	for(var i =0;i<p.tabEvmt.length;i++){
		if(id==p.tabEvmt[i].getId()){
			p.tabEvmt.splice(i, 1);
		}
	}
}