<?php
use yii\helpers\Html;

$userimg = Yii::$app->getModule('nextchat')->chating->get_user_img($cur_user->username);

//$userimg="/account/profileimg/".$cur_user->username.".jpg";
//if(!file_exists($_SERVER['DOCUMENT_ROOT'].$userimg)) $userimg="/account/profileimg/no_image.png";
?>
<script type="text/javascript">var login_avatar = "<?php echo $userimg; ?>";</script>
<div>
<img class="selfimg" src="<?php echo $userimg; ?>" />
<h2 class="chat-header">
<?php echo ucwords($cur_user->username); ?>
    <span class="btn btn-xs btn-<?php echo $cur_user->online== 1 ? 'primary' : 'danger'; ?>" id="current_status"><?php echo $cur_user->online== 1 ? 'Online' : 'Offline'; ?></span>
   
	<!--
    <a href="javascript:;" class="chat-form-close pull-right"><i class="fa fa-remove"></i></a>
	-->
    <span class="dropdown user-dropdown">
	<a href="javascript: void(0);" class="main-box-mini pull-right" style="margin-left: 10px;">
		<i class="fa fa-times" style="color: rgb(255, 255, 255);"></i>
	</a>
    <a href="javascript: void(0);" class="dropdown-toggle pull-right chat-config" data-toggle="dropdown">
        <i class="fa fa-cog"></i>
    </a>
    <ul class="dropdown-menu">

        <li>
            <a href="javascript: void(0);">
              <div class="btn-group btn-toggle status-btn-group"> 
                <button class="btn btn-xs btn-<?php echo $cur_user->online== 1 ? 'primary' : 'danger'; ?>">Online</button>
                <button class="btn btn-xs btn-<?php echo $cur_user->online== 0 ? 'primary' : 'danger'; ?>">Offline</button>
              </div>
            </a>
        </li>
        <li class="divider"></li>
        <li>


<?= Html::a('<span class="pull-left">Go Home</span><span class="fa fa-home pull-right"></span>',
   ['/'],
   ['class'=>'']);
?>

        </li>
        <li>


<?= Html::a('<span class="pull-left">Sign Out</span><span class="fa fa-sign-out pull-right"></span><span class="clearfix"></span>',
   ['/site/logout'],
   ['class'=>'','data' => ['method' => 'post','confirm' => 'Are you sure?',]]);
?>

        </li>
    </ul>
    </span>
</h2>
</div>
<!--
| CHAT CONTACTS LIST SECTION
-->


<div class="chat-inner" id="chat-inner" style="position:relative;">
<div class="chat-group">

<?php 
$requser = [];
$requser[] = $cur_user->id;
if(count($request) > 0) { 
?>
<strong>Friends</strong>
 <?php
  foreach ($request as $req) {  
  $requser[] = $req['id'];



    if($req['id'] != $cur_user->id ){
      if($req['online'] == 1){
        $statusa = 'online'; 
        $status = 'is-online'; 
      } else {
        $statusa = 'offline'; 
        $status = 'is-offline'; 
      }

    $avatar=Yii::$app->getModule('nextchat')->chating->get_user_img($req['username']);

    if($req['status']=='0'){
    ?> 

    <div class="contact-wrap" style="padding: 15px;">
      <input type="hidden" value="<?= $req['id']; ?>" name="user_id" />
       <div class="contact-profile-img">
           <div class="profile-img">
            <img src="<?= $avatar; ?>" class="img-responsive">
           </div>
       </div>
        <span class="contact-name">
            <small class="user-name"><?= ucwords($req['username']); ?></small>
        </span>
        <span style="padding: 0px 7px; width: 100%;" class="user_status pull-left">
          <?php
          if($req['friend_two']==$cur_user->id){ 
          ?>
            <a class="btn btn-primary btn-xs uaccept" id="<?= $req['id']; ?>" href="javascript:void(0)">Accept</a>
            <a class="btn btn-danger btn-xs udecline" id="<?= $req['id']; ?>" href="javascript:void(0)">Decline</a>
          <?php 
          } else if($req['friend_one']==$cur_user->id){ 
          ?>
            <a class="btn btn-danger btn-xs ucancel" id="<?= $req['id']; ?>" href="javascript:void(0)">Cancel Request</a>
          <?php
          } 
          ?>
        </span>
    </div>

    <?php
    } else if($req['status']=='1'){
    ?>
    <a href="javascript: void(0)" class="chatover" data-toggle="popover" >
      <div class="contact-wrap">
        <input type="hidden" value="<?php echo $req['id']; ?>" name="user_id" />
         <div class="contact-profile-img">
             <div class="profile-img">
              <img src="<?= $avatar; ?>" class="img-responsive">
             </div>
         </div>
          <span class="contact-name">
              <small class="user-name"><?= ucwords($req['username']); ?></small>
              <span class="badge progress-bar-danger" rel="<?= $req['id']; ?>"><?= $req['unread']; ?></span>
          </span>
          <span style="padding: 0px 7px; width: 100%;" class="user_status pull-left">
              <span class="user-status <?php echo $status; ?>"></span><?= $statusa; ?>
          </span>
      </div>
    </a>
    <?php
    }
  }
}
} else {
?>


  <div class="contact-wrap nochat">
    <p>No Friend Found </p>
    <p>Send Friend Request to Users</p>
  </div>


<?php
}
?>



<?php
if(!empty($allusers)) {

echo '<p>Send Friend Request to Users</p>';

  foreach ($allusers as $oneuser) {

    if(!in_array($oneuser['id'], $requser)) {

    $avatar = Yii::$app->getModule('nextchat')->chating->get_user_img($oneuser['username']);
?>


    <div class="contact-wrap" style="padding: 15px;">
      <input type="hidden" value="<?= $oneuser['id']; ?>" name="user_id" />
       <div class="contact-profile-img">
           <div class="profile-img">
            <img src="<?= $avatar; ?>" class="img-responsive">
           </div>
       </div>
        <span class="contact-name">
            <small class="user-name"><?= ucwords($oneuser['username']); ?></small>
        </span>
        <span style="padding: 0px 7px; width: 100%;" class="user_status pull-left">
            <a class="btn btn-primary btn-xs sendnewreq" id="<?= $oneuser['id']; ?>" href="javascript:void(0)">Send Friend Request</a>
        </span>
    </div>
<?php
    }
  }
}
?>



</div>
</div>
<!--
| CHAT CONTACT HOVER SECTION
-->
<div class="popover" id="popover-content">
    <div id="contact-image"></div>
    <div class="contact-user-info">
        <div id="contact-user-name"></div>
        <div id="contact-user-status" class="online-status"></div>
    </div>
</div>
<!--
| INDIVIDUAL CHAT SECTION
-->
