var storageName = 'RakutenDatas';
var contentField = {
  name: '',
  phone: '',
  email: '',
};
var Function = new Table();

function Table () {
}

Table.prototype.insertData = function () {
  var formName = 'insertForm';
  var formContent = contentField; 
  this._getFormContent(formName,formContent);
  if (localStorage.getItem(storageName) === null) {
    var datasInit = [];
    localStorage[storageName] = JSON.stringify(datasInit);
  }
  if (this._isValidate(formContent)) {
    var datas = JSON.parse(localStorage[storageName]);
    var dataCount = datas.length; 
    this._setDatas(dataCount,formContent);
    this._appendElement(dataCount,formContent);
    // reset form
    document.getElementById(formName).reset();
  }
};

Table.prototype.deleteData = function (index) {
  var datas = JSON.parse(localStorage[storageName]);
  datas.splice(index, 1);
  localStorage[storageName] = JSON.stringify(datas);
  window.location.reload();
};

Table.prototype.modifyData = function (action) {
  var formName = 'modifyForm';
  var formContent = contentField; 
  this._getFormContent(formName,formContent);
  console.log(action.innerHTML);
  if (action.innerHTML === 'Cancel') document.forms[formName].style.display = 'none';
  else {
    var index = document.getElementById(formName).value;
    if (this._isValidate(formContent,index)) {
      this._setDatas(index,formContent);
      this._replaceElement(index,formContent);
      // reset form
      document.forms[formName].style.display = 'none';
    }
  }
};

Table.prototype._getFormContent = function (formName,formContent) {
  for (var k in contentField) formContent[k] = document.forms[formName][k].value;
};

Table.prototype._isValidate = function (formContent,index) {
  if (formContent.name === null || formContent.name === '') {
    this.alertMsg(0); // NAME_EMPTY_ALERT
    return false;
  } else {
    var datas = JSON.parse(localStorage[storageName]);
    var len = datas.length;
    for (var i = 0; i<len; i++) {
      if (i === parseInt(index)) continue; 
      if (formContent.name === datas[i].name) {
        this.alertMsg(1); // USER_EXIST_ALERT
        return false;
      }
    }
  }
  if (formContent.email === null || formContent.email === '') {
    this.alertMsg(2); // EMAIL_EMPTY_ALERT
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
      this.alertMsg(3,key); // WRONG_FORMAT
      return false;
    }
    
  return true;
};

Table.prototype._setDatas = function (index,formContent) {
  var datas = JSON.parse(localStorage[storageName]);
  if (index === datas.length) datas[index] = contentField;
  for (var k in contentField) datas[index][k] = formContent[k];
  localStorage[storageName] = JSON.stringify(datas);
};

Table.prototype._replaceElement = function (index,formContent) {
  var parent = document.getElementById('datasRow');
  var child = document.getElementById('data' + index);
  var tableRow = this._createElement(index,formContent);
  parent.replaceChild(tableRow,child);
};

Table.prototype._appendElement = function (index,formContent) {
  var parent = document.getElementById('datasRow');
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
    
  for (var k in contentField) {
    var tableField = document.createElement('td');
    var content = document.createTextNode(formContent[k]);
    tableField.appendChild(content);
    tableRow.appendChild(tableField);
  }
  tableRow.appendChild(this._createButton(index));   
  return tableRow; 
};

Table.prototype._createButton = function (index) {
  var tableField = document.createElement('td');
  // Delete Button
  var deleteButton = document.createElement('button');
  deleteButton.id = 'deleteData';
  deleteButton.classList .add('deleteDataClass','btn','btn-default','btn-xs');
  deleteButton.value = index;
  deleteButton.addEventListener('click',function () {
    Function.deleteData(this.value);
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
    Function.showModifyForm(this.value);
  });
  var modifySpan = document.createElement('span');
  modifySpan.classList.add('glyphicon','glyphicon-pencil');
  var modifyText = document.createTextNode('Modify');
  modifyButton.appendChild(modifySpan).appendChild(modifyText);
  tableField.appendChild(modifyButton);

  return tableField;
};

Table.prototype.showModifyForm = function (index) {
  var form = document.getElementById('modifyForm');
  form.style.display = 'block';
  if (document.getElementById('insertForm').style.display === 'block') document.getElementById('insertForm').style.display = 'none';
  var datas = JSON.parse(localStorage[storageName]);
  for (var k in contentField) form[k].value = datas[index][k];   
  form.value = index;
};

Table.prototype.showInsertForm = function () {
  var form = document.getElementById('insertForm');
  if (form.style.display === 'block') form.style.display = 'none';
  else {
    if (document.getElementById('modifyForm').style.display === 'block') document.getElementById('modifyForm').style.display = 'none';
    form.style.display = 'block';
  }
};

Table.prototype.showTable = function () {
  if (localStorage.getItem(storageName) === null);
  else {
    var datas = JSON.parse(localStorage[storageName]);
    var dataCount = datas.length; 
    document.getElementById('datasRow').innerHTML = null;
    for ( var i = 0;i<dataCount;i++) this._appendElement(i,datas[i]); 
  }
};

Table.prototype.alertMsg = function (msgIndex,key) {
  if (key === undefined) alert(alertMsg[Object.keys(alertMsg)[msgIndex]]);
  else alert(alertMsg[Object.keys(alertMsg)[msgIndex]]+key);  
};

var window;
if (typeof window === 'undefined') module.exports = Table;
