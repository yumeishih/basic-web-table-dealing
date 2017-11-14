function InsertData()
{
    if (localStorage.getItem("RakutenDatas") === null) {
        var datas = new Array();
        localStorage["RakutenDatas"] = JSON.stringify(datas);
    }
    var datas = JSON.parse(localStorage["RakutenDatas"]);
    var dataCount = datas.length;
    datas[dataCount] = new Array();
    datas[dataCount][0] = document.forms["insertForm"]["name"].value;
    datas[dataCount][1] = document.forms["insertForm"]["phone"].value;
    datas[dataCount][2] = document.forms["insertForm"]["email"].value;
    localStorage["RakutenDatas"] = JSON.stringify(datas);
};

function DeleteData(index)
{
    var datas = JSON.parse(localStorage["RakutenDatas"]);
    datas.splice(index, 1);
    localStorage["RakutenDatas"] = JSON.stringify(datas);
    Showtable();
};

function ModifyData(action)
{
    if (action.value =="Cancel");
    else{
        var datas = JSON.parse(localStorage["RakutenDatas"]);
        index = document.getElementById("modifyForm").value;
        datas[index][0] = document.forms["modifyForm"]["name"].value;
        datas[index][1] = document.forms["modifyForm"]["phone"].value;
        datas[index][2] = document.forms["modifyForm"]["email"].value;
        localStorage["RakutenDatas"] = JSON.stringify(datas);
    }
}
function ShowForm(formName,index)
{
    var form = document.getElementById(formName.value);
    form.style.display = "block";
    if (formName.value == "modifyForm")
    {
        var datas = JSON.parse(localStorage["RakutenDatas"]);
        form["name"].value = datas[index][0];
        form["phone"].value = datas[index][1];
        form["email"].value = datas[index][2];
        form.value = index;
    }
}

function Showtable()
{
    var htmlString = "";
    var actionString1 = "<button type=\"button\" class=\"btn btn-default btn-xs\" onclick=\"DeleteData(";
    var actionString2 = ")\">Delete</button><button class=\"btn btn-default btn-xs\" onclick = \"ShowForm(this,";
    var actionString3 = ")\" value = \"modifyForm\">Modify</button>";
    if (localStorage.getItem("RakutenDatas") === null);
    else{
        var datas = JSON.parse(localStorage["RakutenDatas"]);
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
