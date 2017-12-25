//var Functions = require('./functions.js');
//var Functions = new Functions.FunctionsSource();
//Functions.testing();

import Functions from '/src/functions.js'
var Function = new Functions();
window.onload = Function.Showtable();
var showFormClassItems = document.getElementsByClassName("showFormClass");
for(var i=0;i<showFormClassItems.length;i++){
    showFormClassItems[i].addEventListener("click", function(){
        Function.ShowForm(this);});
}

document.getElementById("insertData").addEventListener("click", function(){
    Function.InsertData(this);
});

var modifyDataClassItems = document.getElementsByClassName("modifyDataClass");
for(var i=0;i<modifyDataClassItems.length;i++)
{
    modifyDataClassItems[i].addEventListener("click", function(){
        
        Function.ModifyData(this);
    });
}

var deleteDataClassItems = document.getElementsByClassName("deleteDataClass");
for(var i=0;i<deleteDataClassItems.length;i++)
{
    deleteDataClassItems[i].addEventListener('click',function(){
        Function.DeleteData(this.value);});
}