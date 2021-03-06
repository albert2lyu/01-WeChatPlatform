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
$rooturl=substr('http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'], 0,-9);
// $rooturl = str_replace('http://'.$_SERVER['HTTP_HOST'].$_SERVER['PHP_SELF'], '/index.php', '');
define('URI_PATH', $rooturl);

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
    // echo URI_PATH;
     $app->render('index.twig',array('path'=>URI_PATH));
});

/**
 * 搜索
 * @param String $content
 * @param Int $page
 * @return Json $response
 */
$app->get('/search/:content/:lastid', function($content, $lastid) use($app, $json)
{
    if($lastid == '0'){
        $articles = Article::where('title', 'like', '%'.$content.'%')->orwhere('content', 'like', '%'.$content.'%')->orderBy('title')->orderBy('created_at', 'desc')->get()->toArray();
    }else{
        $articles = Article::where('title', 'like', '%'.$content.'%')->orwhere('content', 'like', '%'.$content.'%')->where('id', '<', $lastid)->orderBy('title')->orderBy('created_at', 'desc')->get()->toArray();
    }
    //print_r($articles);
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
    $app->render('edit.twig',array('path'=>URI_PATH));
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
    //正则匹配分离文章标题和内容
    $rule='/<h1 class="article-title(.*?)>(.*?)<\/h1>/is';
     preg_match($rule, $req['content'], $title);
     $content = str_replace($title[0], '', $req['content']);
    // print_r($title);
     //录入数据库
    $article = Article::firstOrCreate([
        'title' => $title[2],
        'content' =>  $content,
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
            'status'=>'failed',
            'msg'=>'insert failed'
            );
    }
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
    $app->render('article.twig',array('path'=>URI_PATH,'article'=>$article));
});

/**
 * 查看文章详细数据入口
 * @param $id
 * @return View 渲染article_statistics.twig视图
 */
$app->get('/article/statistics/:id', function($id) use($app)
{   
    $article=Article::find($id)->toArray();
    $app->render('data.twig',array('path'=>URI_PATH,'article'=>$article));
});


/**
 * 点赞
 * @param $id Int 文章id
 * @return Json $response
 */
$app->post('/like', function() use($app, $json)
{
    $req = $app->request()->post();
    $id=$req['id'];
    //判断用户是否点赞过
    $like_pd = Like::where('article_id', '=',$id )->where('ip','=',$_SERVER["REMOTE_ADDR"])->get()->toArray();
    //print_r($like_pd);
    if(!empty($like_pd)){
        $json_data=array(
            'status' =>'failed',
            'msg'    =>'请不要重复点赞'
            );
    }else{
        //点赞数增加
        $article=Article::find($id);
        $article->like_num++;
        $article->save();
        //录入点赞人的ip地址
        $like=Like::firstOrCreate([
            'article_id'=>$req['id'],
            'ip'=>$_SERVER["REMOTE_ADDR"]
            ]);
        $json_data=array(
            'status' => 'success',
            'msg'    =>'点赞成功'
            );
    }
    $json->echoRespnse(200, $json_data);
});


$app->run();