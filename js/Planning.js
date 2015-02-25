'use scrict';
/***************************
***** Classe planning ******
****************************/

var Planning = Class.create({
	
	//constructeur
	initialize:function (mode){
		//attribut protected
		this._mode=mode,
		this._categories=[];
		this._page=[];
    this._largeurMax=900;
	},

	addPage:function(unePage){
		if (!unePage){
			unePage=new Page();
		}
		unePage.setPlanning(this);
		this._page.push(unePage);
		return unePage;
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
	
	repartirColonnes:function(){
		var colonnes = this.getColonnes();
		var largeur=0;
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
				largeur=col.getLargeur();
        this._page[indicePage].ajoutColonne(col);
			}
      
      //supprimer les page en trop
      this._page.splice(indicePage+1,this._page.length);
		}
	},
	
	ajoutColonne:function(col){
		var page=this._page[this._page.length-1];
		if ( page.getLargeur() > this._largeurMax){
			page=this.addPage();
		}
		page.ajoutColonne(col);		
	},
	
	ajouterCategories:function(couleur,categorieNom){
		var cat =new Categorie(couleur,categorieNom);
		this._categories.push(cat);
		return cat;
	},
	estCategorieExistante:function(categorie){
		var res = false;
		this._categories.forEach (function(cat) {
			if (cat.getNom() == categorie.getNom() && cat.getCouleur() == categorie.getCouleur()) {
				res = true;
			}
		})
		return res;
	}
})
addGSet(Planning,["mode","largeurMax"])
addGSet(Planning,["categories"],"get")
addGSet(Planning,["categories"],"set")