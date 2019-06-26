<?php
use yii\helpers\Url;
use nextvikas\nextchat\assets\ChatwidgetAsset;
ChatwidgetAsset::register($this);


$baseurl = Url::to(['/nextchat']);
?>

<?php
$script = <<< JS
	var base = '$baseurl/'; 
	var imgpath = 'uploads/chat/';
JS;
$this->registerJs($script,\yii\web\View::POS_BEGIN);


$style= <<< CSS
#Msgc {
	/* text-align: right; */
	/* float: unset; */
	/* position: relative; */
	/* right: 0; */
	width: 300px;
	display: inline-block;
	text-align: right;
}
.chat-container {
	width: 290px;
}
#chat-container {
	position: fixed;
	bottom: 0;
	right: 0;
	z-index: 9999;
}
.chat-container .chat-inner {
	background: #fff;
}


CSS;
$this->registerCss($style);
?>


<div id="chat-container" class="mt40 chat-container"></div>
<div id="new-chat-container" class="fixed">
  <div id="chatWrap"></div>
</div>


