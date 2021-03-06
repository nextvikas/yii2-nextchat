<?php
use nextvikas\nextchat\migrations\Migration;

/**
 * Class m151121_105223_user_table
 *
 * @author Vikas Pandey
 * @since 1.0
 */
class m211121_105223_friends_list_table extends Migration
{
    public function up()
    {
        $this->createTable(self::TABLE_FRIENDS_LIST, [
            'id' => $this->integer()->unsigned(),
            'friend_one' => $this->integer()->notNull(),
            'friend_two' => $this->integer()->notNull(),
            'status' => "enum('0', '1', '2') NOT NULL DEFAULT '0' COMMENT 'request,accept,reject'",
        ], $this->tableOptions);
        $tableName = $this->db->getSchema()->getRawTableName(self::TABLE_FRIENDS_LIST);
        $this->addPrimaryKey("pk-$tableName-id", self::TABLE_FRIENDS_LIST, 'id');
        $this->alterColumn(self::TABLE_FRIENDS_LIST, 'id', $this->integer().' NOT NULL AUTO_INCREMENT');

        $this->insert(self::TABLE_FRIENDS_LIST,array(
                 'friend_one'=>'10000',
                 'friend_two' =>'10001',
                 'status' =>'1',
        ));
        $this->insert(self::TABLE_FRIENDS_LIST,array(
                 'friend_one'=>'10000',
                 'friend_two' =>'10002',
                 'status' =>'1',
        ));
        $this->insert(self::TABLE_FRIENDS_LIST,array(
                 'friend_one'=>'10000',
                 'friend_two' =>'10003',
                 'status' =>'1',
        ));
        $this->insert(self::TABLE_FRIENDS_LIST,array(
                 'friend_one'=>'10000',
                 'friend_two' =>'10004',
                 'status' =>'1',
        ));
        $this->insert(self::TABLE_FRIENDS_LIST,array(
                 'friend_one'=>'10000',
                 'friend_two' =>'10005',
                 'status' =>'1',
        ));
        $this->insert(self::TABLE_FRIENDS_LIST,array(
                 'friend_one'=>'10000',
                 'friend_two' =>'10006',
                 'status' =>'1',
        ));


    }

    public function down()
    {
        $this->dropTable(self::TABLE_FRIENDS_LIST);
    }
}
