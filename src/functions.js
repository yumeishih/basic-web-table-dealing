function Table () {
  this.store = new Store();
  this.fields = ['name','phone','email'];
  this.formName = 'form';
}

Table.prototype.insertData = function () {
  var formContent  = this._getFormContent();
  if (this._isValidate(formContent)) {
    this.store.setData(formContent);
    this._appendElement(formContent);
    // reset form
    document.getElementById(this.formName).reset();
  }
};

Table.prototype.modifyData = function (action) {
  var formContent = this._getFormContent();
  if (action.innerHTML === 'Cancel') document.forms[this.formName].style.display = 'none';
  else if (action.innerHTML === 'Save') {
    var index = document.getElementById(this.formName).value;
    if (this._isValidate(formContent,index)) {
      this.store.setData(formContent,index);
      this._replaceElement(index,formContent);
      // reset form
      document.forms[this.formName].style.display = 'none';
    }
  } else 
    throw new Error('Illegal action: '+ action.innerHTML);
  
};

Table.prototype._getFormContent = function () {
  var formContent ={}; 
  var table = this;
  this.fields.forEach(function(field){
    formContent[field] = document.forms[table.formName][field].value;
  });
  return formContent;
};

Table.prototype._isValidate = function (formContent,index) {
  if (formContent.name === null || formContent.name === '') {
    alert(NAME_EMPTY_ALERT); 
    return false;
  } else {
    var datas = this.store.getData();
    var len = datas.length;
    for (var i = 0; i<len; i++) {
      if (i === parseInt(index)) continue; 
      if (formContent.name === datas[i].name) {
        alert(USER_EXIST_ALERT); 
        return false;
      }
    }
  }
  if (formContent.email === null || formContent.email === '') {
    alert(EMAIL_EMPTY_ALERT); 
    return false;
  }
  return this._isValidFormat(formContent);
};

Table.prototype._isValidFormat = function (formContent) {
  var reg = {
    name: /^\S*$/,
    phone: /^[0-9]*$/,
    email: /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>().,;\s@"]+.{0,1})+([^<>().,;:\s@"]{2,}|[\d.]+))$/,
  };
  for (var key in formContent)
    if (!reg[key].test(formContent[key])) {
      alert(WRONG_FORMAT+key);
      return false;
    }
    
  return true;
};

Table.prototype._replaceElement = function (index,formContent) {
  var parent = document.getElementById('datasRow');
  var child = document.getElementById('data' + index);
  var tableRow = this._createElement(index,formContent);
  parent.replaceChild(tableRow,child);
};

Table.prototype._appendElement = function (formContent) {
  var parent = document.getElementById('datasRow');
  var index = parent.childElementCount;
  var tableRow = this._createElement(index,formContent);
  parent.appendChild(tableRow);
};

Table.prototype._createElement = function (index,formContent) {
  var tableRow = document.createElement('tr');
  tableRow.id = 'data' + index;

  var tableIndex =  document.createElement('td');
  var tmp = parseInt(index)+1;
  var contentIndex = document.createTextNode(tmp);
  tableIndex.appendChild(contentIndex);
  tableRow.appendChild(tableIndex);
  this.fields.forEach(function(field){
    var tableField = document.createElement('td');
    var content = document.createTextNode(formContent[field]);
    tableField.appendChild(content);
    tableRow.appendChild(tableField);
  });
  tableRow.appendChild(this._createButton(index));   
  return tableRow; 
};

Table.prototype._createButton = function (index) {
  var table = this;
  var tableField = document.createElement('td');
  // Delete Button
  var deleteButton = document.createElement('button');
  deleteButton.id = 'deleteData';
  deleteButton.classList .add('deleteDataClass','btn','btn-default','btn-xs');
  deleteButton.value = index;
  deleteButton.addEventListener('click',function () {
    table.store.deleteData(index);
    window.location.reload();
  });
  var deleteSpan = document.createElement('span');
  deleteSpan.classList.add('glyphicon','glyphicon-trash');
  var deleteText = document.createTextNode('Delete');
  deleteButton.appendChild(deleteSpan).appendChild(deleteText);
  tableField.appendChild(deleteButton);
  // Modify Button
  var modifyButton = document.createElement('button');
  modifyButton.id = 'showModifyForm';
  modifyButton.classList.add('showFormClass','btn','btn-default','btn-xs');
  modifyButton.value = index;
  modifyButton.addEventListener('click', function () {
    table.showForm(this.value);
  });
  var modifySpan = document.createElement('span');
  modifySpan.classList.add('glyphicon','glyphicon-pencil');
  var modifyText = document.createTextNode('Modify');
  modifyButton.appendChild(modifySpan).appendChild(modifyText);
  tableField.appendChild(modifyButton);

  return tableField;
};

Table.prototype.showForm = function(index){
  var form = document.getElementById('form');
  if(!index){ // Insert
    document.getElementById('modify_buttons').style.display = 'none';
    document.getElementById('insert_buttons').style.display = 'block';
  }else{ // Modify
    document.getElementById('modify_buttons').style.display = 'block';
    document.getElementById('insert_buttons').style.display = 'none';
    var datas = this.store.getData();
    this.fields.forEach(function(field){
      form[field].value = datas[index][field];   
    });
    form.value = index; // record data's index for save
  }
  form.style.display = 'block';
};

Table.prototype.showTable = function () {
  var datas = this.store.getData();
  if (datas){
    var dataCount = datas.length; 
    document.getElementById('datasRow').innerHTML = null;
    for ( var i = 0;i<dataCount;i++) this._appendElement(datas[i]); 
  }
};

var window;
if (typeof window === 'undefined') {
  var document ={
    forms:{
      'modifyForm':{
        style : {
          display: 'none',
        },
      },
    },
    getElementById : function () {
      return {
        value : 0,
        reset : function () {},
      };
    },
  };
  window = {
    location: {
      reload: function () {},
    },
  };
  var alert = function(){};
  module.exports = Table;
}
