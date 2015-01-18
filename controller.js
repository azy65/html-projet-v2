'use strict';
var publicAccessToScope;
var planning = angular.module('planning', ['mod']);
var mod = angular.module('mod',[]);
mod.controller('planController', ['$scope',
    function ($scope){
		publicAccessToScope=$scope;
		
		//initialisation//
		var planning=$scope.planning=new Planning();
		var form=$scope.form={};//contient col derniere colonne cliqué, heureDeb, minuteDeb, heureFin, minuteFin
		$scope.mode="ajout";
		var fenetreEditEvnt=$scope.fenetreEditEvnt=new Fenetre(false);
		$scope.accueilVisible = new FenetreAvecTransition(true);
		//fin initialisation//
		
		$scope.ajoutEditEvmt=function(){
			var per= new Periode(form);			
			var lieu=form.col.getTitre();
			var evnmt=new Evenement (form.titre,per,form.description,lieu);
			form.col.ajouterEvenement(evnmt);
			fenetreEditEvnt.afficher(false);
		}		
	
		$scope.afficherAjouterEvenement=function(col,ligneDeb,mode){
			if ($scope.mode=='ajout'){
				fenetreEditEvnt.afficher(true);
				initHeureEvmt(ligneDeb,ligneDeb+1);
			}		
			form.col=col;
		}
		
		var initHeureEvmt=function(hDeb,hFin,mDeb,mFin){
			$scope.form.heureDeb=hDeb || 8;
			$scope.form.minuteDeb=mDeb || 0;
			$scope.form.heureFin=hFin || 9;
			$scope.form.minuteFin=mFin || 0;
		}
				
		
		
		//tableau vide c'est juste pour le ngrepeat qui doit faire 10 lignes
		$scope.ligne=[8,9,10,11,12,13,14,15,16,17];
		$scope.message=function(){
			alert();			
		};	


		function justepourexemple(){
			var colonne= new Colonne("rubis","rubis");
			var colonne2= new Colonne("rubis","rubis2");
			var periode=new Periode({heureDeb:9,heureFin:11})
			var periode2=new Periode({heureDeb:15,heureFin:17})
			var evmt=new Evenement("presentation",periode2,"presentation plus en détail des méthodes agiles par Marc *Toutenkarthon","toulouse");
			var evmt2=new Evenement("presentation2",periode,"presentation plus en détail des méthodes agiles par Marc *Toutenpapier sfsfsfsfsfs","toulouse");
			colonne2.ajouterEvenement(evmt);
			colonne.ajouterEvenement(evmt2);
			planning.ajoutColonne(colonne);
			planning.ajoutColonne(colonne2);
		}
		justepourexemple();		
    }	
]);