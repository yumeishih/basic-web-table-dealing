var Table = require('../src/functions.js');
var Function = new Table();

describe('Test',function(){
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

        spyOn(Function,'_appendElement');
        spyOn(Function,'_replaceElement');
        spyOn(Function,'_getFormContent').and.callFake(function(formName){
            return fakeForm;
        });
        spyOn(Function,"alertMsg");
        spyOn(JSON,'parse').and.returnValue(fakeLocalstorage);
        spyOn(JSON,'stringify').and.callFake(function(datas){fakeLocalstorage = datas;});
    });
describe('_isValidFormat',function(){

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
    beforeEach(function(){
        index = fakeLocalstorage.length;
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

describe('insertData',function(){
    it('success',function(){
        Function.insertData();
        expect(fakeLocalstorage[2]).toEqual(fakeForm);
    });

});

describe('modifyForm',function(){
    var action;
    beforeEach(function(){
        index = 0
    });
    it('sucess-Save',function(){
        action = {
            innerHTML: "Save"
        }
        Function.modifyData(action);
        expect(fakeLocalstorage[index]).toEqual(fakeForm);
    });
    it('sucess-Cancel',function(){
        action = {
            innerHTML: "Cancel"
        }
        var tmp = fakeLocalstorage[index];
        Function.modifyData(action);
        expect(fakeLocalstorage[index]).toEqual(tmp);
    });
    it('Illegal action',function(){
        action = {
            innerHTML: "Hahaha"
        }
        expect(function(){Function.modifyData(action)}).toThrowError('Illegal action: '+ action.innerHTML);
    });

});

describe('deleteData',function(){
    it('success',function(){
        index = 1;
        Function.deleteData(index);
        expect(fakeLocalstorage.length).toBe(1);
    });
    it('out of index',function(){
        index = 2;
        expect(function(){Function.deleteData(index)}).toThrowError('out of index!');
    });
});

describe('_setDatas',function(){
    it('success-modify',function(){
        index = 0;
        Function._setDatas(index,fakeForm);
        expect(fakeLocalstorage[index]).toEqual(fakeForm);
    });
    it('success-insert',function(){
        index = 2
        Function._setDatas(index,fakeForm);
        expect(fakeLocalstorage[index]).toEqual(fakeForm);
    });
});

});