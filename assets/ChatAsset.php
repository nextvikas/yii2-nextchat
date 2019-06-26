<?php
namespace nextvikas\nextchat\assets;
use yii\web\AssetBundle;   

class ChatAsset extends AssetBundle {

    // The directory that contains the source asset files for this asset bundle
    public $sourcePath = '@nextvikas/nextchat/web';

    // List of CSS files that this bundle contains
    public $css = [
    	'css/bootstrap.css',
    	'chat/chat.css',
    	'css/font-awesome.min.css',
    ];
    public $js = [
    	'chat/cust.js',
    	['https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.js'],
    	'chat/jquery-ui.js',
    	'js/bootstrap.js',
    	'chat/filereader.js',
    	'chat/date.js',
    	'chat/main.js',
    	'chat/jquery.exif.js',
    	'chat/chatigniter.js',
    ];
    public $depends = [
        'yii\web\YiiAsset',
    ];

}