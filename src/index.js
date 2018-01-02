var Function = new Table();
window.onload = Function.showTable();

document.getElementById('showInsertForm').addEventListener('click', function () {
  Function.showInsertForm(this);
});

document.getElementById('insertData').addEventListener('click', function () {
  Function.insertData(this);
});

var modifyDataClassItems = document.getElementsByClassName('modifyDataClass');
for (var i = 0;i<modifyDataClassItems.length; i++)
  modifyDataClassItems[i].addEventListener('click', function () {
    Function.modifyData(this);
  });


