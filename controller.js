'use strict';


var publicAccessToScope;
angular.module('planning', ['mod']);
var mod = angular.module('mod',[]);
mod.controller('planController', ['$scope',
    function ($scope){
		publicAccessToScope=$scope;
		var poubelle=[];
		$scope.clicOnAimant=false;
		//initialisation//
		var planning;
		var form=$scope.form={};//contient col derniere colonne cliqué, heureDeb, minuteDeb, heureFin, minuteFin
		$scope.mode="ajout";
		form.categorie="";
		var fenetreEditEvnt=$scope.fenetreEditEvnt=new Fenetre(false);
		var accueilVisible = $scope.accueilVisible = new FenetreAvecTransition(true);
		var formCol=$scope.formCol = {};
		var fenetreAjoutColonne = $scope.fenetreAjoutColonne = new Fenetre (false);
		var fenetreModifHoraire = $scope.fenetreModifHoraire = new Fenetre (false);
		var fenCategorie = $scope.fenCategorie = new Fenetre (false);
		var horaire = $scope.horaire={debut:8,fin:17};
		var fenetreModifSupprColonne = $scope.fenetreModifSupprColonne = new Fenetre (false);
		var legendeCategorie = $scope.legendeCategorie = new Fenetre (false);
    $scope.largeurGrilleAvecHoraire=1090;
    
    /*
    $scope.getLargeurGrilleSansHoraire=function(){
       return $scope.largeurGrilleAvecHoraire - $scope.colonneHoraire.getLargeur()+"px";
    }*/
		var titreCat = $scope.titreCat={val:""};
		var couleurCat = $scope.couleurCat={val:""};
		var fenetreAjoutCategorie = $scope.fenetreAjoutCategorie = new Fenetre(false);
		//fin initialisation//

		
		/*******************************/
		/******** Initialisation *******/
		/*******************************/
		$scope.creerPlanning = function(mode) {
			accueilVisible.afficher(false);
			planning = $scope.planning = new Planning(mode);
		/*	planning.addPage();*/
			planning.addPage()
			if (planning.getMode() === 'hebdomadaire') {
				initialiserPlanningHebdo();
			}
			planning.ajouterCategories("red","sport");
			planning.ajouterCategories("orange","foot");
			planning.ajouterCategories("white","sieste");
			planning.ajouterCategories("green","ceuillete");
			planning.ajouterCategories("cyan","avion");
			planning.ajouterCategories("yellow","bronzette au soleil");
      planning.repartirColonnes();
		}
		
		function initialiserPlanningHebdo() {
			var joursSemaine = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
			
			for (var jour = 0, nbJours = joursSemaine.length; jour < nbJours; jour++) {
				planning.ajoutColonne(new Colonne(joursSemaine[jour]));
			}
		}
		
		/*******************************/
		/********formulaire*************/
		/*******************************/
		
		$scope.validationFormulaireEvenement= function(){
			if (isNaN(form.nbCol) || form.nbCol < 0) {
				return false;
			}
			
			if($scope.mode =="ajout") {
				$scope.ajoutEvmt();
			}
			
			if ($scope.mode == "modif") {
				$scope.modifEvmt()
			}
			fenetreEditEvnt.afficher(!fenetreEditEvnt.isAfficher());
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
				var evenementPrincipal = form.evnmt;
				var per= new Periode(form);	
				var tabEvenementSecondaire = evenements[indexEvenementPrinc].getTabEvenementAutreCol();
				
				var nbEvenementSecondaireAvantModif = evenements.length;
				var cpt = 0;
				tabEvenementSecondaire.forEach(function(evenementSecondaire) {
							tabEvenementSecondaire[cpt].setPeriode(per);
							cpt++;
				})
				
				evenementPrincipal.setTabEvenementAutreCol(tabEvenementSecondaire);
				
				if (form.nbCol != evenements[indexEvenementPrinc].getNbCol()) {
					if (form.nbCol > evenements[indexEvenementPrinc].getNbCol()) {
					
						var temp = [];
						for (var i = nbEvenementSecondaireAvantModif; i < form.nbCol-1; i++) {
							var evnmt = new EvenementInvisible (per, 1);
							evenementPrincipal.ajoutEvenementSecondaire(evnmt);
							temp.push(evenementPrincipal.getTabEvenementAutreCol().indexOf(evnmt));
						};
					
						var fg = temp[0];
						form.evnmt.setTabEvenementAutreCol(evenementPrincipal.getTabEvenementAutreCol());
						tabEvenementSecondaire = form.evnmt.getTabEvenementAutreCol();
						var nbEvenementSecondaireApresModif = form.nbCol-1;
						for (var j = indexColonne+nbEvenementSecondaireAvantModif+1; j < indexColonne+nbEvenementSecondaireApresModif+1; j++) {
							colonnes[j].ajouterEvenement(tabEvenementSecondaire[fg]);
							fg++;
						}
						evenements[indexEvenementPrinc].initialize(form.titre,form.description, per, form.nbCol,form.categorie);
						evenements[indexEvenementPrinc].setTabEvenementAutreCol(evenementPrincipal.getTabEvenementAutreCol());
						colonnes[indexColonne].setTaches(evenements);
					}
					
					if(form.nbCol < evenements[indexEvenementPrinc].getNbCol()) {
						
						var indexColASupp = indexColonne + evenements[indexEvenementPrinc].getNbCol() - 1;
						for (var i = form.nbCol; i < evenements[indexEvenementPrinc].getNbCol(); i++) { 
							evenementPrincipal.supprimerDernierEvenementSecondaire();
							colonnes[indexColASupp].getTaches().pop();
							indexColASupp--;
						}
					}
				} 
			
				evenements[indexEvenementPrinc].initialize(form.titre,form.description, per, form.nbCol,form.categorie);
		}
		
		$scope.suppEvmt=function(){
			poubelle.push(form.evnmt);
			form.col.supprimerEvenement(form.evnmt);
			
			if (form.evnmt.getNbCol() > 1 ){
				$scope.suppEvenementCommun();
			}
		}
		
		$scope.suppEvenementCommun=function(page) {
			var tabEvenementSecondaire = form.evnmt.getTabEvenementAutreCol();
			var tabColonne = page.getColonnes();
			var indexColEvenementPrincipal = tabColonne.indexOf(form.col);
			var cpt = 1;
			tabEvenementSecondaire.forEach (function(evenementSecondaire) {
				tabColonne[indexColEvenementPrincipal+cpt].supprimerEvenement(evenementSecondaire);
				cpt++;
			})
		}
		
		$scope.reinitialiser=function(){
			if(confirm('Vous êtes sur le point de réinitialiser votre planning.\n\n'
					+ 'Attention, cette action est irréversible !') && planning.getColonnes().length>0){
				planning.reinitialiser();
			}
		}
		
		/*Categorie/Couleur */
		$scope.focusCouleur=function(categorie){
			form.categorie = categorie;
			$scope.titreCat.val = form.categorie.getNom();
		} 
		
		$scope.modifierCategorie=function(){
			
			var nom = form.categorie.getNom();
			var couleur = form.categorie.getCouleur();

			if(nom != titreCat.val) {
				if(planning.estCategorieExistante(new Categorie(couleur,titreCat.val)) != null) {
					titreCat.val = nom;
					alert("Catégorie déjà existante");
				} else {
					var listeCategories = planning.getCategories();
					var res = new Categorie();
					var indice;
					listeCategories.forEach (function(cat) {
						if (cat.getNom() == nom && cat.getCouleur() == couleur) {
							indice = listeCategories.indexOf(cat);
							res.setNom(titreCat.val);
							res.setCouleur(couleur);
							listeCategories[indice] = res;
						}
					})	
					planning.setCategories(listeCategories);
					form.categorie = res;
				}
			}
		}
		
		$scope.supprimerCategorie=function(){
			var nom = form.categorie.getNom();
			var couleur = form.categorie.getCouleur();
			var catSup = planning.estCategorieExistante(new Categorie(couleur,nom));
			if (catSup != null) {
				planning.supprimerCategorie(catSup);
			}
			form.categorie = '';
			titreCat.val = '';
		}
		
		$scope.ajoutCategorie=function() {
			if(planning.estCategorieExistante(new Categorie(couleurCat.val,titreCat.val)) != null) {
				alert("Catégorie déjà existante");
			} else {
				planning.ajouterCategories(couleurCat.val,titreCat.val);
				fenetreAjoutCategorie.afficher(false);
				titreCat.val ="";
				form.categorie="";
				fenCategorie.afficher(true);
			}
		}
		
		$scope.afficherAjouterCategorie=function() {
			fenCategorie.afficher(false);
			titreCat.val ="";
			couleurCat.val = "#000000";
			fenetreAjoutCategorie.afficher(true);
		}
		
		$scope.afficherModifierCategorie=function() {
			fenCategorie.afficher(true);
			titreCat.val ="";
			couleurCat.val = planning.getCategories()[0].getCouleur();
		}
		
		$scope.retourModifierCategorie = function() {
			fenetreAjoutCategorie.afficher(false);
			fenCategorie.afficher(true); 
			form.categorie = '';
		}
		
		/*******************************/
		/********Afficher formulaire*************/
		/*******************************/
		$scope.afficherAjouterEvenement=function(col,ligneDeb){
			viderInput();
			$scope.mode="ajout";
			form.nbCol = 1;
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
    
		
    $scope.colonneRedim=function(col){
      var largeurGauche=$scope.accessToResizableElmt.offsetWidth;
      var largeur = largeurGauche+$scope.colonneHoraire.getLargeur();
      var largeurFutureCol=( largeur>planning.getLargeurMax() ) ? planning.getLargeurMax() : largeurGauche;
      /*debut suppression de bug*/
    	col.setLargeur(largeurFutureCol+1); 
      $scope.$apply();
      /*fin suppression de bug*/
      col.setLargeur(largeurFutureCol);
      planning.repartirColonnes();
     
		}
    
    $scope.colonneHoraire=new ElementGraphique(195);
    $scope.colonneRedimHoraire=function(){
				$scope.colonneRedim($scope.colonneHoraire);
		}
		
		//tableau vide c'est juste pour le ngrepeat qui doit faire 10 lignes
		$scope.ligne=[8,9,10,11,12,13,14,15,16];
		$scope.alert=function(width){
			alert(width );				
		};	
		
		
		/*Colonne*/
		
		$scope.afficherModifierColonne = function() {
			formCol.titre = "";
			fenetreAjoutColonne.afficher(true);

		}
		
		$scope.ajoutColonne = function() {
			var col = new Colonne ($scope.formCol.titre);
			planning.ajoutColonne (col);
			fenetreAjoutColonne.afficher(false);
      planning.repartirColonnes();
		}
		$scope.afficherModifColonne=function(colo){
			formCol.titre = colo.getTitre();
			fenetreModifSupprColonne.afficher(true);
			formCol.col=colo;			
		}
		$scope.modifColonne=function(){
			formCol.col.setTitre(formCol.titre);
		}
		$scope.supprColonne=function(page){
			poubelle.push(formCol.col);
			poubelle.push(formCol.col);
			page.supprimerColonne(formCol.col);
		}
		
		$scope.calculerLargeur=function(page,evenement, colonne) {
			var tabColonnes = page.getColonnes();
			var result = colonne.getLargeur();
			if(evenement.getNbCol() > 1) {
				var nbCol = evenement.getNbCol();
				var tabEvenementSecondaire = evenement.getTabEvenementAutreCol();
				var cpt = 1;
				var indexCol = tabColonnes.indexOf(colonne);
				for(var i = indexCol+1; i < indexCol+nbCol; i++) {
					result += tabColonnes[i].getLargeur();
				}
			}
			return result+"px";
		}
		$scope.activerAiment=function(){
			$scope.clicOnAimant=true;
		}
		
		/*
			$scope.retourChariot=function($index){
			var col= jQuery(".bigCol > div ").not(document.getElementsByClassName("pasMoi"))
				if ($index == 0) {
					return true;
				}				
				var RC= col[$index-1].offsetTop !=  col[$index].offsetTop ;
			
        // si on clique sur recalculer affichage alors agrandir la colonne de 
        // droite pour occuper tout l'affichage 
        if ($scope.clicOnAimant && RC){
            var distDroite = $scope.largeurGrilleAvecHoraire - col[$index-1].offsetLeft-col[$index-1].offsetWidth;			
            if ( distDroite > 0){
              var widthDeb=col[$index-1].offsetWidth;
              col[$index-1].style.width=widthDeb+distDroite+"px";
            }
        }
			return RC;
		}*/

		
		/* Horaire */
		
		$scope.modifHeure = function() {
			$scope.ligne = [];
			for (var h = horaire.debut; h < horaire.fin; h++) {
				$scope.ligne.push(h);
			}
			fenetreModifHoraire.afficher(false);
		}
		
		function viderInput(){
			form.titre="";
			form.description="";
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
 
    
}]);

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

mod.directive('resizable', function () {
    return {
        link: function (scope, elem, attr) {
            elem.resizable();
            elem.on('resizestop', function (evt, ui) {	
				//on rajoute l'accès à l'element
				publicAccessToScope['accessToResizableElmt']=elem[0];
				publicAccessToScope.clicOnAimant=false;
                scope.$eval(attr.onresize)
				scope.$apply();
            });
        }
    };
});


mod.directive('showFocus', function($timeout) {
  return function(scope, element, attrs) {
    scope.$watch(attrs.showFocus, 
      function (newValue) { 
        $timeout(function() {
            newValue && element.focus();
        });
      },true);
  };    
});




