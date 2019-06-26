<?php
namespace nextvikas\nextchat\migrations;




class Migration extends \yii\db\Migration
{
    const TABLE_USER = 'user';
    const TABLE_FRIENDS_LIST = 'friends_list';
    const TABLE_LAST_SEEN = 'last_seen';
    const TABLE_MESSAGES = 'messages';

    public function getTableOptions()
    {
        $tableOptions = null;
        if ($this->db->driverName === 'mysql') {
            $tableOptions = 'CHARACTER SET utf8 COLLATE utf8_unicode_ci ENGINE=InnoDB';
        }
        return $tableOptions;
    }
}
