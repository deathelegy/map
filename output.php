<?php
   header("Pragma: public");
   header("Expires: 0");
   header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
   header("Cache-Control: public");
   header("Content-Description: File Transfer");
 
   $Data = str_replace("<br>","\r\n",$_POST['data']);
	
 
   header("Content-Type: text/plain");
   $header="Content-Disposition: attachment; filename=".date("YmdHis").".txt;";
   header($header );
   header("Content-Transfer-Encoding: binary");
   header("Content-Length: ".strlen($Data));

	
	echo $Data;
?>