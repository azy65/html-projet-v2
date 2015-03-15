//Createur de Classe par Bortolaso Mathieu
function getClass(superName){
	function contientPasSuper(funct){
		var name = superName.replace("$","");
		var reg= new RegExp("\\b"+name+"\\b")
		return ! reg.test(funct);
	}
	var Class=function(){}
	var f=function(){};
	Class.create=function(methodes){
		methodes = methodes || {};
		var parent = methodes.extend || f;
		var enfant = function(){
			constructeur.apply(this, arguments);
		}	
		enfant.prototype = Object.create(parent.prototype);
		this.addMethods(enfant, methodes)
		var constructeur = enfant.prototype.initialize || parent ;
		return enfant;
	}

	Class.addMethods = function(laClass, methodes){
		var parent =  methodes.extend || laClass.extend || f;
		var proto = laClass.prototype;
		for(var prop in methodes){ 
			proto[prop]= (contientPasSuper(methodes[prop]))
			? methodes[prop]
			:getMethod(methodes, prop, parent);
		}
	}
	function getMethod(methodes,prop,parent){
		return function(){
			var self=this;
			window[superName]= function (){
				return parent.prototype[prop].apply(self, arguments);
			}
			return  methodes[prop].apply(self, arguments);
		}	
	}
	
	return Class;
}
//choisir le nom de la variable globale contenant le super ici _super super tout court sera un mot clef dans Ecma 6 donc déconseillé
var Class = getClass("$super");
