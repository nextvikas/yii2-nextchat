$(document).ready(function(){
 

$(document).on('click', '#usersListWrapper li', function(){
     $('#usersListWrapper li').each( function(i,e) {
		$(this).removeClass('activeUser'); 
	 });
	 $(this).removeClass().addClass('activeUser');    
});


/*----------------------------------------------------------------------
| logout function
------------------------------------------------------------------------*/
$(document).on('click', '#logout', function(){
        $.ajax({
            type: "POST",
            url: base  + "users/logout",//localhost/codeigniter/index.php/users/logout
            cache: false,
            beforeSend: function(){},
            success: function(response){  
				window.location = 'users';
			}
        });
    return false;
});



/*----------------------------------------------------------------------
| change status Function
------------------------------------------------------------------------*/
$(document).on('click', '.btnStatus', function() {
    //$(this).find('.btn').toggleClass('active');  
    //if ($(this).find('.btn-success').size()>0) {
     //$(this).toggleClass('btn-success');
		var chatStat = $(this).attr('id');
		var stt = 0;
		if(chatStat == 'online'){
             $(this).removeClass('btn-default').addClass('btn-success');
			 $('.status-btn-group button#offline').removeClass('btn-success').addClass('btn-default');
			 stt = 1;
        }            
        if(chatStat == 'offline'){
             $(this).removeClass('btn-default').addClass('btn-success');
			 $('.status-btn-group button#online').removeClass('btn-success').addClass('btn-default');
			 stt = 0;
        } 
		
 		$.ajax({ 
			type: "POST", 
			url: base  + "chat/change_status", 
			data: {status : stt},
			cache: false,		
             success: function(response){
                if(response.status == 1){
                    $('#current_status').html('Online');
                    $('#current_status').removeClass('btn-danger').addClass('btn-success');
                }            
                else{
                    $('#current_status').html('Offline');
                    $('#current_status').removeClass('btn-success').addClass('btn-danger');
                }
        }});
   // }    
     //$(this).toggleClass('btn-default');
});




/*----------------------------------------------------------------------
| Show Pop overs
------------------------------------------------------------------------*/
   var popOverSettings = {
        container: 'body',
        trigger:'hover',
        selector: '[data-toggle="popover"]',
        placement: 'left',
        html: true,
        content: function () {
            return $('#popover-content').html();
        }
    }

   $(document).on("mouseenter",'[data-toggle="popover"]',function(){
      
	  if(window.innerWidth <= 800 && window.innerHeight <= 600) { 
	  
	  } else {
		  image  = $(this).find('.profile-img').html();
		  name   = $(this).find('.user-name').html();
		  status = $(this).find('.user_status').html();
		  $('#contact-image').empty().html(image);
		  $('#contact-user-name').empty().html(name);
		  $('#contact-user-status').empty().html(status);
		  
		  $(this).popover({
			placement:'left', 
			trigger: 'hover',
			container: 'body',
			selector: '[data-toggle="popover"]',
			html: true,
			content: function () {
				return $('#popover-content').html();
			}
		  }).popover('show');
	  }

    }).on('mouseleave', '[data-toggle="popover"]', function() {
       if(window.innerWidth <= 800 && window.innerHeight <= 600) { 
 	  	} else {
	    $(this).popover('hide');
		}
    });





$('#myTab').tab();


//$('.chat-box-header').

$(document).on('click','.chat-box-header', function(){
    //$('.chat-container').toggle();
	var chatboxid = $(this).parent().attr("id");
	//$('#'+chatboxid).hide();
	$('#'+chatboxid+' .chat-container').toggle();
 });

/*----------------------------------------------------------------------
| Close the chat container
------------------------------------------------------------------------*/
$(document).on('click', '.chat-form-close', function(){
    $('#chat-container').toggle('slide', {
        direction: 'right'
    }, 500);
    //$('.chat-box').hide();
});




//  mobile devices **************************************************************

 if(window.innerWidth <= 800 && window.innerHeight <= 600) { 
 	
 
 
 
 } else {



 }




/*----------------------------------------------------------------------
| Close the chat box window
------------------------------------------------------------------------*/
$(document).on('click','a.chat-box-close', function(){
    //$('.chat-box').hide();
    //$('#chat-container .chat-group a').removeClass('active');
	var chatboxid = $(this).parent().parent().attr("id");
	$('#'+chatboxid).remove();
	
	restructureChatBoxes();
});

/*----------------------------------------------------------------------
| Display the chat container
------------------------------------------------------------------------*/
$('.btn-chat').click(function () {
    if($('.chat-box').is(':visible')){
        $('#chat-container').toggle('slide', {
            direction: 'right'
        }, 500);
        $('.chat-box').hide();
    } else{
        $('#chat-container').toggle('slide', {
            direction: 'right'
        }, 500);
        chat_init();
    }
});
  
 
$('a#delete_messages') .click(function () {
	$('input.checkbx, #deletemsgbtns').show();
 });

$('input#DeleteMsgBtn') .click(function () {
	if( $('input.checkbx:checkbox:checked').length > 0 ){
		
		var r=confirm("Are you sure you want to delete?");
		 if(r==true)		
		 {
				
		var userID = $('#Msg_chat_buddy_id').val();
		
		var deleMsgStr = '';
		$('input.checkbx:checkbox:checked').each(function() {
            deleMsgStr += $(this).val()+',';
        });
		
		
		$.ajax({ 
			type: "POST", 
			url: base  + "chat/delete_messages", 
			data: {message: deleMsgStr},
			cache: false,
                success: function(response){
                    msg = response.message;
					if(msg==1) {
						load_message_section(userID);
						$('input.checkbx, #deletemsgbtns').hide();
					}
                     
                }
            });
			
		 }
		
	} //else { alert('Please select a message to delete'); }
	
});	



$('input#CancelMsgBtn') .click(function () {
	$('input.checkbx, #deletemsgbtns').hide();
	
});	




 
 
});



function restructureChatBoxes() {
	var align = 0;
	//alert(1);
	var chatBoxes = new Array();
	
	$('.chat-box').each( function(i,e) {
		/* you can use e.id instead of $(e).attr('id') */
		chatBoxes.push($(e).attr('id'));
	});
	
	//alert(chatBoxes);
	for (x in chatBoxes) {
		chatboxID = chatBoxes[x];

		if($("#"+chatboxID).is(':visible')){
			if (align == 0) {
				$("#"+chatboxID).css('right', '290px');
			} else {
				width = (align)*(280+20)+300;
				$("#"+chatboxID).css('right', width+'px');
			}
			align++;
		}
	}
}

/* ************************************************* */
/*
|-------------------------------------------------------------------------
| Copyright (c) 2015 
| This script may be used for non-commercial purposes only. For any
| commercial purposes, please contact the author at sumith.harshan@gmail.com
|-------------------------------------------------------------------------
*/

/*
|-------------------------------------------------------------------------
| Funtion to trigger the refresh event
|-------------------------------------------------------------------------
*/
 shChat();

/*----------------------------------------------------------------------
| Function to display individual chatbox
------------------------------------------------------------------------*/

$(document).on('click', '[data-toggle="popover"]', function(){  
        $(this).popover('hide');
        //$('ul.chat-box-body').empty();
		
         user = $(this).find('input[name="user_id"]').val();
         
		if($('#chat-box-'+user).is(':visible')){
			load_thread(user);
			$('#chat-box-'+user+' .chat-box-header').fadeTo(100, 0.1).fadeTo(200, 1.0); 
		} else {
				 
				 $(this).find('span[rel="'+user+'"]').text('');
				 $("ul#chat_box_body_id-"+user).empty();
				
						 var chatboxContents = "<div class=\"chat-box\" style=\"bottom: 0\" id=\"chat-box-"+user+"\">\
										<div class=\"chat-box-header\">\
											<a href=\"javascript: void(0);\" class=\"chat-box-close pull-right\">\
												<i class=\"fa fa-remove\"></i>\
											</a>\
											<span class=\"user-status is-online\"></span>\
											<span class=\"display-name\"></span>\
											<small></small>\
											<span class=\"tinyMsgCount\"></span>\
										</div>\
										<div class=\"chat-container\">\
											<div class=\"chat-content\">\
												<input type=\"hidden\" name=\"chat_buddy_id\" id=\"chat_buddy_id\"/>\
												<ul class=\"chat-box-body\" id=\"chat_box_body_id-"+user+"\"/></ul>\
											</div>\
											<div class=\"chat-textarea\">\
												<input class=\"form-control\" />\
											</div>\
										</div>\
										</div>";
										
				 $( "#chatWrap" ).after(chatboxContents);
				 
				//$('.chat-box').attr('id','chat-box-'+user);
				load_thread(user);
		
				//var offset = $(this).offset(); 
				//var h_main = $('#chat-container').height();
				//var h_title = $("#chat-box-"+user+" .chat-box > .chat-box-header").height();
				//var top = ($('#chat-box-'+user+' .chat-box').is(':visible') ? (offset.top - h_title - 40) : (offset.top + h_title - 20));
				//if((top + $('#chat-box-'+user+' .chat-box').height()) > h_main){ top = h_main -  $('#chat-box-'+user+' .chat-box').height();}
				//$('.chat-box').css({'top': top});
				$('#chat-box-'+user+' .chat-box').css({'bottom': 0});
				 $('#chat-box-'+user+' .chat-box').css({'position': 'fixed'});
				
				 /*if(!$('.chat-box').is(':visible')){
					//alert('Not visible');
 					// $('#chat-box-'+user).css({'right': '280px'});
				 } else {//alert(' visible'); 
					
					 
					var cblngth = $('.chat-box').length;  //300px
					
					var rgh = (300*cblngth);//alert(rgh);
					$('#chat-box-'+user).css({'right': rgh+'px'});
					
					
				  }*/
			// 
 				 var chatBoxes = new Array();
	
				 $('.chat-box').each( function(i,e) {
 					chatBoxes.push($(e).attr('id'));
				 });
 	 
 					 
				var total_popups = 0;	
  				 var right = 280;
               
                var iii = 0;
                for(iii; iii < chatBoxes.length; iii++)
                {
                    if(chatBoxes[iii] != undefined)
                    {
                        var element = document.getElementById(chatBoxes[iii]);
                        element.style.right = right + "px";
                        right = right + 320;
                        element.style.display = "block";
                    }
                }
 				 
  				
				 $('#chat-box-'+user+' .chat-container').show();
				 $('#chat-box-'+user).show();
				
				$('#chat-box-'+user+' .chat-box-body').slimScroll({ height: '300px' });
				// FOCUS INPUT TExT WHEN CLICK
				$("#chat-box-"+user+" .chat-box .chat-textarea input").focus();
 				
		}
 
});




/*----------------------------------------------------------------------
| Function to send message via inbox section
------------------------------------------------------------------------*/

$(document).on('click', '[data-toggle="inboxMsgs"]', function(){  
         userID = $(this).find('input[name="Msguser_id"]').val();
         load_message_section(userID);
});




/*----------------------------------------------------------------------
| Function to send message
------------------------------------------------------------------------*/
$(document).on('keypress', '.chat-textarea input', function(e){
        var txtarea = $(this);
        var message = txtarea.val();
        if(message !== "" && e.which == 13){
            txtarea.val('');
            // save the message 
            $.ajax({ 
			type: "POST", 
			url: base  + "chat/send_message", 
			data: {message: message, user : user},
			cache: false,
                success: function(response){
                    msg = response.message;
                    li = '<li class=" bubble '+ msg.type +'">\
 					<img src="'+base_url+'application/uploads/users/'+msg.avatar+'" class="avt img-responsive">\
                    <div class="message">\
                    <a href="javascript:void(0)" class="chat-name">'+msg.name+'</a>&nbsp;\
                    <span class="chat-datetime">at '+msg.time+'</span>\
                    <span class="chat-body">'+msg.body+'</span></div></li>';

                    $('div#chat-box-'+user+' ul.chat-box-body').append(li);

                    $('div#chat-box-'+user+' ul.chat-box-body').animate({scrollTop: $('div#chat-box-'+user+' ul.chat-box-body').prop("scrollHeight")}, 500);
                }
            });
        }
});





/*----------------------------------------------------------------------
| Function to send message from inbox section
------------------------------------------------------------------------*/
$(document).on('keypress', '.Msg_chat-textarea input', function(e){
        var txtarea = $(this);
        var message = txtarea.val();
		var userID = $('#Msg_chat_buddy_id').val();
		
        if(message !== "" && e.which == 13){
            txtarea.val('');
            // save the message 
            $.ajax({ 
			type: "POST", 
			url: base  + "chat/send_message", 
			data: {message: message, user : userID},
			cache: false,
                success: function(response){
                    msg = response.message;
                    li = '<li class=" bubble '+ msg.type +'" id="msg_'+ msg.msg +'">\
					<input type="checkbox" value="'+ msg.msg +'" class="checkbx" name="deleteMsg"/>\
					<img src="'+base_url+'application/uploads/users/'+msg.avatar+'" class="avt img-responsive">\
                    <div class="message">\
                    <a href="javascript:void(0)" class="chat-name">'+msg.name+'</a>&nbsp;\
                    <span class="chat-datetime">at '+msg.time+'</span>\
					<div class="clr"></div>\
                    <span class="chat-body">'+msg.body+'</span></div></li>';

                    $('ul.Msg_chat-box-body').append(li);

                    //$('ul.Msg_chat-box-body').animate({scrollTop: $('ul.Msg_chat-box-body').prop("scrollHeight")}, 500);
					$(".Msg_chat_container").animate({ scrollTop: $(".Msg_chat_container").attr("scrollHeight") }, 500);
                }
            });
        }
});







/*----------------------------------------------------------------------------------------------------
| Function to load messages
-------------------------------------------------------------------------------------------------------*/
function shChat()
{
    refresh = setInterval(function()
    {
 
    $.ajax(
        {
            type: 'GET',
            url : base + "chat/chatheartbeat/",
            async : true,
            cache : false,
            success: function(data){
                if(data.success){
                     thread = data.messages;
                     senders = data.senders; //alert(data.recipient);
					 var msgCnt = 1;
                     $.each(thread, function() {
						 //$("#chat-box-"+this.sender).css('border','red');
                        if($("#chat-box-"+this.sender).is(":visible")){
                            chatbuddy = $('div#chat-box-'+this.sender+' .chat-container input#chat_buddy_id').val();//$("#chat_buddy_id").val();
							
                                if(this.sender == chatbuddy){
                                  li = '<li class="'+ this.type +'">\
 								  <img src="'+base_url+'application/uploads/users/'+this.avatar+'" class="avt img-responsive">\
                                    <div class="message">\
                                    <a href="javascript:void(0)" class="chat-name">'+this.name+'</a>&nbsp;\
                                    <span class="chat-datetime">at '+this.time+'</span>\
                                    <span class="chat-body">'+this.body+'</span></div></li>';
                                    $('div#chat-box-'+chatbuddy+' ul.chat-box-body').append(li);
                                    $('div#chat-box-'+chatbuddy+' ul.chat-box-body').animate({scrollTop: $('div#chat-box-'+chatbuddy+' ul.chat-box-body').prop("scrollHeight")}, 500);
                                    //Mark this message as read
                                 $.ajax({ type: "POST", url: base + "chat/mark_read", data: {id: this.msg}});
 								 //alert(1);
                                }
                                else{
                                    from = this.sender;
                                    $.each(senders, function() {
                                        if(this.user == from){
                                            $(".chat-group").find('span[rel="'+from+'"]').text(this.count);
											/*var currntTitle = document.title;
											if(currntTitle.indexOf('(') === -1){
												var regExp = /\(([^)]+)\)/;
												var matches = regExp.exec(currntTitle);
												var totalMsg = matches[1]+this.count;
												document.title = '('+totalMsg+') '+document.title;
											}*/
											//$('div#chat-box-2.chat-box div.chat-box-header span.tinyMsgCount').html(this.count);
											//$('div#chat-box-2.chat-box div.chat-box-header span.tinyMsgCount').show();
											//tinyMsgCount
											//a//lert(2);
                                        }
                                    });
                                }
                         }
                         else{
                            from = this.sender;
                            $.each(senders, function() {
                                if(this.user == from){
                                    $(".chat-group").find('span[rel="'+from+'"]').text(this.count);
									//alert(3);
									/*var currntTitle = document.title;
											if(currntTitle.indexOf('(') === -1){
												var regExp = /\(([^)]+)\)/;
												var matches = regExp.exec(currntTitle);
												var totalMsg = matches[1]+this.count;
												document.title = '('+totalMsg+') '+document.title;
											}*/
									//$('div#chat-box-'+this.from+' .chat-box-header span.tinyMsgCount').html(this.count);
									//$('div#chat-box-'+this.from+' .chat-box-header span.tinyMsgCount').show();
									//$('div#chat-box-2.chat-box div.chat-box-header span.tinyMsgCount').html(this.count);
											//$('div#chat-box-2.chat-box div.chat-box-header span.tinyMsgCount').show();
                                }
                            });
                            
                         }
						 msgCnt ++;
                     });

                    //var audio = new Audio('http://localhost/codeigniter/application/assets/notify/notify.mp3').play();
                }
            },
                error : function(XMLHttpRequest, textstatus, error) { 
                            console.log(error); 
                }
        }
    );

       }, 5000);
}

/*----------------------------------------------------------------------
| Function to load threaded messages or user conversation
------------------------------------------------------------------------*/
var limit = 1;
function load_thread(user, limit){
        //send an ajax request to get the user conversation 
       $.ajax({ type: "POST", url: base  + "chat/load_messages", data: {user : user, limit:limit },cache: false,
        success: function(response){
        if(response.success){
            buddy = response.buddy;
            status = buddy.status == 1 ? 'Online' : 'Offline';
            statusClass = buddy.status == 1 ? 'user-status is-online' : 'user-status is-offline';
//alert(user);
            $('div#chat-box-'+user+' .chat-container input#chat_buddy_id').val(buddy.id);
			
			//$('div#chat-box-'+user+' .chat-container input#chat_buddy_id').css('border','red');
			
            $('div#chat-box-'+user+' .chat-box-header span.display-name').html(buddy.name);
            $('div#chat-box-'+user+' .chat-box-header > small').html(status);
            $('div#chat-box-'+user+' .chat-box-header > span.user-status').removeClass().addClass(statusClass);
//console.log($('div#chat-box-'+user));
            $('ul#chat_box_body_id-'+user).html('');
            if(buddy.more){
             $('ul#chat_box_body_id-'+user).append('<li id="load-more-wrap" style="text-align:center"><a onclick="javascript: load_thread(\''+buddy.id+'\', \''+buddy.limit+'\')" class="btn btn-xs btn-info" style="width:100%">View older messsages('+buddy.remaining+')</a></li>');
            }
 

                thread = response.thread;
                $.each(thread, function() {
                  li = '<li class="'+ this.type +'">\
 				  <img src="'+base_url+'application/uploads/users/'+this.avatar+'" class="avt img-responsive">\
                    <div class="message">\
                    <a href="javascript:void(0)" class="chat-name">'+this.name+'</a>&nbsp;\
                    <span class="chat-datetime">at '+this.time+'</span>\
                    <span class="chat-body">'+this.body+'</span></div></li>';

                    $('ul#chat_box_body_id-'+user).append(li);
                });
                if(buddy.scroll){
                    $('div#chat_box_body_id-'+user).animate({
						scrollTop: $('ul#chat_box_body_id-'+user).prop("scrollHeight")
					}, 500);
                }
                
            }
        }});
}





/*----------------------------------------------------------------------
| Function to message inbox section
------------------------------------------------------------------------*/
var limit_msg = 1;
function load_message_section(userID, limit_msg){
	
	$('input.checkbx, #deletemsgbtns').hide();
	
        //send an ajax request to get the user conversation 
       $.ajax({ type: "POST", url: base  + "chat/load_messages", data: {user : userID, limit:limit_msg },cache: false,
        success: function(response){
        if(response.success){
            user = response.buddy;
            status = user.status == 1 ? 'Online' : 'Offline';
            statusClass = user.status == 1 ? 'user-status is-online' : 'user-status is-offline';

            $('#Msg_chat_buddy_id').val(user.id);
            $('h4.display-name').html(user.name+' ('+status+')');
            //$('.chat-box > .chat-box-header > small').html(status);
            //$('.chat-box > .chat-box-header > span.user-status').removeClass().addClass(statusClass);

            $('ul.Msg_chat-box-body').html('');
            if(user.more){
             $('ul.Msg_chat-box-body').append('<li id="load-more-wrap" style="text-align:center"><a onclick="javascript: load_message_section(\''+user.id+'\', \''+user.limit+'\')" class="btn btn-xs btn-info" style="width:100%">View older messsages('+user.remaining+')</a></li>');
            }
 

                thread = response.thread;
                $.each(thread, function() {
                  li = '<li class="'+ this.type +'" id="msg_'+ this.msg +'">\
				  <input type="checkbox" value="'+ this.msg +'" class="checkbx" name="deleteMsg"/>\
				  <img src="'+base_url+'application/uploads/users/'+this.avatar+'" class="avt img-responsive">\
                    <div class="message">\
                    <a class="chat-name">'+this.name+'</a>&nbsp;\
                    <span class="chat-datetime">at '+this.time+'</span>\
					<div class="clr"></div>\
                    <span class="chat-body">'+this.body+'</span></div></li>';

                    $('ul.Msg_chat-box-body').append(li);
                });
                if(user.scroll){
                    $('ul.Msg_chat-box-body').animate({scrollTop: $('ul.Msg_chat-box-body').prop("scrollHeight")}, 500);
                }
                
            }
        }});
}

