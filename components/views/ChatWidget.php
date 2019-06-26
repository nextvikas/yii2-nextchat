<?php
use frontend\modules\chat\assets\ChatwidgetAsset;
ChatwidgetAsset::register($this);
?>

<a class="hangout" id="Msgc" href="javascript:">chat</a> 

<?php
$script = <<< JS
	var base = 'chat/'; 
	var imgpath = 'uploads/chat/';
	$(document).on("click",".hangout",function(){
	    $('#chat-container').toggle();
	})
JS;
$this->registerJs($script,\yii\web\View::POS_BEGIN);


$style= <<< CSS

.chat-container {
	width: 290px;
}


CSS;
$this->registerCss($style);
?>


<div id="chat-container" class="mt40 chat-container"></div>
<div id="new-chat-container" class="fixed">
  <div id="chatWrap"></div>
</div>


