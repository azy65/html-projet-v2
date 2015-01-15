'use strict';

var planning = angular.module('planning', ['mod']);
var mod = angular.module('mod',[]);
mod.controller('planController', ['$scope',
    function ($scope) {
		$scope.t=function(){
			alert("ddddd");
		}
		var initHeureEvmt=function(hDeb,hFin,mDeb,mFin){
			$scope.form.hDeb=hDeb || 8;
			$scope.form.hFin=hFin || 9;
			$scope.form.mDeb=mDeb || 0;
			$scope.form.mFin=mFin || 0;
		}
		var planning=new Planning();
		$scope.planning=planning;
		$scope.form={titre:"salut",hDeb:8};
		$scope.test = function () {
			alert($scope.form.titre);
		}
		
		$scope.accueilVisible = "optionVisible";
		$scope.switchVisibiliteAccueil = function(){
			$scope.accueilVisible = ($scope.accueilVisible == "optionVisible") ? "optionInvisible" : "optionVisible";
		};
		
		$scope.editEvnt = false;
		$scope.afficherAjoutEvenement=function(ligneDeb){
			$scope.editEvnt=true;
			initHeureEvmt(ligneDeb+8,ligneDeb+9);
		}
		
		
		
		function justepourexemple(){
			var colonne= new Colonne("grenat");
			var colonne2= new Colonne("rubis");
			var periode=new Periode({heureDeb:8,heureFin:10})
			var periode2=new Periode({heureDeb:8,heureFin:10})
			colonne2.ajoutEvenement(periode2);
			colonne.ajoutEvenement(periode);
			colonne.ajoutEvenement(periode2);
			planning.ajoutColonne(colonne);
			planning.ajoutColonne(colonne2);
		}
		
		
		justepourexemple();
		//tableau vide c'est juste pour le ngrepeat qui doit faire 10 lignes
		$scope.ligne=new Array(10);
		$scope.message=function(){
			alert();			
		};
		
		
    }
	
	
]);