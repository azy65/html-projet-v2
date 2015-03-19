'use strict';

var publicAccessToScope;
angular.module('planning', ['mod']);
var mod = angular.module('mod',[]);
mod.controller('planController', ['$scope',
    function ($scope){
		publicAccessToScope=$scope;
		var poubelle=[];
		$scope.formPage = {nbParPage : 1};
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
		var fenetreModifSupprColonne = $scope.fenetreModifSupprColonne = new Fenetre (false);
		var legendeCategorie = $scope.legendeCategorie = new Fenetre (false);
		$scope.largeurGrilleAvecHoraire=1090;
		$scope.ligne=[8,9,10,11,12,13,14,15,16];
		$scope.horaire = {heureDeb:8, heureFin:17, minDeb:0,minFin:0};
		$scope.cellStyle ={}
	

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
			//ne pas effacer le planning si le mode est le même
			if (planning && planning.getMode() == mode){
				return ;
			}
			planning = $scope.planning = new Planning(mode)	;
			planning.addPage();
			$scope.cellStyle={};
			$scope.getHauteurCell=function(){
				$scope.cellStyle.height="calc("+planning.getHauteurCell()+")";
				return $scope.cellStyle.height;
			}
			
			if (planning.getMode() === 'hebdomadaire') {
				initialiserPlanningHebdo();
			}
			planning.setHoraire(new Periode($scope.horaire));
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
		
		//*******************************/
		/********formulaire*************/
		/*******************************/
		
		$scope.validationFormulaireEvenement= function(){
			var res = true;
			if (isNaN(form.nbCol) || form.nbCol < 0 || isNaN(form.heureDeb) || isNaN(form.minuteDeb) || isNaN(form.heureFin) || isNaN(form.minuteFin)) {
				return false;
			}
			
			if($scope.mode =="ajout") {
				res = $scope.ajoutEvmt();
			}
			
			if ($scope.mode == "modif") {
				res = $scope.modifEvmt()
			}
			
			if(res != false) {
				fenetreEditEvnt.afficher(!fenetreEditEvnt.isAfficher());
			}
		}
			
		$scope.ajoutEvmt=function(){
				var colonne = form.col;
				var per= new Periode(form);	
				if (planning.testDepassementNombreColonnes(colonne, form.nbCol)) {
						alert("Impossible d'ajouter l'évènement : débordement de la page");
						return false;
				}
				var evnmt=new EvenementClassique (form.titre,form.description,per,form.categorie, form.nbCol);
				colonne.ajouterEvenement(evnmt);
				var indexEvenementPrin = form.col.getTaches().indexOf(evnmt);
				if (form.nbCol > 1) {
					var colonnes = planning.getColonnes();
					var indexColonne = colonnes.indexOf(form.col);
					evnmt.setNbEvenementSecondaire(form.nbCol)
				} 					
		}
	
		
		
		$scope.modifEvmt=function(){
		
				if (planning.testDepassementNombreColonnes(form.col, form.nbCol)) {
						alert("Impossible de modifier l'évènement : débordement de la page");
						return false;
				}
        form.evnmt.initialize(form.titre, form.description, new Periode(form), form.categorie, form.nbCol);
        form.evnmt.setNbEvenementSecondaire(form.nbCol)
		}
		
		$scope.suppEvmt=function(){
			poubelle.push(form.evnmt);
			form.col.supprimerEvenement(form.evnmt);
			
			if (form.evnmt.getNbCol() > 1 ){
				$scope.suppEvenementCommun();
			}
		}
		
		$scope.suppEvenementCommun=function() {
			var tabEvenementSecondaire = form.evnmt.getTabEvenementAutreCol();
			var tabColonne = planning.getColonnes();
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
		var largeurElm = $scope.accessToResizableElmt.offsetWidth;
		var largeurPlanning=$$(".A4")[0].offsetWidth;
		/*debut suppression de bug*/
		col.setLargeurPx(largeurElm+1, largeurPlanning); 
		$scope.$apply();
		/*fin suppression de bug*/
		col.setLargeurPx(largeurElm, largeurPlanning)
		planning.repartirColonnes();
	}
	$scope.setLigne1Hauteur=function(){
		planning.setHauteurLigne1($scope.accessToResizableElmt.offsetHeight);
	}
	$scope.tacheRedim=function(tache){
		var uneHeureEnpx = $$(".cellHoraire")[0].offsetHeight;
    var htrTacEnPx = $scope.accessToResizableElmt.offsetHeight;
		var ratioTacheHeure = htrTacEnPx / uneHeureEnpx;
		tache.getPeriode().setIntervalle(parseInt(ratioTacheHeure * 60));	
  }
    


		$scope.alert=function(width){
			alert(width );				
		};	
		
		
		/*Colonne*/
		
		$scope.afficherModifierColonne = function() {
			formCol.titre = "";
			fenetreAjoutColonne.afficher(true);
		}
		
		$scope.ajoutColonne = function() {
			planning.ajoutColonne(new Colonne(formCol.titre));
      planning.repartirColonnes();
			fenetreAjoutColonne.afficher(false);
		}
		
		$scope.afficherModifColonne=function(colo){
			formCol.titre = colo.getTitre();
			fenetreModifSupprColonne.afficher(true);
			formCol.col=colo;			
		}
		
		$scope.modifColonne=function(){
			formCol.col.setTitre(formCol.titre);
      fenetreModifSupprColonne.afficher(false);
		}
		
		$scope.supprColonne=function(){
			//poubelle.push(formCol.col);
			planning.supprimerColonne(formCol.col);
			fenetreModifSupprColonne.afficher(false);
		}
		
		/*$scope.calculerLargeur=function(page,evenement, colonne) {
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
			return result+"%";
		}
		$scope.activerAiment=function(){
			planning.optimiserLargeurColonnes();
		}
		*/

		
		$scope.modifHeure = function() {
			planning.getHoraire().initialize($scope.horaire);
			$scope.ligne = [];
			for (var h = planning.getHoraire().getHeureDebut() ; h < planning.getHoraire().getHeureFin(); h++) {
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
				if (!planning.testDepassementNombreColonnes(colonneFinal, tacheQuiBouge.getNbCol())) {
					per.decallerA({heure:lig});
					colonneFinal.ajouterEvenement(tacheQuiBouge);
					colonneDepart.supprimerEvenement(tacheQuiBouge);	
				}
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

mod.directive('resizabledroite', function () {
    return {
        link: function (scope, elem, attr) {
            elem.resizable({
              handles: 'e'
            });
            elem.on('resizestop', function (evt, ui) {	
				//on rajoute l'accès à l'element
				publicAccessToScope['accessToResizableElmt']=elem[0];
				publicAccessToScope.clicOnAimant=false;
                scope.$eval(attr.resizabledroite)
				scope.$apply();
            });
        }
    };
});
mod.directive('resizablebas', function () {
    return {
        link: function (scope, elem, attr) {
            elem.resizable({
              handles: 's'
            });
            elem.on('resizestop', function (evt, ui) {	
				//on rajoute l'accès à l'element
				publicAccessToScope['accessToResizableElmt']=elem[0];
				publicAccessToScope.clicOnAimant=false;
                scope.$eval(attr.resizablebas)
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




