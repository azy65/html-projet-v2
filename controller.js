﻿'use strict';
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
		var formCol=$scope.formCol = {};
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
				
				if (form.evCommun) {
					$scope.ajoutEvmtCommun(per);
				} else {
					form.col.ajouterEvenement(evnmt);
				}
				
		}
		
		$scope.ajoutEvmtCommun=function(per){
			planning.getColonnes().forEach(function(colonne) {
				var evnmt=new Evenement (form.titre,per,form.description,colonne.getTitre());
				colonne.ajouterEvenement(evnmt);
			});
		}
		
		$scope.modifEvmtCommun=function(per){
			
		}
		
		$scope.modifEvmt=function(){
				var per= new Periode(form);			
				var lieu=form.col.getTitre();
				form.evnmt.initialize(form.titre,per,form.description,lieu);
				var per= new Periode(form);
				if (form.evCommun) {
					planning.getColonnes().forEach(function(colonne) {
						form.evnmt.initialize(form.titre,per,form.description,lieu);
						var per= new Periode(form);
					});
				}
				
		}
		$scope.suppEvmt=function(){
			poubelle.push(form.evnmt);
			form.col.supprimerEvenement(form.evnmt);
		}
		/*******************************/
		/********Afficher formulaire*************/
		/*******************************/
		$scope.afficherAjouterEvenement=function(col,ligneDeb){
			viderInput();
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
		$scope.afficherModifColonne=function(colo){
			fenetreModifSupprColonne.afficher(true);
			formCol.col=colo;			
		}
		$scope.modifColonne=function(){
			formCol.col.setTitre(formCol.titre);
		}
		$scope.supprColonne=function(){
			poubelle.push(formCol.col);
			planning.supprimerColonne(formCol.col);
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
		
		function viderInput(){
			form.titre="";
			form.description="";
			form.evCommun = false;
		}
		
		(function glisserDeposer(){	
			var tacheQuiBouge,colonneDepart;
			$scope.glisser=function(tache,salDep){
				colonneDepart=salDep;
				tacheQuiBouge=tache;		
			}
			$scope.deposer=function(colonneFinal,lig){
				var per=tacheQuiBouge.getPeriode();
				per.decallerA({heure:lig});
				colonneFinal.ajouterEvenement(tacheQuiBouge);
				colonneDepart.supprimerEvenement(tacheQuiBouge);	
			}
		})()
    }	
	
]);

// directive de drag and drop attribut glisser et deposer dans la html

mod.directive('glisser', [function() {
	return{
		link:function(scope, element, attr){
			var el=element[0];
			el.addEventListener('dragstart', function(e){
				scope.$eval(attr.glisser);//appelle la fonction de l'attribut glisser avec ses parametres 
				scope.$apply();				
				try	{
					e.dataTransfer.setData('text/html', "firefox à besoisn de cette ligne inutile");
				}catch(e){
					e.dataTransfer.setData('text', "juste comme ça");
				}
			}, false);
		}
	}
}])

mod.directive('deposer', [function(){
	return {
		link:function(scope, element, attr){
			var el=element[0];
			el.addEventListener('drop', function(e){
				scope.$eval(attr.deposer); //appelle la fonction de l'attribut deposer avec ses parametres 
				e.preventDefault();
				scope.$apply()
			}, false);
			el.addEventListener('dragover', function(e) {
				e.preventDefault(); // Annule l'interdiction de "drop"
			}, false);
		}
	}	
}])