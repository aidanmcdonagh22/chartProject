<?php

  require('initializeDB.php');

  // remove before release
  ini_set('display_errors','On');

  $retries = 3;
  $conn = false;
  while ($retries > 0 && $conn == false)
  {
    //Connect to database
    try {
      $db = new PDO('mysql:host=localhost;', 'root', 'root');
      $db->setAttribute(PDO::ATTR_ERRMODE,PDO::ERRMODE_EXCEPTION);
      $db->exec('use insedb');
      $conn = true;
      initializeDB($db);
    } catch (Exception $e) {
      /*Checks for error and passes error to createDB,
      if error is of type no database is found, creates the table and then initializes
      it. Otherwise echos the messages and kills everything else */
      createDB($e);
      //wait .5 secs before trying each connection
      $retries--;
      usleep(500);
    }

  }

?>
