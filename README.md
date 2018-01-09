# RAKUTEN HOMEWORK
> Implement a simple website which maintain datas include insert, delete, and modify
>
> **Rule Require :**    
>> - Use pure HTML, CSS,Javascript (No need DB and can't use JQuery...etc).
>> - Create a Data Table which have Serial No, Name, Phone, Email, and Actions.
>> - The data table can do the action insert, delete, modify.
>> - Email is required field, and Name is key
>> - Basic auth for Name, Phone, and Email.
>> - Please make UI as beautiful as possible.

#### Environment Require
----
1. npm (version 5.6.0 or above)
2. node (version 7.0.0 or above)

#### Get Start
----
Initialize(install the packages in package.json): 
```sh
$ npm install
```
Run server: 
```sh
$ node server.js
```
Browser: http://localhost:8000/

Compiler:
```sh
$ npm run build
```

#### Functions List
---
| Name | Description |Test|
| ------ | ------ | ------ |
| insertData() ||:heavy_check_mark:|
| modifyData() ||:heavy_check_mark:|
| _GetFormContent() |||
| _IsValidate(formContent,index) ||:heavy_check_mark:|
| _IsValidFormat(formContent) ||:heavy_check_mark:|
| _replaceRow(index,formContent) |||
| _appendRow(formContent) |||
| _createTableRow(index,formContent) |||
| _createElement(type,props) |||
| _createActionTd(index) |||
| showForm(index) |||
| Showtable() |||

#### Testing
```sh
$ npm run test
```

