$("button").click(function(){
    $.ajax({
        url:"/a",
        type:"post",
        data:{"name":"ygh","score":"90"},
        datatype:"json",
        success:function(datas){

        },
        error:function(){

        }
    })
})