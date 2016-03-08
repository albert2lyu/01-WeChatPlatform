<?php

require 'vendor/autoload.php';
require 'database.php';

use Illuminate\Database\Capsule\Manager as Capsule;//如果你不喜欢这个名称，as DB;就好

$config = require 'config.php';

// 载入composer的autoload文件
include __DIR__ . '/vendor/autoload.php';

$app = new \Slim\Slim($config);

$app->post('/home', function() use($app)
{
    // 改用 index.twig 入口
    //app->render('home.twig');
    $req = $app->request()->post();
    //print_r($req);
    print_r($req);
});

$app->get('/home', function() use($app)
{
    // 改用 index.twig 入口
    //$app->render('home.twig');
    echo '1111';
});

$app->get('/', function() use($app)
{
    // 改用 index.twig 入口
    $app->render('index.twig');
});


/*$app->get('/', function() use($app)
{
    // 改用 index.twig 入口
    $app->render('home.twig');
});*/

$app->run();
