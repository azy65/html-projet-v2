"use strict";
/***************************
***** classe evenement ******
****************************/
var Evenement;
(function(){
	//static private attribute
	var lastID=0; 
	Evenement=function(nom,periode,description,lieu){
		lastID++;
		//private attribute
		var prive={
			 id:lastID,
			 nom:nom,
			 periode:periode,
			 description:description,
			 lieu:lieu,
			 tabEv:[] //facu
		}
		this.getPrivate=function(){
			return prive;
		};	
	};
	//static public method
	Evenement.setLastID=function(id){
		lastID=id;	
	}
	
	//methode public
	Evenement.prototype.getId=function(){
		var p=this.getPrivate();
		return p.id;
	}

	Evenement.prototype.setId=function(identifiant){
		var p=this.getPrivate();
		p.id = identifiant;
	}

	Evenement.prototype.getNom=function(){
		var p=this.getPrivate();
		return p.nom;
	}

	Evenement.prototype.setNom=function(titre){
		var p=this.getPrivate();
		p.nom = titre;
	}

	Evenement.prototype.getPeriode=function(){
		var p=this.getPrivate();
		return p.periode;
	}

	Evenement.prototype.setPeriode=function(per){
		var p=this.getPrivate();
		p.periode = per;
	}

	Evenement.prototype.getDescription=function(){
		var p=this.getPrivate();
		return p.description;
	}

	Evenement.prototype.setDescription=function(desc){
		var p=this.getPrivate();
		p.description = desc;
	}

	Evenement.prototype.getLieu=function(){
		var p=this.getPrivate();
		return p.lieu;
	}

	Evenement.prototype.setLieu=function(lieu){
		var p=this.getPrivate();
		p.lieu = lieu;
	}
})()