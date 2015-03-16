﻿//Createur de Classe par Bortolaso Mathieu
function getClass(superName){
	function contientPasSuper(funct){
		var name = superName.replace("$","");
		var reg= new RegExp("\\b"+name+"\\b")
		return ! reg.test(funct);
	}
	var f = function(){};
	
	//crée les methode getteur et setteur et les copie dans l'objet proto
	function addGetEtSet(proto, methodes){
		methodes.getteurEtSetteur = methodes.getteurEtSetteur || {};
		methodes.getteur = methodes.getteur || {};
		methodes.setteur = methodes.setteur || {};
		for( var o=0; o<2;o++){
			for ( var i in methodes.getteur){
				prop = methodes.getteur[i];
				var propMaj = prop.charAt(0).toUpperCase()+prop.substr(1,prop.length-1);
				proto["get"+propMaj] = function(){
					return this['_'+prop]
				}
			}
			for ( var i in methodes.setteur){
				prop = methodes.setteur[i];
				var propMaj = prop.charAt(0).toUpperCase()+prop.substr(1,prop.length-1);
				proto["set"+propMaj] = function(o){ 
					this['_'+prop]=o; 
					return this;
				}
			}
			//et on refait un tour pour ceux qui ont le getteur et le setteur
			methodes.setteur = methodes.getteur = methodes.getteurEtSetteur;
		}
		delete methodes.getteurEtSetteur;
		delete methodes.getteur;
		delete methodes.setteur;	
	}
	
	//seulement pour l'appel à super
	function getMethod(methodes,prop,parent){
		return function(){
			var self=this;
			window[superName]= function (){
				return parent.prototype[prop].apply(self, arguments);
			}
			return  methodes[prop].apply(self, arguments);
		}	
	}
	
	var Class = function(){}
	
	Class.create=function(methodes){
		methodes = methodes || {};
		var parent = methodes.extend || f;
		parent.prototype.initialize=parent.prototype.initialize || parent;
		var enfant = function(){
			enfant.prototype.initialize.apply(this, arguments);
		}
		var proto = enfant.prototype = Object.create(parent.prototype);
		this.addMethods(enfant, methodes)
		proto.initialize =  proto.initialize || methodes.initialize || parent;
		return enfant;
	}
	
	Class.addMethods = function(laClass, methodes){
		var proto = laClass.prototype;
		addGetEtSet(proto, methodes);
		methodes = methodes || {};
		var parent =  methodes.extend || laClass.extend || f;
		for(var prop in methodes){
			proto[prop]= (contientPasSuper(methodes[prop]))
			? methodes[prop]
			:getMethod(methodes, prop, parent);
		}
	}
	
	return Class;
}
//choisir le nom de la variable globale contenant le super ici _super super tout court sera un mot clef dans Ecma 6 donc déconseillé
var Class = getClass("$super");
