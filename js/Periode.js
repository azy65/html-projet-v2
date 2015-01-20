"use strict";

/***************************
***** Classe periode ******
****************************/
//public
var Periode=mClass({
	init:function(P){
			this.heureDeb=this.heureDeb ||0;
			this.minuteDeb = this.minuteDeb ||0;
			this.heureFin = this.heureFin ||0;
			this.minuteFin= this.minuteFin ||0;
			this.jourDeb= this.jourDeb ||0;
			this.jourFin= this.jourFin ||0;
			this.moisDeb = this.moisDeb ||0;
			this.moisFin = this.moisFin ||0;
			this.anneeDeb = this.anneeDeb ||0;
			this.anneeFin = this.anneeFin ||0;
	},
	getIntervalle=function (){
		var i=(this.anneeFin-this.anneeDeb)*365*24*60+(this.moisFin-this.moisDeb)*30*24*60+(this.jourFin-this.jourDeb)*24*60+(this.heureFin-this.heureDeb)*60+(this.minuteFin-this.minuteDeb);
		return i;
	}
	getHeureDebut=function (){
		return this.heureDeb;
	}
	getJourDebut=function (){
		return this.jourDeb;
	}
	getMoisDebut=function (){
		return this.moisDeb;
	}
	getAnneeDebut=function (){
		return this.anneeDeb;
	}
	getJourDebut=function (){
		return this.jourDeb;
	}
})
