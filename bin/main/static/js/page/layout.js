var menu="";


$(document).ready(function() {
    $.ajax({
        url: 'MenuList',
        type: 'GET',
        data:"",
        success: function (data) {
            callBackMenuAjax(data);
        }
    });

});

function callBackMenuAjax(resultData){
    menu += "<ul>"
    for(var i =0;i<resultData.length;i++){
       var list = resultData[i];
       if(list.levels==0){
        menu += dep(resultData,i);
       }
    }
    menu += "</ul>"
    $("#menus").html(menu);
    console.log(menu);

    (function($){
        var lnbUI = {
            click : function(target, speed) {
                var _self = this,
                    $target = $(target);
                _self.speed = speed || 300;
                //alert(_self);
                $target.each(function(){
                    if(findChildren($(this))){
                        return;
                    }
                });
                function findChildren(obj){
                    return obj.find('> ul').length > 0;
                }
                $target.on('click','a', function(e){
                    e.stopPropagation();
                    var $this = $(this),
                        $depthTarget = $this.next(),
                        $siblings = $this.parent().siblings();
    
                    $this.parent('li').find('ul li').removeClass('on');
                    /*$siblings.removeClass('on');*/
                    $siblings.find('ul')/*.slideUp(250);*/
    
                    if($depthTarget.css('display') == 'none'){
                        _self.activeOn($this);
                        $depthTarget.slideDown(_self.speed);
                    } else {
                        $depthTarget.slideUp(_self.speed);
                        _self.activeOff($this);
                    }
                });

            },
            activeOff : function($target){
                $target.parent().removeClass('on');
                $target.siblings().find(".lnb-dep3").css("display", "none");
            },
            activeOn : function($target){
                $target.parent().addClass('on');
                
                
            }
        }
        $(function(){
            lnbUI.click('.lnb-menu li' , 300);
        });
    }(jQuery));
    
}

function dep(resultData,index){
    var str;
    var str2;
    var list = resultData[index];
    str = "<li>"
    str += "<a href='"+(list.url?list.url+"' target='workFrame":"#")+"' title='"+list.program_name+"' class='lnb-dep1'>"+list.program_name+"</a>"
    str2 = "<ul class='lnb-dep2'>"
    for(var i =index+1;i<resultData.length;i++){
        var list2 = resultData[i];
        if(list2.levels==0){
            if(i==index+1){
                str2="";
            }
            break;
        }else if(list2.levels==1){
            str2+=dep2(resultData,i)
        }
     }
    if(str2 != "")
        str2 += "</ul>"
    str += str2;
    str += "</li>"
    return str
}

function  dep2(resultData,index){
    var str="";
    var str2;
    var list = resultData[index];
    if(list.app_type=="P"){
        str+="<li><a href='"+(list.url?list.url+"' target='workFrame":"#")+"' title='"+list.program_name+"' class=''>"+list.program_name+"</a></li>"
    }else{
        str+="<li>"
        str+="<a href='#' title='"+list.program_name+"' class='lnb-dep2-1'>"+list.program_name+"</a>"
        str2= "<ul class='lnb-dep3'>";
        for(var i =index+1;i<resultData.length;i++){
            var list2 = resultData[i];
            if(list2.levels==2){
                str2+=dep3(resultData,i)
            }else{
                if(i==index+1){
                    str2="";
                }
                break;
            }
        }
        if(str2 != "")
            str2 += "</ul>"
        str+=str2;
        str+="</li>"
    }
    return str;
}


function  dep3(resultData,index){
    var str;
    var list = resultData[index];
    str="<li><a href='"+(list.url?list.url+"' target='workFrame":"#")+"' title='"+list.program_name+"'>"+list.program_name+"</a></li>"
    return str;
}