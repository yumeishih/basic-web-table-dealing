var Functions = require('../src/functions.js');
var Function = new Functions();

describe('Functions Testing',function(){
    it('testing',function(){
        expect(Function.testing()).toBeTruthy();
    });
});

describe('_IsValidFormat',function(){
    var fakeForm;
    beforeEach(function(){
        fakeForm = {
            "name": "kiki",
            "phone": "0900000000",
            "email": "kiki@mail.com" 
        }
        spyOn(Function,"alertMsg");
    });
    it('phone format error',function(){
        fakeForm.phone = "aaaaaaa";  
        expect(Function._IsValidFormat(fakeForm)).toBeFalsy();
    });
    it('email format error',function(){
        fakeForm.email = "wrongEmailFomat"; 
        expect(Function._IsValidFormat(fakeForm)).toBeFalsy();
    });

});

