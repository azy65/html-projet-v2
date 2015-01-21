

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

QUnit.test( "testAjoutColonne", function( assert ) {
	var planningTest = new Planning("journalier");
	
	var colonneTest = new Colonne("salle Rubis",10);
	
	planningTest.ajoutColonne(colonneTest);
	
	assert.equal(  planningTest.getColonnes()[0].getTitre(), "salle Rubis"
	, "Passed!" );
	assert.equal(  planningTest.getColonnes()[0].getLargeur(), 10
	, "Passed!" );
	
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
	assert.equal(  colonneTest.getLargeur() , 10, "Passed!" );
});

QUnit.test( "testColonneSetLargeur", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	colonneTest.setLargeur(20);
	assert.equal(  colonneTest.getLargeur() , 20, "Passed!" );
});

QUnit.test( "testColonneSetTaches", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	var periodeTest = new Periode({heureDeb:8});
	Evenement.setLastID(0);
	var evenementTest = new Evenement("TD",periodeTest,"UML","salle Rubis");
	colonneTest.ajouterEvenement(evenementTest);
	var tabEvmt = new Array(evenementTest);
	colonneTest.setTaches(tabEvmt);
	assert.equal(  colonneTest.getTaches()[0].getId() , 0, "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getNom() , "TD", "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getPeriode().getHeureDebut() , 8, "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getDescription() , "UML", "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getLieu() , "salle Rubis", "Passed!" );
});

QUnit.test( "testColonneajouterEvenement", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	var periodeTest = new Periode({heureDeb:8});
	Evenement.setLastID(0);
	var evmt=new Evenement("TP",periodeTest,"refactoring","salle Rubis");
	colonneTest.ajouterEvenement(evmt);
	assert.equal( colonneTest.getTaches()[0].getId(), 0, "Passed!" );
	assert.equal( colonneTest.getTaches()[0].getNom(), "TP", "Passed!" );
	assert.equal( colonneTest.getTaches()[0].getPeriode().getHeureDebut(),8 , "Passed!" );
	assert.equal( colonneTest.getTaches()[0].getDescription(), "refactoring", "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getLieu() , "salle Rubis", "Passed!" );
});

QUnit.test( "testColonneSupprimerEvenement", function( assert ) {
	var colonneTest = new Colonne("salle Rubis",10);
	var evenementTest= new Evenement();
	var periodeTest = new Periode({heureDeb:8});
	Evenement.setLastID(0);
	var evmt=new Evenement("TP",periodeTest,"refactoring","salle Rubis");
	colonneTest.ajouterEvenement(evmt);
	colonneTest.ajouterEvenement(evmt);

	colonneTest.supprimerEvenement(colonneTest.getTaches()[1]);
	assert.equal(  colonneTest.getTaches()[0].getId(), 0, "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getNom(), "TP", "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getPeriode().getHeureDebut(),8 , "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getDescription(), "refactoring", "Passed!" );
	assert.equal(  colonneTest.getTaches()[0].getLieu() , "salle Rubis", "Passed!" );
	assert.equal(  colonneTest.getTaches()[1], undefined, "Passed!" );
});

/***************************
****test classe periode*****
****************************/


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

QUnit.test( "testPeriodeGetJourDebut", function( assert ) {
	var periodeTest = new Periode({jourDeb:20});
		
	assert.equal(  periodeTest.getJourDebut(), 20, "Passed!" );
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

QUnit.test( "testPeriodeGetJourFin", function( assert ) {
	var periodeTest = new Periode({jourDeb:20,jourFin:22});
		
	assert.equal(  periodeTest.getJourFin(), 22, "Passed!" );
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
	var evenementTest = new Evenement("TP",periodeTest,"refactoring","salle Rubis");
	assert.equal(  evenementTest.getId(), 0, "Passed!" );
});

QUnit.test( "testEvenementSetId", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evenementTest = new Evenement("TP",periodeTest,"refactoring","salle Rubis");
	evenementTest.setId(2); 
	assert.equal(  evenementTest.getId(), 2, "Passed!" );
});

QUnit.test( "testEvenementGetNom", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evenementTest = new Evenement("TP",periodeTest,"refactoring","salle Rubis");
	evenementTest.setId(2); 
	assert.equal(  evenementTest.getNom(), "TP", "Passed!" );
});

QUnit.test( "testEvenementSetNom", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var evenementTest = new Evenement("TP",periodeTest,"refactoring","salle Rubis");
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
	var evenementTest = new Evenement("TP",periodeTest,"refactoring","salle Rubis");

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

QUnit.test( "testEvenementSetPeriodeVariableDifferente", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	var periodeSet = new Periode({
		jourDeb: 8,
		jourFin: 9,
	});
	Evenement.setLastID(0);
	var evenementTest = new Evenement("TP",periodeTest,"refactoring","salle Rubis");
	evenementTest.setPeriode(periodeSet);

	assert.equal(  evenementTest.getPeriode().getHeureDebut(), 0, "Passed!" );
	assert.equal(  evenementTest.getPeriode().getJourDebut(), 8, "Passed!" );
	assert.equal(  evenementTest.getPeriode().getIntervalle(), 1440, "Passed!" );
	
});

QUnit.test( "testEvenementGetLieu", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
		Evenement.setLastID(0);
	var evenementTest = new Evenement("TP",periodeTest,"refactoring","salle Rubis");
	assert.equal(  evenementTest.getLieu(), "salle Rubis", "Passed!" );
});

QUnit.test( "testEvenementSetLieu", function( assert ) {
	var periodeTest = new Periode({heureDeb:8,
		minuteDeb : 30,
		heureFin : 9,
		minuteFin: 30});
	Evenement.setLastID(0);
	var evenementTest = new Evenement("TP",periodeTest,"refactoring","salle Rubis");
	evenementTest.setLieu("salle Opale"); 
	assert.equal(  evenementTest.getLieu(), "salle Opale", "Passed!" );
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

/*****************************
****test classe fenetre*****
******************************/
QUnit.test( "testFenetreAfficher", function( assert ) {
	var fenetreTest = new Fenetre(false);

	assert.equal(fenetreTest.isAfficher(), false, "Passed!" );
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