<?php

namespace nextvikas\nextchat\models;

use Yii;

/**
 * This is the model class for table "friends_list".
 *
 * @property int $id
 * @property int $friend_one
 * @property int $friend_two
 * @property string $status request,accept,reject
 */
class FriendsList extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'friends_list';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['friend_one', 'friend_two'], 'required'],
            [['friend_one', 'friend_two'], 'integer'],
            [['status'], 'string'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'friend_one' => 'Friend One',
            'friend_two' => 'Friend Two',
            'status' => 'Status',
        ];
    }
}
