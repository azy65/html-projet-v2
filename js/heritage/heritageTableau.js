var newSubTab = function (Class){
        Class.prototype = Class.prototype || {};
        var f = [];
        f.__proto__ = Class.prototype;
        f.__proto__.__proto__=[];
        return f;
}

var TabSousClass = function(){
        var instance=newSubTab(TabSousClass)
        return instance;
}

TabSousClass.prototype.suppElmt=function(elmt){
        return this.splice(this.indexOf(elmt),1);
}

