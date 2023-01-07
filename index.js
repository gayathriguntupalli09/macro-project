/* 
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/ClientSide/javascript.js to edit this template
 */


var jpdbBaseURL="http://api.login2explore.com:5577";
var jpdbIRL="/api/irl";
var jpdbIML="/api/iml";
var stuDBName="SCHOOL-DB";
var stuRelationName="Student-Table";
var connToken="90938152|-31949273006519066|90955199";

$("#rollno").focus();

function saveRecNo2LS(jsonObj){
    var lvData=JSON.parse(jsonObj.data);
    localStorage.serItem('recno',lvData.rec_no);
}

function getRollnoAsJsonObj(){
    var rollno=$("#rollno").val();
    var jsonStr={
        id:rollno
    };
    return JSON.stringify(jsonStr);
}

function fillData(jsonObj){
    saveRecNo2LS(jsonObj);
    var record=JSON.parse(jsonObj.data).record;
    $("#fn").val(record.name);
    $("#jdate").val(record.joiningdate);
    $("#cls").val(record.class);
    $("#dob").val(record.dateofbirth);
    $("#add").val(record.address);
}

function resetForm(){
    $("#rollno").val("");
    $("#fn").val("");
    $("#jdate").val("");
    $("#cls").val("");
    $("#dob").val("");
    $("#add").val("");
    $("#rollno").prop("disabled",false);
    $("#save").prop("disabled",true);
    $("#change").prop("disabled",true);
    $("#reset").prop("disabled",true);
    $("#rollno").focus();
}

function validateData(){
    var rollno, fn, jdate, cls,dob, add;
    rollno=$("#rollno").val();
    fn=$("#fn").val();
    jdate=$("#jdate").val();
    cls=$("#cls").val();
    dob=$("#dob").val();
    add=$("#add").val();
    
    if(rollno=== ""){
        alert("student roll number missing");
        $("#rollno").focus();
        return '';
    }
    if(fn=== ""){
        alert("student fullname missing");
        $("#fn").focus();
        return '';
    }
    if(jdate=== ""){
        alert("student joining date missing");
        $("#jdate").focus();
        return '';
    }
    if(cls=== ""){
        alert("student class missing");
        $("#cls").focus();
        return '';
    }
    if(dob=== ""){
        alert("student dateofbirth missing");
        $("#dob").focus();
        return '';
    }
    if(add=== ""){
        alert("student address missing");
        $("#add").focus();
        return '';
    }
    
    var jsonStrObj={
        id:rollno,
        name:fn,
        joiningdate:jdate,
        class:cls,
        dateOfBirth:dob,
        address:add
    };
    return JSON.stringify(jsonStrObj);
}

function getRoll(){
    var rollnoJsonObj=getRollnoAsJsonObj();
    var getRequest=createGET_BY_KEYRequest(connToken,stuDBName,stuRelationName,rollnoJsonObj);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(getRequest,jpdbBaseURL,jpdbIRL);
    jQuery.ajaxSetup({async:true});
    if(resJsonObj.status === 400){
        $("#save").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#fn").focus();
        
    } else if(resJsonObj.status === 200){
        
        $("#rollno").prop("disabled",true);
        fillData(resJsonObj);
        
        $("#change").prop("disabled",false);
        $("#reset").prop("disabled",false);
        $("#fn").focus();
        
    }
}

function saveData(){
    var jsonStrObj=validateData();
    if(jsonStrObj === ''){
        return "";
    }
    var putRequest = createPUTRequest(connToken,jsonStrObj,stuDBName,stuRelationName);
    jQuery.ajaxSetup({async:false});
    var resJsonObj = executeCommandAtGivenBaseUrl(putRequest,jpdbBaseURL,jpdbIML);
    jQuery.ajaxSetup({async:true});
    resetForm();
    $("#rollno").focus();
}

function changeData(){
    $("#change").prop("disabled",true);
    jsonChg=validateData();
    var updateRequest = createUPDATERecordRequest(connToken,jsonChg,stuDBName,stuRelationName,localStorage.getItem("recno"));
    jQuery.ajaxSetup({async:false});
    var resJsonObj =executeCommandAtGivenBaseUrl(updateRequest,jpdbBaseURL,jpdbIML);
     jQuery.ajaxSetup({async:true});
     console.log(resJsonObj);
     resetForm();
     $("#rollno").focus();
}
