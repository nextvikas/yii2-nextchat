// if(typeof(EventSource) !== "undefined") {
//     var source = new EventSource("demo_sse.php");
//     source.onmessage = function(event) {
//         var data=JSON.parse(event.data);
//         document.getElementById("result").innerHTML += "Inbox = "+data.time + "<br>";
//     };
// } else {
//     document.getElementById("result").innerHTML = "Sorry, your browser does not support server-sent events...";
// }



/*
|-------------------------------------------------------------------------
| Copyright (c) 2013 
| This script may be used for non-commercial purposes only. For any
| commercial purposes, please contact the author at sammkaranja@gmail.com
|-------------------------------------------------------------------------
*/

/*
|-------------------------------------------------------------------------
| Funtion to trigger the refresh event
|-------------------------------------------------------------------------
*/
bootChat();
jQuery.fn.closestParents = function( selector ){
    var result = jQuery( [] );
    // Check to see if there is a selector. If not, then
    // we're just gonna return the parent() call.
    if (!selector){
        // Since there is no selector, the user simply
        // wants to return the first immediate parent
        // of each element.
        return( this.parent() );
    }
    // Loop over each element in this collection.
    this.each(
        function( index, node ){
            // For each node, we are going to get all the
            // parents that match the given selector; but
            // then, we're only going to add the first
            // one to the ongoing collection.
            result = result.add(
                jQuery( node ).parents( selector ).first()
            );
        }
    );
    // Return the new collection, pushing it onto the
    // stack (such that end() can be used to return to
    // the original collection).
    return(
        this.pushStack(
            result,
            "closestParents",
            selector
        )
    );
};
/*----------------------------------------------------------------------
| Function to display individual chatbox
------------------------------------------------------------------------*/




/* var rightvar,perentid;
$(document).on('click', '.chat-box-full', function(event){
	$(this).hide();
	perentid=$(this).parent().parent().attr('id').match(/\d+/);
	var docwidth=$(window).width()-290;
	var docheight=$(window).height()-110;
	rightvar=$('#chat-box-'+perentid).css('right');	
	$('#chat-box-'+perentid).css({'right':'290px','width':docwidth+'px','z-index':'1'});
	$('.slimScrollDiv').css({'height':docheight+'px'});
	$('#chat_box_body_id-'+perentid).css({'height':docheight+'px'});
	$('#chat-box-'+perentid+' .chat-box-half').show();
})
$(document).on('click', '.chat-box-half', function(event){
	$('#chat-box-'+perentid).css({'right':rightvar,'width':'','z-index':''});
	$('#chat_box_body_id-'+perentid).css({'height':'250px'});
	$('.slimScrollDiv').css({'height':'250px'});
	$('#chat-box-'+perentid+' .chat-box-half').hide();
	$('#chat-box-'+perentid+' .chat-box-full').show();
}) */

/* function chooseFile(file) { 
alert(file);
var fileReader = new FileReader(); 
fileReader.onload = function (event) { 
var arrayBuffer = base64ToArrayBuffer(this.result); 
var exif = EXIF.readFromBinaryFile(new BinaryFile(arrayBuffer)); 
alert(exif.Orientation); 
}; 
fileReader.readAsDataURL(file); 
} 

function base64ToArrayBuffer(base64) { 
base64 = base64.replace(/^data\:([^\;]+)\;base64,/gmi, ''); 
var binary_string = window.atob(base64); 
var len = binary_string.length; 
var bytes = new Uint8Array(len); 
for (var i = 0; i < len; i++) { 
bytes[i] = binary_string.charCodeAt(i); 
} 
return bytes.buffer; 
} */


$(document).on('change', '.fileinput[type="file"]', function(event){ 
	var $the=$(this); 
	var val = $the.val().toLowerCase();
	if (!val.match(/(?:gif|jpg|png|bmp|txt|html)$/)) {
		alert("This file is not an image!");
		return false;
	}
	var fid=$the.attr('id').match(/\d+/);
	var nimg = window.URL.createObjectURL(this.files[0]);
	var rand = Math.floor((Math.random()*100000)+3);
	var chechext,chechtype;
	if (val.match(/(?:gif|jpg|png|bmp)$/)) {
		chechtype='image';
		chechext='<img class="mypopup" src="'+nimg+'">';
	}
	if (val.match(/(?:txt|html)$/)) {
		chechtype=val.substr(val.lastIndexOf('.')+1);
		chechext='<a href="" download><img class="newpopup" src="assets/main/chat/images/fileimg/'+chechtype+'.png">'+val+'</a>';
	}
	
///assets/main/chat/images
//assets/main/chat/images/fileimg/


	var newtime=new Date().toString('hh:mm tt');
	
	if($('div#chat-box-'+fid+' ul.chat-box-body li:last').hasClass('out')){
		var loadli = '<div class="messageo"><div class="message">\
		<a href="javascript:void(0)" class="chat-name">You</a>&nbsp;\
		<span class="chat-datetime">at '+newtime+'</span>\
		<span class="chat-body">'+chechext+'<div class="progress" id="'+rand+'"></span>\
		<span class="chat-body-status'+fid+'">Sending...</span></div></div>';
		$('div#chat-box-'+fid+' ul.chat-box-body li:last').append(loadli);
	} else {
		var loadli = '<li class="out" id="stopcheck'+fid+'"><img src="'+login_avatar+'" class="avt img-responsive">\
		<div class="messageo"><div class="message">\
		<span class="chat-arrow"></span>\
		<a href="javascript:void(0)" class="chat-name">You</a>&nbsp;\
		<span class="chat-datetime">at '+newtime+'</span>\
		<span class="chat-body">'+chechext+'<div class="progress" id="'+rand+'"></span>\
		<span class="chat-body-status'+fid+'">Sending...</span></div></div></li>';
		$('div#chat-box-'+fid+' ul.chat-box-body').append(loadli);
	}

	$('div#chat-box-'+fid+' ul.chat-box-body').animate({scrollTop: $('div#chat-box-'+fid+' ul.chat-box-body').prop("scrollHeight")}, 500);
	if(chechtype=='image')
		$the.fileExif(someCallback,fid);
	upload(this.files[0],rand,fid);
});

function someCallback(exifObject,id) {
	//alert(id);
	if(typeof exifObject.Orientation!=='undefined'){
	var exifo=exifObject.Orientation;
	var $img=$('#chat_box_body_id-'+id+' li:last-child').find('.mypopup');
	//var $img=$('.chat-body .mypopup');
	if(exifo==2){$img.addClass('flip');}
	if(exifo==3){$img.addClass('flip');}
	if(exifo==4){$img.addClass('flip-and-rotate-180');}
	if(exifo==5){$img.addClass('flip-and-rotate-270');}
	if(exifo==6){$img.addClass('rotate-90');}
	if(exifo==7){$img.addClass('flip-and-rotate-90');}
	if(exifo==8){$img.addClass('rotate-270');}
	}
};

var checkismob=false;
$(document).on('click', '.chatover[data-toggle="popover"]', function(){ 
		var $the=$(this); 
		//$('#chat-container').toggle();
		user = $the.find('input[name="user_id"]').val();
		
		if($the.hasClass('user')){
			
			var checkid=$("#chat-container .chat-group").find('span[rel="'+user+'"]');
			if(checkid.length==0){
			
			var adduimg = $('#img'+user).attr('src');
			//var adduimg = $the.closest(":has(li img)").find('li img').attr('src');
			var adduname = $the.find('input[name="user_id"]').attr('uname');
			
			var adduse='<a href="javascript: void(0)" class="chatover" data-toggle="popover">\
			<div class="contact-wrap">\
			  <input type="hidden" value="'+user+'" name="user_id" />\
			   <div class="contact-profile-img">\
				   <div class="profile-img">\
					<img src="'+adduimg+'" class="img-responsive">\
				   </div>\
			   </div>\
				<span class="contact-name">\
					<small class="user-name">\
						'+adduname+'\
					</small>\
					<span class="badge progress-bar-danger" rel="'+user+'"></span>\
				</span>\
				<span style="padding: 0px 7px; width: 100%; float: left;" class="user_status">\
					<span class="user-status is-offline"></span>offline\
				</span>\
			</div>\
			</a>';	
			$("#chat-container .chat-group").append(adduse);
		}
		}
		
		
		
		
        $the.popover('hide');
		if($(document).width()<700)
			checkismob=true;




	if(urlvar=="chat"){
		$('#new-chat-container .chat-box.pc').remove();
	}


// <a href=\"javascript: void(0);\" class=\"chat-box-upload pull-right\">\
// 												<i class=\"fa fa-paperclip\"></i>\
// 											</a>\


         
         
		if($('#chat-box-'+user).is(':visible')){
			load_thread(user);
			$('#chat-box-'+user+' .chat-box-header').fadeTo(100, 0.1).fadeTo(200, 1.0); 
		} else {
				if(checkismob)
				 var mobpc = 'mob';
			 else 
				 var mobpc = 'pc';
				 $the.find('span[rel="'+user+'"]').text('');
				 $("#Msgc").find('span').text('').hide();
				 $("ul#chat_box_body_id-"+user).empty();

				



if(user==19999){
						 var chatboxContents = "<div class=\"chat-box "+mobpc+"\" style=\"bottom: 0\" id=\"chat-box-"+user+"\">\
										<div class=\"chat-box-header\">\
											<a href=\"javascript: void(0);\" class=\"chat-box-close pull-right\">\
												<i class=\"fa fa-remove\"></i>\
											</a>\
											<a href=\"javascript: void(0);\" class=\"chat-box-mini pull-right\">\
												<i class=\"fa fa-minus\"></i>\
											</a>\
											<a href=\"javascript: void(0);\" class=\"chat-box-mysetting pull-right\">\
												<i class=\"fa fa-cog\"></i>\
											</a>\
    <ul class=\"dropdown-menu ind_setting\">\
        <li>\
            <a href=\"javascript: void(0);\" id=\"dell_conversation\" data-id=\""+user+"\">\
              <span class=\"pull-left\"><i class=\"fa fa-trash\"></i> Delete conversation</span>\
            </a>\
        </li>\
    </ul>\
											<img class=\"user-img\" src=\"/account/profileimg/user.jpg\">\
											<div class=\"chat-middle\"><span class=\"display-name\"></span>\
											<div class=\"chat-line\">Loading....</div>\
											</div><span class=\"tinyMsgCount\"></span>\
										</div>\
										<div class=\"chat-container\">\
											<div class=\"chat-content\" id=\"chatcontent"+user+"\">\
												<input type=\"hidden\" name=\"chat_buddy_id\" id=\"chat_buddy_id\"/>\
												<ul class=\"chat-box-body\" id=\"chat_box_body_id-"+user+"\"/></ul>\
											</div>\
											<div class=\"chat-textarea\">\
												<a class=\"sendchat\" href=\"javascript:void(0)\"><i class=\"fa fa-paper-plane\"></i></a>\
												<div class=\"image-upload\">\
												<input placeholder=\"Write a Message...\" class=\"form-control chatbb\" id=\""+user+"\" />\
													<label for=\"myfile"+user+"\">\
														<i class=\"fa fa-upload\"></i>\
													</label>\
													<input accept=\"image/*\" type=\"file\" class=\"fileinput\" id=\"myfile"+user+"\" name=\"myfile\">\
												</div>\
											</div>\
										</div>\
										</div>";
} else {
							 var chatboxContents = "<div class=\"chat-box "+mobpc+"\" style=\"bottom: 0\" id=\"chat-box-"+user+"\">\
										<div class=\"chat-box-header\">\
											<a href=\"javascript: void(0);\" class=\"chat-box-close pull-right\">\
												<i class=\"fa fa-remove\"></i>\
											</a>\
											<a href=\"javascript: void(0);\" class=\"chat-box-mini pull-right\">\
												<i class=\"fa fa-minus\"></i>\
											</a><a href=\"javascript: void(0);\" class=\"chat-box-full pull-right dochat\">\
												<i class=\"fa fa-expand\"></i>\
											</a><img class=\"user-img\" src=\"/account/profileimg/user.jpg\">\
											<div class=\"chat-middle\"><span class=\"display-name\"></span>\
											<div class=\"chat-line\">Loading....</div>\
											</div><span class=\"tinyMsgCount\"></span>\
										</div>\
										<div class=\"chat-container\">\
											<div class=\"chat-content\" id=\"chatcontent"+user+"\">\
												<input type=\"hidden\" name=\"chat_buddy_id\" id=\"chat_buddy_id\"/>\
												<ul class=\"chat-box-body\" id=\"chat_box_body_id-"+user+"\"/></ul>\
											</div>\
											<div class=\"chat-textarea\">\
												<a class=\"sendchat\" href=\"javascript:void(0)\"><i class=\"fa fa-paper-plane\"></i></a>\
												<div class=\"image-upload\">\
												<input placeholder=\"Write a Message...\" class=\"form-control chatbb\" id=\""+user+"\" />\
													<label for=\"myfile"+user+"\">\
														<i class=\"fa fa-upload\"></i>\
													</label>\
													<input accept=\"image/*\" type=\"file\" class=\"fileinput\" id=\"myfile"+user+"\" name=\"myfile\">\
												</div>\
											</div>\
										</div>\
										</div>";
}

		 $( "#chatWrap" ).after(chatboxContents);
		 
		load_thread(user);
		
		
		var dropbox;  
		var oprand = {
			dragClass : "dragactive",
			on: {
				load: function(e, file) {
					// check file size
					if (parseInt(file.size / 1024) > 5050) {  
					  alert("File \""+file.name+"\" is too big.Max allowed size is 2 MB.");
					  return false;	
					} 
					var val = file.name.toLowerCase();
					if (!val.match(/(?:gif|jpg|png|bmp)$/)) {
						alert("This file is not an image!");
						return false;
					}

					var rand = Math.floor((Math.random()*100000)+3);
					var newtime=new Date().toString('hh:mm tt');
					
					
					if($('div#chat-box-'+user+' ul.chat-box-body li:last').hasClass('out')){
						var loadli = '<div class="messageo"><div class="message">\
						<a href="javascript:void(0)" class="chat-name">You</a>&nbsp;\
						<span class="chat-datetime">at '+newtime+'</span>\
						<span class="chat-body">\
						<img class="mypopup" src="'+e.target.result+'">\
						<div class="progress" id="'+rand+'">\
						</span>\
						<span class="chat-body-status'+user+'">Sending...</span></div></div>';
						$('div#chat-box-'+user+' ul.chat-box-body li:last').append(loadli);
					} else {
						var loadli = '<li class="out" id="stopcheck'+user+'"><img src="'+login_avatar+'" class="avt img-responsive">\
						<div class="messageo"><div class="message">\
						<span class="chat-arrow"></span>\
						<a href="javascript:void(0)" class="chat-name">You</a>&nbsp;\
						<span class="chat-datetime">at '+newtime+'</span>\
						<span class="chat-body">\
						<img class="mypopup" src="'+e.target.result+'">\
						<div class="progress" id="'+rand+'">\
						</span>\
						<span class="chat-body-status'+user+'">Sending...</span></div></div></li>';
						$('div#chat-box-'+user+' ul.chat-box-body').append(loadli);
					}
					
					$('div#chat-box-'+user+' ul.chat-box-body').animate({scrollTop: $('div#chat-box-'+user+' ul.chat-box-body').prop("scrollHeight")}, 500);
						$.fileExif(file,someCallback,user);
						upload(file,rand,user);
				},
			}
		};
		FileReaderJS.setupDrop(document.getElementById('chatcontent'+user), oprand); 

	
		$('#chat-box-'+user+' .chat-box').css({'bottom': 0});
		 $('#chat-box-'+user+' .chat-box').css({'position': 'fixed'});

		 
		 var chatBoxes = new Array();

		 $('.chat-box').each( function(i,e) {
			chatBoxes.push($(e).attr('id'));
		 });

			 
		var total_popups = 0;	
		if(checkismob)
		 var right = 0;
	 else 
		 var right = 300;
	   
		var iii = 0;
		var jsnsj=parseInt(chatBoxes.length*320)+300;
		//alert($(window).width()+","+jsnsj);
		if($(window).width()<jsnsj){
			$("#new-chat-container").find(".chat-box.pc:last").remove();
		}
		
		
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
		
		if(checkismob)
			 //$('#chat-box-'+user+' .chat-box-body').css({ height:$(window).height()-125});
		//$('#chat-box-'+user+' .chat-box-body').slimScroll({ height: '350px',color:'green' ,alwaysVisible:true,railVisible:true});
		// FOCUS INPUT TExT WHEN CLICK
		$("#chat-box-"+user+" .chat-box .chat-textarea input").focus();
	}
	if(checkismob){
		// $('#_atssh').nextAll().hide();
		// $('#chat-container').toggle('slide', {
		// 	direction: 'right'
		// }, 500);
	}
	winchatsize();
});

$(window).resize(function(){
    winchatsize();
});

var winchatsize=function(){
	if(urlvar=="chat" && typeof user != 'undefined'){
		//var cheight=$(document).height()-110;
		var cheight = 500;
		$('#chat-box-'+user+' .chat-box-body').css({'height': cheight+'px'});
		//$('#new-chat-container').css({'height': '108px'});
	}
}


/*----------------------------------------------------------------------
| Function to send message
------------------------------------------------------------------------*/

$(document).on('keyup', '.chat-textarea .chatbb', function(e){
	//alert(parseInt($(this).val().length)+1);
	if(!$(this).val()){
		$(this).next('label').show();
		$(this).css('width','88%');
	} else {
		$(this).next('label').hide();
		$(this).css('width','100%');
	}
	 if($(this).val() !== "" && e.which == 13){
		 $('.sendchat').click();
	 }
})




$(document).on('click', '.sendchat', function(e){
        var txtarea = $(this);
        var message = txtarea.next().find('input').val();
        if(message !== ""){
            txtarea.next().find('input').val('');
		txtarea.next().find('input').next('label').show();
		txtarea.next().find('input').css('width','88%');
            // save the message 
			var newtime=new Date().toString('hh:mm tt');
			var nuser=txtarea.next().find('input').attr('id');
			
					
if($('div#chat-box-'+nuser+' ul.chat-box-body li:last').hasClass('out')){
			li ='<div class="messageo"><div class="message">\
			<a href="javascript:void(0)" class="chat-name">You</a>&nbsp;\
			<span class="chat-datetime">at '+newtime+'</span>\
			<span class="chat-body">'+message+'</span><span class="chat-body-status'+nuser+'">Sending...</span></div></div>';
			$('div#chat-box-'+nuser+' ul.chat-box-body li:last').append(li);
} else {
	
			li ='<li class="out"><img src="'+login_avatar+'" class="avt img-responsive"><div class="messageo"><div class="message">\
			<span class="chat-arrow"></span>\
			<a href="javascript:void(0)" class="chat-name">You</a>&nbsp;\
			<span class="chat-datetime">at '+newtime+'</span>\
			<span class="chat-body">'+message+'</span><span class="chat-body-status'+nuser+'">Sending...</span></div></div></li>';
			$('div#chat-box-'+nuser+' ul.chat-box-body').append(li);
}
			

			$('div#chat-box-'+nuser+' ul.chat-box-body').animate({scrollTop: $('div#chat-box-'+nuser+' ul.chat-box-body').prop("scrollHeight")}, 500);
			
			
            $.ajax({ type: "POST", url: base  + "chat/save_message", data: {message: message, user : nuser},cache: false,
                success: function(response){
					if(response.success){
                    msg = response.message;
					$('span.chat-body-status'+nuser).prev('.chat-body').html(msg.body);
					$('span.chat-body-status'+nuser).remove();
                    /* li = '<li class=" bubble '+ msg.type +'"><img src="assets/images/thumbs/'+msg.avatar+'" class="avt img-responsive">\
                    <div class="message">\
                    <span class="chat-arrow"></span>\
                    <a href="javascript:void(0)" class="chat-name">'+msg.name+'</a>&nbsp;\
                    <span class="chat-datetime">at '+msg.time+'</span>\
                    <span class="chat-body">'+msg.body+'</span></div></li>';

                    $('div#chat-box-'+nuser+' ul.chat-box-body').append(li);

                    $('div#chat-box-'+nuser+' ul.chat-box-body').animate({scrollTop: $('div#chat-box-'+nuser+' ul.chat-box-body').prop("scrollHeight")}, 500); */
					} else {
						$('span.chat-body-status'+nuser).html('failed');
					}
                }
            });
        }
});

/*----------------------------------------------------------------------------------------------------
| Function to load messages
-------------------------------------------------------------------------------------------------------*/
var vars = {};
vars['doctitle']=document.title;


function bootChat()
{
    refresh = setInterval(function()
    {
    $.ajax(
        {
            type: 'GET',
            url : base + "chat/updates/",
            async : true,
            cache : false,
            success: function(data){
				//console.log(data);
                if(data.success){
					//chat_init();
                     thread = data.messages;
                     senders = data.senders; 
                     $.each(thread, function() {
                        if($("#chat-box-"+this.sender).is(":visible")){
                            chatbuddy = $('div#chat-box-'+this.sender+' .chat-container input#chat_buddy_id').val();//$("#chat_buddy_id").val();
                                if(this.sender == chatbuddy){
							if($("#chat-box-"+this.sender+" .chat-container").css("display")=='none'){		
								vars['blings'+this.sender]=setblings(this.sender,this.name);
							}

									
									var chatbody=this.body;
									if(this.body=='' || this.body==null){
										if (this.chatimage.toLowerCase().match(/(?:gif|jpg|png|bmp)$/)) {
											var chatbody='<img class="mypopup" src="'+imgpath+this.chatimage+'">';
										}
										if (this.chatimage.toLowerCase().match(/(?:txt|html)$/)) {
											var chechtype=this.chatimage.substr(this.chatimage.lastIndexOf('.')+1);
											var chatbody='<a href="" download><img class="newpopup" src="assets/main/chat/images/fileimg/'+chechtype+'.png">'+this.chatimage+'</a>';
										}

									}
									
								if($('ul#chat_box_body_id-'+chatbuddy+' li:last').attr('class')==this.type){
									li = '<div class="messageo" title="'+this.fulltime+'"><div class="message">\
                                    <a href="javascript:void(0)" class="chat-name">'+this.name+'</a>&nbsp;\
                                    <span class="chat-datetime">at '+this.time+'</span>\
                                    <span class="chat-body">'+chatbody+'</span></div></div>';
                                    $('div#chat-box-'+chatbuddy+' ul.chat-box-body li:last').append(li);
								} else {
									li = '<li class="'+ this.type +'"><img title="'+this.fulltime+'" src="'+this.avatar+'" class="avt img-responsive">\
                                    <div class="messageo" title="'+this.fulltime+'"><div class="message">\
                                    <span class="chat-arrow"></span>\
                                    <a href="javascript:void(0)" class="chat-name">'+this.name+'</a>&nbsp;\
                                    <span class="chat-datetime">at '+this.time+'</span>\
                                    <span class="chat-body">'+chatbody+'</span></div></div></li>';
                                    $('div#chat-box-'+chatbuddy+' ul.chat-box-body').append(li);
								}
                                  
                                    $('div#chat-box-'+chatbuddy+' ul.chat-box-body').animate({scrollTop: $('div#chat-box-'+chatbuddy+' ul.chat-box-body').prop("scrollHeight")}, 500);
                                    //Mark this message as read
                                	$.ajax({ type: "POST", url: base + "chat/mark_read", data: {id: this.msg}});
                                }
                                else{
                                    from = this.sender;
                                    $.each(senders, function() {
                                        if(this.user == from){
                                            $(".chat-group").find('span[rel="'+from+'"]').text(this.count);
										if($("#Msgc").find('span').length) {
											$("#Msgc").find('span').text(this.count);
											//console.log(this.count);
										}
										else
											$("#Msgc").append('<span class="button__badge">'+this.count+'</span>');
                                            //$('span[rel="'+from+'"]').closestParents("a").addClass("parenjjjjt");
                                        }
                                    });
                                }
                         }
                         else{
                            from = this.sender;	
                            $.each(senders, function() {
                                if(this.user == from){
									$(".chat-group").find('span[rel="'+from+'"]').text(this.count);
									if($("#Msgc").find('span').length) {
										$("#Msgc").find('span').text(this.count);
										//console.log(this.count);
									}
									else
										$("#Msgc").append('<span class="button__badge">'+this.count+'</span>');
									//$('span[rel="'+from+'"]').closestParents("a").addClass("parenjjjjt");
                                }
                            });
                            
                         }
                     });

                    //var audio = new Audio('assets/notify/notify.mp3').play();
                }
            },
            error : function(XMLHttpRequest, textstatus, error) { 
                //console.log(XMLHttpRequest+","+textstatus+","+error); 
                //[object Object],parsererror,SyntaxError: JSON.parse: unexpected non-whitespace character after JSON data at line 1 column 3 of the JSON data
            }
        }
    );

       }, 2000);
}

/*----------------------------------------------------------------------
| Function to load threaded messages or user conversation
------------------------------------------------------------------------*/
var limit = 1;
function load_thread(user, limit){
        //send an ajax request to get the user conversation 
       $.ajax({ type: "POST", url: base  + "chat/messages", data: {user : user, limit:limit },cache: false,
        success: function(response){
        if(response.success){
            buddy = response.buddy;
            status = buddy.status == 1 ? 'Online' : 'Offline';
            statusClass = buddy.status == 1 ? 'user-status is-online' : 'user-status is-offline';

            $('div#chat-box-'+user+' .chat-container input#chat_buddy_id').val(buddy.id);
			
            $('div#chat-box-'+user+' .chat-box-header span.display-name').html(buddy.name);
            $('div#chat-box-'+user+' .chat-box-header .chat-line').html(status);
			
            $('div#chat-box-'+user+' img.user-img').attr('src',buddy.image);

            $('ul#chat_box_body_id-'+user).html('');
            if(buddy.more){
             $('ul#chat_box_body_id-'+user).append('<li id="load-more-wrap" style="text-align:center"><a onclick="javascript: load_thread(\''+buddy.id+'\', \''+buddy.limit+'\')" class="btn btn-xs btn-info" style="width:100%">View older messsages('+buddy.remaining+')</a></li>');
            }
 

                thread = response.thread;
                $.each(thread, function() {
					var chatbody=this.body;
					if(this.body=='' || this.body==null){
						if (this.chatimage.toLowerCase().match(/(?:gif|jpg|png|bmp)$/)) {
							chatbody='<img class="mypopup" src="'+imgpath+this.chatimage+'">';
						}
						if (this.chatimage.toLowerCase().match(/(?:txt|html)$/)) {
							var chechtype=this.chatimage.substr(this.chatimage.lastIndexOf('.')+1);
							chatbody='<a href="'+imgpath+this.chatimage+'" download><img class="newpopup" src="assets/main/chat/images/fileimg/'+chechtype+'.png">'+this.chatimage+'</a>';
						}
						
					}
					
					
if($('ul#chat_box_body_id-'+user+' li:last').attr('class')==this.type){
                  li = '<div class="messageo" title="'+this.fulltime+'"><div class="message">\
                    <a href="javascript:void(0)" class="chat-name">'+this.name+'</a>&nbsp;\
                    <span class="chat-datetime">at '+this.time+'</span>\
                    <span class="chat-body">'+chatbody+'</span></div></div>';

                    $('ul#chat_box_body_id-'+user+' li:last').append(li);
			
} else {
	
                  li = '<li class="'+ this.type +'">\
 				  <img title="'+this.fulltime+'" src="'+this.avatar+'" class="avt img-responsive">\
                    <div class="messageo" title="'+this.fulltime+'"><div class="message">\
					<span class="chat-arrow"></span>\
                    <a href="javascript:void(0)" class="chat-name">'+this.name+'</a>&nbsp;\
                    <span class="chat-datetime">at '+this.time+'</span>\
                    <span class="chat-body">'+chatbody+'</span></div></div></li>';

                    $('ul#chat_box_body_id-'+user).append(li);
}
					
					
					
					

					
                   	$('div#chat-box-'+user+' ul.chat-box-body').animate({scrollTop: $('div#chat-box-'+user+' ul.chat-box-body').prop("scrollHeight")}, 50);
                });
                if(buddy.scroll){
                    $('div#chat_box_body_id-'+user).animate({
						scrollTop: $('ul#chat_box_body_id-'+user).prop("scrollHeight")
					}, 500);
                }
                
            }
        }});
}


/*
|----------------------------------------------------------------------------
| End of file
|----------------------------------------------------------------------------
*/

function imgChatBoxeset(imgpath,userid) {
	var files = imgpath.target.files;
	var cdata = new FormData();
    $.each(files, function(key, value) {
        cdata.append(key, value);
    });
	cdata.append('user', userid);
	$.ajax({ 
		type: "POST", 
		url: base  + "chat/save_chat_img", 
		data: cdata,
		cache: false, 
        processData: false,
        contentType: false,
		success: function(data){
			if(data.success){
                $(".chat-body-status"+userid).remove();
            } else {
                $(".chat-body-status"+userid).html('ERRORS: ' + data.error);
            }
        },
        error: function(errorThrown) {
            $(".chat-body-status"+userid).html('ERRORS: ' + errorThrown);
        }
	});
}
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
				$("#"+chatboxID).css('right', '300px');
			} else {
				width = (align)*(300+20)+300;
				$("#"+chatboxID).css('right', width+'px');
			}
			align++;
		}
	}
}

function restructureChatBoxesRightRemove() {
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
				$("#"+chatboxID).css('right', '0px');
			} else {
				width = (align)*(0+20)+300;
				$("#"+chatboxID).css('right', width+'px');
			}
			align++;
		}
	}
}


function upload(file,rand,userid){
	// now upload the file
	var xhr = new Array();
	xhr[rand] = new XMLHttpRequest();
	xhr[rand].open("post", base  + "chat/save_chat_img", true);

	xhr[rand].upload.addEventListener("progress", function (event) {
		//console.log(event);
		if (event.lengthComputable) {
			$(".progress[id='"+rand+"'] span").css("width",(event.loaded / event.total) * 100 + "%");
			$(".preview[id='"+rand+"'] .updone").html(((event.loaded / event.total) * 100).toFixed(2)+"%");
		}
		else {
			alert("Failed to compute file upload length");
		}
	}, false);

	xhr[rand].onreadystatechange = function (oEvent) {  
		//console.log(xhr[rand].responseText);
	if (xhr[rand].readyState == XMLHttpRequest.DONE) {
		var jsoncode=JSON.parse(xhr[rand].responseText);
        
		if(jsoncode.success){
			$(".progress[id='"+rand+"']").remove();
		} else {
			$(".chat-body-status"+userid).html('ERRORS: ' + jsoncode.error);
		}
    }	
	  if (xhr[rand].readyState === 4) {  
		if (xhr[rand].status === 200) {  
		  $(".progress[id='"+rand+"'] span").css("width","100%");
		  $(".preview[id='"+rand+"']").find(".updone").html("100%");
		  $(".preview[id='"+rand+"'] .overlay").css("display","none");
		} else {  
		  alert("Error : Unexpected error while uploading file");  
		}  
	  }  
	};  
	
	// Set headers
var formData = new FormData();  
formData.append('myfile',file); 
formData.append('user',userid); 
xhr[rand].send(formData);
}


function ImageExist(url) {
   var img = new Image();
   img.src = url;
   return img.height != 0;
}




var blink = true;
function setblings(id,name){
	return setInterval(function(){
		var theTitle = document.getElementsByTagName("title")[0];
		$("#chat-box-"+id+" .chat-box-header").toggleClass("newmsg");
		if(blink){
			theTitle.text = name+ ' Says...';
			blink = false;
		} else {
			theTitle.text = vars['doctitle'];
			blink = true;
		}
	}, 600);
}
$(document).on('click', '.chat-box-mini', function(){
	$(this).parent().next('.chat-container').toggle();
	var fnid=$(this).parent().parent().attr('id').match(/\d+/);
	$('div#chat-box-'+fnid+' ul.chat-box-body').animate({scrollTop: $('div#chat-box-'+fnid+' ul.chat-box-body').prop("scrollHeight")}, 500);
	clearInterval(vars['blings'+fnid]);
	document.title = vars['doctitle'];
	$("#chat-box-"+fnid+" .chat-box-header").removeClass("newmsg");
});


