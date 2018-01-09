export default class Store{
  constructor(){
    this.storageName = 'RakutenDatas';
  }
  getData() {
    var datas = JSON.parse(localStorage[this.storageName]);
    return datas;
  }
  setData(formContent, index) {
    var datas = this.getData();
    if (!index) { // Insert
      index = datas.length;
      datas.push(formContent);
    } else  // Modify
      datas[index] = formContent;
    
    localStorage[this.storageName] = JSON.stringify(datas);
  }
  
  deleteData(index) {
    var datas = this.getData();
    if (index >= datas.length) throw new Error('out of index!');
    datas.splice(index, 1);
    localStorage[this.storageName] = JSON.stringify(datas);
  }
}