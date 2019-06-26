<?php
namespace nextvikas\nextchat\models;
use Yii;
use common\models\User as chatingUser;
use nextvikas\nextchat\models\FriendsList;

class User extends chatingUser
{

    public function getfrndrequest($id) {
        $res = FriendsList::find()->select('friend_one')->where(['friend_two'=>$id,'status'=>0])->asArray()->all();
        return $res;
    }

    public function get($id){
        return self::find()
        ->where(['id'=>$id])
        ->one();
    }
    public function getAllfrnds($id) {
        $tablename = chatingUser::getTableSchema()->name;

        $getid = 'id';
        $queryStr = "SELECT U.`{$getid}`,U.`online`,U.`username`,F.`friend_one`,F.`status`,F.`friend_two`
                    FROM `{$tablename}` U, `friends_list` F
                    WHERE
                    CASE
                    WHEN F.`friend_one` = '$id'
                    THEN F.`friend_two` = U.`{$getid}`
                    WHEN F.`friend_two`= '$id'
                    THEN F.`friend_one`= U.`{$getid}`
                    END";

        $result = Yii::$app->db->createCommand($queryStr);
        return $result->queryAll();
    }

    public function sendnewreq($loginid, $id) {

        $res = FriendsList::find()
        ->where(['friend_one'=>$id,'friend_two'=>$loginid])
        ->orWhere(['friend_two'=>$id,'friend_one'=>$loginid])
        ->one();

        if(empty($res) && $loginid != $id) {
            $newreq = new FriendsList();
            $newreq->friend_one = $loginid;
            $newreq->friend_two = $id;
            $newreq->status = '0';
            $newreq->save();
        }
        return true;
    }
    public function updatefrnds($id, $uid, $status = '1') {
        $res = FriendsList::find()
        ->where(['friend_one'=>$id,'friend_two'=>$uid])
        ->orWhere(['friend_two'=>$id,'friend_one'=>$uid])
        ->one();

        $res->status = $status;
        $res->save();

        return true;
    }  

    public function updatefrndsremove($loginid, $id) {

        $res = FriendsList::find()
        ->where(['friend_one'=>$loginid,'friend_two'=>$id])
        ->orWhere(['friend_two'=>$loginid,'friend_one'=>$id])
        ->one();

        if($res->delete()) 
            return true;
        else
            return false;

    }



}
