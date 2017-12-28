var Function = new Functions();
window.onload = Function.Showtable();

document.getElementById("showInsertForm").addEventListener("click", function(){
    Function.ShowInsertForm(this);
});

document.getElementById("insertData").addEventListener("click", function(){
    Function.InsertData(this);
});

var modifyDataClassItems = document.getElementsByClassName("modifyDataClass");
for(var i=0;i<modifyDataClassItems.length;i++)

    modifyDataClassItems[i].addEventListener("click", function(){
        Function.ModifyData(this);
    });

