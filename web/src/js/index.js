$(function () {
  // ___E �����»���
  var editor = new ___E('edit-article');
  // �������� �����ﶨ��
  editor.config.menus = ['head', 'bold', 'color', 'quote', 'list', 'check'];
  editor.init();

  // ��ȡ�༭������
  var $txt = editor.$txt;

  // ��ȡ html
  var html =  $txt.html();

  // ��ȡ text
  var text = $txt.text();

  // ����ݸ嵽 localStorage
  function saveArticle() {
    return function() {
      localStorage.setItem('article', $txt.html());
    }
  }

  // �� localStorage ��ȡ�ݸ�
  function getArticle() {
    var content = localStorage.getItem('article');
    return content;
  }

  // �� localStorage ɾ���ݸ�
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

  // ��ȡ������
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
