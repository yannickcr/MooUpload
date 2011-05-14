<?php
header('Content-type:text/json');
$data = array('POST'=>$_POST, 'FILES'=>$_FILES);
echo json_encode($data);