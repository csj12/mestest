
var table;
var table2;
var table3;
var resultData=[{"program_id":"BaseInfo","program_name":"기준정보","levels":"0"}];

var tabledata = [
   {title:"권한그룹ID", field:"group_id"},
   {title:"권한그룹명", field:"group_name" }
];
var tableColumn = [
    {title:"메뉴ID", field:"program_id"},
    {title:"메뉴명", field:"program_name"}
];
var tabledata2 = [
    {formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign:"center",width:"10", headerSort:false, cellClick:function(e, cell){
        cell.getRow().toggleSelect();
    }},
   {title:"stat", field:"stat", visible:false},
   {title:"메뉴ID", field:"program_id", editor:"input"},
   {title:"메뉴명", field:"program_name", editor:"input" },
   {title:"조회", field:"eng_nm", hozAlign:"center", editor:true, formatter:"tickCross" },
   {title:"수정", field:"org_name", hozAlign:"center", editor:true, formatter:"tickCross"},
   {title:"삭제", field:"jbpo_name", hozAlign:"center", editor:true, formatter:"tickCross"}
];

var tableData1 = [
    {program_id:"ProductManage", program_name:"생산관리"},
    {program_id:"ProductManage", program_name:"기준정보", _children:[
        {program_id:"Test1", program_name:"Test1" },
        {program_id:"Test2", program_name:"Test2" },
        {program_id:"MenuTest3", program_name:"메뉴테스트3",_children:[
            {program_id:"Test3", program_name:"Test3" }]}
    ]},
    {program_id:"ProductManage", program_name:"자원관리"},
    {program_id:"ProductManage", program_name:"조직관리"},
    {program_id:"ProductManage", program_name:"시스템관리", _children:[
        {program_id:"MenuManage", program_name:"프로그램관리" },
        {program_id:"UserManage", program_name:"사용자관리" },
        {program_id:"AuthorityManage", program_name:"권한관리" },
        {program_id:"AuthMenuManage", program_name:"권한별 프로그램관리" },
        {program_id:"AuthUserManage", program_name:"권한별 사용자관리" }
    ]},
];

$(document).ready(function() {
    
    table = new Tabulator("#list1", {
        layout:"fitColumns",
        height:"290px",
        selectable:1,
        paginationSize:20,
        placeholder:"No Data Set",
        columns:tabledata,
        rowClick:Search2,
    });

    table1 = new Tabulator("#list11", {
        layout:"fitColumns",
        height:"290px",
        selectable:1,
        dataTree:true,
        dataTreeStartExpanded:true,
        paginationSize:20,
        placeholder:"No Data Set",
        columns:tableColumn,
        rowClick:Search22,
    });

    table2 = new Tabulator("#list2", {
        layout:"fitColumns",
        height:"590px",
        selectable:true,
        paginationSize:20,
        placeholder:"No Data Set",
        cellEdited:update,
        columns:tabledata2,
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
             console.log(id);
         }
     }
};

function Search2(e,row){
    var gid = row.getCell("group_id").getValue();
    var param = { "group_id": gid};
    $.ajax({
        url: 'api/AuthUserManageList',
        type: 'GET',
        data: param,
        success: function (data) {
            table2.setData(data);
        }
    });
}

function Search22(e,row){
    var gid = row.getCell("program_id").getValue();
    var param = { "program_id": gid};
    $.ajax({
        url: 'api/AuthMenuManageList',
        type: 'GET',
        data: param,
        success: function (data) {
            table2.setData(data);
        }
    });
}

function treeModel(arrayList, rootId) {
    // console.log('in');
    var rootNodes = [];
    var traverse = function (nodes, item, index) {
        if (nodes instanceof Array) {
            return nodes.some(function (node) {
                if (node.program_id === item.up_program_id) {
                    node._children = node._children || [];
                    return node._children.push(arrayList.splice(index, 1)[0]);
                }
                // console.log('in2');
                return traverse(node._children, item, index);
            });
        }
    };

    while (arrayList.length > 0) {
        arrayList.some(function (item, index) {
            if (item.up_program_id === rootId) {
                // console.log('in3');
                return rootNodes.push(arrayList.splice(index, 1)[0]);
            }
            // console.log('in4');
            return traverse(rootNodes, item, index);
        });
    }

    return rootNodes;
};

function Search() {
    var gid=$("#txtGroupId").val();
    var gnm=$("#txtGroupName").val();
    var param = { "group_id": gid, "group_name": gnm, "use_yn": "Y"};
    $.ajax({
        url: 'api/AuthorityManageList',
        type: 'GET',
        data: param,
        success: function (data) {
            table.setData(data);
            param = { "prpgram_id": "", "program_name": "", "use_yn": "Y"};;
            $.ajax({
                url: "/system/MenuManageList",
                type: 'GET',
                data:param,
                success: function (data) {

                    var treeData = JSON.stringify(treeModel(data, "0"));
                    console.log('treeData:::::::::::::::::::>>>'+treeData);
                    table1.setData(treeData);
                }
            });
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