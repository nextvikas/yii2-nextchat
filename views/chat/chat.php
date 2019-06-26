<?php
use yii\helpers\Url;
use nextvikas\nextchat\assets\ChatAsset;
$assets = ChatAsset::register($this);
?>
<?php $this->beginPage() ?>
<!DOCTYPE html>
<html lang="en">

<head>

    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Chat</title>

<?php $this->head(); ?>
   
<?php 
if(Yii::$app->controller->id=="chat"){
?>
<style type="text/css">

</style>
<?php
}
?>



</head>
<body>
<?php $this->beginBody() ?>


<!-- Code to Display the chat button
<a href="javascript:void(0)" id="menu-toggle" class="btn-chat btn btn-success">
   <i class="fa fa-comments-o fa-3x"></i>
    <span class="badge progress-bar-danger"></span>
</a> -->

<!--CHAT CONTAINER STARTS HERE-->
<div id="chat-container" class="fixed"></div>
<div id="new-chat-container" class="fixed">
	<div id="chatWrap"></div>
</div>

<!-- Header 
<header id="top" class="header">
    <div class="text-vertical-center"></div>
</header>
-->
<!-- Custom JavaScript Files Included Here -->

<script type="text/javascript">
var localbase = "<?=$assets->baseUrl; ?>";
var base = "<?=Url::to(['/nextchat']); ?>/";
var ubase = "<?=Yii::$app->homeUrl; ?>";
var imgpath = "<?=Yii::$app->homeUrl; ?>uploads/chat/";
</script>

<?php $this->endBody() ?>
</body>
</html>
<?php $this->endPage() ?>