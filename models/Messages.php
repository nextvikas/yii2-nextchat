<?php

namespace nextvikas\nextchat\models;

use Yii;

/**
 * This is the model class for table "messages".
 *
 * @property int $id
 * @property int $from
 * @property int $to
 * @property string $message
 * @property string $chatimage
 * @property string $is_read
 * @property string $time
 */
class Messages extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'messages';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['from', 'to'], 'required'],
            [['from', 'to'], 'integer'],
            [['message', 'is_read'], 'string'],
            [['time','chatimage'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'from' => 'From',
            'to' => 'To',
            'message' => 'Message',
            'chatimage' => 'Chatimage',
            'is_read' => 'Is Read',
            'time' => 'Time',
        ];
    }

    public function get($id){
        return self::find()
        ->where(['id'=>$id])
        ->one();
    }
    public function conversation($user, $chatbuddy, $limit = 5){
        $res = self::find()
        ->where(['from'=>$user,'to'=>$chatbuddy])
        ->orWhere(['from'=>$chatbuddy,'to'=>$user])
        ->orderBy(['id' => SORT_DESC])
        ->all();

        $update = self::find()
        ->where(['from'=>$chatbuddy,'to'=>$user])
        ->one();
        if($update) {
            $update->is_read = '1';
            $update->save();
        }

        return $res;
    }

    public function thread_len($user, $chatbuddy){
        $res = self::find()
        ->where(['from'=>$user,'to'=>$chatbuddy])
        ->orWhere(['from'=>$chatbuddy,'to'=>$user])
        ->orderBy(['id' => SORT_DESC])
        ->count();
        return $res;
    }


    public function latest_message($user, $last_seen){
        $res = self::find()
        ->where(['to'=>$user])
        ->andWhere(['>', 'id', $last_seen])
        ->orderBy(['time' => SORT_DESC])
        ->count();

        if($res > 0)
            return true;
        else
            return false;
    }

    public function new_messages($user, $last_seen){
        $res = self::find()
        ->where(['to'=>$user])
        ->andWhere(['>', 'id', $last_seen])
        ->orderBy(['time' => SORT_DESC])
        ->asArray()
        ->all();

        return $res;
    }

    public function unread($user){
        $res = self::find()
        ->where(['to'=>$user,'is_read'=>'0'])
        ->orderBy(['time' => SORT_ASC])
        ->all();

        return $res;
    }

    public function mark_read(){
        $id = Yii::$app->request->post('id');

        $update = self::find()
        ->where(['id'=>$id])
        ->one();

        $update->is_read = '1';
        $update->save();
    }

    public function unread_per_user($id, $from){
        $res = self::find()
        ->where(['to'=>$id,'from'=>$from,'is_read'=>'0'])
        ->count();
        
        return $res;
    }


}
