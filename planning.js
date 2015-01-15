/***************************
***** Classe planning ******
****************************/
var Planning=function(mode){
	var private={
		 mode:mode,
		 tabColonne:[]
	}
	this.getPrivate=function(){
		return private;
	};
}
//public
Planning.prototype.getMode=function getMode(){
	var p=this.getPrivate();
	return p.mode;
};

Planning.prototype.setMode=function(mode){
	var p=this.getPrivate();
	p.mode=mode;
}

Planning.prototype.ajoutColonne=function(col2){
	var p=this.getPrivate();
	p.tabColonne.push(col2);
}
Planning.prototype.getColonnes=function(){
	var p=this.getPrivate();
	return p.tabColonne;
}



/***************************
***** Classe colonne ******
****************************/
var Colonne=function(id,titre,largeur){
	
	var private={
		lastId:id,
		tabEvmt:[],
		titre:titre,
		largeur:largeur
	}
	this.getPrivate=function(){
		return private;
	};
}
//public
Colonne.prototype.ajouterEvenement=function(evmt){
		var p=this.getPrivate();
		p.tabEvmt.push(evmt);
		p.lastId++;
	}
Colonne.prototype.getTaches=function(){
	var p=this.getPrivate();
	return p.tabEvmt;
}
Colonne.prototype.setTaches=function(tabEvmt){
	var p=this.getPrivate();
	p.tabEvmt=tabEvmt;
}
Colonne.prototype.getId=function(){
	var p=this.getPrivate();
	return p.lastId;
}
Colonne.prototype.getTitre=function(){
	var p=this.getPrivate();
	return p.titre;
}
Colonne.prototype.setTitre=function(titre){
	var p=this.getPrivate();
	p.titre = titre;
}
Colonne.prototype.getLargeur=function(){
	var p=this.getPrivate();
	return p.largeur;
}
Colonne.prototype.setLargeur=function(largeur){
	var p=this.getPrivate();
	p.largeur = largeur;
}
	
Colonne.prototype.supprimerEvenement=function(evmt){
	var p=this.getPrivate();
	var id = evmt.getId();
	for(var i =0;i<p.tabEvmt.length;i++){
		if(id==p.tabEvmt[i].getId()){
			p.tabEvmt.splice(i, 1);
		}
	}
}

/***************************
***** Classe periode ******
****************************/
//public
var Periode=function(P){
	private ={
	//journalier : attribut
		heureDeb:P.heureDeb ||0,
		minuteDeb : P.minuteDeb ||0,
		heureFin : P.heureFin ||0,
		minuteFin: P.minuteFin ||0,
		jourDeb: P.jourDeb ||0,
		jourFin: P.jourFin ||0,
		moisDeb : P.moisDeb ||0,
		moisFin : P.moisFin ||0,
		anneeDeb : P.anneeDeb ||0,
		anneeFin : P.anneeFin ||0,
	}
	this.getPrivate=function(){
		return private;
	};
}
//public

//journalier : méthode
Periode.prototype.getIntervalle=function (){
	var p=this.getPrivate();
	var i=(p.anneeFin-p.anneeDeb)*365*24*60+(p.moisFin-p.moisDeb)*30*24*60+(p.jourFin-p.jourDeb)*24*60+(p.heureFin-p.heureDeb)*60+(p.minuteFin-p.minuteDeb);
	return i;
}

Periode.prototype.getHeureDebut=function (){
	var p=this.getPrivate();
	return p.heureDeb;
}
	
	
	//semaine : méthode
	Periode.prototype.getJourDebut=function (){
		var p=this.getPrivate();
		return p.jourDeb;
	}

	Periode.prototype.getMoisDebut=function (){
		var p=this.getPrivate();
		return p.moisDeb;
	}
	
	Periode.prototype.getAnneeDebut=function (){
		var p=this.getPrivate();
		return p.anneeDeb;
	}
	


/***************************
***** classe evenement ******
****************************/
var evStatick={};
var Evenement=(function(){
	var lastID=0; //statick variable
	if (lastID==0){
		evStatick.setLastID=function(id){
				lastID=id;
		};		
	}
	return function(nom,periode,description,lieu){
		lastID++;
		var private={
			 id:lastID,
			 nom:nom,
			 periode:periode,
			 description:description,
			 lieu:lieu,
			 tabEv:[] //facu
		}
		this.getPrivate=function(){
			return private;
		};	
	};
})()
Evenement.setLastID=evStatick.setLastID;
//methode public
 Evenement.prototype.getId=function(){
	var p=this.getPrivate();
	return p.id;
}

Evenement.prototype.setId=function(identifiant){
	var p=this.getPrivate();
	p.id = identifiant;
}

Evenement.prototype.getNom=function(){
	var p=this.getPrivate();
	return p.nom;
}

Evenement.prototype.setNom=function(titre){
	var p=this.getPrivate();
	p.nom = titre;
}

Evenement.prototype.getPeriode=function(){
	var p=this.getPrivate();
	return p.periode;
}

Evenement.prototype.setPeriode=function(per){
	var p=this.getPrivate();
	p.periode = per;
}

Evenement.prototype.getDescription=function(){
	var p=this.getPrivate();
	return p.description;
}

Evenement.prototype.setDescription=function(desc){
	var p=this.getPrivate();
	p.description = desc;
}

Evenement.prototype.getLieu=function(){
	var p=this.getPrivate();
	return p.lieu;
}

Evenement.prototype.setLieu=function(lieu){
	var p=this.getPrivate();
	p.lieu = lieu;
}
	
/***************************
***** classe donnee ******
****************************/
var Donnee=function(){
	var private={
		tabEv:[]
	}
	this.getPrivate=function(){
		return private;
	};
}


