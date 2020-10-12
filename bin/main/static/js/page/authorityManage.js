
var table;
var id = parent.document.all["ID"].value;
var tabledata = [
    {formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign:"center",width:"10", headerSort:false, cellClick:function(e, cell){
        cell.getRow().toggleSelect();
    }},
    {title:"stat", field:"stat", visible:false},
    {title:"id", field:"id", visible:false},
    {title:"권한그룹ID", field:"group_id", editor:"input"},
    {title:"권한그룹명", field:"group_name", editor:"input" },
    {title:"비고", field:"remark", editor:"input",widthGrow:3 },
    {title:"사용여부", field:"use_yn", editor:"select",editorParams:{values:{"Y":"사용", "N":"미사용"}},formatter:"lookup",formatterParams:{"Y":"사용", "N":"미사용"}},
    {title:"등록자", field:"rgst_user_id"},
    {title:"등록일자", field:"rgst_date"},
    {title:"수령자", field:"upd_user_id"},
    {title:"수령일자", field:"upd_date"},
];

$(document).ready(function() {
    
    table = new Tabulator("#list1", {
        layout:"fitColumns",
        height:"590px",
        selectable:true,
        ajaxURL:"api/AuthorityManageList?group_id=&group_name=&use_yn=",
        ajaxProgressiveLoad:"scroll",
        paginationSize:20,
        placeholder:"No Data Set",
        cellEdited:update,
        columns:tabledata,
        
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
                row.update({"stat":"M","id":id});
            }
            var useCell = row.getCell("use_yn")
            console.log(useCell.getValue() );
        }
    }
};
function Search() {
    var gid=$("#txtGroupId").val();
    var gnm=$("#txtGroupName").val();
    var use=$("#selUseYn option:selected").val();
    var param = { "group_id": gid, "group_name": gnm, "use_yn": use};
    $.ajax({
        url: 'api/AuthorityManageList',
        type: 'GET',
        data: param,
        success: function (data) {
            table.setData(data);
        }
    });
};

function AddRowAuth(){
    table.addRow({"stat":"I","id":id});
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
        url: 'api/AuthorityManageSaveAuth',
        type: 'POST',
        contentType:"application/json",
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

