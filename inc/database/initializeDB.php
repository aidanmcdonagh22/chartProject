<?php

require('functionsDB.php');

//Function to create a database if it does not exist.
function createDB ($e) {
  if (($e->getMessage()) == "SQLSTATE[42000]: Syntax error or access violation: 1049 Unknown database 'insedb'" ) {
    $db = null;
    $db = new PDO('mysql:host=localhost;', 'root', 'root');
    $fileName = '/Users/jjair/Desktop/Github/insechart/sql/insedb.sql';
    $templine = '';
    // Read in entire file
    $lines = file($fileName);
    // Loop through each line
    foreach ($lines as $line)
    {
      // Skip it if it's a comment
      if (substr($line, 0, 2) == '--' || $line == '')
          continue;

      // Add this line to the current segment
      $templine .= $line;
      // If it has a semicolon at the end, it's the end of the query
      if (substr(trim($line), -1, 1) == ';')
      {
          // Perform the query
          try {
            $db->exec($templine);
          } catch (Exception $e){
              echo $e->getMessage();
          }
          // Reset temp variable to empty
          $templine = '';
      }
    }
  } else {
    echo $e->getMessage();
    die();
  }
}

?>
