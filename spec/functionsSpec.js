var Functions = require('../src/functions.js');
var Function = new Functions();

describe('Functions',function(){
    it('testing',function(){
        expect(Function.testing()).toBeTruthy();
    });
});
