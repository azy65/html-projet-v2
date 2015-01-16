'use strict';

var planning = angular.module('planning', ['mod']);
var mod = angular.module('mod',[]);
mod.controller('planController', ['$scope',
    function ($scope) {
		var planning=$scope.planning=new Planning();
		//initialisation 
		var form=$scope.form={};
		$scope.test = function () {
			alert($scope.form.titre);
		}
		$scope.mode="null";
		$scope.editEvnt = false;
		$scope.accueilVisible = "optionVisible";
		var numeroColonneFocus;
$scope.t=function(){
			alert("ddddd");
		}
		$scope.ajoutEditEvmt=function(){
		
			var f=$scope.form;
			if ($scope.mode=="ajout"){
				var per= new Periode(
					{
						heureDeb:f.hDeb,
						minuteDeb : f.mDeb,
						heureFin : f.hFin,
						minuteFin: f.mFin	,				
					}
				);			
			}
			var col=planning.getColonnes()[numeroColonneFocus];
			var lieu=col.getTitre();
			var evnmt=new Evenement (form.titre,per,form.description,lieu);
			col.ajouterEvenement(evnmt);
			planning.getColonnes()[numeroColonneFocus];
			$scope.editEvnt=false;
		}
	
		var initHeureEvmt=function(hDeb,hFin,mDeb,mFin){
			$scope.form.hDeb=hDeb || 8;
			$scope.form.hFin=hFin || 9;
			$scope.form.mDeb=mDeb || 0;
			$scope.form.mFin=mFin || 0;
		}
		
		
		$scope.enPx=function(tache){
			var t=tache.getPeriode().getIntervalle()*0.75;
			return (t+"px");
		}
		$scope.posHaut=function(tache){
			var posHaut=-25/*(tache.getPeriode.getHeureDebut()*/
			posHaut+=(tache.getPeriode().getHeureDebut()-8)*50;
			return ""+posHaut+"px";
		}
		
		
		$scope.switchVisibiliteAccueil = function(){
			$scope.accueilVisible = ($scope.accueilVisible == "optionVisible") ? "optionInvisible" : "optionVisible";
			$scope.mode="ajout";
		};
		
		$scope.afficherAjouterEvenement=function(col,ligneDeb,mode){
			numeroColonneFocus=col
			if ($scope.mode=='ajout'){
				$scope.editEvnt=true;
				initHeureEvmt(ligneDeb+8,ligneDeb+9);
			}		
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
		//tableau vide c'est juste pour le ngrepeat qui doit faire 10 lignes
		$scope.ligne=[0,1,2,3,4,5,6,7,8,9];
		$scope.message=function(){
			alert();			
		};
		
		
    }
	
	
]);