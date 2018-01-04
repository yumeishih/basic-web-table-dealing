function Store(){
    this.storageName = "RakutenDatas";
};

Store.prototype.getData = function(){
    var datas = JSON.parse(localStorage[this.storageName]);
    return datas;
}
Store.prototype.setData = function (formContent,index) {
    var datas = this.getData();
    if (!index) { // Insert
      index = datas.length
      datas.push(formContent);
    }else{ // Modify
        datas[index] = formContent;
    }
    localStorage[this.storageName] = JSON.stringify(datas);
};

