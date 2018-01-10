import { NAME_EMPTY_ALERT, USER_EXIST_ALERT ,EMAIL_EMPTY_ALERT,WRONG_FORMAT} from './messages';
import Store from './store'

export default class Table{
  constructor(){
    this.store = new Store();
    this.fields = ['name', 'phone', 'email', ];
    this.formName = 'form';
  }
  insertData() {
    const formContent  = this._getFormContent();
    if (this._isValidate(formContent)) {
      this.store.setData(formContent);
      this._appendRow(formContent);
      // reset form
      document.getElementById(this.formName).reset();
    }
  }
  modifyData() {
    const index = document.getElementById(this.formName).value;
    const formContent  = this._getFormContent();
    if (this._isValidate(formContent, index)) {
      this.store.setData(formContent, index);
      this._replaceRow(index, formContent);
      // reset form
      document.forms[this.formName].style.display = 'none';
    }
    }

  _getFormContent() {
    let formContent = {}; 
    const table = this;
    this.fields.forEach( field => {
      formContent[field] = document.forms[table.formName][field].value;
    });
    return formContent;
  }

  _isValidate(formContent, index) {
    if (formContent.name === null || formContent.name === '') {
      alert(NAME_EMPTY_ALERT); 
      return false;
    } else {
      const datas = this.store.getData();
      const len = datas.length;
      for (let i = 0; i < len; i++) 
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
  }

  _isValidFormat(formContent) {
    const reg = {
      name: /^\S*$/,
      phone: /^[0-9]*$/,
      email: /^(([^<>()[\].,;:\s@"]+(.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>().,;\s@"]+.{0,1})+([^<>().,;:\s@"]{2,}|[\d.]+))$/,
    };
    for (let key in formContent)
      if (!reg[key].test(formContent[key])) {
        alert(WRONG_FORMAT + key);
        return false;
      }

    return true;
  }

  _replaceRow(index, formContent) {
    let parent = document.getElementById('datasRow');
    let oldTableRow = document.getElementById(`data${index}`);
    let newTableRow = this._createTableRow(index, formContent);
    parent.replaceChild(newTableRow, oldTableRow);
  }

  _appendRow(formContent) {
    let parent = document.getElementById('datasRow');
    let index = parent.childElementCount;
    let tableRow = this._createTableRow(index, formContent);
    parent.appendChild(tableRow);
  }

  _createTableRow(index, formContent) {
    let tableRow = document.createElement('tr');
    tableRow.id = `data${index}`;
    let tableIndex =  document.createElement('td');
    tableIndex.textContent = parseInt(index) + 1;
    tableRow.appendChild(tableIndex);

    this.fields.forEach( field => {
      let tableField = document.createElement('td');
      tableField.textContent = formContent[field];
      tableRow.appendChild(tableField);
    });
    tableRow.appendChild(this._createActionTd(index));   
    return tableRow; 
  }

  _createElement(type, props) {
    let element = document.createElement(type);
    for (let attribute in props) 
      element[attribute] = props[attribute];
    return element;
  }

  _createActionTd(index) {
    const table = this;
    // Delete Button
    const deleteSpanProps = {
      className: 'glyphicon glyphicon-trash',
      textContent: 'Delete',
    };
    let deleteSpan = this._createElement('span', deleteSpanProps);

    const deleteBtnProps = {
      type: 'button',
      id: 'deleteDate',
      className: 'btn btn-default btn-xs',
      value: index,
    };
    let deleteButton = this._createElement('button', deleteBtnProps);
    deleteButton.appendChild(deleteSpan);
    deleteButton.addEventListener('click', function(){
      table.store.deleteData(index);
      window.location.reload();
    })
    // Modify Button
    const modifySpanProps = {
      className: 'glyphicon glyphicon-pencil',
      textContent: 'Modify',
    };
    let modifySpan = this._createElement('span', modifySpanProps);

    const modifyBtnProps = {
      type: 'button',
      id: 'showModifyForm',
      className: 'btn btn-default btn-xs',
      value: index,
    };
    let modifyButton = this._createElement('button', modifyBtnProps);
    modifyButton.appendChild(modifySpan);
    modifyButton.addEventListener('click', function(){
      table.showForm(this.value);
    });

    let tableField = document.createElement('td');
    tableField.appendChild(deleteButton);
    tableField.appendChild(modifyButton);

    return tableField;
  }

  showForm(index) {
    const form = document.getElementById('form');
    if (!index) { // Insert
    form.reset();
    document.getElementById('modify_buttons').style.display = 'none';
    document.getElementById('insert_buttons').style.display = 'block';
    } else { // Modify
    document.getElementById('modify_buttons').style.display = 'block';
    document.getElementById('insert_buttons').style.display = 'none';
    const datas = this.store.getData();
    this.fields.forEach( (field) => {
      form[field].value = datas[index][field];   
    });
    form.value = index; // record data's index for save
  }
  form.style.display = 'block';
  }

  showTable() {
    const datas = this.store.getData();
    if (datas) {
      const dataCount = datas.length; 
      document.getElementById('datasRow').innerHTML = null;
      for ( let i = 0;i < dataCount;i++) this._appendRow(datas[i]); 
    }
  }

  test(text){
    return text+" Yumi"
  }
}