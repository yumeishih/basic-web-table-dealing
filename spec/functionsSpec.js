var Functions = require('../src/functions.js');

describe('Functions',function(){
    var functions;
    beforeEach(function() {
        functions = new Functions();
    });
    it('testing',function(){
        expect(functions.testing()).toBeTruthy();
    });
});
