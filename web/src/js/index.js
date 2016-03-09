$(function () {
  // ___E 三个下划线
  var editor = new ___E('edit-article');
  // 对象配置 在这里定义
  editor.config.menus = ['head', 'bold', 'color', 'quote', 'list', 'check'];
  editor.init();

  // 获取编辑器区域
  var $txt = editor.$txt;

  // 获取 html
  var html =  $txt.html();

  // 获取 text
  var text = $txt.text();

  // 保存草稿到 localStorage
  function saveArticle() {
    return function() {
      localStorage.setItem('article', $txt.html());
    }
  }

  // 从 localStorage 获取草稿
  function getArticle() {
    var content = localStorage.getItem('article');
    return content;
  }

  // 从 localStorage 删除草稿
  function delArticle() {
    localStorage.removeItem('article');
  }

  if (getArticle() !== null) {
    $txt.html(getArticle());
  };

  setInterval(saveArticle(), 10000);

  $('#save').on('click', function () {
    saveArticle();
  })

  // 获取表单数据
  $('#publish').on('click', function () {
    var title = $('');
    var content = $txt.html();
    var author = $('#author').val();
    var source = $('#source').val();
    var share = $('#platform').val();
    var like_num = $('#like-num').val();
    var read_num = $('#read-num').val();

    $.ajax({
      type: 'POST',
      url: 'create',
      data: {
         // title: title,
         content: content,
         author: author,
         read_num: read_num,
         like_num: like_num,
         source: source,
         share: share
       },
      dataType: 'json',
      timeout: 5000,
      context: $('body'),
      success: function(data){
        console.log(data);
      },
      error: function(xhr, type){
        alert('Ajax error!')
      }
    })    
  })
});
