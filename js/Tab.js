var t=function(u){
	this.t=u
}

var tu = Class.create(t, {
	//constructeur
	initialize:function ($super, u){
		$super(u);
	}	
	
})

var Tab = Class.create(Array, {
	//constructeur
	initialize:function ($super, tab){
		//attribut protected
		this._tab = tab || [];
	}	
	
})
addGSet(Tab,[]);
