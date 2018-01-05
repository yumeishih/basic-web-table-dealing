var Table = require('../src/table.js');
var Table = new Table();

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

    spyOn(Table,'_appendRow');
    spyOn(Table,'_replaceRow');
    spyOn(Table,'_getFormContent').and.returnValue(fakeForm);
    spyOn(Table.store,'getData').and.returnValue(fakeLocalstorage);
    spyOn(Table.store,'setData').and.callFake(function(formContent,index){
      if(index===undefined){ fakeLocalstorage.push(formContent);}
      else {fakeLocalstorage[index] = formContent;}
    });
    });
  describe('_isValidFormat',function(){

    it('success',function(){
      expect(Table._isValidFormat(fakeForm)).toBeTruthy();
    });
    it('name format error',function(){
      fakeForm.name = "    "; 
      expect(Table._isValidFormat(fakeForm)).toBeFalsy();
    });
    it('phone format error',function(){
      fakeForm.phone = "aaaaaaa";  
      expect(Table._isValidFormat(fakeForm)).toBeFalsy();
    });
    it('email format error',function(){
      fakeForm.email = "wrongEmailFomat"; 
      expect(Table._isValidFormat(fakeForm)).toBeFalsy();
    });
  });

  describe('_isValidate',function(){
    beforeEach(function(){
      index = fakeLocalstorage.length;
    });
    it('success',function(){
      expect(Table._isValidate(fakeForm,index)).toBeTruthy();
    });
    it('name empty',function(){
      fakeForm.name = "";
      expect(Table._isValidate(fakeForm,index)).toBeFalsy();
    });
    it('user exist',function(){
      fakeForm.name = "fifi";
      expect(Table._isValidate(fakeForm,index)).toBeFalsy();
    });
    it('email empty',function(){
      fakeForm.email = "";
      expect(Table._isValidate(fakeForm,index)).toBeFalsy();
    });
  });

  describe('insertData',function(){
    it('success',function(){
      Table.insertData();
      //console.log(fakeLocalstorage[2]);
      expect(fakeLocalstorage[2]).toEqual(fakeForm);
    });

  });

  describe('modifyData',function(){
    var action;
    beforeEach(function(){
      index = 0
    });
    it('sucess',function(){
      action = {
        innerHTML: "Save"
      }
      Table.modifyData(action);
      expect(fakeLocalstorage[index]).toEqual(fakeForm);
    });
  });

  // describe('deleteData',function(){
  //   it('success',function(){
  //     index = 1;
  //     Function.deleteData(index);
  //     expect(fakeLocalstorage.length).toBe(1);
  //   });
  //   it('out of index',function(){
  //     index = 2;
  //     expect(function(){Function.deleteData(index)}).toThrowError('out of index!');
  //   });
  // });

  // describe('_setDatas',function(){
  //   it('success-modify',function(){
  //     index = 0;
  //     Function._setDatas(index,fakeForm);
  //     expect(fakeLocalstorage[index]).toEqual(fakeForm);
  //   });
  //   it('success-insert',function(){
  //     index = 2
  //     Function._setDatas(index,fakeForm);
  //     expect(fakeLocalstorage[index]).toEqual(fakeForm);
  //   });
  // });

});