<?php
/**
 * @link https://github.com/bubasuma/yii2-simplechat
 * @copyright Copyright (c) 2015 bubasuma
 * @license http://opensource.org/licenses/BSD-3-Clause
 */
use nextvikas\nextchat\migrations\Migration;

/**
 * Class m151121_105223_user_table
 *
 * @author Buba Suma <bubasuma@gmail.com>
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
