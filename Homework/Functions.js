var storageName = "RakutenDatas";
var attributes = ["name","phone","email"];
var attributesCount = attributes.length;
var Functions = new Functions();

function Functions() {

this.InsertData = function()
{
    var formName = "insertForm";
    if (localStorage.getItem(storageName) === null) {
        var datas = new Array();
        localStorage[storageName] = JSON.stringify(datas);
    }
    if(this._IsValidate(formName))
    {
        var datas = JSON.parse(localStorage[storageName]);
        var dataCount = datas.length; 
        this._Setdatas(dataCount,formName);
        window.location.reload(); 
    }
}

this.DeleteData = function(index)
{
    var datas = JSON.parse(localStorage[storageName]);
    datas.splice(index, 1);
    localStorage[storageName] = JSON.stringify(datas);
    this.Showtable();
}

this.ModifyData = function(action)
{
   var formName = "modifyForm"
    if (action.innerHTML =="Cancel");
    else{
        index = document.getElementById(formName).value;
        if(this._IsValidate(formName,index)){
            this._Setdatas(index,formName);
            window.location.reload(); 
        }
    }
}

this._IsValidate = function(formName,index)
{
    var name = document.forms[formName]["name"].value;
    var phone = document.forms[formName]["phone"].value;
    var email =  document.forms[formName]["email"].value;
    if(name===null||name===""){
        alert("Name can not be empty!");
        return false;
    }
    else{
        var datas = JSON.parse(localStorage[storageName]);
        var len = datas.length;
        for(i=0;i<len;i++)
        {
            if(i==index) continue;
            if(name == datas[i][0]){
                alert("User already exist!");
                return false;
            }
        }
    }
    if(email===null||email===""){
        alert("Email can not be empty!");
        return false;
    }
    if(!this._IsValidFormat("name",name)) {
        alert("Wrong Name Format!");
        return false;
    } 
    else if(!this._IsValidFormat("phone",phone)) {
        alert("Wrong Phone Format!");
        return false;
    }
   else  if(!this._IsValidFormat("email",email)) {
        alert("Wrong Email Format!");
        return false;
    }
    return true;
}

this._IsValidFormat = function(attributeName,attributeValue)
{
    var reg = {
        "name":/^/,
        "phone":/^[0-9]*$/,
        "email":/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+([^<>()\.,;:\s@\"]{2,}|[\d\.]+))$/
    }
    return reg[attributeName].test(attributeValue);
}

this._Setdatas = function(index,formName)
{
    var datas = JSON.parse(localStorage[storageName]);
    if(index == datas.length) datas[index] = new Array();
    for(i=0;i<attributesCount;i++)
    {
        datas[index][i] = document.forms[formName][attributes[i]].value;
    }
    localStorage[storageName] = JSON.stringify(datas);
}

this.ShowForm = function(formName,index)
{
    var form = document.getElementById(formName.value); 
    if (formName.value == "modifyForm")
    {
        form.style.display = "block";
        var datas = JSON.parse(localStorage[storageName]);
        for(i=0;i<attributesCount;i++)
        {
            form[attributes[i]].value = datas[index][i];
        }
        form.value = index;
    }
    else{
        if(form.style.display == "block") form.style.display = "none";
        else form.style.display = "block";
    }
}

this.Showtable = function()
{
    var htmlString = "";
    var actionString1 = "<button type=\"button\" class=\"btn btn-default btn-xs\" onclick=\"Functions.DeleteData(";
    var actionString2 = ")\"><span class=\"glyphicon glyphicon-trash\"></span> Delete</button>&nbsp;<button class=\"btn btn-default btn-xs\" onclick = \"Functions.ShowForm(this,";
    var actionString3 = ")\" value = \"modifyForm\"><span class=\"glyphicon glyphicon-pencil\"></span> Modify</button>";
    if (localStorage.getItem(storageName) === null);
    else{
        var datas = JSON.parse(localStorage[storageName]);
        var dataCount = datas.length;
        var cellCount = 0
        if (dataCount !=0) cellCount = datas[0].length;      
        for(i=0;i<dataCount;i++){
            htmlString = htmlString +"<tr id=\"data"+i+"\"><td>" + (i+1) + "</td>";
            for(j=0;j < 3 ; j++){
                htmlString = htmlString + "<td>"+datas[i][j] + "</td>";
            }
            htmlString = htmlString + "<td>"+actionString1+i+actionString2+i+actionString3+ "</td></tr>";
        }
        document.getElementById("datasRow").innerHTML = htmlString;
    }
}

}