var rsAdd = new Array();
var rsMod = new Array();
var rsDel = new Array();

var table;
var tabledata = [
    {title:"stat", field:"stat", hozAlign:"center", visible:false},
    {formatter:"rowSelection", title:"선택", field:"check", hozAlign:"center", cellClick:function(e, cell){
        cell.getRow().toggleSelect();
    }}, //plnt_id
    {title:"공장번호", field:"plnt_id", hozAlign:"center", visible:false}, 
    {title:"작성일자", field:"rgst_date", hozAlign:"center"}, 
    {title:"작성자ID", field:"user_id", hozAlign:"center" }, 
    {title:"작성자명", field:"kor_nm", hozAlign:"center"}, 
    {title:"구분", field:"notice_cd", hozAlign:"center", editor:true},
    {title:"제목", field:"notice_title", hozAlign:"center", editor:true}, 
    {title:"내용", field:"notice_content", hozAlign:"center", editor:true}, 
    {title:"게시여부", field:"use_yn", hozAlign:"center", formatter:"tickCross", editor:true},
    {title:"게시시작일", field:"aply_stdt", hozAlign:"center", editor:true}, 
    {title:"게시종료일", field:"aply_fndt", hozAlign:"center", editor:true}, 
    {title:"조회수", field:"read_cnt", hozAlign:"center"},  
];

$(document).ready(function() {
    
    table = new Tabulator("#NoticeManage", {
        height:"500%",
        // ajaxURL:"UserLognInfoManageList",
        // ajaxProgressiveLoad:"scroll",
        paginationSize:20,
        placeholder:"No Data Set",
        columns:tabledata,
        cellEdited:update,
        layout:"fitColumns",
        
    });
    

});

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


function Search() {
    
    var form = {
        start_run_date : $('start_run_date').val(),
        end_run_date : $('end_run_date').val(),
        user_id : $('user_id').val(),
        notice_title : $('notice_title').val(),
        notice_content : $('notice_content').val()
    }
        $.ajax({
            url: 'api/NoticeManageList',
            type: 'POST',
            data: JSON.stringify(form),
            contentType: 'application/json;',
            success: function (data) {
                //alert("Success:"+data);
                table.setData(data);
            }
        });
    
};
var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
$(document).ajaxSend(function(e, xhr, options) { xhr.setRequestHeader(header, token); });

function AddRowAuth(){
    table.addRow({"stat":"I"});
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
    $.ajax({
        url: 'api/NoticeManageSaveAuth',
        type: 'POST',
        contentType:"application/json;charset=utf8",
        data:JSON.stringify(jArray),
        success: function (data) {
            callBackSaveAjax(data);
        }
    });
}



function callBackSaveAjax(resultParam) {
    var ajaxResult = "";
    var ajaxState = "";

    switch (resultParam) {
        case "1":
            alert("성공")
            // if (ajaxResult != "X") $("#lblRefUser").text(ajaxResult);
            //else $("#lblRefUser").text("");
            //$("#UserForm").dialog("close");
            Search();
            break;
        default:
            //alerts("fa fa-warning", "실패", ajaxResult);
            break;

    }
}

