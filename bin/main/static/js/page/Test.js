var table;
var tabledata = [
    {formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign:"center", headerSort:false, cellClick:function(e, cell){
        cell.getRow().toggleSelect();
    }},
   {title:"stat", field:"stat"},
   {title:"Name", field:"name", editor:"input" },
   {title:"Progress", field:"progress", editor:"input", sorter:"number"},
   {title:"Gender", field:"gender", editor:"select", editorParams:{values:{"male":"Male", "female":"Female", "unknown":"Unknown"}}},
   {title:"Rating", field:"rating", editor:"input"},
   {title:"Favourite Color", field:"col", editor:"input"},
   {title:"Date Of Birth", field:"dob", hozAlign:"center", editor:"input"},
];

$(document).ready(function() {
    
    table = new Tabulator("#example-table", {
        height:"311px",
        selectable:true,
        ajaxURL:"AuthorityManageList",
        ajaxProgressiveLoad:"scroll",
        paginationSize:20,
        placeholder:"No Data Set",
        cellEdited:update,
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
function Search() {
    $.ajax({
        url: 'AuthorityManageList',
        type: 'GET',
        data:"",
        success: function (data) {
            table.setData(data);
        }
    });
};

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
    //table.setFilter("stat","!=", "D");
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
        url: 'SaveAuth',
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
            //alerts("fa fa-check", "성공", "추가 되었습니다.");
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
