<?php

//初始化主框架
require 'vendor/autoload.php';
$config = require 'config.php';
// 载入composer的autoload文件
include __DIR__ . '/vendor/autoload.php';
$app = new \Slim\Slim($config);

use Illuminate\Database\Capsule\Manager as Capsule;//如果你不喜欢这个名称，as DB;就好 
use Helper\Json;
use Model\Article;
use Model\Like;

//定义URI路径
define('URI_PATH', 'http://'.$_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']);

//初始化数据库
require 'database.php';

$json = new Json();

/**
 * 主入口（即搜索页）
 * @param 无
 * @return View 渲染index.twig视图
 */

$app->get('/', function() use($app)
{
    $app->render('index.twig');
});

/**
 * 搜索
 * @param String $content
 * @param Int $page
 * @return Json $response
 */
$app->get('/search/:content/:page', function($content, $page) use($app, $json)
{
    $articles = Article::where('title', 'like', '%'.$content.'%')->orwhere('content', 'like', '%'.$content.'%')->orderBy('title')->orderBy('created_at', 'desc')->get()->toArray();
    if(!empty($articles)){
        $json_data = array(
            'status'=> 'success',
            'result' => $articles
            );
    }else{
        $json_data = array(
            'status'=> 'failed',
            'result' => 'empty data'
            );
    }
    $json->echoRespnse(200, $json_data);
});

/**
 * 录入文章入口
 * @param 无
 * @return View 渲染article_create.twig视图
 */
$app->get('/create', function() use($app)
{
    //todo
    $app->render('edit.twig');
});

/**
 * 录入文章表单的数据提交
 * @param String $title
 * @param Text $content
 * @param String $author
 * @param String $pic（保留字段）
 * @param Int $read_num
 * @param Int $like_num
 * @param String $source
 * @param String $share
 * @return Json $response
 */
$app->post('/create', function() use($app, $json)
{
    //获取传递过来的数据并格式化为数组
    $req = $app->request()->post();
    /*$article = Article::firstOrCreate([
        'title' => $req['title'], 
        'content' => $req['content'],
        'author' => $req['author'],
        //保留字段'pic' => $req['pic'],
        'read_num' => $req['read_num'],
        'like_num' => $req['like_num'],
        'source' => $req['source'],
        'share' => $req['share']
        ]);
    if(!empty($article)){
        $json_data = array(
            'status'=>'success'
            );
    }else{
        $json_data = array(
            'status'=>'insert failed'
            );
    }*/
    $json->echoRespnse(200, $req);
});

/**
 * 查看文章入口
 * @param $id
 * @return View 渲染article.twig视图
 */
$app->get('/article/:id', function($id) use($app)
{
    $article=Article::find($id);
    $article->read_num++;
    $article->save();
    $article=Article::find($id)->toArray();
    // print_r($article);
    $app->render('article.twig',array('article'=>$article));
});

/**
 * 查看文章详细数据入口
 * @param $id
 * @return View 渲染article_statistics.twig视图
 */
$app->get('/article/statistics/:id', function($id) use($app)
{   
    $article=Article::find($id);
    $app->render('data.twig',array('article'=>$article));
});


/**
 * 点赞
 * @param $id Int 文章id
 * @return Json $response
 */
$app->post('/like', function() use($app)
{
    $req = $app->request();
    $id=$req->post('id');
    $article=Article::find($id);
    $article->like_num++;
    $article->save();
});

$app->run();