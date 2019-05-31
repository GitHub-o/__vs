<?php
  var_dump($_FILES['file']);

  $res = move_uploaded_file($_FILES["file"]["tmp_name"],
      realpath(dirname(__FILE__)) . "/upload/" . $_FILES["file"]["name"]);

  echo $res;
?>