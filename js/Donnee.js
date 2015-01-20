/***************************
***** classe donnee ********
****************************/
var Donnee=Class.create({
	initialize:function(){
		tabEv=[];
	},
	ajouterEvenement:function(evnmt){
		this._tabEv.push(evnmt);
	}
})
