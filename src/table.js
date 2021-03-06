if(!window) var Store = function(){
  this.deleteData = function(){};
  this.setData = function(){};
  this.getData = function(){};
};


function Table () {
  this.store = new Store();
  this.fields = ['name', 'phone', 'email', ];
  this.formName = 'form';
}

Table.prototype.insertData = function () {
  var formContent  = this._getFormContent();
  if (this._isValidate(formContent)) {
    this.store.setData(formContent);
    this._appendRow(formContent);
    // reset form
    document.getElementById(this.formName).reset();
  }
};

Table.prototype.modifyData = function () {
  var index = document.getElementById(this.formName).value;
  var formContent  = this._getFormContent();
  if (this._isValidate(formContent, index)) {
    this.store.setData(formContent, index);
    this._replaceRow(index, formContent);
    // reset form
    document.forms[this.formName].style.display = 'none';
  }
};

Table.prototype._getFormContent = function () {
  var formContent = {}; 
  var table = this;
  this.fields.forEach(function (field) {
    formContent[field] = document.forms[table.formName][field].value;
  });
  return formContent;
};

Table.prototype._isValidate = function (formContent, index) {
  if (formContent.name === null || formContent.name === '') {
    alert(NAME_EMPTY_ALERT); 
    return false;
  } else {
    var datas = this.store.getData();
    var len = datas.length;
    for (var i = 0; i < len; i++) 
      if (i !== parseInt(index) && formContent.name === datas[i].name) {
        alert(USER_EXIST_ALERT); 
        return false;
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
      alert(WRONG_FORMAT + key);
      return false;
    }
    
  return true;
};

Table.prototype._replaceRow = function (index, formContent) {
  var parent = document.getElementById('datasRow');
  var oldTableRow = document.getElementById('data' + index);
  var newTableRow = this._createTableRow(index, formContent);
  parent.replaceChild(newTableRow, oldTableRow);
};

Table.prototype._appendRow = function (formContent) {
  var parent = document.getElementById('datasRow');
  var index = parent.childElementCount;
  var tableRow = this._createTableRow(index, formContent);
  parent.appendChild(tableRow);
};

Table.prototype._createTableRow = function (index, formContent) {
  var tableRow = document.createElement('tr');
  tableRow.id = 'data' + index;
  var tableIndex =  document.createElement('td');
  tableIndex.textContent = parseInt(index) + 1;
  tableRow.appendChild(tableIndex);

  this.fields.forEach(function (field) {
    var tableField = document.createElement('td');
    tableField.textContent = formContent[field];
    tableRow.appendChild(tableField);
  });
  tableRow.appendChild(this._createActionTd(index));   
  return tableRow; 
};

Table.prototype._createElement = function (type, props) {
  var element = document.createElement(type);
  for (var attribute in props) 
    element[attribute] = props[attribute];
  
  return element;
};

Table.prototype._createActionTd = function (index) {
  var table = this;
  // Delete Button
  var deleteSpanProps = {
    className: 'glyphicon glyphicon-trash',
    textContent: 'Delete',
  };
  var deleteSpan = this._createElement('span', deleteSpanProps);

  var deleteBtnProps = {
    type: 'button',
    id: 'deleteDate',
    className: 'btn btn-default btn-xs',
    value: index,
  };
  var deleteButton = this._createElement('button', deleteBtnProps);
  deleteButton.appendChild(deleteSpan);
  deleteButton.addEventListener('click', function () {
    table.store.deleteData(index);
    window.location.reload();
  });
  // Modify Button
  var modifySpanProps = {
    className: 'glyphicon glyphicon-pencil',
    textContent: 'Modify',
  };
  var modifySpan = this._createElement('span', modifySpanProps);

  var modifyBtnProps = {
    type: 'button',
    id: 'showModifyForm',
    className: 'btn btn-default btn-xs',
    value: index,
  };
  var modifyButton = this._createElement('button', modifyBtnProps);
  modifyButton.appendChild(modifySpan);
  modifyButton.addEventListener('click', function () {
    table.showForm(this.value);
  });

  var tableField = document.createElement('td');
  tableField.appendChild(deleteButton);
  tableField.appendChild(modifyButton);

  return tableField;
};

Table.prototype.showForm = function (index) {
  var form = document.getElementById('form');
  if (!index) { // Insert
    form.reset();
    document.getElementById('modify_buttons').style.display = 'none';
    document.getElementById('insert_buttons').style.display = 'block';
  } else { // Modify
    document.getElementById('modify_buttons').style.display = 'block';
    document.getElementById('insert_buttons').style.display = 'none';
    var datas = this.store.getData();
    this.fields.forEach(function (field) {
      form[field].value = datas[index][field];   
    });
    form.value = index; // record data's index for save
  }
  form.style.display = 'block';
};

Table.prototype.showTable = function () {
  var datas = this.store.getData();
  if (datas) {
    var dataCount = datas.length; 
    document.getElementById('datasRow').innerHTML = null;
    for ( var i = 0;i < dataCount;i++) this._appendRow(datas[i]); 
  }
};

var window;
if (typeof window === 'undefined') {
  var document = {
    forms: {
      'form': {
        style: {
          display: 'none',
        },
      },
    },
    getElementById: function () {
      return {
        value: 0,
        reset: function () {},
      };
    },
  };
  window = {
      location: {
        reload: function () {},
      },
  };
  var alert = function () {};
  var NAME_EMPTY_ALERT = 'Name can not be empty!';
  var USER_EXIST_ALERT = 'User already exist!';
  var EMAIL_EMPTY_ALERT = 'Email can not be empty!';
  var WRONG_FORMAT = 'Wrong Format: ';
  module.exports = Table;
}
