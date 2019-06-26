<?php

namespace nextvikas\nextchat\controllers;

use yii\web\Controller;
use Yii;

use nextvikas\nextchat\models\Messages;
use nextvikas\nextchat\models\LastSeen;
use nextvikas\nextchat\models\User as myusers;
use yii\filters\AccessControl;
/**
 * Default controller for the `chat` module
 */
class ChatController extends Controller
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
        return $this->render('chat');
    }



	
	public function actionSave_chat_img(){

		$Messages = new Messages();
		$myusers = new myusers();

		$logged_user = Yii::$app->user->identity->id;
		$buddy 		= Yii::$app->request->post('user');



		if($_FILES['myfile']['name'] != '' && $buddy != '')
		{

			$chatimage = \yii\web\UploadedFile::getInstanceByName('myfile');

			$imgname = md5($chatimage->baseName.time()) . '.' . $chatimage->extension;

			$modpath = "uploads/chat/";

            if (\yii\helpers\FileHelper::createDirectory($modpath, $mode = 0775, $recursive = true)) {
                $chatimage->saveAs($modpath . $imgname);
            }


			$image = \yii\imagine\Image::getImagine()->open($modpath . $imgname);
            $exif = @exif_read_data($modpath . $imgname);
            if (!empty($exif['Orientation'])) {
                switch ($exif['Orientation']) {
                    case 3:
                        $image->rotate(180);
                        break;
                    case 6:
                        $image->rotate(90);
                        break;

                    case 8:
                        $image->rotate(-90);
                        break;
                }
            }
            $image->save($modpath . $imgname, ['jpeg_quality' => 90]);




            $Messages->chatimage = $imgname;
            $Messages->from = $logged_user;
            $Messages->to = $buddy;
            $Messages->message = '';
            $Messages->save();


            $msg = $Messages;

			$owner = $myusers->get($msg->from);
			
			$userimg = $this->module->chating->get_user_img($owner->username);


			$chat = array(
				'msg' 		=> $msg->id,
				'sender' 	=> $msg->from, 
				'recipient' => $msg->to,
				'avatar' 	=> $userimg,
				'body' 		=> $this->make_links_clickable($msg->message),
				'time' 		=> 'Now',
				'chatimage' => $msg->chatimage,
				'type'		=> $msg->from == $logged_user ? 'out' : 'in',
				'name'		=> $msg->from == $logged_user ? 'You' : ucwords($owner->name)
				);

			$response = array(
				'success' => true,
				'message' => $chat 	  
				);

		} else {
			$response = array(
				'success' => false,
				'message' => 'Empty fields exists'
				);
		} 
		//add the header here
		header('Content-Type: application/json');
		echo json_encode( $response );
		exit();
	}



	private function make_links_clickable($text,$time='Now'){
		if($time=='Now')
			$time=time();
		else
			$time=strtotime($time);
			$time=date("l jS \of F Y h:i:s A",$time)." UTC ".date("P",$time);
	    return preg_replace('!(((f|ht)tp(s)?://)[-a-zA-Zа-яА-Я()0-9@:%_+.~#?&;//=]+)!i', '<a href="$1" title="'.$time.'" target="_blank" class="find_ancker">$1</a>', $text);
	    exit();
	}





	public function actionMessages(){
		//get paginated messages 
		$Messages = new Messages();
		$myusers = new myusers();
		$per_page = 5;
		$user 		= Yii::$app->user->identity->id;
		$buddy 		= Yii::$app->request->post('user');
		$limited 	= Yii::$app->request->post('limit');
		$limit 		= ($limited) ? $limited : $per_page ;

		$messages 	= array_reverse($Messages->conversation($user, $buddy, $limit));
		$total 		= $Messages->thread_len($user, $buddy);

		$thread = array();
		foreach ($messages as $message) {

			$owner = $myusers::findIdentity($message->from);

			$userimg = $this->module->chating->get_user_img($owner->username);
			//$userimg="../account/profileimg/".$owner->username.".jpg";
			//if(file_exists($userimg)) $userimg=$userimg; else $userimg="../account/profileimg/no_image.png";

			$chat = array(
				'msg' 		=> $message->id,
				'sender' 	=> $message->from, 
				'recipient' => $message->to,
				'chatimage' => $message->chatimage,
				'fulltime'  => date("l jS \of F Y h:i:s A",strtotime($message->time))." UTC ".date("P",strtotime($message->time)),
				'avatar' 	=> $userimg,
				'body' 		=> $this->make_links_clickable($message->message,$message->time),
				'time' 		=> date("M j, Y, g:i a", strtotime($message->time)),
				'type'		=> $message->from == $user ? 'out' : 'in',
				'name'		=> $message->from == $user ? 'You' : ucwords($owner->username)
				);
			array_push($thread, $chat);
		}


		$chatbuddy = $myusers::findIdentity($buddy);

		$userimg = $this->module->chating->get_user_img($chatbuddy->username);

		//$userimg="../account/profileimg/".$chatbuddy->username.".jpg";
		//if(file_exists($userimg)) $userimg=$userimg; else $userimg="../account/profileimg/no_image.png";

		$contact = array(
			'name'=>ucwords($chatbuddy->username),
			'status'=>$chatbuddy->online,
			'image'=>$userimg,
			'id'=>$chatbuddy->id,
			'limit'=>$limit + $per_page,
			'more' => $total  <= $limit ? false : true, 
			'scroll'=> $limit > $per_page  ?  false : true,
			'remaining'=> $total - $limit
			);


		$response = array(
					'success' => true,
					'errors'  => '',
					'message' => '',
					'buddy'	  => $contact,
					'thread'  => $thread
					);
		//add the header here
		header('Content-Type: application/json');
		echo json_encode( $response );
		exit();
	}


	public function actionUpdates(){
	    $new_exists = false;
	    $LastSeen = new LastSeen();
	    $Messages = new Messages();

		$user_id 	= Yii::$app->user->identity->id;
		$last_seen  = $LastSeen::find()->where(['user_id'=>$user_id])->one();

		$last_seen  = empty($last_seen) ? 0 : $last_seen->message_id;
		$exists = $Messages->latest_message($user_id, $last_seen);

		if($exists){
			$new_exists = true;
		}
		// THIS WHOLE SECTION NEED A GOOD OVERHAUL TO CHANGE THE FUNCTIONALITY
	    if ($new_exists) {

	    	$myusers = new myusers();
	        $new_messages = $Messages->unread($user_id);
			$thread = array();
			$senders = array();
			foreach ($new_messages as $message) {
				if(!isset($senders[$message->from])){
					$senders[$message->from]['count'] = 1; 
				}
				else{
					$senders[$message->from]['count'] += 1; 
				}
				$owner = $myusers->get($message->from);

				$userimg = $this->module->chating->get_user_img($owner->username);
				//$userimg="../account/profileimg/".$owner->username.".jpg";
				//if(file_exists($userimg)) $userimg=$userimg; else $userimg="../account/profileimg/no_image.png";


				$chat = array(
					'msg' 		=> $message->id,
					'sender' 	=> $message->from, 
					'recipient' => $message->to,
					'chatimage' => $message->chatimage,
					'fulltime'  => date("l jS \of F Y h:i:s A",strtotime($message->time))." UTC ".date("P",strtotime($message->time)),
					'avatar' 	=> $userimg,
					'body' 		=> $this->make_links_clickable($message->message,$message->time),
					'time' 		=> date("M j, Y, g:i a", strtotime($message->time)),
					'type'		=> $message->from == $user_id ? 'out' : 'in',
					'name'		=> $message->from == $user_id ? 'You' : ucwords($owner->username)
					);
				array_push($thread, $chat);
			}

			$groups = array();
			foreach ($senders as $key=>$sender) {
				$sender = array('user'=> $key, 'count'=>$sender['count']);
				array_push($groups, $sender);
			}
			// END OF THE SECTION THAT NEEDS OVERHAUL DESIGN
			$LastSeen->update_lastSeen($user_id);
			//echo $user_id;
			$response = array(
				'success' => true,
				'messages' => $thread,
				'senders' =>$groups
			);

			
			header('Content-Type: application/json');
			echo json_encode( $response );
			exit();
	    } 
	    exit();
	}


	
	public function actionSave_message(){
		$Messages = new Messages();
		$myusers = new myusers();

		$logged_user = Yii::$app->user->identity->id;
		$buddy 		= Yii::$app->request->post('user');
		$message 	= Yii::$app->request->post('message');
		if($message != '' && $buddy != '')
		{

			$Messages->from = $logged_user;
			$Messages->to = $buddy;
			$Messages->message = $message;
			$Messages->save();

			$msg = $Messages;

			$owner = $myusers->get($msg->from);

			$userimg = $this->module->chating->get_user_img($owner->username);


			//$userimg="../account/profileimg/".$owner->username.".jpg";
			//if(file_exists($userimg)) $userimg=$userimg; else $userimg="../account/profileimg/no_image.png";


			$chat = array(
				'msg' 		=> $msg->id,
				'sender' 	=> $msg->from, 
				'recipient' => $msg->to,
				'chatimage' => $msg->chatimage,
				'avatar' 	=> $userimg,
				'body' 		=> $this->make_links_clickable($msg->message,$msg->time),
				'time' 		=> date("M j, Y, g:i a", strtotime($msg->time)),
				'type'		=> $msg->from == $logged_user ? 'out' : 'in',
				'name'		=> $msg->from == $logged_user ? 'You' : ucwords($owner->username)
				);

			$response = array(
				'success' => true,
				'message' => $chat 	  
				);
		}
		else{
			  $response = array(
				'success' => false,
				'message' => 'Empty fields exists'
				);
		}
		//add the header here
		header('Content-Type: application/json');
		echo json_encode( $response );
		exit();
	}


	public function actionMark_read(){
		$Messages = new Messages();
		$Messages->mark_read();
		exit();
	}



}
