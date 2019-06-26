<?php
namespace nextvikas\nextchat\assets;
use yii\web\AssetBundle;   

class ChatwidgetAsset extends AssetBundle {

    // The directory that contains the source asset files for this asset bundle
    public $sourcePath = '@nextvikas/nextchat/web';

    // List of CSS files that this bundle contains
    public $css = [
    	'css/bootstrap.min.css',
    	'chat/mainchat.css',
    	'css/font-awesome.min.css',
    ];
    public $js = [
    	'chat/maincust.js',
    	['https://ajax.googleapis.com/ajax/libs/jquery/2.2.4/jquery.min.js'],
        'chat/jquery-ui.js',
    	'chat/jquery.slimscroll.js',
    	'js/bootstrap.min.js',
    	'chat/sha512.js',
    	'chat/filereader.js',
        'chat/date.js',
    	'chat/main.js',
    	'chat/jquery.exif.js',
    	'chat/chatigniter.js',
    ];
}