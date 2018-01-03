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
    var fakeLocalstorage;
    var index;
    beforeEach(function(){
        mockLocalStorage();
        fakeLocalstorage=[
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
        index = fakeLocalstorage.length;
        spyOn(Function,"alertMsg");
        spyOn(JSON, 'parse').and.returnValue(fakeLocalstorage);
    });
    it('success',function(){
        expect(Function._isValidate(fakeForm,index)).toBeTruthy();
    });
    it('name empty',function(){
        fakeForm.name = "";
        expect(Function._isValidate(fakeForm,index)).toBeFalsy();
    });
    it('user exist',function(){
        fakeForm.name = "fifi";
        expect(Function._isValidate(fakeForm,index)).toBeFalsy();
    });
    it('email empty',function(){
        fakeForm.email = "";
        expect(Function._isValidate(fakeForm,index)).toBeFalsy();
    });
});
describe('deleteData',function(){
    var fakeLocalstorage;
    var index;
    beforeEach(function(){
        mockLocalStorage();
        fakeLocalstorage=[
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
        index = 1
        spyOn(JSON, 'parse').and.returnValue(fakeLocalstorage);
        spyOn(JSON,'stringify').and.callFake(function(datas){fakeLocalstorage = datas;});
    });
    it('success',function(){
        Function.deleteData(index);
        expect(fakeLocalstorage.length).toBe(1);
    });
    it('out of index',function(){
        index = 2;
        expect(function(){Function.deleteData(index)}).toThrowError('out of index!');
    });
});

describe('_setDatas',function(){
    var fakeForm;
    var fakeLocalstorage;
    var index;
    beforeEach(function(){
        mockLocalStorage();
        fakeLocalstorage=[
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
        index = 0
        spyOn(JSON,'parse').and.returnValue(fakeLocalstorage);
        spyOn(JSON,'stringify').and.callFake(function(datas){fakeLocalstorage = datas;});
    });
    it('success',function(){
        Function._setDatas(index,fakeForm);
        expect(fakeLocalstorage[index]).toEqual(fakeForm);
    });
});
