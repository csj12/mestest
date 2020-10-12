// var treeData;
var setting;
var table;

var tableColumn = [
    {title:"메뉴ID", field:"program_id"},
    {title:"메뉴명", field:"program_name"}
];

var tabledata = [
    {formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign:"center", headerSort:false, cellClick:function(e, cell){
        cell.getRow().toggleSelect();
    }},
   {title:"stat", field:"stat", visible:false},
   {title:"상위메뉴ID", field:"up_program_id", editor:"input"},
   {title:"메뉴/프로그램ID", field:"program_id", editor:"input" },
   {title:"메뉴/프로그램명", field:"program_name", editor:"input", sorter:"number"},
   {title:"레벨", field:"level",  editor:"input", visible:false },
//    {title:"어플리케이션타입", field:"app_type", editor:"select",editorParams:{values:{"메뉴":"메뉴", "프로그램":"프로그램"}}},
   {title:"어플리케이션타입", field:"app_type", editor:"select",editorParams:{values:{"M":"메뉴", "P":"프로그램"}},formatter:"lookup",formatterParams:{"M":"메뉴", "P":"프로그램"}},
   {title:"순서", field:"seq_no", editor:"input"},

//    {title:"사용여부", field:"use_yn", editor:"input", editor:"select",editorParams:{values:[{label:"사용", value:"사용"}, {label:"미사용", value:"미사용"}]}},
   {title:"사용여부", field:"use_yn", editor:"select",editorParams:{values:{"Y":"사용", "N":"미사용"}},formatter:"lookup",formatterParams:{"Y":"사용", "N":"미사용"}},
   {title:"URL", field:"url", editor:"input"},
   {title:"FILE_ID", field:"file_id", editor:"input"},
   {title:"등록자", field:"rgst_user_id", editor:"input"},
   {title:"등록일", field:"rgst_date", hozAlign:"center", editor:"input"},
   {title:"수정자", field:"upd_user_id", hozAlign:"center", editor:"input"},
   {title:"수정일", field:"upd_date", hozAlign:"center", editor:"input"}
];

$(document).ready(function() {
    
    // $.ajax({
    //     type: "POST",
    //     url: "getMenuTree",
    //     dataType: "json", 
    //     contentType:"application/json; charset=UTF-8",
    //     success: function(data) {
    //         getMenuTree(data);
    //     },
    //     error: function(e) {
    //         console.log(e.responseText);
    //     }
    // });

    table1 = new Tabulator("#list11", {
        layout:"fitColumns",
        height:"590px",
        selectable:1,
        dataTree:true,
        dataTreeStartExpanded:true,
        paginationSize:20,
        placeholder:"No Data Set",
        columns:tableColumn,
        rowClick:Search22,
    });

    table = new Tabulator("#example-table", {
        height:"590px",
        selectable:true,
        ajaxURL:"api/MenuManageList",
        ajaxProgressiveLoad:"scroll",
        paginationSize:20,
        placeholder:"No Data Set",
        cellEdited:update,
        columns:tabledata,
    });
});

// function getMenuTree(treeData){
//     // zTree 초기화
//     setting = {
//         data: {
//             simpleData: {
//                 enable: true
//             }
//         },
//         callback: {
//             beforeClick: beforeClick // 마우스 클릭 콜백함수 지정
//         }
//     };

//     var zNodes = [{
//         id: 1,
//         pId: 0,
//         name: "pNode 1",
//         open: true
//     }, {
//         id: 11,
//         pId: 1,
//         name: "pNode 11"
//     }, {
//         id: 111,
//         pId: 11,
//         name: "leaf node 111"
//     }, {
//         id: 112,
//         pId: 11,
//         name: "leaf node 112"
//     }, {
//         id: 113,
//         pId: 11,
//         name: "leaf node 113"
//     }, {
//         id: 114,
//         pId: 11,
//         name: "leaf node 114"
//     }, {
//         id: 12,
//         pId: 1,
//         name: "pNode 12"
//     }, {
//         id: 121,
//         pId: 12,
//         name: "leaf node 121"
//     }, {
//         id: 122,
//         pId: 12,
//         name: "leaf node 122"
//     }, {
//         id: 123,
//         pId: 12,
//         name: "leaf node 123"
//     }, {
//         id: 124,
//         pId: 12,
//         name: "leaf node 124"
//     }, {
//         id: 13,
//         pId: 1,
//         name: "pNode 13 - no child",
//         isParent: true
//     }, {
//         id: 2,
//         pId: 0,
//         name: "pNode 2"
//     }, {
//         id: 21,
//         pId: 2,
//         name: "pNode 21",
//         open: true
//     }, {
//         id: 211,
//         pId: 21,
//         name: "leaf node 211"
//     }, {
//         id: 212,
//         pId: 21,
//         name: "leaf node 212"
//     }, {
//         id: 213,
//         pId: 21,
//         name: "leaf node 213"
//     }, {
//         id: 214,
//         pId: 21,
//         name: "leaf node 214"
//     }, {
//         id: 22,
//         pId: 2,
//         name: "pNode 22"
//     }, {
//         id: 221,
//         pId: 22,
//         name: "leaf node 221"
//     }, {
//         id: 222,
//         pId: 22,
//         name: "leaf node 222"
//     }, {
//         id: 223,
//         pId: 22,
//         name: "leaf node 223"
//     }, {
//         id: 224,
//         pId: 22,
//         name: "leaf node 224"
//     }, {
//         id: 23,
//         pId: 2,
//         name: "pNode 23"
//     }, {
//         id: 231,
//         pId: 23,
//         name: "leaf node 231"
//     }, {
//         id: 232,
//         pId: 23,
//         name: "leaf node 232"
//     }, {
//         id: 233,
//         pId: 23,
//         name: "leaf node 233"
//     }, {
//         id: 234,
//         pId: 23,
//         name: "leaf node 234"
//     }, {
//         id: 3,
//         pId: 0,
//         name: "pNode 3 - no child",
//         isParent: true
//     }];

//     $.fn.zTree.init($("#treeDemo"), setting,treeData );
//     Search();
// }

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
    var gnm=$("#txtProgramName").val();
    var use=$("#cbUseYN option:selected").val();
    var param = { "program_name": gnm, "use_yn": use};
    $.ajax({
        url: 'MenuManageList',
        type: 'GET',
        data:param,
        success: function (data) {
            var treeData = JSON.stringify(treeModel(data, "0"));
            console.log('treeData:::::::::::::::::::>>>'+treeData);
            table1.setData(treeData);
        }
    });
};

var token = $("meta[name='_csrf']").attr("content");
var header = $("meta[name='_csrf_header']").attr("content");
$(document).ajaxSend(function(e, xhr, options) { xhr.setRequestHeader(header, token); });

function AddRowMenu(){
    table.addRow({"stat":"I"});
}

function DelRowMenu(){
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

function SaveMenu() {
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
    $.ajax({
        url: 'SaveMenuManage',
        type: 'POST',
        contentType:"application/json",
        data:JSON.stringify(jArray),
        success: function (data) {
            callBackSaveAjax(data);
        }
    });
}

// function beforeClick(treeId, treeNode, clickFlag) {
//     // var gnm=$("#txtProgramName").val();
//     // var use=$("#cbUseYN option:selected").val();
//     var param = { "program_name": gnm, "use_yn": use};
//     $.ajax({
//         url: 'MenuManageList',
//         type: 'GET',
//         data:param,
//         success: function (data) {
//             table.setData(data);
//         }
//     });
// }

function Search22(e,row){
    var gid = row.getCell("program_id").getValue();
    var param = { "program_id": gid};
    $.ajax({
        url: 'api/MenuManageList',
        type: 'GET',
        data: param,
        success: function (data) {
            table.setData(data);
        }
    });
}

function callBackSaveAjax(resultParam) {
    var ajaxResult = "";
    var ajaxState = "";

    switch (resultParam) {
        case "1":
            alert("저장 되었습니다.");
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