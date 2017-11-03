<?php
/*
Plugin Name: Prelanding
Plugin URI:
Description: Prelanding ROW
Author: Moisés Berenguer
Author URI:
Version: 1.0.0
*/

//-- Notes
//-- Write this on the head <base href="plugin_dir_url(__FILE__);"> -- With php tags
//-- Rename index html to index.php 

function load_main_template() {
    include('/dist/index.php');
    die;
}

//-- Add the action if it's necesary
if (!isset($_COOKIE["prelanding"]) && !isset($HTTP_COOKIE_VARS["prelanding"])){
    setcookie("prelanding", true);
    add_action('template_redirect', 'load_main_template');
}

?>