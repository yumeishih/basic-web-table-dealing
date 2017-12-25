var FunctionsSource = require('../src/functions.js');
var Functions = new FunctionsSource();
describe('Functions',function(){
    it('testing',function(){
        expect(Functions.testing()).toBeTruthy();
    });
});
