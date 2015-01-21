'use strict';
var publicAccessToScope;
var planning = angular.module('planning', ['mod']);
var mod = angular.module('mod',[]);
mod.controller('planController', ['$scope',
    function ($scope){
		publicAccessToScope=$scope;
		var poubelle=[];
		//initialisation//
		var planning=$scope.planning=new Planning();
		var form=$scope.form={};//contient col derniere colonne cliqué, heureDeb, minuteDeb, heureFin, minuteFin
		$scope.mode="ajout";
		var fenetreEditEvnt=$scope.fenetreEditEvnt=new Fenetre(false);
		$scope.accueilVisible = new FenetreAvecTransition(true);
		$scope.formCol = {};
		var fenetreAjoutColonne = $scope.fenetreAjoutColonne = new Fenetre (false);
		var fenetreModifSupprColonne = $scope.fenetreModifSupprColonne = new Fenetre (false);
		//fin initialisation//
		
		/*******************************/
		/********formulaire*************/
		/*******************************/
		$scope.ajoutEditEvmt=function(){
			fenetreEditEvnt.afficher(false);
		}		
		$scope.ajoutEvmt=function(){
				var per= new Periode(form);			
				var lieu=form.col.getTitre();
				var evnmt=new Evenement (form.titre,per,form.description,lieu);
				form.col.ajouterEvenement(evnmt);
		}
		$scope.modifEvmt=function(){
				var per= new Periode(form);			
				var lieu=form.col.getTitre();
				form.evnmt.initialize(form.titre,per,form.description,lieu);
		}
		$scope.suppEvmt=function(){
			poubelle.push(form.evnmt);
			form.col.supprimerEvenement(form.evnmt);
		
		}
		/*******************************/
		/********Afficher formulaire*************/
		/*******************************/
		$scope.afficherAjouterEvenement=function(col,ligneDeb){
			$scope.mode="ajout";
			
			fenetreEditEvnt.afficher(true);
			initHeureEvmt(ligneDeb,ligneDeb+1);	
			form.col=col;
		}
		
		$scope.afficherModifierEvenement=function(evmt,col){
			$scope.mode="modif";

			var p=evmt.getPeriode();
			var hDeb=p.getHeureDebut();
			var hFin=p.getHeureFin();
			var mDeb=p.getMinuteDebut();
			var mFin=p.getMinuteFin();
			initHeureEvmt(hDeb,hFin,mDeb,mFin);
			form.titre=evmt.getLieu();
			form.description=evmt.getDescription();
			fenetreEditEvnt.afficher(true);	
			form.col=col;	
			form.evnmt	=	evmt;	
		}
		
		var initHeureEvmt=function(hDeb,hFin,mDeb,mFin){
			$scope.form.heureDeb=hDeb || 8;
			$scope.form.minuteDeb=mDeb || 0;
			$scope.form.heureFin=hFin || 9;
			$scope.form.minuteFin=mFin || 0;
		}
				
		
		
		//tableau vide c'est juste pour le ngrepeat qui doit faire 10 lignes
		$scope.ligne=[8,9,10,11,12,13,14,15,16,17];
		$scope.alert=function(){
			alert();			
		};	
		
		
		/*Colonne*/
		
		$scope.ajoutColonne = function() {
			var col = new Colonne ($scope.formCol.titre);
			planning.ajoutColonne (col);
			fenetreAjoutColonne.afficher(false);
		}
		$scope.modifColonne=function(){
			var col = new Colonne ($scope.formCol.titre);
			var lieu=form.col.getTitre();
			form.col.initialize(lieu);
		}


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