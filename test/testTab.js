QUnit.test( "test22", function( assert ) {
	var u= new t(3)
	assert.equal(  u.t, 3, "Passed!" );
});

QUnit.test( "test22", function( assert ) {
	var u= new tu(3)
	assert.equal(  u.t, 3, "Passed!" );
});

QUnit.test( "testTab", function( assert ) {
	var tab=new Tab();
	tab[1]=5;
	assert.equal(  tab[1], 5, "Passed!" );
});