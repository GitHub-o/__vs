<?php
  var_dump($_FILES['file']);

  for($i = 0; $i < count($_FILES['file']['name']); $i++){
  	move_uploaded_file($_FILES["file"]["tmp_name"][$i], realpath(dirname(__FILE__)) . "/upload/" . $_FILES["file"]["name"][$i]);
  }


?>