var chat_init = function(){
    $("#chat-container" ).load(base+"users/",function(responseTxt, statusTxt, xhr){
        if(urlvar=="chat"){
            $(".main-box-mini.pull-right").hide();
            var ctovr = $("#chat-container #chat-inner").find(".chatover:first");

            if(typeof ctovr.find('input[name="user_id"]').val() == 'undefined'){
                $('#chat-container').css({'height': '560px'});
            }
            ctovr.click();
        }
        if(statusTxt == "success")
            console.log("External content loaded successfully!");
        if(statusTxt == "error")
            console.log("Error: " + xhr.status + ": " + xhr.statusText);
    })
}
$(document).ready(function(){


/*----------------------------------------------------------------------
| Iniatiating the chat window with the appropriate HTML
------------------------------------------------------------------------*/

//base=http://www.dorcode.com/chat/index.php/


chat_init();







/*----------------------------------------------------------------------
| Login function
------------------------------------------------------------------------*/

$(document).on('click', '.udecline,.ucancel', function(e){
    e.preventDefault();
    var the=$(this);
     var ndata = "userid="+the.attr('id');
        $.ajax({
            type: "POST",
            url: base  + "users/rejected",
            data: ndata,
            dataType: "json",
            beforeSend: function(){
             the.html('Working...');
         },
        success: function(response){
            if(response=="ok")
            $("#chat-container").load(base+"users/");
        else {
              alert("Try again");
              window.location.reload();  
            }
        }
    });
});

$(document).on('click', '.uaccept', function(e){
    e.preventDefault();
    var the=$(this);
     var ndata = "userid="+the.attr('id');
        $.ajax({
            type: "POST",
            url: base  + "users/confirm",
            data: ndata,
            dataType: "json",
            beforeSend: function(){
             the.html('Working...');
         },
        success: function(response){
            if(response=="ok")
            $("#chat-container").load(base+"users/");
        else {
              alert("Try again");
              window.location.reload();  
            }
        }
    });
});


$(document).on('click', '.sendnewreq', function(e){
    e.preventDefault();
    var the=$(this);
     var ndata = "userid="+the.attr('id');
        $.ajax({
            type: "POST",
            url: base  + "users/sendnewreq",
            data: ndata,
            dataType: "json",
            beforeSend: function(){
             the.html('Working...');
         },
        success: function(response){
            if(response=="ok")
            $("#chat-container").load(base+"users/");
        else {
              alert("Try again");
              window.location.reload();  
            }
        }
    });
});

$(document).on('click', '#login', function(){
        //dataString = $('#login-frm').serialize();
        var Username = $('#Username').val();
        var Password = $('#Password').val();

		Password = CryptoJS.SHA512(Password).toString();
        $.ajax({
            type: "POST",
            url: base  + "chat/auth",
			data: {
				username: Username,
				password: Password
			},
            cache: false,
            beforeSend: function(){
             $("#login").html('<img src="assets/images/ajax-loader.gif" /> Connecting...');
         },
        success: function(response){
            if(response.success)
            {
                $(".message").html(success(response.message));
                $('#login-frm')[0].reset();
                chat_init();
            }
            else
            {
                $(".message").html(error(response.message));
            }
            $("#login").html('<i class="fa fa-lock"></i> Login');
            highlightFields(response.errors);
        }});
return false;
});

$(document).on('click', '.goback', function(){
    chat_init();
});
/*----------------------------------------------------------------------
| logout function
------------------------------------------------------------------------*/
$(document).on('click', '#logout', function(){
        $.ajax({
            type: "POST",
            url: base  + "auth/logout",
            cache: false,
            beforeSend: function(){},
            success: function(response){ 
                //chat_init(); 
                //$(location).attr('href', "/account/login?redirect=/chat");
                //document.location.replace("/account/login?redirect=/chat");
                window.location.href=base;
            }
        });
    return false;
});

/*----------------------------------------------------------------------
| Close the chat container
------------------------------------------------------------------------*/
/*$(document).on('click', '.chat-form-close', function(){	
	if($("#chat-container").css("display")!='none'){				
		restructureChatBoxesRightRemove();	
	}
    $('#chat-container').toggle('slide', {
        direction: 'right'
    }, 500);
    $('#chat-box').hide();
});*/


/*----------------------------------------------------------------------
| Close the chat box window
------------------------------------------------------------------------*/
/* $(document).on('click','.chat-box-close', function(){
    $('#chat-box').hide();
    $('#chat-container .chat-group a').removeClass('active');
}); */

$(document).on('click','.mob .chat-box-close', function(){
	var chatboxid = $(this).parent().parent().attr("id");
	$('#'+chatboxid).remove();
	// $('#_atssh').nextAll().show();
	// $('#chat-container').toggle('slide', {
	// 	direction: 'right'
	// }, 500);
});

$(document).on('click','.pc .chat-box-mysetting', function(){
    $(this).next().toggle();
});



$(document).on('click','.pc .chat-box-close', function(){
	var chatboxid = $(this).parent().parent().attr("id");
	$('#'+chatboxid).remove();
	restructureChatBoxes();
});
$(document).on('click','.main-box-mini,.dochattoggle', function(){
	// if($("#chat-inner").css("display")=='none'){				
	// 	$('.main-box-mini').html('<i class="fa fa-minus" style="color: rgb(255, 255, 255);"></i>');
	// } else {
	// 	$('.main-box-mini').html('<i class="fa fa-plus" style="color: rgb(255, 255, 255);"></i>');
	// }

    $('#chat-container').toggle();

	//var chatboxid = $("#chat-inner").toggle();
});

/*----------------------------------------------------------------------
| Display the chat container
------------------------------------------------------------------------*/
/*$('.btn-chat').click(function () {	
	if($("#chat-container").css("display")=='none'){				
		restructureChatBoxes();	
	}
    if($('#chat-box').is(':visible')){
        $('#chat-container').toggle('slide', {
            direction: 'right'
        }, 500);
        $('#chat-box').hide();
    } else{
        $('#chat-container').toggle('slide', {
            direction: 'right'
        }, 500);
        chat_init();
    }
});*/
/*----------------------------------------------------------------------
| change status Function
------------------------------------------------------------------------*/
$(document).on('click', '.status-btn-group', function() {
    $(this).find('.btn').toggleClass('active');  
    if ($(this).find('.btn-primary').size()>0) {
        $(this).find('.btn').toggleClass('btn-primary');
        $.ajax({ url: base  + "users/toggle_status" , 
            success: function(response){
                if(response.status == 1){
                    $('#current_status').html('Online');
                    $('#current_status').removeClass('btn-danger').addClass('btn-primary');
                }            
                else{
                    $('#current_status').html('Offline');
                    $('#current_status').removeClass('btn-primary').addClass('btn-danger');
                }
        }});
    }    
    $(this).find('.btn').toggleClass('btn-danger');
});


$(document).on('click', '#dell_conversation', function() { 
    if (confirm("Are you sure?")) {
        var id=$(this).attr('data-id');
        $.ajax({ 
            url: base  + "users/dell_conversation", 
            data: {
                userid: id
            },
            success: function(response){
                alert(response);
        }
    });
    }    

});










/*----------------------------------------------------------------------
| Registration Process
------------------------------------------------------------------------*/
/*$(document).on('click', '#create-account', function(){
    $( "#chat-container" ).load( base+"chat/auth/register/");
    return false;
});
$(document).on('click', '#register', function(){
        dataString = $('#register-frm').serialize();
        $.ajax({
            type: "POST",
            url: base  + "chat/auth/register",
            data: dataString,
            cache: false,
            beforeSend: function(){
             $("#register").html('<img src="assets/images/ajax-loader.gif" /> Connecting...');
         },
        success: function(response){
            if(response.success)
            {
                $(".message").html(success(response.message));
                $('#register-frm')[0].reset();
            }
            else
            {
                $(".message").html(error(response.message));
            }
            $("#register").html('<i class="fa fa-plus-circle"></i> Register');
            highlightFields(response.errors);
        }});
return false;
});
*/
 $(document).on('click', '.dropdown-menu', function(e) {
    e.stopPropagation();
});

/*----------------------------------------------------------------------
| Editing profile process
------------------------------------------------------------------------*/
$(document).on('click', '#edit-profile', function(){
    $( "#chat-inner" ).load( base+"users/editProfile/");
    $('[data-toggle="dropdown"]').parent().removeClass('open');
    return false;
});

$(document).on("submit", "#profile-frm", function(e)
{
    e.preventDefault();
     dataString = new FormData(this);
        $.ajax({
            type: "POST",
            url: base  + "users/editProfile",
            data: dataString,
            processData: false,
            contentType: false,
            cache: false,
            beforeSend: function(){
             $("#update-profile").html('<img src="assets/images/ajax-loader.gif" /> Connecting...');
         },
        success: function(response){
            if(response.success)
            {
                if(response.errors.avatar_error)
                    $(".message").html(error(response.errors.avatar_error));
                else{
                    $(".message").html(success(response.message));
                    $( "#chat-inner" ).load( base+"users/editProfile/");
					window.location.reload();
                }
            }
            else
            {
                $(".message").html(error(response.message));
            }
            $("#update-profile").html('<i class="fa fa-plus-circle"></i> Update Profile');
            highlightFields(response.errors);

        }});
});

/*----------------------------------------------------------------------
| change password process
------------------------------------------------------------------------*/
$(document).on('click', '#change-password', function(){
    $( "#chat-inner" ).load( base+"users/changePassword/");
    $('[data-toggle="dropdown"]').parent().removeClass('open');
    return false;
});
$(document).on('submit', '#changepassword-frm', function(){
        //dataString = $('#changepassword-frm').serialize();
        var acurrent_password = $('#changepassword-frm [name="current_password"]').val();
        var anew_password = $('#changepassword-frm [name="new_password"]').val();
        var aconfirm_newpassword = $('#changepassword-frm [name="confirm_newpassword"]').val();

		acurrent_password = CryptoJS.SHA512(acurrent_password).toString();
		anew_password = CryptoJS.SHA512(anew_password).toString();
		aconfirm_newpassword = CryptoJS.SHA512(aconfirm_newpassword).toString();

        $.ajax({
            type: "POST",
            url: base  + "users/changePassword",
            data: {
				current_password: acurrent_password,
				new_password: anew_password,
				confirm_newpassword: aconfirm_newpassword
			},
            cache: false,
            beforeSend: function(){
             $("#update-password").html('<img src="assets/images/ajax-loader.gif" /> Connecting...');
         },
        success: function(response){
            if(response.success)
            {
                $(".message").html(success(response.message));
                $('#changepassword-frm')[0].reset();
            }
            else
            {
                $(".message").html(error(response.message));
            }
            $("#update-password").html('<i class="fa fa-plus-circle"></i> Change Password');
            highlightFields(response.errors);
        }});
return false;
});
/*----------------------------------------------------------------------
| Show Pop overs
------------------------------------------------------------------------*/
   /* var popOverSettings = {
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

    }).on('mouseleave', '[data-toggle="popover"]', function() {
        $(this).popover('hide');
    }); */
});


/*----------------------------------------------------------------------
| Function to display error messages
------------------------------------------------------------------------*/
function error(message){
    var alert = '<div style="font-size:12px; margin-top:10px;" class="alert alert-danger alert-dismissable">\
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
                <strong>Error ! </strong> ' + message + ' </div>';
    return alert;
}

/*----------------------------------------------------------------------
| Function to display success messages
------------------------------------------------------------------------*/

function success(message){
    var alert = '<div style="font-size:12px; margin-top:10px;" class="alert alert-success alert-dismissable">\
                <button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>\
                <strong>Success ! </strong> ' + message + ' </div>';
    return alert;
}
/*----------------------------------------------------------------------
| Function to highlight incorrect fields 
------------------------------------------------------------------------*/
function highlightFields(message){
    $('.form-group').removeClass('has-error');
    $('.error').remove();
    for (var key in message) {
        $('input[name="'+ key+'"]' ).parent().addClass('has-error');
        $('input[name="'+ key+'"]').after('<span class="error">' +message[key]+ '</span>');
    }
}


