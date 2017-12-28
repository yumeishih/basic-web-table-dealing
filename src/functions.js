var storageName = 'RakutenDatas';
var contentField = {
    name:'',
    phone:'',
    email:''
};
var formAttributesCount = Object.keys(contentField).length;



function Functions(){
}

Functions.prototype.InsertData = function()
{
    var formName = "insertForm";
    if (localStorage.getItem(storageName) === null) {
        var datas = [];
        localStorage[storageName] = JSON.stringify(datas);
    }
    if(this._IsValidate(formName))
    {
        var datas = JSON.parse(localStorage[storageName]);
        var dataCount = datas.length; 
        this._Setdatas(dataCount,formName);
        this._AppendData(dataCount,formName);

    }
};

Functions.prototype.DeleteData = function(index)
{
    console.log(index);
    var datas = JSON.parse(localStorage[storageName]);
    datas.splice(index, 1);
    localStorage[storageName] = JSON.stringify(datas);
    window.location.reload();
};

Functions.prototype.ModifyData = function(action) {
   var formName = "modifyForm"
   console.log(action.innerHTML);
    if (action.innerHTML === "Cancel") window.location.reload(); 
    else{
        var index = document.getElementById(formName).value;
        if(this._IsValidate(formName,index)){
            this._Setdatas(index,formName);
            window.location.reload(); 
        }
    }
};

Functions.prototype._IsValidate = function(formName,index)
{
    var formContent = contentField; 
    for(var k in contentField){
        formContent[k] = document.forms[formName][k].value;
    }
    if(formContent.name === null|| formContent.name ===""){
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

Functions.prototype._Setdatas = function(index,formName)
{
    var datas = JSON.parse(localStorage[storageName]);
    
    if(index === datas.length) datas[index] = contentField;
    for(var k in contentField)
    {
        datas[index][k] = document.forms[formName][k].value;
    }
    localStorage[storageName] = JSON.stringify(datas);
};
Functions.prototype._AppendData = function(index,formName){
    var tableRow = document.createElement("tr");
    tableRow.id = "data" + index;
    var tableIndex =  document.createElement("td");
    tableIndex.innerHTML = index+1;
    tableRow.appendChild(tableIndex);
    for(var k in contentField){
        var tableField = document.createElement("td");
        tableField.innerHTML = document.forms[formName][k].value;
        tableRow.appendChild(tableField);
    }
    var tableField = document.createElement("td");
    //Delete Button
    var deleteButton = document.createElement("button");
    deleteButton.type="button";
    deleteButton.classList .add("deleteDataClass","btn","btn-default","btn-xs");
    deleteButton.value = index;
    var deleteSpan = document.createElement("span");
    deleteSpan.classList.add("glyphicon","glyphicon-trash");
    var deleteText = document.createTextNode("Delete");
    deleteButton.appendChild(deleteSpan).appendChild(deleteText);
    // deleteButton.appendChild(deleteText);
    tableField.appendChild(deleteButton);
    tableField.innerHTML += "&nbsp;";
    //Modify Button
    var modifyButton = document.createElement("button");
    modifyButton.id="showModifyForm";
    modifyButton.classList.add("showFormClass","btn","btn-default","btn-xs");
    modifyButton.value = index;
    var modifySpan = document.createElement("span");
    modifySpan.classList.add("glyphicon","glyphicon-pencil");
    var modifyText = document.createTextNode("Modify");
    modifyButton.appendChild(modifySpan);
    modifyButton.appendChild(modifyText);
    tableField.appendChild(modifyButton);
    tableRow.appendChild(tableField);
    var parent = document.getElementById("datasRow");
    parent.appendChild(tableRow);
    //reset form
    document.getElementById(formName).reset();
}

Functions.prototype.ShowForm = function(formName)
{
    if(formName.id === "showModifyForm")
    {
        var index = formName.value; 
        var form = document.getElementById("modifyForm");
        form.style.display = "block";
        var datas = JSON.parse(localStorage[storageName]);
        for(var k in contentField)
        {
            form[k].value = datas[index][k];
        }
        form.value = index;
    }
    else{
        var form = document.getElementById(formName.value);
        if(form.style.display === "block") form.style.display = "none";
        else form.style.display = "block";
    }
};

Functions.prototype.Showtable = function()
{
    var htmlString = "";
    var actionString1 = "<button type=\"button\" class=\"deleteDataClass btn btn-default btn-xs\" value=";
    var actionString2 = "><span class=\"glyphicon glyphicon-trash\"></span> Delete</button>&nbsp;<button id=\"showModifyForm\" class=\"showFormClass btn btn-default btn-xs\" value =";
    var actionString3 = "><span class=\"glyphicon glyphicon-pencil\"></span> Modify</button>";
    if (localStorage.getItem(storageName) === null);
    else{
        var datas = JSON.parse(localStorage[storageName]);
        var dataCount = datas.length; 
        for( var i=0;i<dataCount;i++){
            htmlString = htmlString +"<tr id=\"data"+i+"\"><td>" + (i+1) + "</td>";
            for(var k in contentField){
                htmlString = htmlString + "<td>"+ datas[i][k] + "</td>";
            }
            htmlString = htmlString + "<td>"+actionString1+i+actionString2+i+actionString3+ "</td></tr>";
        }
        document.getElementById("datasRow").innerHTML = htmlString;
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
