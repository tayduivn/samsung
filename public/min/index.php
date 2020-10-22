<?php
/**
 * Sets up MinApp controller and serves files
 *
 * DO NOT EDIT! Configure this utility via config.php and groupsConfig.php
 *
 * @package Minify
 */
// tuanNM: decode requested files
if(isset($_GET['f'])) {
    $files = base64_decode(str_replace("/", '', substr($_GET['f'], 12)));
    $_GET['f'] = $files;
}

$app = (require __DIR__ . '/bootstrap.php');
/* @var \Minify\App $app */

$app->runServer();
