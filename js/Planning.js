'use scrict';
Array.prototype.suppElmt=function(elmt){
  var indiceMonEvnmt = this.indexOf(elmt);
  this.splice(indiceMonEvnmt,1);
}


/***************************
***** Classe planning ******
****************************/

var Planning = Class.create({
	
	//constructeur
	initialize:function (mode){
		this._colonneHoraire=new ElementGraphique(16.66);
		this._colonneHoraire.setPlanning(this);
		this._mode=mode,
		this._categories=[];
		this._page=[];
		this._largeurMax=100;
		this._hauteurLigne1=50;
	},
	getNbCelluleHauteur: function(){
		return this.getHoraire().getHeureFin() - this.getHoraire().getHeureDebut() + 1;
	},
	//ni px ni % c'est une formule à utiliser pour la propriété calc de css 
	getHauteurCell:function(){
		return "( 100% - "+this.getHauteurLigne1()+"px ) * 60 / "+this.getHoraire().getIntervalle(); 
	},
	addPage:function(unePage){
		if (!unePage){
			unePage=new Page();
		}
		unePage.setPlanning(this);
		this._page.push(unePage);
		return unePage;
	},
	optimiserLargeurColonnes:function(){
		var self=this;
		this._page.forEach(function (p){
			var a = (100 - self._colonneHoraire.getLargeur());
			var b =(p.getLargeur() - self._colonneHoraire.getLargeur());
			var coef=a/b;
			p.getColonnes().forEach(function(col){
				col.multLargeurPar(coef);
			})
		})
	},	
	getPage:function(num){
		return this._page[num];
	},
	getColonnes:function(num){
		var tab=new Array();
		for (var i =0; i < this._page.length; i++){
			tab=tab.concat(this._page[i].getColonnes())
		}
		return tab;
	},	
	getPages:function(num){
		return this._page;
	},
	
	repartirColonnes:function(colonnes){
		var colonnes = colonnes || this.getColonnes();
		var largeur=this._colonneHoraire.getLargeur();
		var indicePage=0;
		this._page[0].setColonnes([]);
		for (var i=0; i<colonnes.length; i++){
			var col=colonnes[i];
			largeur+=col.getLargeur();
			if (largeur < this._largeurMax){
				this._page[indicePage].ajoutColonne(col);
			}else{
				indicePage++;
				try{
					this._page[indicePage].setColonnes([]);
				}catch(e){
					this.addPage();
				}
				largeur=col.getLargeur()+this._colonneHoraire.getLargeur();
        this._page[indicePage].ajoutColonne(col);
			}
      
      //supprimer les page en trop
      this._page.splice(indicePage+1,this._page.length);
		}
	},
	
	ajoutColonne:function(col){
		var page=this._page[this._page.length-1];
		if (!page || page.getLargeur() > this._largeurMax  ){
			page=this.addPage();
		}
		page.ajoutColonne(col);		
	},
	supprimerColonne:function(col){
		var cols=this.getColonnes();
		cols.suppElmt(col);
		this.repartirColonnes(cols);
	},
	ajouterCategories:function(couleur,categorieNom){
		var cat =new Categorie(couleur,categorieNom);
		this._categories.push(cat);
		return cat;
	},
	supprimerCategorie:function(categorie){
      this._categories.suppElmt(categorie);
	},
	estCategorieExistante:function(categorie){
		var res = null;
		this._categories.forEach (function(cat) {
			if (cat.getNom() == categorie.getNom() && cat.getCouleur() == categorie.getCouleur()) {
				res = cat;
			}
		})
		return res;
	},
	testDepassementNombreColonnes:function(colonne, nbColonnes){
		var colonnes = colonne.getPage().getColonnes();
		var index = colonnes.indexOf(colonne);
		return (index+nbColonnes > colonnes.length);		
	},
  reinitialiser:function(){
    var col=this.getColonnes();
		if(this._mode=="journalier"){
      this._page=[new Page()];
    }else{	
			col.forEach(function(colonne){
				colonne.reinitialiserEvenement();
			})					
		}
	}
})
addGSet(Planning,["mode","categories","largeurMax","colonneHoraire","horaire","hauteurLigne1"]);
