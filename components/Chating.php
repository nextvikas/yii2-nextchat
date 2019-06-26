<?php
namespace nextvikas\nextchat\components;
use nextvikas\nextchat\assets\ChatAsset;
use Yii;
use yii\base\Component;

class Chating extends Component
{
	public function get_user_img($username){
		$username = strtolower($username);
		$newne = new \yii\web\View();
		$asset = $newne->registerAssetBundle(ChatAsset::class);
		$loginuser = './uploads/profile/'.$username.'.jpg';
		if (!file_exists($_SERVER['DOCUMENT_ROOT'].Yii::getAlias('@web').'/frontend/web/'.$loginuser)) {
			$loginuser = $asset->baseUrl .'/chat/images/no_img.jpg';
		}
		return $loginuser;
	}
}

