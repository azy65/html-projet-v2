//Class qui simplifie l' h�ritage avec l'attribut papaClasse
function mClass(struct){
	var myClass=function(){
		//heritage attribut Priv� constructeur
		if (struct.hasOwnProperty("papaClasse")){
			struct.papaClasse.apply(this,arguments)
		}
		struct.init.apply(this,arguments);
	}

	var copier=function(prop,struct){
		myClass.prototype[prop]=function(){
			if(prop!="init" && prop!="papaClasse"  ){
				return (struct[prop].apply(this,arguments));
			}
		}
	}
	
	//heritage fonctions publiques de la classe papaClasse
	if (struct.hasOwnProperty("papaClasse")){
		for( var prop in struct.papaClasse.prototype){
			copier(prop,struct.papaClasse.prototype);
		}
	}
	//fonctions publiques non h�rit�s
	for( var prop in struct){
		copier(prop,struct);
	}
	
	return myClass;
}

