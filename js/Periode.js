"use strict";

/***************************
***** Classe periode ******
****************************/
//public
var Periode=function(P){
	var t=P.heureDeb;
	var prive ={
	//journalier : attribut
		heureDeb:t ||0,
		minuteDeb : P.minuteDeb ||0,
		heureFin : P.heureFin ||0,
		minuteFin: P.minuteFin ||0,
		jourDeb: P.jourDeb ||0,
		jourFin: P.jourFin ||0,
		moisDeb : P.moisDeb ||0,
		moisFin : P.moisFin ||0,
		anneeDeb : P.anneeDeb ||0,
		anneeFin : P.anneeFin ||0,
	}
	this.getPrivate=function(){
		return prive;
	};
}
//public

//journalier : méthode
Periode.prototype.getIntervalle=function (){
	var p=this.getPrivate();
	var i=(p.anneeFin-p.anneeDeb)*365*24*60+(p.moisFin-p.moisDeb)*30*24*60+(p.jourFin-p.jourDeb)*24*60+(p.heureFin-p.heureDeb)*60+(p.minuteFin-p.minuteDeb);
	return i;
}

Periode.prototype.getHeureDebut=function (){
	var p=this.getPrivate();
	return p.heureDeb;
}
	
	
	//semaine : méthode
	Periode.prototype.getJourDebut=function (){
		var p=this.getPrivate();
		return p.jourDeb;
	}

	Periode.prototype.getMoisDebut=function (){
		var p=this.getPrivate();
		return p.moisDeb;
	}
	
	Periode.prototype.getAnneeDebut=function (){
		var p=this.getPrivate();
		return p.anneeDeb;
	}