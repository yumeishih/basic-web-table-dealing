function Functions(){
}

Functions.prototype.storageName = "RakutenDatas";
Functions.prototype.attributes = ["name","phone","email"];
Functions.prototype.attributesCount = 3;
    
Functions.prototype.InsertData = function()
{
    var formName = "insertForm";
    if (localStorage.getItem(this.storageName) === null) {
        var datas = new Array();
        localStorage[this.storageName] = JSON.stringify(datas);
    }
    if(this._IsValidate(formName))
    {
        var datas = JSON.parse(localStorage[this.storageName]);
        var dataCount = datas.length; 
        this._Setdatas(dataCount,formName);
        window.location.reload(); 
    }
};

Functions.prototype.DeleteData = function(index)
{
    console.log(index);
    var datas = JSON.parse(localStorage[this.storageName]);
    datas.splice(index, 1);
    localStorage[this.storageName] = JSON.stringify(datas);
    this.Showtable();
};

Functions.prototype.ModifyData = function(action)
{
   var formName = "modifyForm"
   console.log(action.innerHTML);
    if (action.innerHTML == "Cancel") window.location.reload(); 
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
    var formContent = 
    {
        "name":document.forms[formName]["name"].value,
        "phone":document.forms[formName]["phone"].value,
        "email":document.forms[formName]["email"].value
    }
    if(formContent["name"]===null||formContent["name"]===""){
        this.alertMsg(0); //NAME_EMPTY_ALERT
        return false;
    }
    else{
        var datas = JSON.parse(localStorage[this.storageName]);
        var len = datas.length;
        for(var i=0;i<len;i++)
        {
            if(i==index) continue;
            if(formContent["name"] == datas[i][0]){
                this.alertMsg(1); //USER_EXIST_ALERT
                return false;
            }
        }
    }
    if(formContent["email"]===null||formContent["email"]===""){
        this.alertMsg(2); //EMAIL_EMPTY_ALERT
        return false;
    }
    return this._IsValidFormat(formContent)
};

Functions.prototype._IsValidFormat = function(formContent)
{
    var reg = {
        "name":/^/,
        "phone":/^[0-9]*$/,
        "email":/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/
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
    var datas = JSON.parse(localStorage[this.storageName]);
    if(index == datas.length) datas[index] = new Array();
    for(var i=0;i<this.attributesCount;i++)
    {
        datas[index][i] = document.forms[formName][this.attributes[i]].value;
    }
    localStorage[this.storageName] = JSON.stringify(datas);
};

Functions.prototype.ShowForm = function(formName)
{

    if(formName.id=="showModifyForm")
    {
        var index = formName.value; 
        var form = document.getElementById("modifyForm");
        form.style.display = "block";
        var datas = JSON.parse(localStorage[this.storageName]);
        for(var i=0;i<this.attributesCount;i++)
        {
            form[this.attributes[i]].value = datas[index][i];
        }
        form.value = index;
    }
    else{
        var form = document.getElementById(formName.value);
        if(form.style.display == "block") form.style.display = "none";
        else form.style.display = "block";
    }
};

Functions.prototype.Showtable = function()
{
    var htmlString = "";
    var actionString1 = "<button type=\"button\" class=\"deleteDataClass btn btn-default btn-xs\" value=";
    var actionString2 = "><span class=\"glyphicon glyphicon-trash\"></span> Delete</button>&nbsp;<button id=\"showModifyForm\" class=\"showFormClass btn btn-default btn-xs\" value =";
    var actionString3 = "><span class=\"glyphicon glyphicon-pencil\"></span> Modify</button>";
    if (localStorage.getItem(this.storageName) === null);
    else{
        var datas = JSON.parse(localStorage[this.storageName]);
        var dataCount = datas.length;
        var cellCount = 0
        if (dataCount !=0) cellCount = datas[0].length;      
        for( var i=0;i<dataCount;i++){
            htmlString = htmlString +"<tr id=\"data"+i+"\"><td>" + (i+1) + "</td>";
            for(var j=0;j < 3 ; j++){
                htmlString = htmlString + "<td>"+datas[i][j] + "</td>";
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

 
if(typeof window == "undefined") module.exports = Functions;
