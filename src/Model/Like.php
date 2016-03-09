<?php 
namespace Model;
use  Illuminate\Database\Eloquent\Model  as DB; 

class Like extends  DB 
{
    protected $table = 'like';
    protected $guarded = ['id'];
}

?>