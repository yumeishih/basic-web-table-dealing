var storageName = 'RakutenDatas';
var contentField = {
    name:'',
    phone:'',
    email:''
};
var formAttributesCount = Object.keys(contentField).length;
var Function = new Functions();


function Functions(){
}

Functions.prototype.InsertData = function()
{
    var formName = "insertForm";
    var formContent = contentField; 
    this._getFormContent(formName,formContent);
    if (localStorage.getItem(storageName) === null) {
        var datas = [];
        localStorage[storageName] = JSON.stringify(datas);
    }
    if(this._IsValidate(formContent))
    {
        var datas = JSON.parse(localStorage[storageName]);
        var dataCount = datas.length; 
        this._Setdatas(dataCount,formContent);
        this._AppendElement(dataCount,formContent);
        //reset form
        document.getElementById(formName).reset();
    }
};

Functions.prototype.DeleteData = function(index)
{
    var datas = JSON.parse(localStorage[storageName]);
    datas.splice(index, 1);
    localStorage[storageName] = JSON.stringify(datas);
    window.location.reload();
};

Functions.prototype.ModifyData = function(action) {
   var formName = "modifyForm"
   var formContent = contentField; 
    this._getFormContent(formName,formContent);
   console.log(action.innerHTML);
    if (action.innerHTML === "Cancel") window.location.reload(); 
    else{
        var index = document.getElementById(formName).value;
        if(this._IsValidate(formContent,index)){
            this._Setdatas(index,formContent);
            this._ReplaceElement(index,formContent);
        }
    }
};

Functions.prototype._getFormContent = function(formName,formContent)
{
    for(var k in contentField){
        formContent[k] = document.forms[formName][k].value;
    }
}

Functions.prototype._IsValidate = function(formContent,index)
{
    if(formContent.name === null||formContent.name===""){
        this.alertMsg(0); //NAME_EMPTY_ALERT
        return false;
    }
    else{
        var datas = JSON.parse(localStorage[storageName]);
        var len = datas.length;
        for(var i=0;i<len;i++)
        {
            if(i === parseInt(index)) continue; 
            if(formContent.name === datas[i].name){
                this.alertMsg(1); //USER_EXIST_ALERT
                return false;
            }
        }
    }
    if(formContent.email === null||formContent.email === ""){
        this.alertMsg(2); //EMAIL_EMPTY_ALERT
        return false;
    }
    return this._IsValidFormat(formContent)
};

Functions.prototype._IsValidFormat = function(formContent)
{
    var reg = {
        name:/^\S*$/,
        phone:/^[0-9]*$/,
        email:/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/
    }
    for(var key in formContent)
    {
        if(!reg[key].test(formContent[key])) {
            this.alertMsg(3,key); //WRONG_FORMAT
            return false;
        }
    }
    return true;
};

Functions.prototype._Setdatas = function(index,formContent)
{
    var datas = JSON.parse(localStorage[storageName]);
    if(index === datas.length) datas[index] = contentField;
    for(var k in contentField)
    {
        datas[index][k] = formContent[k];
    }
    localStorage[storageName] = JSON.stringify(datas);
};

Functions.prototype._ReplaceElement = function(index,formContent)
{
    var parent = document.getElementById("datasRow");
    var child = document.getElementById("data" + index);
    var tableRow = this._CreateElement(index,formContent);
    parent.replaceChild(tableRow,child);
}

Functions.prototype._AppendElement = function(index,formContent){
    var parent = document.getElementById("datasRow");
    var tableRow = this._CreateElement(index,formContent);
    parent.appendChild(tableRow);
}

Functions.prototype._CreateElement = function(index,formContent){
    var tableRow = document.createElement("tr");
    tableRow.id = "data" + index;
    
    var tableIndex =  document.createElement("td");
    var content = document.createTextNode(index+1);
    var tableIndex =  document.createElement("td");
    tableIndex.appendChild(content);
    tableRow.appendChild(tableIndex);
    
    for(var k in contentField){
        var tableField = document.createElement("td");
        var content = document.createTextNode(formContent[k]);
        tableField.appendChild(content);
        tableRow.appendChild(tableField);
    }
    tableRow.appendChild(this._CreateButton(index));   
    return tableRow; 
}

Functions.prototype._CreateButton = function(index){
    var tableField = document.createElement("td");
    //Delete Button
    var deleteButton = document.createElement("button");
    deleteButton.id="deleteData";
    //deleteButton.type="button";
    deleteButton.classList .add("deleteDataClass","btn","btn-default","btn-xs");
    deleteButton.value = index;
    deleteButton.addEventListener("click",function(){Function.DeleteData(this.value);});
    var deleteSpan = document.createElement("span");
    deleteSpan.classList.add("glyphicon","glyphicon-trash");
    var deleteText = document.createTextNode("Delete");
    deleteButton.appendChild(deleteSpan).appendChild(deleteText);
    tableField.appendChild(deleteButton);
    //Modify Button
    var modifyButton = document.createElement("button");
    modifyButton.id="showModifyForm";
    modifyButton.classList.add("showFormClass","btn","btn-default","btn-xs");
    modifyButton.value = index;
    modifyButton.addEventListener("click", function(){ Function.ShowModifyForm(this.value);});
    var modifySpan = document.createElement("span");
    modifySpan.classList.add("glyphicon","glyphicon-pencil");
    var modifyText = document.createTextNode("Modify");
    modifyButton.appendChild(modifySpan).appendChild(modifyText);
    tableField.appendChild(modifyButton);

    return tableField;
}

Functions.prototype.ShowModifyForm = function(index){
    var form = document.getElementById("modifyForm");
    form.style.display = "block";
    if(document.getElementById("insertForm").style.display === "block") document.getElementById("insertForm").style.display = "none";
    var datas = JSON.parse(localStorage[storageName]);
    for(var k in contentField)
    {
        form[k].value = datas[index][k];
    }
    form.value = index;
}

Functions.prototype.ShowInsertForm = function()
{
    var form = document.getElementById("insertForm");
    if(form.style.display === "block") form.style.display = "none";
    else {
        if(document.getElementById("modifyForm").style.display === "block") document.getElementById("modifyForm").style.display = "none";
        form.style.display = "block";
    }
}

Functions.prototype.Showtable = function()
{
    if (localStorage.getItem(storageName) === null);
    else{
        var datas = JSON.parse(localStorage[storageName]);
        var dataCount = datas.length; 
        document.getElementById("datasRow").innerHTML = null;
        for( var i=0;i<dataCount;i++){
            this._AppendElement(i,datas[i]);
        }
    }
};

var window;
Functions.prototype.testing =function()
{
    console.log("Hello world from functions!");
    return true;
};

Functions.prototype.alertMsg = function(msgIndex,key="")
{
    alert(alertMsg[Object.keys(alertMsg)[msgIndex]]+key);
}

if(typeof window === "undefined") module.exports = Functions;
