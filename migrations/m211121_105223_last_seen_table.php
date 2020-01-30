<?php
use nextvikas\nextchat\migrations\Migration;

/**
 * Class m151121_105223_user_table
 *
 * @author Vikas Pandey
 * @since 1.0
 */
class m211121_105223_last_seen_table extends Migration
{
    public function up()
    {
        $this->createTable(self::TABLE_LAST_SEEN, [
            'id' => $this->integer()->unsigned(),
            'user_id' => $this->integer()->notNull(),
            'message_id' => $this->integer()->notNull(),
            'time' => "TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP",
        ], $this->tableOptions);
        $tableName = $this->db->getSchema()->getRawTableName(self::TABLE_LAST_SEEN);
        $this->addPrimaryKey("pk-$tableName-id", self::TABLE_LAST_SEEN, 'id');
        $this->alterColumn(self::TABLE_LAST_SEEN, 'id', $this->integer().' NOT NULL AUTO_INCREMENT');
    }

    public function down()
    {
        $this->dropTable(self::TABLE_LAST_SEEN);
    }
}
