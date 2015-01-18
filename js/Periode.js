"use strict";
/***************************
***** Classe periode ******
****************************/
//public
var Periode=Class.create({
	//protected
	initialize:function(P){
			this._heureDeb   = 	P.heureDeb ||0;
			this._minuteDeb  = 	P.minuteDeb ||0;
			this._heureFin   = 	P.heureFin ||0;
			this._minuteFin  = 	P.minuteFin ||0;
			this._jourDeb  	= 	P.jourDeb ||0;
			this._jourFin 	= 	P.jourFin ||0;
			this._moisDeb 	= 	P.moisDeb ||0;
			this._moisFin 	= 	P.moisFin ||0;
			this._anneeDeb 	= 	P.anneeDeb ||0;
			this._anneeFin	= 	P.anneeFin ||0;
	},
	//public
	getIntervalle:function (){
		var i=(this._anneeFin-this._anneeDeb)*365*24*60+(this._moisFin-this._moisDeb)*30*24*60+(this._jourFin-this._jourDeb)*24*60+(this._heureFin-this._heureDeb)*60+(this._minuteFin-this._minuteDeb);
		return i;
	},
	getEnMinDebut:function (){
		return this._heureDeb*60+this._minuteDeb;
	},
	getJourDebut : function (){
		return this._jourDeb;
	},
	getMoisDebut : function (){
		return this._moisDeb;
	},
	getAnneeDebut : function (){
		return this._anneeDeb;
	}
})