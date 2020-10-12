var table;
var tabledata = [
    {formatter:"rowSelection", titleFormatter:"rowSelection", hozAlign:"center", headerSort:false, cellClick:function(e, cell){
        cell.getRow().toggleSelect();
    }},
   {title:"stat", field:"stat", visible:false},
   {title:"사용자 ID", field:"user_id", editor:"input" },
   {title:"한글 명", field:"kor_nm", editor:"input", sorter:"number"},
   {title:"영문 명", field:"eng_nm",  editor:"input" },
   {title:"부서(팀)코드", field:"org_code", editor:"input"},
   {title:"부서(팀)명", field:"org_name", editor:"input"},
   {title:"직책", field:"jbpo_name", editor:"select", editorParams:{values:{"계약":"계약", "사원":"사원", "대리":"대리","과장":"과장","차장":"차장","부장":"부장", "임직원":"임직원","외부업체":"외부업체"}}},
   {title:"부서 전화번호", field:"tel_no", editor:"input"},
   {title:"핸드폰 번호", field:"hp_no", editor:"input"},
//    {title:"사용여부", field:"use_yn", editor:"select", editorParams:{values:[{label:"사용", value:"사용"}, {label:"미사용", value:"미사용"}]}},
   {title:"사용여부", field:"use_yn", editor:"select",editorParams:{values:{"Y":"사용", "N":"미사용"}},formatter:"lookup",formatterParams:{"Y":"사용", "N":"미사용"}},
   {title:"패스워드 오류 카운트", field:"password_cnt"},
   {title:"등록자", field:"rgst_user_id"}, 
   {title:"등록일", field:"rgst_date", hozAlign:"center"},
   {title:"수정자", field:"upd_user_id", hozAlign:"center"},
   {title:"수정일", field:"upd_date", hozAlign:"center"}
];

$(document).ready(function() {

    table = new Tabulator("#example-table", {
        height:"311px",
        selectable:true,
        ajaxURL:"api/MenuManageList",
        ajaxProgressiveLoad:"scroll",
        paginationSize:20,
        placeholder:"No Data Set",
        cellEdited:update,
        columns:tabledata,
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
        $.ajax({
            url:  "UserManageList?korName=" + $('#txtKorName').val() + "&useYn=" + $('#cbUseYN').val(),
            type: 'GET',
            data:"",
            success: function (data) {
                table.setData(data);
            }
        });
    };
    
    var token = $("meta[name='_csrf']").attr("content");
    var header = $("meta[name='_csrf_header']").attr("content");
    $(document).ajaxSend(function(e, xhr, options) { xhr.setRequestHeader(header, token); });
    
    function AddRowUser(){
        table.addRow({"stat":"I"});
    }
    
    function DelRowUser(){
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
    };
    
    function SaveUser() 
    {
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
            url: 'SaveUser',
            type: 'POST',
            contentType:"application/json",
            data:JSON.stringify(jArray),
            success: function (data) {
                callBackSaveAjax(data);
            }
        });
    };
    
    function callBackSaveAjax(resultParam) 
    {
        var ajaxResult = "";
        var ajaxState = "";
    
        switch (resultParam) 
        {
            case "1":
                alert("저장 되었습니다.");
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