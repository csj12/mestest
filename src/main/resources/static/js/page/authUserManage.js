
var table;
var table2;
var table3;
var tabledata = [
   {title:"권한그룹ID", field:"group_id"},
   {title:"권한그룹명", field:"group_name" }
];
var tabledata2 = [
    {formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign:"center",width:"10", headerSort:false, cellClick:function(e, cell){
        cell.getRow().toggleSelect();
    }},
   {title:"stat", field:"stat", visible:false},
   {title:"사용자ID", field:"user_id", editor:"input"},
   {title:"사용자명", field:"kor_nm", editor:"input" },
   {title:"영문사용자명", field:"eng_nm", editor:"input" },
   {title:"부서(팀)명", field:"org_name", editor:"input"},
   {title:"직책", field:"jbpo_name"},
   {title:"전화번호", field:"tel_no",widthGrow:2},
   {title:"휴대폰번호", field:"hp_no",widthGrow:2},
];
var tabledata3 = [
    {formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign:"center",width:"10", headerSort:false, cellClick:function(e, cell){
        cell.getRow().toggleSelect();
    }},
   {title:"id", field:"id", visible:false},
   {title:"사용자ID", field:"group_id", editor:"input"},
   {title:"사용자명", field:"group_name", editor:"input" },
   {title:"영문사용자명", field:"remark", editor:"input" },
   {title:"권한그룹명", field:"group_name" },
   {title:"부서(팀)명", field:"use_yn", editor:"input"},
   {title:"직책", field:"rgst_user_id"},
   {title:"전화번호", field:"rgst_date",widthGrow:2},
   {title:"휴대폰번호", field:"upd_user_id",widthGrow:2},
];
$(document).ready(function() {
    
    table = new Tabulator("#list1", {
        layout:"fitColumns",
        height:"590px",
        selectable:1,
        paginationSize:20,
        placeholder:"No Data Set",
        columns:tabledata,
        rowClick:Search2,
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

    table3 = new Tabulator("#list3", {
        layout:"fitColumns",
        height:"590px",
        selectable:true,
        paginationSize:20,
        placeholder:"No Data Set",
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
// function openPop(){
//     $("#viewForm").dialog({
//         autoOpen: true,
//         title: "프로젝트별 담당자",
//         width:1400,                           
//         height: 630,                 
//         modal: true,
//         open: function (event, ui) {;
             
//         },
//         close: function () {
//         },                     
//         buttons: {
        
//             "닫기": function () {
//                 $(this).dialog("close");
//             }
//         },
//         focus: function (event, ui) {
//         }
//     }).css("z-index", 1000).dialog("widget").draggable("option","containment","none"); 
// }

function fnPopupView() {
    // var zIndex = 9999;
    // var modal = document.getElementById("viewForm");

    // // 모달 div 뒤에 희끄무레한 레이어
    // var bg = document.createElement('div');
    // bg.setStyle({
    //     position: 'fixed',
    //     zIndex: zIndex,
    //     left: '0px',
    //     top: '0px',
    //     width: '100%',
    //     height: '100%',
    //     overflow: 'auto',
    //     // 레이어 색갈은 여기서 바꾸면 됨
    //     //backgroundColor: 'rgba(0,0,0,0.4)'
    // });
    // document.body.append(bg);

    // // 닫기 버튼 처리, 시꺼먼 레이어와 모달 div 지우기
    // modal.querySelector('.btn-close2').addEventListener('click', function() {
    //     bg.remove();
    //     modal.style.display = 'none';
    // });

    // modal.setStyle({
    //     position: 'fixed',
    //     display: 'block',
    //     boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',

    //     // 시꺼먼 레이어 보다 한칸 위에 보이기
    //     zIndex: zIndex + 1,

    //     // div center 정렬
    //     top: '50%',
    //     left: '50%',
    //     transform: 'translate(-50%, -50%)',
    //     msTransform: 'translate(-50%, -50%)',
    //     webkitTransform: 'translate(-50%, -50%)'
    // });
    window.open("/system/AuthUserMangePop", "PopupWin", "width=1200,height=800");
}
 // Element 에 style 한번에 오브젝트로 설정하는 함수 추가
 Element.prototype.setStyle = function(styles) {
    for (var k in styles) this.style[k] = styles[k];
    return this;
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

