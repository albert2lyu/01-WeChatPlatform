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

});
