$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
     `<div class="chat_main__contents__lists">
     <div class="chat_main__contents__lists__name">
     ${message.user_name}
     <p class="chat_main__contents__lists__name__date">
     ${message.date}
     </p>
     </div>
     <div class="lower-message">
     <p class="chat_main__contents__lists__name__talker">
     ${message.content}
     </p>
     
     </div>
     </div>
     <div class="chat_main__contents__lists__text"></div>
     <img class="lower-message__image" src=${message.image}>`
     return html;
   } else {
     var html =
     `<div class="chat_main__contents__lists">
     <div class="chat_main__contents__lists__name">
     ${message.user_name}
     <p class="chat_main__contents__lists__name__date">
     ${message.date}
     </p>
     </div>
     <div class="lower-message">
     <p class="chat_main__contents__lists__name__talker">
     ${message.content}
     </p>
     
     </div>
     </div>
     <div class="chat_main__contents__lists__text"></div>`
     return html;
   };
 }
$('.new_message').on('submit', function(e){ 
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action')
 $('chat_main__footer__form__text__send').removeAttr('data-disable-with');
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat_main__contents').append(html);
    $('.chat_main__contents').animate({scrollTop: $('.chat_main__contents')[0].scrollHeight}, 'fast');   
    $('form')[0].reset();
  })
   .fail(function(){
     alert('エラー！');
   });
   return false;
 });
});