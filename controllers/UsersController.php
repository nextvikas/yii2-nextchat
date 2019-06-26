<?php

namespace nextvikas\nextchat\controllers;

use yii\web\Controller;
use Yii;

use nextvikas\nextchat\models\Messages;
use nextvikas\nextchat\models\User as myusers;
use yii\filters\AccessControl;

/**
 * Default controller for the `chat` module
 */
class UsersController extends Controller
{

    public function behaviors()
    {
        return [
            'access' => [
                'class' => AccessControl::className(),
                'rules' => [
                    [
                        'allow' => true,
                        'roles' => ['@'],
                    ],
                ],
            ],
        ];
    }


    /**
     * Renders the index view for the module
     * @return string
     */
    public $layout = false;

	public function beforeAction($action) 
	{ 
	    $this->enableCsrfValidation = false; 
	    return parent::beforeAction($action); 
	}





    public function actionIndex()
    {
		$id = Yii::$app->user->identity->id;
		$cur_user = Yii::$app->user->identity;
		$myusers = new myusers();
		$Messages = new Messages();


		$requests = $myusers->getAllfrnds($id);
		$allusers = $myusers::find()->limit(10)->asArray()->all();
		foreach ($requests as $key=>$request) {
			//get unread messages from this user
			$unread = $Messages->unread_per_user($id, $request['id']);
			$requests[$key]['unread'] =  $unread > 0 ? $unread : null ; 
		}
		usort($requests, function($a, $b) {
		    return $a['status'] - $b['status'];
		});


		return $this->render('chat-form',['cur_user'=>$cur_user,'request'=>$requests,'allusers'=>$allusers]);	
    }

	public function actionToggle_status(){
		$myusers = new myusers();
		$id 	= Yii::$app->user->identity->id;
		$user 	= $myusers->get($id);
		$status = $user->online == '0' ? '1' : '0';

		$user->online = $status;
		$user->save();

		$response = array('success' => true, 'status'=> $status);
		//add the header here
		header('Content-Type: application/json');
		echo json_encode( $response );
		exit();
	}



	public function actionRejected()
	{
		$myusers = new myusers();
		$id = Yii::$app->user->identity->id;
		//$nid=$this->user->updatefrnds($id, $this->input->post('userid'),2);
		$nid = $myusers->updatefrndsremove($id, Yii::$app->request->post('userid'));
		if($nid)
			echo json_encode(array("ok"));
		else
			echo json_encode(array("not"));
		exit();
	}
	public function actionConfirm()
	{
		$myusers = new myusers();
		$id = Yii::$app->user->identity->id;
		$nid = $myusers->updatefrnds($id, Yii::$app->request->post('userid'));
		if($nid)
			echo json_encode(array("ok"));
		else
			echo json_encode(array("not"));
		exit();
	}
	public function actionSendnewreq()
	{
		$myusers = new myusers();
		$id = Yii::$app->user->identity->id;
		$nid = $myusers->sendnewreq($id, Yii::$app->request->post('userid'));
		if($nid)
			echo json_encode(array("ok"));
		else
			echo json_encode(array("not"));
		exit();
	}
}
