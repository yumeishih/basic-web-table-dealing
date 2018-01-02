var Table = require('../src/functions.js');
var Function = new Table();

describe('_isValidFormat',function(){
    var fakeForm;
    beforeEach(function(){
        fakeForm = {
            name: "kiki",
            phone: "0900000000",
            email: "kiki@mail.com" 
        }
        spyOn(Function,"alertMsg");
    });
    it('success',function(){
        expect(Function._isValidFormat(fakeForm)).toBeTruthy();
    });
    it('name format error',function(){
        fakeForm.name = "      "; 
        expect(Function._isValidFormat(fakeForm)).toBeFalsy();
    });
    it('phone format error',function(){
        fakeForm.phone = "aaaaaaa";  
        expect(Function._isValidFormat(fakeForm)).toBeFalsy();
    });
    it('email format error',function(){
        fakeForm.email = "wrongEmailFomat"; 
        expect(Function._isValidFormat(fakeForm)).toBeFalsy();
    });
});

describe('_isValidate',function(){
    var fakeForm;
    var fakeDatas;
    var index = 0;
    beforeEach(function(){
        mockLocalStorage();
        fakeDatas=[
            {
                name: "fifi",
                phone: "0900000000",
                email: "fifi@mail.com" 
            },           
            {
                name: "yiyi",
                phone: "0900000000",
                email: "yiyi@mail.com" 
            },
        ];
        fakeForm = {
            name: "kiki",
            phone: "0900000000",
            email: "kiki@mail.com" 
        }
        spyOn(Function,"alertMsg");
        spyOn(JSON, 'parse').and.returnValue(fakeDatas);
    });
    it('success',function(){
        expect(Function._isValidate(fakeForm,index)).toBeTruthy();
    });
    
    

});

