var table;
var tabledata = [
    {title:"접속일시", field:"run_Date", hozAlign:"center"}, 
    {title:"사용자ID", field:"user_Id", hozAlign:"center" }, 
    {title:"사용자명", field:"kor_Name", hozAlign:"center"}, 
    {title:"프로그램ID", field:"program_Id", hozAlign:"center"},
    {title:"프로그램명", field:"program_Name", hozAlign:"center"}, 
    {title:"종료시간", field:"close_Tm", hozAlign:"center"}, 
    {title:"접속IP", field:"client_Ip", hozAlign:"center"}, 
];

$(document).ready(function() {
    
    table = new Tabulator("#UserLognInfoManage", {
        height:"500%",
        // ajaxURL:"UserLognInfoManageList",
        // ajaxProgressiveLoad:"scroll",
        paginationSize:20,
        placeholder:"No Data Set",
        columns:tabledata,
        layout:"fitColumns",
        
    });
    

});
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
$(document).ajaxSend(function(e, xhr, options) { xhr.setRequestHeader(header, token); });
function update (cell){
    //cell - cell component
    var val = cell.getValue();
    var cellOldValue = cell.getOldValue();

    if(val != null||val != ""){
        if(val != cellOldValue){
            var row = cell.getRow();
            var statCell = row.getCell("stat")
            if(statCell.getValue() == "I"){
                row.update({"stat":"N"});
            }else if(statCell.getValue() == "U"){
                row.update({"stat":"M"});
            }
        }
    }
};

// var tableData = [
//     {id:0, RUN_DATE:"Billy Bob", User_Id:"12", KOR_NAME:"male", PROGRAM_ID:1, PROGRAM_NAME:"red", CLOSE_TM:"", cheese:1},
//     {id:1, RUN_DATE:"Billy Bob", User_Id:"12", KOR_NAME:"male", PROGRAM_ID:1, PROGRAM_NAME:"red", CLOSE_TM:"", cheese:1},
//     {id:2, RUN_DATE:"Choi", User_Id:"12", KOR_NAME:"female", PROGRAM_ID:1, PROGRAM_NAME:"red", CLOSE_TM:"", cheese:1},
//     {id:3, RUN_DATE:"Choi2", User_Id:"12", KOR_NAME:"female", PROGRAM_ID:1, PROGRAM_NAME:"red", CLOSE_TM:"", cheese:1},
// ]



function Search() {
    
    var form = {
        Start_Run_Date : $('#Start_Run_Date').val(),
        End_Run_Date : $('#End_Run_Date').val(),
        User_Id : $('#User_Id').val(),
        Kor_Name : $('#Kor_Name').val(),
        Program_Id : $('#Program_Id').val(),
        Program_Name : $('#Program_Name').val()
    }
    // var ajaxConfig = {
    //     method:"POST", //set request type to Position
    //     headers: {
    //         "Content-type": 'application/json; charset=utf-8', //set specific content type
    //     },
    // };
    // table.setData('UserLognInfoManageList',JSON.stringify(form),ajaxConfig);
    $.ajax({
        url: 'api/UserLognInfoManageList',
        type: 'POST',
        data: JSON.stringify(form),
        contentType: 'application/json;',
        success: function (data) {
            table.setData(data);
        }
    });

    // if(isEmpty($('#Start_Run_Date').val()) && isEmpty($('#End_Run_Date').val()) && isEmpty($('#User_Id').val())){
    //     $.ajax({
    //         url: 'UserLognInfoManageList',
    //         type: 'POST',
    //         data: JSON.stringify(form),
    //         contentType: 'application/json;',
    //         success: function (data) {
    //             alert("Success:"+data);
    //             table.setData(data);
    //         }
    //     });
    // }else{
    //     alert("null값이 있습니다.");
    // }
    
};

function AddRowAuth(){
    // table.addRow({"stat":"Row 추가시 Text추가"});
    table.addRow();
}

function DelRowAuth(){
    var selectedRows = table.getSelectedRows();
    for(var i=0;i<selectedRows.length;i++)
    {
        var cell = selectedRows[i].getCell("stat");
        if(cell.getValue() == "I"||cell.getValue() == "N"){
            selectedRows[i].delete();
        }else if(cell.getValue() == "U"||cell.getValue() == "M"){
            selectedRows[i].update({"stat":"D"});
        }
    }
    table.setFilter("stat","!=", "D");
}

function SaveAuth() {
    var sel = table.getRows();
    var jArray = new Array();
    var jobj = new Object();
    for (var i = 0; i < sel.length; i++) {
        jobj =sel[i].getData();
        jArray.push(jobj);
    }

    //var jsonInfo = JSON.stringify(jArray);

    // console.log(jArray);

    // var param = {
    //     list: jsonInfo
    // }

    
}



// function callBackSaveAjax(resultParam) {
//     var ajaxResult = "";
//     var ajaxState = "";

//     switch (resultParam) {
//         case "1":
//             //alerts("fa fa-check", "성공", "추가 되었습니다.");
//             // if (ajaxResult != "X") $("#lblRefUser").text(ajaxResult);
//             //else $("#lblRefUser").text("");
//             //$("#UserForm").dialog("close");
//             Search();
//             break;
//         default:
//             //alerts("fa fa-warning", "실패", ajaxResult);
//             break;

//     }
// }

function isEmpty(str){
         
    if(typeof str == "undefined" || str == null || str == "")
        return false;
    else
        return true ;
}

