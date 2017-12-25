var Functions = require('../src/functions.js');
var Function = new Functions();

describe('Functions Testing',function(){
    it('testing',function(){
        expect(Function.testing()).toBeTruthy();
    });
});

