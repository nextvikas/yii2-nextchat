<?php
namespace nextvikas\nextchat\components;

use yii\base\Widget;
use yii\helpers\Html;



class Chatwidget extends Widget {
    public $message;
    public function init() {

        parent::init();
        if ($this->message === null) {
            $this->message = 'Welcome Guest';
        } else {
            $this->message = 'Welcome ' . $this->message;
        }
    }
    public function run(){
        return $this->render('ChatWidget', ['message' => $this->message]);
    }
}
?>