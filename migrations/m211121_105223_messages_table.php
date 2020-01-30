<?php
use nextvikas\nextchat\migrations\Migration;

/**
 * Class m151121_105223_user_table
 *
 * @author Vikas Pandey
 * @since 1.0
 */
class m211121_105223_messages_table extends Migration
{
    public function up()
    {
        $this->createTable(self::TABLE_MESSAGES, [
            'id' => $this->integer()->unsigned(),
            'from' => $this->integer()->notNull(),
            'to' => $this->integer()->notNull(),
            'message' => $this->text()->notNull(),
            'chatimage' => $this->string(150)->notNull(),
            'is_read' => "enum('0', '1') NOT NULL",
            'time' => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
        ], $this->tableOptions);
        $tableName = $this->db->getSchema()->getRawTableName(self::TABLE_MESSAGES);
        $this->addPrimaryKey("pk-$tableName-id", self::TABLE_MESSAGES, 'id');
        $this->alterColumn(self::TABLE_MESSAGES, 'id', $this->integer().' NOT NULL AUTO_INCREMENT');

        $this->insert(self::TABLE_MESSAGES,array(
                 'id'=>'1',
                 'from'=>'10000',
                 'to' =>'10001',
                 'message' => 'hi',
        ));
        $this->insert(self::TABLE_MESSAGES,array(
                 'id'=>'2',
                 'from'=>'10000',
                 'to' =>'10002',
                 'message' => 'hi',
        ));
        $this->insert(self::TABLE_MESSAGES,array(
                 'id'=>'3',
                 'from'=>'10000',
                 'to' =>'10003',
                 'message' => 'hi',
        ));
        $this->insert(self::TABLE_MESSAGES,array(
                 'id'=>'4',
                 'from'=>'10000',
                 'to' =>'10004',
                 'message' => 'hi',
        ));
        $this->insert(self::TABLE_MESSAGES,array(
                 'id'=>'5',
                 'from'=>'10000',
                 'to' =>'10005',
                 'message' => 'hi',
        ));
        $this->insert(self::TABLE_MESSAGES,array(
                 'id'=>'6',
                 'from'=>'10000',
                 'to' =>'10006',
                 'message' => 'hi',
        ));
    }

    public function down()
    {
        $this->dropTable(self::TABLE_MESSAGES);
    }
}
