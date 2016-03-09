<?php 
namespace Model;
use  Illuminate\Database\Eloquent\Model  as DB; 

class Article extends  DB 
{
    protected $table = 'article';
    protected $guarded = ['id'];
}

?>