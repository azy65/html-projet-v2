'use strict';
var publicAccessToScope;
angular.module('planning', ['mod']);
var mod = angular.module('mod',[]);
mod.controller('planController', ['$scope',
    function ($scope){
		publicAccessToScope=$scope;
		
		var poubelle=[];
		//initialisation//
		$scope.fenCategorie=new Fenetre(false);
		var planning;
		var form=$scope.form={};//contient col derniere colonne cliqué, heureDeb, minuteDeb, heureFin, minuteFin
		$scope.mode="ajout";
		form.categorie="";
		var fenetreEditEvnt=$scope.fenetreEditEvnt=new Fenetre(false);
		var accueilVisible = $scope.accueilVisible = new FenetreAvecTransition(true);
		var formCol=$scope.formCol = {};
		var fenetreAjoutColonne = $scope.fenetreAjoutColonne = new Fenetre (false);
		var fenetreModifHoraire = $scope.fenetreModifHoraire = new Fenetre (false);
		var horaire = $scope.horaire={debut:8,fin:17};
		var fenetreModifSupprColonne = $scope.fenetreModifSupprColonne = new Fenetre (false);
		//fin initialisation//
		
		/*******************************/
		/******** Initialisation *******/
		/*******************************/
		$scope.creerPlanning = function(mode) {
			accueilVisible.afficher(false);
			planning = $scope.planning = new Planning(mode);
			switch (planning.getMode()) {
				case 'journalier'  : initialiserPlanningJournalier(); break;
				case 'hebdomadaire': initialiserPlanningHebdo(); break;
			}
			planning.ajouterCategories("red","sport");
			planning.ajouterCategories("orange","foot");
			planning.ajouterCategories("white","sieste");
			planning.ajouterCategories("green","ceuillete");
			planning.ajouterCategories("cyan","avion");
			planning.ajouterCategories("yellow","bronzette au soleil");
		}
		
		function initialiserPlanningJournalier() {
			// var colonne1 = new Colonne('Rubis');
			// var colonne2 = new Colonne('Grenat');
			// var periode1 = new Periode({heureDeb:9, heureFin:11})
			// var periode2 = new Periode({heureDeb:15, heureFin:17})
			// var evmt1 = new Evenement("presentation 1", periode1, "Méthodes agiles par Marc Toutencarton", "toulouse");
			// var evmt2 = new Evenement("presentation 2", periode2, "Méthodes agiles par Marc Toutenpapier", "toulouse");
			// colonne1.ajouterEvenement(evmt1);
			// colonne2.ajouterEvenement(evmt2);
			// planning.ajoutColonne(colonne1);
			// planning.ajoutColonne(colonne2);
		}
		
		function initialiserPlanningHebdo() {
			var joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
			
			for (var i = 0; i < 7; i++) {
				planning.ajoutColonne(new Colonne(joursSemaine[i]));
			}
		}
		
		/*******************************/
		/********formulaire*************/
		/*******************************/
		$scope.ajoutEditEvmt=function(){
			fenetreEditEvnt.afficher(false);
		}		
		$scope.ajoutEvmt=function(){
				var colonne = form.col;
				var per= new Periode(form);			
				var evnmt=new EvenementClassique (form.titre,form.description,per,form.nbCol,form.categorie);
				colonne.ajouterEvenement(evnmt);
				var indexEvenementPrin = form.col.getTaches().indexOf(evnmt);
				if (form.nbCol > 1) {
					$scope.ajoutEvmtCommun(per, indexEvenementPrin);
				} 					
		}
		
		$scope.focusCouleur=function(categorie){
			form.categorie = categorie;
		} 
		
		$scope.ajoutEvmtCommun=function(per, indexEvenementPrin){
			var tabColonne = planning.getColonnes();
			var i = tabColonne.indexOf(form.col) + 1;
			var j = i+form.nbCol - 1;
			var ind = tabColonne.indexOf(form.col);
			var tabEvenements = form.col.getTaches();
			var evenementPrincipal = tabEvenements[indexEvenementPrin];
			for (i; i < j; i++) { 
				var evnmt=new EvenementInvisible (per, 1);
				tabColonne [i].ajouterEvenement(evnmt);
				evenementPrincipal.ajoutEvenementSecondaire(evnmt);
			};
			
		}
		
		
		$scope.modifEvmt=function(){
				var colonnes = planning.getColonnes();
				var indexColonne = colonnes.indexOf(form.col);
				var evenements = colonnes[indexColonne].getTaches();
				var indexEvenementPrinc = evenements.indexOf(form.evnmt);
				var per= new Periode(form);	
				var tabEvenementSecondaire = evenements[indexEvenementPrinc].getTabEvenementAutreCol();
				if (form.nbCol != evenements[indexEvenementPrinc].getNbCol()) {
					if (form.nbCol > evenements[indexEvenementPrinc].getNbCol()) {
						//Modifier Evenements Secondaires Existant - Modifier Evenement Colonne Existant - Ajouter Nouveaux Evenements Secondaires et Colonnes
					}
						/*Ajout Nouveaux Evenements Secondaires
						//Ajout dans colonnes*/
				}
			
				evenements[indexEvenementPrinc].initialize(form.titre,form.description, per, form.nbCol,form.categorie);
	
				
				/*tabEvenementSecondaire.forEach(function(even) {
					even.initialize(form.titre,per,form.description,form.col.getTitre());
					even.setVisibility(false);
				});	*/
		}
		
		$scope.suppEvmt=function(){
			poubelle.push(form.evnmt);
			form.col.supprimerEvenement(form.evnmt);
		}
		
		$scope.reinitialiser=function(){
			if(planning.getColonnes().length>0){
				planning.reinitialiser();
			}
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
			form.categorie = evmt.getCategorie();
			var p=evmt.getPeriode();
			var hDeb=p.getHeureDebut();
			var hFin=p.getHeureFin();
			var mDeb=p.getMinuteDebut();
			var mFin=p.getMinuteFin();
			initHeureEvmt(hDeb,hFin,mDeb,mFin);
			form.titre=evmt.getNom();
			form.description=evmt.getDescription();
			fenetreEditEvnt.afficher(true);	
			form.col=col;	
			form.evnmt=evmt;
			form.categorie = evmt.getCategorie();
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

		/*Horaire*/
		
		$scope.modifHeure=function(){
			$scope.ligne=[];
		
			while(horaire.debut<horaire.fin){
				$scope.ligne.push(horaire.debut);
				horaire.debut++;
			}	
			fenetreModifHoraire.afficher(false);
		}
		
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