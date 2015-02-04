// 3eme parametre permet de ne faire que le set ou que le get par exemple 
// addGSet(Colonne,["taches","titre",'largeur'],"set") ne créera que les setters
var addGSet=function(obj,param,gset){
	var methods={}
	param.forEach(function(prop){
			var propMaj=prop.charAt(0).toUpperCase()+prop.substr(1,prop.length-1);
			if (gset!="set"){
				var monGet= new Function('return function(){ return this._'+prop+'}')
				methods["get"+propMaj]=monGet.call(this)
			}
			if (gset!="get"){
				var monSet= new Function('return function(o){ this._'+prop+'=o}')
				methods["set"+propMaj]=monSet.call(this)
			}
	})
	obj.addMethods(methods);
}