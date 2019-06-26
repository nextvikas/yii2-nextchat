# Installation
Add to composer.json


```
"nextvikas/yii2-nextchat": "@dev"
```
or
```
composer require --prefer-dist "nextvikas/yii2-nextchat @dev"
```

Once the extension is installed, simply modify your application configuration as follows:
```php
'modules' => [

    ----------------

    'nextchat' => [
        'class' => 'nextvikas\nextchat\Module',
        'defaultRoute' => 'chat/index',
        'components'=>[
            'chating'=>[
                'class'=>'nextvikas\nextchat\components\Chating',
            ],
        ]
    ],
],
```


Migrate Command: 
```
yii migrate
php yii migrate --migrationPath=@nextvikas/nextchat/migrations
```


You can then access Next Chat through the following URL:
```
http://localhost/path/to/index.php?r=nextchat
```
or if you have enabled pretty URLs, you may use the following URL:
```
http://localhost/path/to/index.php/nextchat
```


Login details: 
```
username: user10000
Password: 123qwe
```

You should see the below:

![yii next chat demo page](https://raw.githubusercontent.com/nextvikas/yii2-nextchat/master/nextchat.png "yii next chat demo page")


or if you want to use widget in another pages then please configuration as follows
```php
<?php echo \nextvikas\nextchat\components\ChatWidget::widget() ?>
```
![yii next chat widget demo page](https://raw.githubusercontent.com/nextvikas/yii2-nextchat/master/widget.png "yii next chat widget demo page")
