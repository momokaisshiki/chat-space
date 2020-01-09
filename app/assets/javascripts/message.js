$(function(){ 
  last_message_id = $('.message:last').data("message-id");
  function buildHTML(message){
   if ( message.image ) {
     var html =
     `<div class="chat_main__contents__lists">
     <div class="chat_main__contents__lists__name">
     ${message.user_name}
     <p class="chat_main__contents__lists__name__date">
     ${message.created_at}
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
     ${message.created_atrrails }
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
  var reloadMessages = function() {
  last_message_id = $('.chat_main__contents:last').data("message-id");
  $.ajax({
    url: "api/messages",
    type: 'get',
    dataType: 'json',
    data: {id: last_message_id}
  })
  .done(function(messages) {
    if (messages.length !== 0) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message)
      });
      $('.chat_main__contents').append(insertHTML);
      $('.chat_main__contents').animate({ scrollTop: $('.chat_main__contents')[0].scrollHeight});
      $("#new_message")[0].reset();
      $(".chat_main__footer__form__text__send").prop("disabled", false);
    }
  })
  .fail(function() {
    alert('error');
  });
};
  if (document.location.href.match(/\/groups\/\d+\/messages/)) {
    setInterval(reloadMessages, 7000);
  }
});