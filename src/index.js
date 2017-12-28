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
