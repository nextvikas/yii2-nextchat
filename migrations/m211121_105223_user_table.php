<?php
use nextvikas\nextchat\migrations\Migration;


/**
 * Class m151121_105223_user_table
 *
 * @author Vikas Pandey
 * @since 1.0
 */
class m211121_105223_user_table extends Migration
{
    public function up()
    {
    	$usertable = self::TABLE_USER;
	$this->execute("ALTER TABLE `{$usertable}` DROP `online`;");
        $this->execute("ALTER TABLE `{$usertable}` ADD `online` INT NOT NULL DEFAULT '0';");
		$this->insert($usertable,array(
		         'id'=>'10000',
		         'email'=>'10000@gmail.com',
		         'username' =>'user10000',
		         'password_hash' => '$2y$13$uqe3LPW9ya3RZhynJpPN5um9fvdxUmoqjOqQBJDdIDXSKxRZB5bPu', //123qwe
		));
		$this->insert($usertable,array(
		         'id'=>'10001',
		         'email'=>'10001@gmail.com',
		         'username' =>'user10001',
		         'password_hash' => '$2y$13$uqe3LPW9ya3RZhynJpPN5um9fvdxUmoqjOqQBJDdIDXSKxRZB5bPu', //123qwe
		));
		$this->insert($usertable,array(
		         'id'=>'10002',
		         'email'=>'10002@gmail.com',
		         'username' =>'user10002',
		         'password_hash' => '$2y$13$uqe3LPW9ya3RZhynJpPN5um9fvdxUmoqjOqQBJDdIDXSKxRZB5bPu', //123qwe
		));
		$this->insert($usertable,array(
		         'id'=>'10003',
		         'email'=>'10003@gmail.com',
		         'username' =>'user10003',
		         'password_hash' => '$2y$13$uqe3LPW9ya3RZhynJpPN5um9fvdxUmoqjOqQBJDdIDXSKxRZB5bPu', //123qwe
		));
		$this->insert($usertable,array(
		         'id'=>'10004',
		         'email'=>'10004@gmail.com',
		         'username' =>'user10004',
		         'password_hash' => '$2y$13$uqe3LPW9ya3RZhynJpPN5um9fvdxUmoqjOqQBJDdIDXSKxRZB5bPu', //123qwe
		));
		$this->insert($usertable,array(
		         'id'=>'10005',
		         'email'=>'10005@gmail.com',
		         'username' =>'user10005',
		         'password_hash' => '$2y$13$uqe3LPW9ya3RZhynJpPN5um9fvdxUmoqjOqQBJDdIDXSKxRZB5bPu', //123qwe
		));
		$this->insert($usertable,array(
		         'id'=>'10006',
		         'email'=>'10006@gmail.com',
		         'username' =>'user10006',
		         'password_hash' => '$2y$13$uqe3LPW9ya3RZhynJpPN5um9fvdxUmoqjOqQBJDdIDXSKxRZB5bPu', //123qwe
		));


    }

    public function down()
    {
        
    }
}
