//classe planning
var Planning=function(mode){
	var private={
		 mode:mode,
		 titre:"",
		 tabColonne:[]
	}
	this.getPrivate=function(){
		return private;
	};
}

//public
Planning.prototype.getMode=function getMode(){
	var p=this.getPrivate();
	return this.getPrivate().mode;
};
Planning.prototype.getTitre=function(){
	var p=this.getPrivate();
	return p.titre;
}
Planning.prototype.setTitre=function(titre){
	var p=this.getPrivate();
	p.titre=titre;
}
Planning.prototype.ajoutColonne=function(col2){
	var p=this.getPrivate();
	p.tabColonne.push(col2);
}
Planning.prototype.getColonnes=function(){
	var p=this.getPrivate();
	return p.tabColonne;
}



//classe colonne
var Colonne=function(titre,mode){
	
	var private={
		lastId:0,
		tabEvmt:[],
		titre : titre,
		mode: mode
	}
	this.getPrivate=function(){
		return private;
	};
}
//public
Colonne.prototype.ajoutEvenement=function(periode){
		var p=this.getPrivate();
		var evmt=new Evenement(p.lastId,periode);
		p.tabEvmt.push(evmt);
		p.lastId++;
	}
Colonne.prototype.getTaches=function(){
	var p=this.getPrivate();
	return p.tabEvmt;
}
Colonne.prototype.getTitre=function(){
	var p=this.getPrivate();
	return p.titre;
}
	
Colonne.prototype.supprimerEvenement=function(evmt){
	var id = evmt.getID();
	for(var i =0;i<tabEvmt.length;i++){
		if(id==tabEvmt[i].getID()){
			tabEvmt.splice(i, 1);
		}
	}
}
//classe Periode
//public
var Periode=function(P){
	private ={
	//journalier : attribut
		heureDeb:P.heureDeb,
		minuteDeb : P.minuteDeb,
		heureFin : P.heureFin,
		minuteFin: P.minuteFin,
		jourDeb: P.jourDeb,
		jourFin: P.jourFin,
		moisDeb : P.moisDeb,
		moisFin : P.moisFin,
		anneeDeb : P.anneeDeb,
		anneeFin : P.anneeFin,
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
	


//Classe Evenement
var Evenement=function(id,nom,description,periode){
	var private={
		 id:id,
		 nom:nom,
		 periode:periode,
		 description:description
	}
	this.getPrivate=function(){
		return private;
	};
}
//methode public
 Evenement.prototype.getId=function(){
	var p=this.getPrivate();
	return p.id;
}

Evenement.prototype.setId=function(identifiant){
	var p=this.getPrivate();
	id = p.identifiant;
}

Evenement.prototype.getNom=function(){
	var p=this.getPrivate();
	return p.nom;
}

Evenement.prototype.setNom=function(titre){
	var p=this.getPrivate();
	nom = p.titre;
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
	


