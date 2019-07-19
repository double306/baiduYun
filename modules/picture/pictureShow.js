
$(function(){
    initData();
});
var initData = function () {
  $.ajax({
      url:'modules/picture/data.json',
      type:'get',
      dataType:'text',
      success:function (data) {
          var view = "" , jsonData;
          if(data!== undefined){
              jsonData = JSON.parse(data);
              //console.log(jsonData);
              for(var index in jsonData){
                  view = '<div class="btn-group  rsBor btnIds" data-toggle="buttons">' +
                      '   <label class="check">' +
                      '        <input type="checkbox" name="options" autocomplete="off">' +
                      '   </label>'+
                      '   <label><span class="time">'+dayjs(jsonData[index].time).year()+'年'+format(parseInt(dayjs(jsonData[index].time).month()+1))+'月'+dayjs(jsonData[index].time).date()+'日</span></label>'+
                      ' <label class="">' +
                      '        <a class="btn" role="button" data-toggle="collapse" href="#'+jsonData[index].id+'" aria-expanded="false" aria-controls="'+jsonData[index].id+'">' +
                      '             <span class="isOpen">收起</span>' +
                      '        </a>' +
                      '</label>'+
                      ' <div class="collapse in" id="'+jsonData[index].id+'">' +
                      '                <div class="well">' +
                      '                    <ul class="list-group">' +
                      '                        <li class="list-group-item padding0">';
                                                   for(var val in jsonData[index].pictures){
                                                        view+= '<span class="box">' +
                                                               '  <img src="./common/images/'+jsonData[index].pictures[val]+'" >' +
                                                               '  <span class="circle-box">√</span>' +
                                                               '</span>';
                                                   }
                                                   view += '</li>' +
                                                           '</ul>' +
                                                           '</div>'+
                                                           '</div>'
                      view+=  '</div>';
                  $('#content').append(view) ;
              }
          }
          ifOpen();
          checkedIcon();
      }
  })
};
function ifOpen() {
    $('.btnIds a').on('click',function () {
        $('.isOpen').each(function(){
            $(this).text('收起');
        });
        ($(this).hasClass('collapsed'))?$(this).children('span').text('收起'):$(this).children('span').text('展开');
    });
}
var checkedIcon = function (){
    $('.box').on({
            mouseenter: function(){
                $(this).children('.circle-box').show();
            },
            mouseleave :function(){
                $(this).children('.circle-box').hide();
            }
        }
    );
    $('.box .circle-box').on('click',function(){
        $('.box').off('mouseenter mouseleave');
        $('.circle-box').each(function (i,ele) {
            $(ele).show();
        });
        $(this).toggleClass('colorChange').parent('.box').toggleClass('addBor');
        $('.box').each(function () {
            if($(this).hasClass('addBor')) {
                $('#defaultTab').hide();
                $('#selectTab').show();
                return false;
            }else{
                $('#defaultTab').show();
                $('#selectTab').hide();
            }
        });
    });
    $('#sure').on('click',getSelectedPic);
};

//获取选中图片信息
var getSelectedPic = function () {
    var arr = [];
    $('.box').each(function () {
        if($(this).hasClass('addBor')){
            arr.push($(this).children('img').attr('src'));
            $(this).remove();
        }
    });
    $(this).attr('data-dismiss','modal');
};
//月份小于十时，月份前加0
var format = function (time) {
    if(time && time < 10){
        return '0'+time;
    }else{
        return time;
    }
};