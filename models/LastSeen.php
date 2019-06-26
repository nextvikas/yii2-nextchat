<?php

namespace nextvikas\nextchat\models;

use Yii;

use nextvikas\nextchat\models\Messages;

/**
 * This is the model class for table "last_seen".
 *
 * @property int $id
 * @property int $user_id
 * @property int $message_id
 * @property string $times
 */
class LastSeen extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'last_seen';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['user_id', 'message_id'], 'required'],
            [['user_id', 'message_id'], 'integer'],
            [['times'], 'safe'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'user_id' => 'User ID',
            'message_id' => 'Message ID',
            'times' => 'Times',
        ];
    }


    public function update_lastSeen($user=0)
    {
        $last_msg = Messages::find()
        ->where(['to'=>$user])
        ->orderBy(['time' => SORT_DESC])
        ->one();

        $msg = !empty($last_msg) ? $last_msg->id : 0;

        $record = self::find()->where(['id'=>$user])->one();

        if(empty($record)) {
            $newin = new LastSeen();
            $newin->user_id = $user;
            $newin->message_id = $msg;
            $newin->save();

        } else {
            $newin = self::find()->where(['id'=>$record->id])->one();
            $newin->user_id = $user;
            $newin->message_id = $msg;
            $newin->save();
        }
    }

}
