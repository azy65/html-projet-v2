

/***************************
****test classe planning****
****************************/


QUnit.test( "testPlanningGetMode", function( assert ) {
	var planningTest = new Planning("journalier");
	assert.equal(  planningTest.getMode(), "journalier", "Passed!" );
});

QUnit.test( "testPlanningSetMode", function( assert ) {
	var planningTest = new Planning("journalier");
	planningTest.setMode("hebdomadaire");
	assert.equal(  planningTest.getMode(), "hebdomadaire", "Passed!" );
});

QUnit.test( "testPlanningGetColonneHoraire", function( assert ) {
	var planningTest = new Planning("journalier");
	assert.equal(  planningTest.getColonneHoraire().getLargeur(), 16.66, "Passed!" );
});

QUnit.test( "testPlanningSetColonneHoraire", function( assert ) {
	var planningTest = new Planning("journalier");
	var colonneHoraire = new ElementGraphique(20);
	planningTest.setColonneHoraire(colonneHoraire);
	assert.equal(  planningTest.getColonneHoraire().getLargeur(), 20, "Passed!" );
});

QUnit.test( "testPlanningaddPages", function( assert ) {
	var planningTest = new Planning("journalier");
	var pageTest = new Page();
	planningTest.addPage(pageTest);
	assert.equal(  planningTest.getPages().size(), 1, "Passed!" );
});

QUnit.test( "testAjoutColonne", function( assert ) {
	var planningTest = new Planning("journalier");
	
	var colonneTest = new Colonne("salle Rubis",10);
	
	planningTest.ajoutColonne(colonneTest);
	
	assert.equal(  planningTest.getColonnes()[0].getTitre(), "salle Rubis"
	, "Passed!" );
	assert.equal(  planningTest.getColonnes()[0].getLargeur(), 16.66
	, "Passed!" );
	
});

//supprimer colonne ne fonctionne plus pour l'instant
/*QUnit.test( "testSupprimerColonne", function( assert ) {
	var planningTest = new Planning("journalier");
	
	var colonneTest = new Colonne("salle Rubis",10);
	
	planningTest.ajoutColonne(colonneTest);
	planningTest.supprimerColonne(colonneTest);
	
	assert.equal(  planningTest.getColonnes()[0], undefined
	, "Passed!" );
	
});*/

/*QUnit.test( "testAjouterCategories", function( assert ) {
	var planningTest = new Planning("journalier");
	var categoriesTest = new Categorie("jaune");
	
	planningTest.ajouterCategories(categoriesTest);

	
	assert.equal(  planningTest.getCategories()[0], "jaune"
	, "Passed!" );
	assert.equal(  planningTest.getCategories()[0].getNom(), "Informatique"
	, "Passed!" );
	
});*/

QUnit.test( "testReinitialiserJournalier", function( assert ) {
	var planningTest = new Planning("journalier");
	
	var colonneTest = new Colonne("salle Rubis",10);
	
	planningTest.ajoutColonne(colonneTest);
	planningTest.ajoutColonne(colonneTest);
	planningTest.reinitialiser();
	
	assert.equal(planningTest.getColonnes()[0],undefined , "Passed!");
	
});

QUnit.test( "testReinitialiserHebdo", function( assert ) {
	var planningTest = new Planning("hebdomadaire");
	var periodeTest = new Periode({heureDeb:8});
	var colonneTest = new Colonne("Lundi",10);
	var evenementTest = new EvenementClassique("TD","UML",periodeTest,1,"conception informatique");
	
	planningTest.ajoutColonne(colonneTest);
	colonneTest.ajouterEvenement(evenementTest);
	planningTest.reinitialiser();
	
	assert.equal(planningTest.getColonnes()[0].getTaches()[0],undefined , "Passed!");
	
});

/***************************
****test classe colonne*****
****************************/

QUnit.test( "testColonneGetTitre", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	assert.equal(  colonneTest.getTitre() , "salle Rubis", "Passed!" );
});

QUnit.test( "testColonneSetTitre", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	colonneTest.setTitre("salle Opale");
	assert.equal(  colonneTest.getTitre() , "salle Opale", "Passed!" );
});

QUnit.test( "testColonneGetLargeur", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	assert.equal(  colonneTest.getLargeur() , 16.66, "Passed!" );
});

/*QUnit.test( "testColonneSetLargeur", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	colonneTest.setLargeur(20);
	assert.equal(  colonneTest.getLargeur() , 20, "Passed!" );
});*/

QUnit.test( "testColonneSetTaches", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	var periodeTest = new Periode({heureDeb:8});
	Evenement.setLastID(0);
	var evenementTest = new EvenementClassique("TD","UML",periodeTest,1,"conception informatique");
	colonneTest.ajouterEvenement(evenementTest);
	var tabEvmt = new Array(evenementTest);
	colonneTest.setTaches(tabEvmt);
	assert.equal(  colonneTest.getTaches()[0].getId() , 0, "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getNom() , "TD", "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getPeriode().getHeureDebut() , 8, "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getDescription() , "UML", "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getNbCol() , 1, "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getCategorie() , "conception informatique", "Passed!" );
});

QUnit.test( "testColonneajouterEvenement", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	var periodeTest = new Periode({heureDeb:8});
	Evenement.setLastID(0);
	var evmt=new EvenementClassique("TP","refactoring",periodeTest,1,"Informatique");
	colonneTest.ajouterEvenement(evmt);
	assert.equal( colonneTest.getTaches()[0].getId(), 0, "Passed!" );
	assert.equal( colonneTest.getTaches()[0].getNom(), "TP", "Passed!" );
	assert.equal( colonneTest.getTaches()[0].getPeriode().getHeureDebut(),8 , "Passed!" );
	assert.equal( colonneTest.getTaches()[0].getDescription(), "refactoring", "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getNbCol() , 1, "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getCategorie() , "Informatique", "Passed!" );
});

QUnit.test( "testColonneSupprimerEvenement", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	var evenementTest= new Evenement();
	var periodeTest = new Periode({heureDeb:8});
	Evenement.setLastID(0);
	var evmt=new EvenementClassique("TP","refactoring",periodeTest,1,"Informatique");
	colonneTest.ajouterEvenement(evmt);
	colonneTest.ajouterEvenement(evmt);

	colonneTest.supprimerEvenement(colonneTest.getTaches()[1]);
	assert.equal(  colonneTest.getTaches()[0].getId(), 0, "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getNom(), "TP", "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getPeriode().getHeureDebut(),8 , "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getDescription(), "refactoring", "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getNbCol() , 1, "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getCategorie() , "Informatique", "Passed!" );
	assert.equal(  colonneTest.getTaches()[1], undefined, "Passed!" );
});

QUnit.test( "testtColonneReinitialiserEvenement", function( assert ) {
	var colonneTest = new Colonne("colonne1", 150);
	var periodeTest = new Periode({heureDeb:8});
	var evenementTest = new EvenementClassique("TP","refactoring",periodeTest,1,"Informatique");
	
	colonneTest.reinitialiserEvenement();
	assert.equal(colonneTest.getTaches()[0], undefined, "Passed!" );
});

/*
QUnit.test( "testtColonneGetLargeurPx", function( assert ) {
	var colonneTest = new Colonne("colonne1", 178);
	
	assert.equal(colonneTest.getLargeurPx(), "178px", "Passed!" );
});
*/
/***************************
****test classe periode*****
****************************/

QUnit.test( "testPeriodeGetMinuteDebut", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	
	assert.equal(periodeTest.getMinuteDebut(), 30, "Passed!" );
});


QUnit.test( "testPeriodeGetIntervalle", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	
	assert.equal(  periodeTest.getIntervalle(), 60, "Passed!" );
});

QUnit.test( "testPeriodeGetHeureDebut", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30});
		
	assert.equal(  periodeTest.getHeureDebut() , 8, "Passed!" );
});


QUnit.test( "testPeriodeGetEnMinDebut", function( assert ) {
	var periodeTest = new Periode({heureDeb:20,minuteDeb:30});
		
	assert.equal(  periodeTest.getEnMinDebut(), 1230, "Passed!" );
});

QUnit.test( "testPeriodeGetHeureFin", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
		
	assert.equal(  periodeTest.getHeureFin(), 9, "Passed!" );
});

QUnit.test( "testPeriodeGetMinuteFin", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 45});
		
	assert.equal(  periodeTest.getMinuteFin(), 45, "Passed!" );
});

QUnit.test( "testPeriodeDecalerA", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 45});
		
	periodeTest.decallerA({heure:9});	
	assert.equal(periodeTest.getHeureDebut(), 9, "Passed!" );
	assert.equal(periodeTest.getHeureFin(), 10, "Passed!" );
});

/*****************************
****test classe evenement*****
******************************/
QUnit.test( "testEvenementGetId", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	Evenement.setLastID(0);
	var evenementTest = new Evenement(periodeTest,1,true);
	assert.equal(  evenementTest.getId(), 0, "Passed!" );
});

QUnit.test( "testEvenementSetId", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evenementTest = new Evenement(periodeTest,1,true);
	evenementTest.setId(2); 
	assert.equal(  evenementTest.getId(), 2, "Passed!" );
});

QUnit.test( "testEvenementGetNom", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evenementTest = new EvenementClassique("TP","refactoring",periodeTest,1,"Informatique");
	evenementTest.setId(2); 
	assert.equal(  evenementTest.getNom(), "TP", "Passed!" );
});

QUnit.test( "testEvenementSetNom", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evenementTest = new EvenementClassique("TP","refactoring",periodeTest,1,"Informatique");
	 evenementTest.setNom("TD"); 
	assert.equal(  evenementTest.getNom(), "TD", "Passed!" );
});

//comparer heureDeb et getIntervalle
QUnit.test( "testEvenementGetPeriode", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	Evenement.setLastID(0);
	var evenementTest = new EvenementClassique("TP","refactoring",periodeTest,1,"Informatique");

	assert.equal(  evenementTest.getPeriode().getHeureDebut(), 8, "Passed!" );
	assert.equal(  evenementTest.getPeriode().getIntervalle(), 60, "Passed!" );
});

QUnit.test( "testEvenementSetPeriodeMemeVariable", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var periodeSet = new Periode({heureDeb:7,
		minuteDeb : 45,
		heureFin : 8,
		minuteFin: 45});
	Evenement.setLastID(0);
	var evenementTest = new Evenement("TP",periodeTest,"refactoring","salle Rubis");
	evenementTest.setPeriode(periodeSet);
	
	assert.equal(  evenementTest.getPeriode().getHeureDebut(), 7, "Passed!" );
	assert.equal(  evenementTest.getPeriode().getIntervalle(), 60, "Passed!" );
});



QUnit.test( "testEvenementGetCategorie", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
		Evenement.setLastID(0);
	var evenementTest = new EvenementClassique("TP","refactoring",periodeTest,1,"Informatique");
	assert.equal(  evenementTest.getCategorie(), "Informatique", "Passed!" );
});

QUnit.test( "testEvenementSetCategorie", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	Evenement.setLastID(0);
	var evenementTest = new EvenementClassique("TP","refactoring",periodeTest,1,"Informatique");
	evenementTest.setCategorie("Qualite"); 
	assert.equal(  evenementTest.getCategorie(), "Qualite", "Passed!" );
});

QUnit.test( "testEvenementIncrementationId", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	Evenement.setLastID(0);
	var evenementTest = new Evenement("TP1",periodeTest,"refactoring","salle Rubis");
	var evenementTest = new Evenement("TP2",periodeTest,"refactoring","salle Rubis");
	var evenementTest = new Evenement("TP3",periodeTest,"refactoring","salle Rubis");
	assert.equal(evenementTest.getId(), 2, "Passed!" );
});

QUnit.test( "testEvenementgetNbCol", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evmt=new EvenementClassique("TP","refactoring",periodeTest,5,"Informatique");
	assert.equal(evmt.getNbCol(),5,"Passed");
});

QUnit.test( "testEvenementSetNbCol", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evmt=new Evenement("TP",periodeTest,"refactoring","salle Rubis",2);
	evmt.setNbCol(5);
	assert.equal(evmt.getNbCol(),5,"Passed");
});

QUnit.test( "testEvenementGetVisibility", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evmt=new EvenementClassique("TP","refactoring",periodeTest,1,"Informatique");
	
	assert.equal(evmt.getVisibility(),true,"Passed");
});


/*****************************
****test classe fenetre*****
******************************/
QUnit.test( "testFenetreIsAfficher", function( assert ) {
	var fenetreTest = new Fenetre(false);

	assert.equal(fenetreTest.isAfficher(), false, "Passed!" );
});

QUnit.test( "testFenetreAfficher", function( assert ) {
	var fenetreTest = new Fenetre(false);
	fenetreTest.afficher(true);
	assert.equal(fenetreTest.isAfficher(), true, "Passed!" );
});

QUnit.test( "testFenetreAvecTransitionTrue", function( assert ) {
	var fenetreTest = new FenetreAvecTransition();
	fenetreTest.afficher(true);
	assert.equal(fenetreTest.getClasse(), "optionVisible", "Passed!" );
});

QUnit.test( "testFenetreAvecTransitionFalse", function( assert ) {
	var fenetreTest = new FenetreAvecTransition();
	fenetreTest.afficher(false);
	assert.equal(fenetreTest.getClasse(), "optionInvisible", "Passed!" );
});

/*****************************
******test classe donnee******
******************************/

/*QUnit.test( "testDonneeGetTabEvenement", function( assert ) {
	
	assert.equal(  colonneTest.getId() , 0, "Passed!" );
});

QUnit.test( "testDonneeSetTabEvenement", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	assert.equal(  colonneTest.getTitre() , "salle Rubis", "Passed!" );
});*/



//tester incrementation id